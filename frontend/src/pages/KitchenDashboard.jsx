import { useState, useEffect } from 'react';
import axios from 'axios';

const STATUS_COLUMNS = [
  'Order Preview',
  'Preparing',
  'Cooling Down',
  'Ready to Serve',
  'Concluded'
]; // [cite: 38]

export default function KitchenDashboard() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // Para o modal de ingredientes

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/orders/');
      setOrders(res.data);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
    // Opcional: setInterval para auto-refresh simples se não usares WebSockets
    const interval = setInterval(fetchOrders, 10000); 
    return () => clearInterval(interval);
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:8000/api/orders/${orderId}/status/`, {
        status: newStatus
      });
      fetchOrders(); // Recarregar após atualizar
    } catch (error) {
      console.error("Erro ao atualizar estado:", error);
      alert("Erro ao atualizar o estado do pedido.");
    }
  };

  const deleteOrder = async (orderId) => {
    // Um pequeno aviso para evitar apagar pedidos sem querer
    if (window.confirm("Tem a certeza que deseja eliminar este pedido permanentemente?")) {
      try {
        await axios.delete(`http://localhost:8000/api/orders/${orderId}/`);
        fetchOrders(); // Recarrega os pedidos após apagar
      } catch (error) {
        console.error("Erro ao eliminar pedido:", error);
        alert("Erro ao eliminar o pedido.");
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Dashboard de Cozinha</h1>
        <button 
          onClick={fetchOrders}
          style={{ padding: '10px 20px', background: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Atualizar Pedidos 🔄
        </button>
      </div>

      <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '20px', minHeight: '70vh' }}>
        {STATUS_COLUMNS.map(status => (
          <div key={status} style={{ flex: '0 0 300px', background: '#ecf0f1', padding: '15px', borderRadius: '8px', borderTop: '4px solid #2c3e50' }}>
            <h3 style={{ marginTop: 0, textAlign: 'center' }}>{status}</h3>
            
            {orders.filter(o => o.status === status).map(order => (
              <div 
                key={order.id} 
                onClick={() => setSelectedOrder(order)}
                style={{ background: 'white', padding: '15px', marginBottom: '10px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '10px' }}>
                  <strong style={{ fontSize: '1.2em' }}>Mesa {order.table_number}</strong>
                  <span style={{ color: '#7f8c8d' }}>
                    {new Date(order.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>

                  {/* Botão de Eliminar */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); // Impede que o modal de ingredientes abra ao clicar neste botão
                      deleteOrder(order.id);
                    }}
                    style={{ background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', fontSize: '0.8em' }}
                    title="Eliminar Pedido"
                  >
                    Delete
                  </button>
                </div>
                
                <ul style={{ paddingLeft: '20px', margin: '10px 0' }}>
                  {order.items.map(item => (
                    <li key={item.id}>
                      <strong>{item.quantity}x</strong> {item.menu_item_details.name}
                    </li>
                  ))}
                </ul>

                {/* Dropdown para mover o pedido, click travado para não abrir o modal */}
                <select 
                  value={order.status}
                  onClick={(e) => e.stopPropagation()} 
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  style={{ width: '100%', padding: '5px', marginTop: '10px' }}
                >
                  {STATUS_COLUMNS.map(col => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Modal de Detalhes / Ingredientes */}
      {selectedOrder && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '8px', maxWidth: '500px', width: '100%' }}>
            <h2>Detalhes do Pedido - Mesa {selectedOrder.table_number}</h2>
            
            {selectedOrder.items.map(item => (
              <div key={item.id} style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                <h4>{item.quantity}x {item.menu_item_details.name}</h4>
                <p style={{ margin: '5px 0', fontSize: '0.9em', color: '#555' }}>
                  <strong>Ingredientes:</strong> {item.menu_item_details.ingredients}
                </p>
              </div>
            ))}

            <button 
              onClick={() => setSelectedOrder(null)}
              style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', width: '100%', marginTop: '15px' }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}