import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './components/styles.css';
import NavMenu from './components/NavMenu';
import Dashboard from './components/LogIn';
import Register from './components/Register'; 
import CrearActividad from './components/CrearActividad';
import Inicio from './components/Inicio';
import EditarActividad from './components/EditarActividad';
import MapaUbicacion from './components/MapaUbicacion';
import Perfilusuario from './components/Perfilusuario';
import ErrorPage from './components/Error';

function Layout() {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/crearAct" element={<CrearActividad />} />
        <Route path="/editarAct" element={<EditarActividad />} />
        <Route path="/ubicacion" element={<MapaUbicacion />} />
        <Route path="/perfil" element={<Perfilusuario />} />
        <Route path="/Error" element={<ErrorPage />} />
        
      </Routes>

      {location.pathname !== '/register' && location.pathname !== '/crearAct' && <NavMenu />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout /> 
    </Router>
  );
}

export default App;
