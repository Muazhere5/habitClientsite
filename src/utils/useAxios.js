import axios from "axios";

// ⬇️ Backend Connection Note: VITE_API_URL is read from the .env.local file (e.g., http://localhost:5000)
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    
    // ⬇️ Backend Connection Note: This is essential if you implement JWT/token verification 
    //    and need to send HTTP cookies/credentials with your requests.
    withCredentials: true, 
    headers: {
        'Content-Type': 'application/json',
    }
});

/**
 * Custom hook to provide a pre-configured Axios instance for backend calls.
 * * You will use this hook in pages like Home.jsx, AddHabit.jsx, and MyHabits.jsx
 * to interact with your Express server's API routes.
 */
const useAxios = () => {
    // Optionally: If implementing the Firebase Admin SDK challenge, you would 
    // intercept the request here to attach the Firebase user's ID Token (JWT) 
    // to the Authorization header before sending the request.

    return axiosInstance;
};

export default useAxios;