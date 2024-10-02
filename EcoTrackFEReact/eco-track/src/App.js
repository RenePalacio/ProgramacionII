import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './components/styles.css';

import Dashboard from './components/LogIn';
import Register from './components/Register'; // Componente de la segunda pantalla (Inicia sesión)
import EditarDireccion from './components/CambioDireccion';
import AgregarDireccion from './components/AgregaDireccion';
import CrearActividad from './components/CrearActividad';


function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal (Pantalla de inicio) */}
        

        {/* Ruta del Dashboard (Segunda pantalla después de iniciar sesión) */}
        <Route path="/" element={<Dashboard />} />

        <Route path="/register" element={<Register />} />
        <Route path="/cambiardireccion" element={<EditarDireccion />}/>
        <Route path="/agregardireccion" element={<AgregarDireccion />}/>
        <Route path="/crearAct" element={<CrearActividad />}/>
        
      </Routes>
    </Router>
  );
}

export default App;
