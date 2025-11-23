// src/utils/useAxios.js
import axios from "axios";
import { useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider"; // 👈 use context user

// Single Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const useAxios = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    
    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        if (!user) {
          console.log("🔒 No user from AuthContext: sending request WITHOUT Authorization header");
          return config;
        }

        try {
          
          const token = await user.getIdToken(true);

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log("✅ Attached Firebase token from AuthContext user");
          } else {
            console.warn("⚠️ Could not get Firebase token from user");
          }
        } catch (error) {
          console.error("❌ Failed to get Firebase token for Axios:", error);
          delete config.headers.Authorization;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    
    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
    };
  }, [user]); 

  return axiosInstance;
};

export default useAxios;
