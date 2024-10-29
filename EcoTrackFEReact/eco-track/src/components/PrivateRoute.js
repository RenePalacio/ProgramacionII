import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const idUsuario = localStorage.getItem('idUsuario');

    return idUsuario ? children : <Navigate to="/Error" />;
};

export default PrivateRoute;
