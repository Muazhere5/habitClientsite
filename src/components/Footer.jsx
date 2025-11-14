import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className="
            mt-auto 
            pt-14 
            pb-12
            relative 
            overflow-hidden
            text-white
            bg-[#0D1B45] 
        ">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#10235A] via-[#0D1B45] to-[#0A1636] opacity-95 pointer-events-none"></div>

            <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

                {/* Brand Section */}
                <aside className="space-y-3">
                    <span className="text-3xl font-extrabold tracking-wide drop-shadow-sm text-[#1A56DB]">
                        🔥 Habit Tracker
                    </span>

                    <p className="text-gray-300 leading-relaxed">
                        Habit Tracker Ltd.<br />
                        Building consistency, one day at a time.
                    </p>

                    <p className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} All rights reserved.
                    </p>
                </aside>

                {/* Contact Section */}
                <nav className="space-y-5">
                    <h6 className="text-xl font-semibold relative text-white">
                        Contact & Legal
                        <div className="h-1 w-12 bg-[#1A56DB] rounded mt-1"></div>
                    </h6>

                    <ul className="space-y-3">
                        <li>
                            <a className="link link-hover text-gray-300 hover:text-[#1A56DB] transition-colors duration-300">
                                Email: support@habittracker.com
                            </a>
                        </li>
                        <li>
                            <a className="link link-hover text-gray-300 hover:text-[#1A56DB] transition-colors duration-300">
                                Terms & Conditions
                            </a>
                        </li>
                        <li>
                            <a className="link link-hover text-gray-300 hover:text-[#1A56DB] transition-colors duration-300">
                                Privacy Policy
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Social Section */}
                <nav className="space-y-5">
                    <h6 className="text-xl font-semibold relative text-white">
                        Social
                        <div className="h-1 w-12 bg-[#1A56DB] rounded mt-1"></div>
                    </h6>

                    <div className="flex items-center gap-6">
                        <a 
                            href="https://twitter.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-3 rounded-full bg-[#11275E] shadow hover:shadow-lg border border-transparent hover:border-[#1A56DB] transition-all duration-300"
                        >
                            <FaXTwitter className="text-xl text-gray-300 hover:text-[#1A56DB]" />
                        </a>

                        <a 
                            href="https://linkedin.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-3 rounded-full bg-[#11275E] shadow hover:shadow-lg border border-transparent hover:border-[#1A56DB] transition-all duration-300"
                        >
                            <FaLinkedinIn className="text-xl text-gray-300 hover:text-[#1A56DB]" />
                        </a>

                        <a 
                            href="https://facebook.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-3 rounded-full bg-[#11275E] shadow hover:shadow-lg border border-transparent hover:border-[#1A56DB] transition-all duration-300"
                        >
                            <FaFacebookF className="text-xl text-gray-300 hover:text-[#1A56DB]" />
                        </a>

                        <a 
                            href="https://instagram.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-3 rounded-full bg-[#11275E] shadow hover:shadow-lg border border-transparent hover:border-[#1A56DB] transition-all duration-300"
                        >
                            <FaInstagram className="text-xl text-gray-300 hover:text-[#1A56DB]" />
                        </a>
                    </div>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
