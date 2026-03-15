import { useState, useEffect } from 'react';
import axios from 'axios';

const COLUMNS = ['Order Preview', 'Preparing', 'Cooling Down', 'Ready to Serve', 'Concluded'];

export default function KitchenDashboard() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = () => {
    axios.get('http://localhost:8000/api/orders/').then(res => setOrders(res.data));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    await axios.patch(`http://localhost:8000/api/orders/${orderId}/`, { status: newStatus });
    fetchOrders(); // Atualiza a lista após mover a coluna [cite: 61]
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Dashboard de Cozinha</h1>
        <button onClick={fetchOrders} style={{ padding: '10px', cursor: 'pointer' }}>Refresh Manual</button>
      </div>

      <div style={{ display: 'flex', gap: '15px', overflowX: 'auto' }}>
        {COLUMNS.map(col => (
          <div key={col} style={{ flex: '1', minWidth: '250px', background: '#f4f4f4', padding: '10px', borderRadius: '8px', minHeight: '500px' }}>
            <h3 style={{ textAlign: 'center', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>{col}</h3>
            
            {orders.filter(o => o.status === col).map(order => (
              <div 
                key={order.id} 
                style={{ background: 'white', padding: '15px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                onClick={() => setSelectedOrder(order)} // Mostra detalhes ao clicar 
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>Mesa: {order.table_number}</strong>
                  <span style={{ fontSize: '0.8em', color: '#666' }}>{new Date(order.timestamp).toLocaleTimeString()}</span>
                </div>
                
                <ul style={{ paddingLeft: '20px', margin: '10px 0' }}>
                  {order.lines.map(line => (
                    <li key={line.id}>{line.quantity}x {line.menu_item.name}</li>
                  ))}
                </ul>

                <select 
                  value={order.status} 
                  onChange={(e) => updateStatus(order.id, e.target.value)} 
                  onClick={e => e.stopPropagation()}
                  style={{ width: '100%', padding: '5px', marginTop: '10px' }}
                >
                  {COLUMNS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Modal Simples de Detalhes / Ingredientes  */}
      {selectedOrder && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setSelectedOrder(null)}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '8px', width: '400px', maxWidth: '90%' }} onClick={e => e.stopPropagation()}>
            <h2>Detalhes - Mesa {selectedOrder.table_number}</h2>
            <hr />
            {selectedOrder.lines.map(line => (
              <div key={line.id} style={{ marginBottom: '15px' }}>
                <h4>{line.quantity}x {line.menu_item.name}</h4>
                <p><strong>Ingredientes:</strong> {line.menu_item.ingredients}</p>
              </div>
            ))}
            <button onClick={() => setSelectedOrder(null)} style={{ marginTop: '20px', padding: '10px 20px', background: '#333', color: 'white', border: 'none', cursor: 'pointer', width: '100%' }}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}