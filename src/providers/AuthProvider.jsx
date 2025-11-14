import { createContext, useState, useEffect } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup, 
    onAuthStateChanged, 
    signOut,
    updateProfile 
} from 'firebase/auth';
// Correct import path based on the final flat structure: providers -> utils
import auth from '../utils/firebase.config'; 

// 1. Create Context - This is what components will consume
export const AuthContext = createContext(null);

// Define Google provider instance
const googleProvider = new GoogleAuthProvider();

// 2. Auth Provider Component
const AuthProvider = ({ children }) => {
    // State to hold the current logged-in user object
    const [user, setUser] = useState(null); 
    // State to handle initial loading (checking local storage for auth state)
    const [loading, setLoading] = useState(true); 
    
    // --- Authentication Methods ---
    
    // 1. Register User (Email/Password)
    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // 2. Login User (Email/Password)
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    
    // 3. Google Sign-in
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // 4. Log Out
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };
    
    // 5. Update Profile (Name and photoURL) - Used during Registration
    const updateUserProfile = (name, photoUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name, 
            photoURL: photoUrl
        });
    };

    // --- State Observer (Crucial for persistence) ---
    // Runs once on mount to check for an existing session and updates state on login/logout.
    useEffect(() => {
        // onAuthStateChanged is the Firebase observer
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            // This runs whenever the user's login state changes
            setUser(currentUser);
            setLoading(false); // Once state is checked, stop loading
            
            // ⬇️ Backend Security Note (Optional): This is where you would call 
            //    currentUser.getIdToken() and store the JWT in state or local storage 
            //    to send to your Express server for protected routes verification.

        });

        // Cleanup subscription on component unmount to prevent memory leaks
        return () => {
            unsubscribe();
        };
    }, []);

    // 3. Context Value (The data accessible via useContext(AuthContext))
    const authInfo = {
        user,
        loading,
        registerUser,
        loginUser,
        googleLogin,
        logOut,
        updateUserProfile
    };

    // 4. Provider Component
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;