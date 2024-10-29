import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
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
import MyComponent from './components/MyComponent';
import PoliticasDeUso from './components/Politicas';

function PrivateRoute({ children }) {
    const idUsuario = localStorage.getItem('idUsuario');
    return idUsuario ? children : <Navigate to="/error" />;
}

function App() {
    const [idUsuario, setIdUsuario] = useState(null);
    const [locationData, setLocationData] = useState(null);

    useEffect(() => {
        const storedId = localStorage.getItem('idUsuario');
        if (storedId) {
            setIdUsuario(storedId);
        }
    }, []);

    const location = useLocation();

    return (
        <>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/crearAct" element={<PrivateRoute><CrearActividad /></PrivateRoute>} />
                <Route path="/editarAct/:id" element={<PrivateRoute><EditarActividad /></PrivateRoute>} />
                <Route path="/ubicacion" element={<PrivateRoute><MapaUbicacion onLocationSave={setLocationData} userId={idUsuario} /></PrivateRoute>} />
                <Route path="/perfil" element={<PrivateRoute><Perfilusuario /></PrivateRoute>} />
                <Route path="/error" element={<ErrorPage />} />
                <Route path="/politicadeuso" element={<PoliticasDeUso />} />
                 {/* Ruta para manejar todas las demás rutas no definidas */}
                 <Route path="*" element={<Navigate to="/error" />} />
            </Routes>

            {location.pathname !== '/register' && location.pathname !== '/' && location.pathname !== '/error' && (
                <>
                    <NavMenu setIdUsuario={setIdUsuario} />
                    <NavDesktop setIdUsuario={setIdUsuario} />
                </>
            )}

            {locationData && <MyComponent locationData={locationData} />}
        </>
    );
}

export default function Main() {
    return (
        <Router>
            <App />
        </Router>
    );
}
