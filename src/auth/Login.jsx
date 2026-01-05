import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Loader, AlertCircle, Eye, EyeOff } from "lucide-react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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
        <div className="min-h-screen bg-white">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-green-50"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <div className="flex-grow w-full px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                    <div className="w-full max-w-md">
                        {/* Card */}
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-primary-200 hover:shadow-3xl transition-all animate-fade-in backdrop-blur-lg bg-opacity-95">
                            {/* Decorative Header */}
                            <div className="h-40 bg-gradient-to-br from-primary-500 via-blue-500 to-purple-500 relative overflow-hidden">
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
                                        Bienvenido de Nuevo 👋
                                    </h1>
                                    <p className="text-gray-600 text-lg font-medium">
                                        Inicia sesión para continuar en <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent font-black">Clean Together</span>
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
                                    {/* Email Field */}
                                    <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                                        <label className="block text-sm font-bold text-gray-800 mb-3">
                                            📧 Correo Electrónico
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                placeholder="tu@ejemplo.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full pl-14 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all text-lg"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Password Field */}
                                    <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                                        <label className="block text-sm font-bold text-gray-800 mb-3">
                                            🔐 Contraseña
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full pl-14 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all text-lg"
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

                                    {/* Remember Me */}
                                    <div className="flex items-center justify-between animate-fade-in" style={{ animationDelay: '300ms' }}>
                                        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-800 transition-colors">
                                            <input type="checkbox" className="w-4 h-4 rounded border-2 border-gray-300 cursor-pointer" />
                                            Recuérdame
                                        </label>
                                        <a href="#" className="text-sm text-primary-600 hover:text-primary-700 font-bold">
                                            ¿Olvidaste tu contraseña?
                                        </a>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-black py-3 rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg animate-fade-in shadow-lg"
                                        style={{ animationDelay: '400ms' }}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader className="w-5 h-5 animate-spin" />
                                                Iniciando sesión...
                                            </>
                                        ) : (
                                            "Iniciar Sesión"
                                        )}
                                    </button>
                                </form>

                                {/* Divider */}
                                <div className="my-8 flex items-center animate-fade-in" style={{ animationDelay: '500ms' }}>
                                    <div className="flex-1 border-t-2 border-gray-200"></div>
                                    <span className="px-4 text-sm text-gray-500 font-medium">¿Nuevo en Clean Together?</span>
                                    <div className="flex-1 border-t-2 border-gray-200"></div>
                                </div>

                                {/* Sign Up Link */}
                                <Link
                                    to="/register"
                                    className="w-full block text-center py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300 animate-fade-in text-lg"
                                    style={{ animationDelay: '600ms' }}
                                >
                                    Crear Nueva Cuenta
                                </Link>
                            </div>
                        </div>

                        {/* Footer Note */}
                        <p className="text-center text-gray-600 text-sm mt-8 animate-fade-in font-medium" style={{ animationDelay: '700ms' }}>
                            Al iniciar sesión, aceptas nuestros{' '}
                            <a href="#" className="text-primary-600 hover:text-primary-700 font-bold">
                                Términos de Servicio
                            </a>
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
