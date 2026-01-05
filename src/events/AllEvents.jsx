import { useEffect, useState } from "react";
import { Zap, AlertCircle, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";

export default function AllEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Validar si el usuario está autenticado
        const token = localStorage.getItem("token");
        if (!token) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
        }

        setIsAuthenticated(true);
        fetchAllEvents();
    }, []);

    const fetchAllEvents = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await api.get("/events");
            console.log("All events loaded:", res.data);
            setEvents(res.data || []);
        } catch (err) {
            console.error("Error fetching events:", err);
            setError(err.response?.data?.message || "Error al cargar los eventos");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-green-50"></div>
                {/* Animated background circles */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                {/* Main Content */}
                <div className="flex-grow w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center py-24 md:py-32">
                    <div className="w-full max-w-7xl">
                        {/* Not Authenticated Message */}
                        {!isAuthenticated && !loading && (
                            <div className="w-full bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-xl p-20 text-center border-2 border-amber-300 hover:shadow-2xl transition-all space-y-8">
                                <div className="text-8xl animate-bounce">🔒</div>
                                <h2 className="text-5xl font-black text-gray-900">
                                    ¡Inicia Sesión Primero!
                                </h2>
                                <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
                                    Debes iniciar sesión para ver todos los eventos disponibles en nuestra plataforma. 🚀
                                </p>
                                <div className="flex flex-col sm:flex-row gap-5 justify-center pt-6">
                                    <Link
                                        to="/login"
                                        className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-10 py-4 rounded-xl hover:shadow-2xl font-bold text-lg transition-all duration-300 shadow-lg"
                                    >
                                        <LogIn className="w-6 h-6" />
                                        Iniciar Sesión
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="inline-flex items-center justify-center gap-3 border-2 border-amber-500 text-amber-600 px-10 py-4 rounded-xl hover:bg-amber-50 font-bold text-lg transition-all duration-300"
                                    >
                                        Crear Cuenta
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Header Section - Only show if authenticated */}
                        {isAuthenticated && (
                            <div className="text-center mb-20">
                                <div className="flex items-center gap-3 justify-center mb-8">
                                    <Zap className="w-8 h-8 text-primary-600 animate-pulse" />
                                    <h1 className="text-5xl md:text-6xl font-black text-gray-900">
                                        Todos los Eventos Disponibles
                                    </h1>
                                    <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2 rounded-full font-black text-xl shadow-lg">
                                        {events.length}
                                    </div>
                                </div>
                                <p className="text-xl text-gray-700 mx-auto leading-relaxed text-center w-full">
                                    Explora todos los eventos de limpieza disponibles en nuestra plataforma y únete a cualquiera que te interese. 🌱
                                </p>
                            </div>
                        )}

                        {/* Loading State */}
                        {isAuthenticated && loading && (
                            <div className="flex flex-col items-center justify-center py-32">
                                <div className="relative mb-8">
                                    <div className="w-20 h-20 border-4 border-gray-200 rounded-full"></div>
                                    <div className="w-20 h-20 border-4 border-primary-500 rounded-full border-t-transparent animate-spin absolute inset-0"></div>
                                </div>
                                <p className="text-2xl text-gray-700 font-bold mb-2">Cargando todos los eventos...</p>
                                <p className="text-gray-600">Por favor espera</p>
                            </div>
                        )}

                        {/* Error State */}
                        {isAuthenticated && error && !loading && (
                            <div className="w-full bg-red-50 border-2 border-red-300 rounded-2xl p-12 text-center">
                                <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
                                <p className="text-red-700 font-bold text-xl mb-4">{error}</p>
                                <button
                                    onClick={fetchAllEvents}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                                >
                                    Intentar de Nuevo
                                </button>
                            </div>
                        )}

                        {/* Events Grid */}
                        {isAuthenticated && !loading && !error && (
                            <>
                                {events.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {events.map((event, index) => (
                                            <div
                                                key={event.id}
                                                className="animate-fade-in"
                                                style={{ animationDelay: `${index * 100}ms` }}
                                            >
                                                <EventCard event={event} />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="w-full bg-gradient-to-br from-white to-green-50 rounded-3xl shadow-xl p-20 text-center border-2 border-green-300 hover:shadow-2xl transition-all space-y-8">
                                        <div className="text-8xl animate-bounce">🌱</div>
                                        <h3 className="text-5xl font-black text-gray-900">
                                            ¡No Hay Eventos Disponibles!
                                        </h3>
                                        <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
                                            Aún no hay eventos en la plataforma. ¡Sé el primero en crear uno! 🚀
                                        </p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <Footer />
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

