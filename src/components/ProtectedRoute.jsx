import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider'; // Correct path to AuthContext
import LoadingSpinner from './LoadingSpinner'; // Correct path to LoadingSpinner (flat structure)

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    // 1. Show spinner while checking user authentication state
    if (loading) {
        // ⬇️ Assignment Requirement: Show Loading Spinner when data is loading/checking auth state.
        return <LoadingSpinner />;
    }

    // 2. If user exists, grant access
    if (user) {
        return children;
    }

    // 3. If no user, redirect to login page
    // ⬇️ Assignment Requirement: Redirect to Login, but save the 'from' location to redirect back after successful login.
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;