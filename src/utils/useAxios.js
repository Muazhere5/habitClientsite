import axios from "axios";
// CRITICAL FIX: Need to import the function to get the Firebase Auth object
import { getAuth } from "firebase/auth"; 

// ⬇️ Backend Connection Note: Uses the VITE_API_URL defined in .env.local
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    
    // Allows sending authentication headers/cookies to the server
    withCredentials: true, 
    headers: {
        'Content-Type': 'application/json',
    }
});

/**
 * Custom hook to provide a pre-configured Axios instance for backend calls.
 * This includes an interceptor to automatically attach the Firebase JWT for 
 * protected API routes on the server (like POST /add-habit).
 */
const useAxios = () => {
    // ⬇️ CRITICAL FIX: Add a request interceptor
    axiosInstance.interceptors.request.use(async (config) => {
        const auth = getAuth();
        const user = auth.currentUser; // Get the currently logged-in user

        // Only attach token if the user is logged in
        if (user) {
            try {
                // Get the latest JWT token (forcing a refresh if necessary)
                // This token is what your Vercel server's verifyToken middleware requires.
                const token = await user.getIdToken(true); 
                
                // Attach token to the Authorization header in the required "Bearer <token>" format
                config.headers.Authorization = `Bearer ${token}`;
            } catch (error) {
                console.error("Failed to get Firebase token for Axios:", error);
            }
        }
        return config;
    }, (error) => {
        // Return any promise rejection error
        return Promise.reject(error);
    });

    return axiosInstance;
};

export default useAxios;