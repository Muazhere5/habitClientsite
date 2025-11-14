import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; 
// Import a logo image (optional)
// import AppLogo from '../assets/app_logo.png'; // [Image: app_logo.png]

const Footer = () => {
    return (
        <footer className="footer p-10 bg-base-200 text-base-content border-t shadow-inner mt-auto">
            <aside>
                {/* Logo and Website Name */}
                <span className="text-3xl font-bold text-habit-primary">
                    🔥 Habit Tracker
                </span>
                <p>
                    Habit Tracker Ltd.<br />Building consistency, one day at a time.
                </p>
                <p className="text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} All rights reserved.
                </p>
            </aside>
            
            {/* Contact Details */}
            <nav>
                <h6 className="footer-title text-lg font-semibold">Contact & Legal</h6> 
                <a className="link link-hover text-gray-600">Email: support@habittracker.com</a>
                <a className="link link-hover text-gray-600">Terms & Conditions</a>
                <a className="link link-hover text-gray-600">Privacy Policy</a>
            </nav> 
            
            {/* Social Media Links (Uses new X logo requirement) */}
            <nav>
                <h6 className="footer-title text-lg font-semibold">Social</h6> 
                <div className="grid grid-flow-col gap-4">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-700">
                        <FaXTwitter className="text-xl hover:text-habit-primary transition-colors" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-700">
                        <FaLinkedinIn className="text-xl hover:text-habit-primary transition-colors" />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-700">
                        <FaFacebookF className="text-xl hover:text-habit-primary transition-colors" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-700">
                        <FaInstagram className="text-xl hover:text-habit-primary transition-colors" />
                    </a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;