import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';

const Register = () => {
    const { registerUser, updateUserProfile, googleLogin } = useContext(AuthContext);
    const [registerError, setRegisterError] = useState('');
    const navigate = useNavigate();

    const validatePassword = (password) => {
        if (password.length < 6) {
            return "Password length must be at least 6 characters.";
        }
        if (!/[A-Z]/.test(password)) {
            return "Password must have at least one Uppercase letter.";
        }
        if (!/[a-z]/.test(password)) {
            return "Password must have at least one Lowercase letter.";
        }
        return ''; // No error
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setRegisterError('');
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;

        const passwordValidationMessage = validatePassword(password);
        if (passwordValidationMessage) {
            setRegisterError(passwordValidationMessage);
            toast.error(passwordValidationMessage);
            return;
        }

        // 1. Create User
        registerUser(email, password)
            .then(result => {
                // 2. Update Profile (Name and PhotoURL)
                updateUserProfile(name, photoURL)
                    .then(() => {
                        toast.success('Registration Successful! Redirecting to Home.');
                        form.reset();
                        navigate('/'); 
                    })
                    .catch(error => {
                        console.error("Profile Update Error:", error);
                        toast.error('Registration successful but profile update failed.');
                    });
            })
            .catch(error => {
                const errorMessage = error.message.includes('email-already-in-use') 
                    ? 'This email is already in use.' 
                    : 'Registration failed. Please try again.';
                setRegisterError(errorMessage);
                toast.error(errorMessage);
            });
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {
                toast.success('Google Registration Successful!');
                navigate('/');
            })
            .catch(error => {
                console.error("Google Login Error:", error);
                toast.error('Google registration failed.');
            });
    };

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-base-200 p-4">
            <div className="card w-full max-w-lg shadow-2xl bg-base-100">
                <form onSubmit={handleRegister} className="card-body">
                    <h2 className="text-3xl font-bold text-center text-habit-primary mb-6">Create Your Account</h2>
                    
                    {/* Input Fields */}
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Name</span></label>
                        <input type="text" placeholder="Your Name" name="name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Email</span></label>
                        <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Photo URL (Optional)</span></label>
                        <input type="url" placeholder="Paste image link here" name="photoURL" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Password</span></label>
                        <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                        <p className="text-xs text-gray-500 mt-1">Min 6 chars, Must include Uppercase and Lowercase.</p>
                    </div>
                    
                    {/* Error Display */}
                    {registerError && <p className="text-error text-center mt-3">{registerError}</p>}

                    {/* Submit Button */}
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary text-white">Register</button>
                    </div>
                    
                    {/* Divider and Google Login */}
                    <div className="divider">OR</div>
                    <div className="form-control">
                        <button type="button" onClick={handleGoogleLogin} className="btn btn-outline btn-info">
                            <FaGoogle className="mr-2" /> Register with Google
                        </button>
                    </div>
                    
                    {/* Link to Login Page */}
                    <p className="text-center mt-4 text-sm">
                        Already have an account? <Link to="/login" className="text-habit-primary font-bold link link-hover">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;