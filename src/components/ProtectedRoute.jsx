import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider'; // Correct path to AuthContext
import LoadingSpinner from './LoadingSpinner'; // Correct path to LoadingSpinner (flat structure)

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    
    if (loading) {
        
        return <LoadingSpinner />;
    }


    if (user) {
        return children;
    }

    
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;