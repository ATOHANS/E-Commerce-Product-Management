import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
    const role = localStorage.getItem('role'); // Get user role from local storage

    if (!role || !allowedRoles.includes(role)) {
        return <Navigate to="/login" />; // Redirect unauthorized users to login
    }

    return children;
};

export default PrivateRoute;
