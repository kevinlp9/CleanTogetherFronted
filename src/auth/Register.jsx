import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Loader, Leaf, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        try {
            await api.post("/auth/register", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });
            setSuccess(true);
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <div className="flex-grow w-full px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                    <div className="w-full max-w-md">
                        {/* Success Message */}
                        {success && (
                            <div className="mb-8 p-8 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 rounded-2xl text-center animate-pulse shadow-lg">
                                <div className="flex justify-center mb-4">
                                    <CheckCircle className="w-16 h-16 text-green-600 animate-bounce" />
                                </div>
                                <h3 className="text-2xl font-black text-green-900 mb-2">🎉 Account Created!</h3>
                                <p className="text-green-700 font-semibold">
                                    Redirecting to login...
                                </p>
                            </div>
                        )}

                        {/* Card */}
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-accent-200 hover:shadow-3xl transition-all animate-fade-in backdrop-blur-lg bg-opacity-95">
                            {/* Decorative Header */}
                            <div className="h-40 bg-gradient-to-br from-accent-500 via-blue-500 to-purple-500 relative overflow-hidden">
                                <div className="absolute inset-0 opacity-10">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
                                </div>
                                <div className="relative h-full flex items-center justify-center">
                                    <div className="text-6xl animate-bounce">🌍</div>
                                </div>
                            </div>

                            {/* Form Container */}
                            <div className="p-10">
                                {/* Header */}
                                <div className="text-center mb-10">
                                    <h1 className="text-4xl font-black text-gray-900 mb-3">
                                        Join Us Today 🌱
                                    </h1>
                                    <p className="text-gray-600 text-lg font-medium">
                                        Create an account to start making a <span className="text-accent-600 font-black">real difference</span>
                                    </p>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="mb-8 p-4 bg-red-50 border-2 border-red-300 rounded-xl flex items-start gap-3 animate-fade-in">
                                        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-red-700 font-semibold">{error}</p>
                                    </div>
                                )}

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Full Name Field */}
                                    <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                                        <label className="block text-sm font-bold text-gray-800 mb-3">
                                            👤 Full Name
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full pl-14 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent-500 focus:ring-2 focus:ring-accent-200 transition-all text-lg"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Email Field */}
                                    <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                                        <label className="block text-sm font-bold text-gray-800 mb-3">
                                            📧 Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="you@example.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full pl-14 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent-500 focus:ring-2 focus:ring-accent-200 transition-all text-lg"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Password Field */}
                                    <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                                        <label className="block text-sm font-bold text-gray-800 mb-3">
                                            🔐 Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                placeholder="••••••••"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="w-full pl-14 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-accent-500 focus:ring-2 focus:ring-accent-200 transition-all text-lg"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Confirm Password Field */}
                                    <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
                                        <label className="block text-sm font-bold text-gray-800 mb-3">
                                            ✓ Confirm Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type={showConfirm ? "text" : "password"}
                                                name="confirmPassword"
                                                placeholder="••••••••"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className="w-full pl-14 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-accent-500 focus:ring-2 focus:ring-accent-200 transition-all text-lg"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirm(!showConfirm)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Terms */}
                                    <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer hover:text-gray-800 transition-colors animate-fade-in" style={{ animationDelay: '500ms' }}>
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 rounded border-2 border-gray-300 cursor-pointer mt-0.5"
                                            required
                                        />
                                        <span className="font-medium">
                                            I agree to the{' '}
                                            <a href="#" className="text-accent-600 hover:text-accent-700 font-bold">
                                                Terms of Service
                                            </a>
                                            {' '}and{' '}
                                            <a href="#" className="text-accent-600 hover:text-accent-700 font-bold">
                                                Privacy Policy
                                            </a>
                                        </span>
                                    </label>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-accent-500 to-accent-600 text-white font-black py-3 rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg animate-fade-in shadow-lg"
                                        style={{ animationDelay: '600ms' }}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader className="w-5 h-5 animate-spin" />
                                                Creating Account...
                                            </>
                                        ) : (
                                            "Create Account"
                                        )}
                                    </button>
                                </form>

                                {/* Divider */}
                                <div className="my-8 flex items-center animate-fade-in" style={{ animationDelay: '700ms' }}>
                                    <div className="flex-1 border-t-2 border-gray-200"></div>
                                    <span className="px-4 text-sm text-gray-500 font-medium">Already have an account?</span>
                                    <div className="flex-1 border-t-2 border-gray-200"></div>
                                </div>

                                {/* Sign In Link */}
                                <Link
                                    to="/login"
                                    className="w-full block text-center py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:border-accent-500 hover:text-accent-600 hover:bg-accent-50 transition-all duration-300 animate-fade-in text-lg"
                                    style={{ animationDelay: '800ms' }}
                                >
                                    Sign In
                                </Link>
                            </div>
                        </div>

                        {/* Footer Note */}
                        <p className="text-center text-gray-600 text-sm mt-8 animate-fade-in font-medium" style={{ animationDelay: '900ms' }}>
                            🌱 Join our community of environmental advocates today
                        </p>
                    </div>
                </div>
            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                    opacity: 0;
                }
                html {
                    scroll-behavior: smooth;
                }
            `}</style>
        </div>
    );
}
