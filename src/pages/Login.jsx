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

        <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-base-200 p-6">

            <div className="card w-full max-w-lg shadow-2xl bg-base-100 rounded-2xl py-10 px-8">



                <form onSubmit={handleLogin} className="card-body px-2">



                    {/* Title */}

                    <h2

                        className="text-3xl font-extrabold text-center tracking-wide mb-12"

                        style={{ color: "#1A56DB" }}

                    >

                        Login to Habit Tracker

                    </h2>



                    {/* Email */}

                    <div className="form-control mb-10">



                        {/* Label in separate div */}

                        <div className="mb-3">

                            <label className="label">

                                <span className="label-text font-semibold text-base">

                                    Email

                                </span>

                            </label>

                        </div>



                        {/* Input in separate div */}

                        <div>

                            <input

                                type="email"

                                name="email"

                                placeholder="Enter your email"

                                className="input input-bordered h-14 rounded-md text-base"

                                required

                            />

                        </div>

                    </div>



                    {/* Password */}

                    <div className="form-control mb-10">



                        <div className="mb-3">

                            <label className="label">

                                <span className="label-text font-semibold text-base">

                                    Password

                                </span>

                            </label>

                        </div>



                        <div>

                            <input

                                type="password"

                                name="password"

                                placeholder="Enter your password"

                                className="input input-bordered h-14 rounded-md text-base"

                                required

                            />

                        </div>

                    </div>



                    {/* Error Message */}

                    {loginError && (

                        <p className="text-error text-center mb-4 font-medium">{loginError}</p>

                    )}



                    {/* Login Button */}

                    <div className="form-control mt-2 mb-10">

                        <button

                            type="submit"

                            className="rounded-md font-bold text-white w-full text-lg"

                            style={{

                                backgroundColor: "#1A56DB",

                                height: "3.5rem",

                                padding: "0.75rem 0",

                                fontSize: "1.2rem"

                            }}

                        >

                            Login

                        </button>

                    </div>



                    {/* Divider */}

                    <div className="divider my-8">OR</div>



                    {/* Google Login */}

                    <div className="form-control mb-6">

                        <button

                            type="button"

                            onClick={handleGoogleLogin}

                            className="btn btn-outline h-14 rounded-md flex items-center justify-center gap-3 border-[#1A56DB] text-[#1A56DB] text-lg"

                        >

                            <FaGoogle className="text-xl" /> Login with Google

                        </button>

                    </div>



                    {/* Signup Link */}

                    <p className="text-center mt-4 text-sm">

                        Don't have an account?{" "}

                        <Link

                            to="/signup"

                            className="font-bold"

                            style={{ color: "#1A56DB" }}

                        >

                            Register Now

                        </Link>

                    </p>

                </form>

            </div>

        </div>

    );

};



export default Login;