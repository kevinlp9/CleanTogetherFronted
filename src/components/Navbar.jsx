import { Link, useLocation } from 'react-router-dom';
import { Leaf, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const isAuthenticated = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    const isActive = (path) => location.pathname === path ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600';

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
                        <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
                            <Leaf className="w-6 h-6 text-white" />
                        </div>
                        <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                            Clean Together
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className={`transition-all duration-300 font-medium ${isActive('/')}`}>
                            Home
                        </Link>
                        {isAuthenticated && (
                            <Link to="/events" className={`transition-all duration-300 font-medium ${isActive('/events')}`}>
                                Events
                            </Link>
                        )}
                        {!isAuthenticated ? (
                            <>
                                <Link to="/login" className={`transition-all duration-300 font-medium ${isActive('/login')}`}>
                                    Login
                                </Link>
                                <Link to="/register" className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2 rounded-lg hover:shadow-glow transition-all duration-300 font-medium">
                                    Register
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-all duration-300"
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6 text-gray-600" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-600" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden pb-4 space-y-3">
                        <Link to="/" className="block py-2 text-gray-600 hover:text-primary-600 font-medium">
                            Home
                        </Link>
                        {isAuthenticated && (
                            <Link to="/events" className="block py-2 text-gray-600 hover:text-primary-600 font-medium">
                                Events
                            </Link>
                        )}
                        {!isAuthenticated ? (
                            <>
                                <Link to="/login" className="block py-2 text-gray-600 hover:text-primary-600 font-medium">
                                    Login
                                </Link>
                                <Link to="/register" className="block w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2 rounded-lg text-center font-medium">
                                    Register
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-primary-600 font-medium py-2"
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}

