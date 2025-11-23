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
    
    
    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            
            .finally(() => setLoading(false)); 
    };

    
    const loginUser = (email, password) => {
        setLoading(true); 
        return signInWithEmailAndPassword(auth, email, password)
            
            .finally(() => setLoading(false)); 
    };
    
    
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
            
            .finally(() => setLoading(false));
    };

    
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

    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
           
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