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
    const qty = quantities[item.id] || 1; // Assume 1 se o utilizador não alterar o input
    if (qty > 0) {
      // Verifica se o prato já está no carrinho para somar a quantidade 
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
      // Dá reset à quantidade local do input após adicionar
      setQuantities({ ...quantities, [item.id]: 1 });
    }
  };

  const submitOrder = async () => {
    if (!table || cart.length === 0) return alert("Selecione a mesa e os itens.");
    try {
      await axios.post('http://localhost:8000/api/orders/', {
        table_number: parseInt(table, 10), // Garantir que a mesa vai como Int
        lines: cart
      });
      alert("Pedido submetido com sucesso!"); // Dá feedback adequado [cite: 33]
      setCart([]); // Dá reset para um novo pedido [cite: 33]
      setTable('');
    } catch (error) {
      console.error(error);
      alert("Erro ao submeter pedido.");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Fazer Pedido</h1>
      <label>Mesa: <input type="number" value={table} onChange={(e) => setTable(e.target.value)} /></label>
      
      {['Entradas', 'Sopas', 'Carne', 'Peixe', 'Sobremesa'].map(cat => (
        <div key={cat}>
          <h2>{cat}</h2>
          {menu.filter(m => m.category === cat).map(item => (
            <div key={item.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <input 
                type="number" 
                min="1" 
                value={quantities[item.id] || 1} 
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
              />
              <button onClick={() => addToCart(item)}>
                Adicionar
              </button>
            </div>
          ))}
        </div>
      ))}
      
      <div style={{ marginTop: '20px', borderTop: '2px solid black' }}>
        <h3>Resumo do Pedido</h3>
        {cart.map((c, idx) => <p key={idx}>{c.quantity}x {c.name}</p>)}
        <button onClick={submitOrder} style={{ background: 'green', color: 'white' }}>Confirmar Pedido</button>
      </div>
    </div>
  );
}