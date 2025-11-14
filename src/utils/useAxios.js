import axios from "axios";

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
 */
const useAxios = () => {
    return axiosInstance;
};

export default useAxios;