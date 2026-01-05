import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Loader, Leaf } from "lucide-react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await api.post("/Auth/login", {
                email,
                password,
            });
            localStorage.setItem("token", res.data.token);
            onLogin();
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
            <Navbar />

            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md">
                    {/* Card */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Decorative Header */}
                        <div className="h-32 bg-gradient-to-br from-primary-500 to-primary-600 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
                            </div>
                            <div className="relative h-full flex items-center justify-center">
                                <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                                    <Leaf className="w-8 h-8 text-white" />
                                </div>
                            </div>
                        </div>

                        {/* Form Container */}
                        <div className="p-8">
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    Welcome Back
                                </h1>
                                <p className="text-gray-600">
                                    Sign in to continue to Clean Together
                                </p>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-red-700 text-sm font-medium">{error}</p>
                                </div>
                            )}

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-0 transition-colors"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-0 transition-colors"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Remember Me */}
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 rounded cursor-pointer" />
                                        Remember me
                                    </label>
                                    <a href="#" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                                        Forgot password?
                                    </a>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold py-3 rounded-lg hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader className="w-5 h-5 animate-spin" />
                                            Signing in...
                                        </>
                                    ) : (
                                        "Sign In"
                                    )}
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="my-6 flex items-center">
                                <div className="flex-1 border-t border-gray-200"></div>
                                <span className="px-4 text-sm text-gray-500">New to Clean Together?</span>
                                <div className="flex-1 border-t border-gray-200"></div>
                            </div>

                            {/* Sign Up Link */}
                            <Link
                                to="/register"
                                className="w-full block text-center py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:border-primary-500 hover:text-primary-600 transition-all duration-300"
                            >
                                Create New Account
                            </Link>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <p className="text-center text-gray-600 text-sm mt-6">
                        By signing in, you agree to our{' '}
                        <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                            Terms of Service
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
