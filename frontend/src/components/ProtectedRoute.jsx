import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute
 * @param {string} allowedRole - the role that is permitted to see this route
 * @param {ReactNode} children  - the component to render if access is granted
 */
const ProtectedRoute = ({ allowedRole, children }) => {
    const { user, role } = useAuth();

    if (!user) {
        // Not logged in → redirect to login
        return <Navigate to="/login" replace />;
    }

    if (allowedRole && role !== allowedRole) {
        // Wrong role → send to home
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
