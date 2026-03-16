import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ClientInterface() {
  const [menu, setMenu] = useState([]);
  const [table, setTable] = useState('');
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8000/api/menu/').then(res => setMenu(res.data));
  }, []);

  const handleQuantityChange = (id, value) => {
    setQuantities({ ...quantities, [id]: parseInt(value, 10) });
  };

  const addToCart = (item) => {
    const qty = quantities[item.id] || 1;
    if (qty > 0) {
      const existingItem = cart.find(c => c.menu_item_id === item.id);
      if (existingItem) {
        setCart(cart.map(c => 
          c.menu_item_id === item.id 
            ? { ...c, quantity: c.quantity + qty } 
            : c
        ));
      } else {
        setCart([...cart, { menu_item_id: item.id, quantity: qty, name: item.name }]);
      }
      setQuantities({ ...quantities, [item.id]: 1 });
    }
  };

  const removeFromCart = (itemId) => {
    // Filtra o carrinho, mantendo apenas os itens que nao tem o ID que queremos remover
    setCart(cart.filter(item => item.menu_item_id !== itemId));
  };

  const submitOrder = async () => {
    if (!table || parseInt(table, 10) <= 0) {
      return alert("Por favor, insira um numero de mesa valido.");
    }
    if (cart.length === 0) {
      return alert("Adicione pelo menos um item ao pedido.");
    }

    try {
      await axios.post('http://localhost:8000/api/orders/', {
        table_number: parseInt(table, 10),
        items: cart.map(c => ({ menu_item_id: c.menu_item_id, quantity: c.quantity }))
      });
      alert("Pedido submetido com sucesso!"); 
      setCart([]); 
      setTable('');
      setQuantities({});
    } catch (error) {
      console.error(error);
      alert("Erro ao submeter pedido.");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Fazer Pedido</h1>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold' }}>Mesa: </label>
        <input 
          type="number" 
          min="1"
          value={table} 
          onChange={(e) => setTable(e.target.value)} 
          style={{ padding: '5px', width: '60px' }}
        />
      </div>
      
      {['Entradas', 'Sopas', 'Carne', 'Peixe', 'Sobremesa'].map(cat => (
        <div key={cat}>
          <h2 style={{ borderBottom: '2px solid #2c3e50', paddingBottom: '5px' }}>{cat}</h2>
          {menu.filter(m => m.category === cat).map(item => (
            <div key={item.id} style={{ border: '1px solid #ccc', borderRadius: '8px', margin: '10px 0', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 5px 0' }}>{item.name}</h4>
                <p style={{ margin: 0, color: '#666', fontSize: '0.9em' }}>{item.description}</p>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input 
                  type="number" 
                  min="1" 
                  value={quantities[item.id] || 1} 
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  style={{ width: '50px', padding: '5px' }}
                />
                <button 
                  onClick={() => addToCart(item)}
                  style={{ background: '#3498db', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}
                >
                  Adicionar
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
      
      <div style={{ marginTop: '30px', padding: '20px', background: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd' }}>
        <h3>Resumo do Pedido</h3>
        {cart.length === 0 ? <p>O seu pedido está vazio.</p> : (
          <ul style={{ paddingLeft: '0', listStyleType: 'none', margin: '0 0 15px 0' }}>
            {cart.map((c) => (
              <li 
                key={c.menu_item_id} 
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '8px', background: '#fff', borderRadius: '4px', border: '1px solid #eee' }}
              >
                <span><strong>{c.quantity}x</strong> {c.name}</span>
                <button 
                  onClick={() => removeFromCart(c.menu_item_id)}
                  style={{ background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '4px 8px', fontSize: '0.8em' }}
                  title="Remover prato"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )}
        <button 
          onClick={submitOrder} 
          style={{ background: '#27ae60', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginTop: '10px', fontSize: '1.1em', width: '100%' }}
        >
          Confirmar Pedido
        </button>
      </div>
    </div>
  );
}