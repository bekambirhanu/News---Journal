import { useState, useEffect } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { LOGGEDIN } from './constants';

function AuthRout({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const loggedIn = localStorage.getItem(LOGGEDIN);
                setIsAuthorized(loggedIn === 'true');
            } catch (error) {
                console.error('Authentication check failed:', error);
                setIsAuthorized(false);
            }
        };
        
        checkAuth();
    }, []);

    // Show loading state while checking authentication
    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    // If not authorized, redirect to login with return path
    if (!isAuthorized) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If authorized, render the protected content
    return children;
}

export default AuthRout;

