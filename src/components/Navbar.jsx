import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Events', path: '/Events' },
        { name: 'Contact', path: '/Contact' },
        { name: 'About', path: '/About' },
    ];

    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 1);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSignout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className={`fixed top-0 left-0 bg-indigo-500 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
                <svg width="320" height="80" viewBox="0 0 320 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="40" cy="40" r="30" fill="#000000"/>
                    <text x="29" y="55" fontFamily="Arial, sans-serif" fontSize="32" fill="#ffffff" fontWeight="bold">U</text>
                    <text x="90" y="55" fontFamily="Arial, sans-serif" fontSize="32" fill="#000000" fontWeight="bold">UniConnect</text>
                </svg>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
                {navLinks.map((link, i) => (
                    <Link key={i} to={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
                        {link.name}
                        <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                    </Link>
                ))}
                <Link 
                    to="/announcements"
                    className={`bg-yellow-400 px-4 py-1.5 text-sm text-black font-medium rounded-full cursor-pointer hover:bg-yellow-500 transition-all duration-300 flex items-center gap-1.5 ${isScrolled ? 'shadow-sm' : ''}`}
                >
                    <span className="text-xs">🏆</span>
                    <span>ANNOUNCEMENTS</span>
                    <span className="animate-pulse bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full text-[10px]">NEW</span>
                </Link>
            </div>

            {/* Desktop Right - Conditional rendering based on login status */}
            <div className="hidden md:flex items-center gap-4">
                {user ? (
                    <>
                        <div className="flex items-center gap-2 text-gray-700">
                            <span className="font-medium">Hi, {user.name}</span>
                            {user.isAdmin ? (
                                <Link to="/admin" className="text-gray-900 hover:text-red-700">
                                    Admin Dashboard
                                </Link>
                            ) : (
                                <Link to="/events" className="text-orange-600 font-bold hover:text-blue-900">
                                    My Events
                                </Link>
                            )}
                        </div>
                        <button 
                            onClick={() => {
                                logout();
                                navigate('/');
                            }}
                            className="bg-black text-white px-8 py-2.5 rounded-full"
                        >
                            Sign out
                        </button>
                    </>
                ) : (
                    <>
                        <Link 
                            to="/login"
                            className="text-gray-700 hover:text-gray-900"
                        >
                            Login
                        </Link>
                        <Link 
                            to="/signup"
                            className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500"
                        >
                            Sign up
                        </Link>
                    </>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
                <svg onClick={() => setIsMenuOpen(!isMenuOpen)} className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
            </div>

            {/* Mobile Menu - Also with conditional rendering */}
            <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                {navLinks.map((link, i) => (
                    <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)}>
                        {link.name}
                    </Link>
                ))}

                <Link 
                    to="/announcements"
                    className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all"
                >
                    ANNOUNCEMENTS
                </Link>

                {user ? (
                    <>
                        <div className="flex items-center gap-2 text-gray-700">
                            <span className="font-medium">Hi, {user.name}</span>
                            {user.isAdmin && (
                                <Link to="/admin" className="text-blue-800 hover:text-blue-700">
                                    Admin Dashboard
                                </Link>
                            )}
                        </div>
                        <button 
                            onClick={handleSignout}
                            className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500"
                        >
                            Sign out
                        </button>
                    </>
                ) : (
                    <>
                        <Link 
                            to="/login"
                            className="text-gray-700 hover:text-gray-900"
                        >
                            Login
                        </Link>
                        <Link 
                            to="/signup"
                            className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500"
                        >
                            Sign up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;