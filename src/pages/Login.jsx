import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';

const Login = () => {
    const { loginUser, googleLogin, loading } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    // Determine where to redirect after successful login
    const from = location.state?.from?.pathname || "/";

    const handleLogin = (e) => {
        e.preventDefault();
        setLoginError('');
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        loginUser(email, password)
            .then(() => {
                toast.success('Login Successful! Welcome back.');
                navigate(from, { replace: true });
            })
            .catch(error => {
                const errorMessage = error.message.includes('auth/invalid-credential') 
                    ? 'Invalid email or password. Please check your credentials.' 
                    : 'Login failed. Please try again.';
                setLoginError(errorMessage);
                toast.error(errorMessage);
            });
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {
                toast.success('Google Login Successful!');
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error("Google Login Error:", error);
                toast.error('Google login failed. Please try again.');
            });
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-base-200 p-4">
            <div className="card w-full max-w-lg shadow-2xl bg-base-100">
                <form onSubmit={handleLogin} className="card-body">
                    <h2 className="text-3xl font-bold text-center text-habit-primary mb-6">Login to Habit Builder</h2>
                    
                    {/* Input Fields */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Email</span></label>
                        <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Password</span></label>
                        <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                    </div>
                    
                    {/* Error Display */}
                    {loginError && <p className="text-error text-center mt-3">{loginError}</p>}

                    {/* Submit Button (Consistent btn-primary style) */}
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary text-white">Login</button>
                    </div>
                    
                    {/* Divider and Google Login */}
                    <div className="divider">OR</div>
                    <div className="form-control">
                        <button type="button" onClick={handleGoogleLogin} className="btn btn-outline btn-info">
                            <FaGoogle className="mr-2" /> Login with Google
                        </button>
                    </div>
                    
                    {/* Link to Register Page */}
                    <p className="text-center mt-4 text-sm">
                        Don't have an account? <Link to="/signup" className="text-habit-primary font-bold link link-hover">Register Now</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;