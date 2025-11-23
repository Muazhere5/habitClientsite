import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import toast from 'react-hot-toast';

import DefaultAvatar from '../assets/habit6.png';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    
    const navLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/browse">Browse Public Habits</NavLink></li>
            <li><NavLink to="/add-habit">Add Habit</NavLink></li>
            <li><NavLink to="/my-habits">My Habits</NavLink></li>
        </>
    );

    const handleLogOut = () => {
        logOut()
            .then(() => toast.success('Successfully logged out!'))
            .catch(error => {
                console.error("Logout Error:", error);
                toast.error('Logout failed.');
            });
    };

    return (
        <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50 border-b border-gray-100">
            <div className="navbar-start">
                
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>

                
                <Link to="/" className="btn btn-ghost text-2xl font-extrabold text-habit-primary">
                    🔥 Habit Tracker
                </Link>
            </div>

           
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-semibold">
                    {navLinks}
                </ul>
            </div>

            
            <div className="navbar-end">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img 
                                    alt={user.displayName || "User Avatar"} 
                                    src={user.photoURL || DefaultAvatar} 
                                />
                            </div>
                        </div>

                        
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-2xl rounded-box w-56"
                            style={{ backgroundColor: '#1A56DB', color: 'white' }}
                        >
                            
                            <li className="font-semibold text-sm px-2 py-1 pointer-events-none">
                                {user.displayName || 'User'}
                            </li>

                            
                            <li className="text-xs px-2 py-1 pointer-events-none opacity-80">
                                {user.email}
                            </li>

                            <div className="divider my-2 border-opacity-30"></div>

                            
                            <li>
                                <button 
                                    onClick={handleLogOut}
                                    className="btn btn-sm w-full text-white font-semibold"
                                    style={{
                                        backgroundColor: '#1A56DB',
                                        border: '2px solid black'   
                                    }}
                                >
                                    Log out
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-sm btn-ghost hover:bg-base-200">Login</Link>
                        <Link to="/signup" className="btn btn-sm btn-primary text-white ml-2">Signup</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
