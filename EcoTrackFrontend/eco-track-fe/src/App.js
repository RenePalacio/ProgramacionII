import React from 'react';
import './styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home'; // primera pantalla
import Dashboard from './Dashboard'; // segunda pantalla (Inicia sesión)
import Pantalla3 from './Pantalla3'; // tercera pantalla
import Pantalla4 from './Pantalla4'; // cuarta pantalla 
import Pantalla5 from './Pantalla5'; // CrearActividad
import PantallaEditar from './PantallaEditar'; // pantalla de EditarActividad
import Pantalla6 from './Pantalla6'; // pantalla6 ubicación
import Perfilusuario1 from './Perfilusuario1'; // pantalla perfil1
import AgregaDireccion from './AgregaDireccion'; // agregar dirección
import CambioDireccion from './CambioDireccion'; // editar dirección
import Clima from './Clima'; 
import Register from './Register'; // Componente de registro

function App() { 
  return (
    <Router>
      <Routes>
        {/* Ruta principal (Pantalla de inicio) */}
        <Route path="/" element={<Home />} />

        {/* Ruta del Dashboard (Segunda pantalla después de iniciar sesión) */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Rutas adicionales */}
        <Route path="/Pantalla3" element={<Pantalla3 />} />
        <Route path="/Pantalla4" element={<Pantalla4 />} /> 
        <Route path="/CrearActividad" element={<Pantalla5 />} />
        <Route path="/EditarActividad" element={<PantallaEditar />} />
        <Route path="/ubicaciones" element={<Pantalla6 />} />
        <Route path="/AgregarDireccion" element={<AgregaDireccion />} />
        <Route path="/EditarDireccion" element={<CambioDireccion />} />
        <Route path="/WeatherApp" element={<Clima />} /> 
        <Route path="/InformacionUsuario" element={<Perfilusuario1 />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
