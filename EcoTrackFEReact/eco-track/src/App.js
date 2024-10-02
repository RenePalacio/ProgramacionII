import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './components/styles.css';

import Dashboard from './components/LogIn';
import Register from './components/Register'; // Componente de la segunda pantalla (Inicia sesión)
import EditarDireccion from './components/CambioDireccion';
import AgregarDireccion from './components/AgregaDireccion';
import CrearActividad from './components/CrearActividad';
import Inicio from './components/Inicio';
import EditarActividad from './components/EditarActividad';
import MapaUbicacion from './components/MapaUbicacion';
import Perfilusuario from './components/Perfilusuario'

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal (Pantalla de inicio) */}
        

        {/* Ruta del Dashboard (Segunda pantalla después de iniciar sesión) */}
        <Route path="/" element={<Dashboard />} />

        <Route path="/register" element={<Register />} />
        <Route path="/inicio" element={<Inicio/>} /> 
        <Route path="/crearAct" element={<CrearActividad />}/>
        <Route path="/editarAct" element={<EditarActividad />}/>
        <Route path="/ubicacion" element={<MapaUbicacion />}/>
        <Route path="/perfil" element={<Perfilusuario />} /> 
        
        
      </Routes>
    </Router>
  );
}

export default App;
