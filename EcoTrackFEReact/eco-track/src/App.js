import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './components/styles.css';
import NavMenu from './components/NavMenu';
import NavDesktop from './components/NavDesktop';
import Dashboard from './components/LogIn';
import Register from './components/Register'; 
import CrearActividad from './components/CrearActividad';
import EditarActividad from './components/EditarActividad';
import MapaUbicacion from './components/MapaUbicacion';
import Perfilusuario from './components/Perfilusuario';
import ErrorPage from './components/Error';
import Home from './components/Home';

function Layout() {
    const location = useLocation();
    const [savedLocation, setSavedLocation] = useState(null); // Estado para guardar la ubicación

    const handleLocationSave = (location) => {
        setSavedLocation(location);
    };

    return (
        <>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/crearAct" element={<CrearActividad location={savedLocation} />} /> {/* Pasar ubicación */}
                <Route path="/editarAct/:id" element={<EditarActividad />} /> 
                <Route path="/ubicacion" element={<MapaUbicacion onLocationSave={handleLocationSave} />} />
                <Route path="/perfil" element={<Perfilusuario />} />
                <Route path="/Error" element={<ErrorPage />} />
            </Routes>

            {location.pathname !== '/register' && location.pathname !== '/' && location.pathname !== '' && <NavMenu />}
            {location.pathname !== '/register' && location.pathname !== '/' && location.pathname !== '' && <NavDesktop />}
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
