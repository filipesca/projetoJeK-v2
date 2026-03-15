import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ClientInterface from './ClientInterface';
import KitchenDashboard from './KitchenDashboard';

function App() {
  return (
    <Router>
      <nav style={{ padding: '15px', background: '#2c3e50', color: 'white', display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Interface Cliente</Link>
        <Link to="/kitchen" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Dashboard Cozinha</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ClientInterface />} />
        <Route path="/kitchen" element={<KitchenDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;