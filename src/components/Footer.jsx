import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand Section */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-4">
                            <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg">
                                <Leaf className="w-5 h-5 text-white" />
                            </div>
                            <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                                Clean Together
                            </span>
                        </Link>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Building cleaner, greener communities one cleanup at a time. Join us in making a difference.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                                    Events
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                                    Cookie Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
                                    Code of Conduct
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Follow Us */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Follow Us</h4>
                        <div className="flex gap-4 mb-6">
                            <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-primary-500 text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300">
                                <span className="text-lg">f</span>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-primary-500 text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300">
                                <span className="text-lg">𝕏</span>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-primary-500 text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300">
                                <span className="text-lg">in</span>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-primary-500 text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300">
                                <span className="text-lg">📷</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-200 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-600 text-sm">
                            &copy; {currentYear} Clean Together. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm text-gray-600">
                            <a href="#" className="hover:text-primary-600 transition-colors">
                                Sitemap
                            </a>
                            <a href="#" className="hover:text-primary-600 transition-colors">
                                Accessibility
                            </a>
                            <a href="#" className="hover:text-primary-600 transition-colors">
                                Help Center
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

