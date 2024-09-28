import React from 'react';
import './styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home'; // primera pantalla
import Dashboard from './Dashboard'; // segunda pantalla (Inicia sesión)
import Pantalla3 from './Pantalla3'; // tercera pantalla
import Pantalla4 from './Pantalla4'; // cuarta pantalla 
import Pantalla5 from './Pantalla5'; // CrearActividad
import PantallaEditar from './PantallaEditar'; // pantalla de EditarActividad
import Pantalla6 from './Pantalla6'; //  pantalla6 ubicacion
import Perfilusuario1 from './Perfilusuario1'; //  pantalla perfil1
import AgregaDireccion from './AgregaDireccion'; //  agregar dirección
import CambioDireccion from './CambioDireccion'; // editar dirección
import Clima from './Clima'; 

function App() { 
  return (
    <Router>
      <Routes>
        {/* Ruta principal (Pantalla de inicio) */}
        <Route path="/" element={<Home />} />

        {/* Ruta del Dashboard (Segunda pantalla después de iniciar sesión) */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Ruta de la tercera pantalla */}
        <Route path="/Pantalla3" element={<Pantalla3 />} />

        {/* Ruta de la cuarta pantalla */}
        <Route path="/Pantalla6" element={<Pantalla4 />} /> 

        {/* Ruta de la pantalla de CrearActividad */}
        <Route path="/CrearActividad" element={<Pantalla5 />} />

        {/* Ruta de la pantalla de EditarActividad */}
        <Route path="/EditarActividad" element={<PantallaEditar />} />

       {/* Ruta de Ubicaciones (agregada aquí) */}
       <Route path="/ubicaciones" element={<Pantalla6 />} />

        {/* Rutas para agregar y editar dirección */}
        <Route path="/AgregarDireccion" element={<AgregaDireccion/>} />CambioDireccion
        <Route path="/EditarDireccion" element={<CambioDireccion/>} />

        {/* Ruta para el componente Clima */}
        <Route path="/WeatherApp" element={<Clima />} /> 

        {/* Ruta para información del usuario */}
        <Route path="/InformacionUsuario" element={<Perfilusuario1 />} />
      </Routes>
    </Router>
  );
}

export default App;
