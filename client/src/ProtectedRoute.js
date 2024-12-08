
import React from 'react';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <navigate to="/" />;
}

export default ProtectedRoute;