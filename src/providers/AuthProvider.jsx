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
import auth from '../utils/firebase.config'; 

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true); 
    
    // 1. Register User (Email/Password)
    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            // ⬇️ FIX: Ensure loading state is turned off in all outcomes
            .finally(() => setLoading(false)); 
    };

    // 2. Login User (Email/Password)
    const loginUser = (email, password) => {
        setLoading(true); // <-- Sets loading to TRUE
        return signInWithEmailAndPassword(auth, email, password)
            // ⬇️ FIX: If promise chain ends (fails), explicitly set loading back to FALSE.
            .finally(() => setLoading(false)); 
    };
    
    // 3. Google Sign-in
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
            // ⬇️ FIX: If promise chain ends (fails), explicitly set loading back to FALSE.
            .finally(() => setLoading(false));
    };

    // 4. Log Out (Keep default behavior)
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };
    
    const updateUserProfile = (name, photoUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name, 
            photoURL: photoUrl
        });
    };

    // --- State Observer (Crucial for persistence) ---
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            // NOTE: Initial state check should still set loading to FALSE here
            setLoading(false); 
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const authInfo = {
        user,
        loading,
        registerUser,
        loginUser,
        googleLogin,
        logOut,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;