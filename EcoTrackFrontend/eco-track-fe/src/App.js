import './styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './Dashboard';
import Register from './Register'; // Componente de la segunda pantalla (Inicia sesión)

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal (Pantalla de inicio) */}
        

        {/* Ruta del Dashboard (Segunda pantalla después de iniciar sesión) */}
        <Route path="/" element={<Dashboard />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
