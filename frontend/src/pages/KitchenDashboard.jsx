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
    try {
      // Usar a rota dedicada /status/ que criámos no backend
      await axios.patch(`http://localhost:8000/api/orders/${orderId}/status/`, { status: newStatus });
      fetchOrders(); 
    } catch (error) {
      console.error("Erro ao atualizar estado:", error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Dashboard de Cozinha</h1>
        <button onClick={fetchOrders} style={{ padding: '10px 20px', background: '#e67e22', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Refresh Manual
        </button>
      </div>

      <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '20px' }}>
        {COLUMNS.map(col => (
          <div key={col} style={{ flex: '1', minWidth: '280px', background: '#f4f4f4', padding: '10px', borderRadius: '8px', minHeight: '600px' }}>
            <h3 style={{ textAlign: 'center', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>{col}</h3>
            
            {orders.filter(o => o.status === col).map(order => (
              <div 
                key={order.id} 
                style={{ background: 'white', padding: '15px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                onClick={() => setSelectedOrder(order)} 
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '10px' }}>
                  <strong style={{ fontSize: '1.1em' }}>Mesa: {order.table_number}</strong>
                  {/* Corrigido para order.created_at */}
                  <span style={{ fontSize: '0.85em', color: '#666' }}>
                    {new Date(order.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
                
                <ul style={{ paddingLeft: '20px', margin: '10px 0', fontSize: '0.9em' }}>
                  {/* Corrigido para order.items e menu_item_details */}
                  {order.items.map(item => (
                    <li key={item.id}>{item.quantity}x {item.menu_item_details.name}</li>
                  ))}
                </ul>

                <select 
                  value={order.status} 
                  onChange={(e) => updateStatus(order.id, e.target.value)} 
                  onClick={e => e.stopPropagation()}
                  style={{ width: '100%', padding: '8px', marginTop: '10px', borderRadius: '4px', border: '1px solid #bbb' }}
                >
                  {COLUMNS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            ))}
          </div>
        ))}
      </div>

      {selectedOrder && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setSelectedOrder(null)}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '8px', width: '500px', maxWidth: '90%', maxHeight: '80vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <h2 style={{ marginTop: 0 }}>Detalhes - Mesa {selectedOrder.table_number}</h2>
            <hr style={{ margin: '15px 0' }}/>
            {selectedOrder.items.map(item => (
              <div key={item.id} style={{ marginBottom: '20px', background: '#f9f9f9', padding: '15px', borderRadius: '5px' }}>
                <h4 style={{ margin: '0 0 10px 0' }}>{item.quantity}x {item.menu_item_details.name}</h4>
                <p style={{ margin: 0, fontSize: '0.9em', color: '#444' }}><strong>Ingredientes:</strong> {item.menu_item_details.ingredients}</p>
              </div>
            ))}
            <button onClick={() => setSelectedOrder(null)} style={{ marginTop: '20px', padding: '12px 20px', background: '#2c3e50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%', fontSize: '1em' }}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}