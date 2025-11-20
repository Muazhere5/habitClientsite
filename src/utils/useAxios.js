import axios from "axios";
import { getAuth } from "firebase/auth"; 
import { useEffect } from 'react'; // 👈 CRITICAL: Import useEffect for memoization

// Base instance creation (outside the hook to ensure it's only done once)
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, 
    headers: { 'Content-Type': 'application/json' }
});

const useAxios = () => {

    // ⬇️ CRITICAL FIX: Use useEffect to add the interceptor only ONCE
    useEffect(() => {
        
        // Check if the interceptor has already been added to prevent duplication
        if (axiosInstance.interceptors.request.handlers.length > 0) {
            return; // Exit if already configured
        }
        
        const interceptor = axiosInstance.interceptors.request.use(async (config) => {
            const auth = getAuth();
            const user = auth.currentUser; 

            // Only run logic for authenticated users on secured routes
            if (user) {
                try {
                    const token = await user.getIdToken(true); 
                    // ⬇️ Attach token to the Authorization header
                    config.headers.Authorization = `Bearer ${token}`;
                } catch (error) {
                    console.error("Failed to get Firebase token for Axios:", error);
                    // On failure, remove Authorization header to avoid infinite loop
                    delete config.headers.Authorization; 
                }
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });

        // Optional Cleanup function (removes the interceptor when component unmounts)
        return () => {
             axiosInstance.interceptors.request.eject(interceptor);
        };

    }, []); // Empty dependency array ensures this runs only once

    return axiosInstance;
};

export default useAxios;