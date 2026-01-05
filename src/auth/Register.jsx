import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Loader, Leaf, CheckCircle } from "lucide-react";
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

        // Validations
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
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
            <Navbar />

            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md">
                    {/* Success Message */}
                    {success && (
                        <div className="mb-6 p-6 bg-green-50 border border-green-200 rounded-xl text-center">
                            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                            <h3 className="text-lg font-bold text-green-900">Account Created!</h3>
                            <p className="text-green-700 text-sm mt-2">
                                Redirecting to login...
                            </p>
                        </div>
                    )}

                    {/* Card */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Decorative Header */}
                        <div className="h-32 bg-gradient-to-br from-accent-500 to-accent-600 relative overflow-hidden">
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
                                    Join Us Today
                                </h1>
                                <p className="text-gray-600">
                                    Create an account to start making a difference
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
                                {/* Full Name Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-accent-500 focus:ring-0 transition-colors"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-accent-500 focus:ring-0 transition-colors"
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
                                            name="password"
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-accent-500 focus:ring-0 transition-colors"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Confirm Password Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="••••••••"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-accent-500 focus:ring-0 transition-colors"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Terms */}
                                <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded cursor-pointer mt-0.5"
                                        required
                                    />
                                    I agree to the{' '}
                                    <a href="#" className="text-accent-600 hover:text-accent-700 font-medium">
                                        Terms of Service
                                    </a>
                                </label>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold py-3 rounded-lg hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                            <div className="my-6 flex items-center">
                                <div className="flex-1 border-t border-gray-200"></div>
                                <span className="px-4 text-sm text-gray-500">Already have an account?</span>
                                <div className="flex-1 border-t border-gray-200"></div>
                            </div>

                            {/* Sign In Link */}
                            <Link
                                to="/login"
                                className="w-full block text-center py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:border-accent-500 hover:text-accent-600 transition-all duration-300"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <p className="text-center text-gray-600 text-sm mt-6">
                        Join our community of environmental advocates
                    </p>
                </div>
            </div>
        </div>
    );
}
