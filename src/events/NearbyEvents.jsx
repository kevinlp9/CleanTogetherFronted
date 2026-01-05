import { useEffect, useState } from "react";
import { MapPin, Sparkles, Plus, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";

export default function NearbyEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;
                setLocation({ latitude, longitude });
                try {
                    const res = await api.get(
                        `/events/nearby?lat=${latitude}&lng=${longitude}&radiusKm=5`
                    );
                    console.log("Events loaded:", res.data);
                    setEvents(res.data || []);
                } catch (error) {
                    console.error("Failed to fetch events:", error);
                } finally {
                    setLoading(false);
                }
            },
            (error) => {
                console.error("Geolocation error:", error);
                setLoading(false);
            }
        );
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Background with gradient and pattern */}
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
                <div className="flex-grow w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
                    {/* Hero Section */}
                    <section className="w-full max-w-7xl py-16 md:py-24">
                        {/* Badge */}
                        <div className="flex justify-center mb-8">
                            <div className="inline-flex items-center gap-2 bg-white bg-opacity-60 backdrop-blur-md text-primary-600 px-6 py-2 rounded-full font-semibold border border-primary-200 shadow-lg hover:shadow-xl transition-all">
                                <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '3s' }} />
                                Discover Your Community
                            </div>
                        </div>

                        {/* Main Title */}
                        <div className="text-center mb-12">
                            <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
                                Cleanup Events
                                <span className="block bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 bg-clip-text text-transparent">
                                    Near You
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
                                Join thousands of volunteers making a real difference. Discover cleanup events in your area and be part of the movement! 🌱
                            </p>

                            {/* CTA Button */}
                            <Link
                                to="/events/create"
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-10 py-4 rounded-xl hover:shadow-2xl hover:-translate-y-1 font-bold text-lg transition-all duration-300 shadow-lg group"
                            >
                                <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                                Create New Event
                            </Link>
                        </div>

                        {/* Stats Bar */}
                        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-in">
                            {/* Events Available */}
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg border-2 border-blue-300 hover:shadow-xl transition-all hover:-translate-y-1">
                                <div className="text-center space-y-3">
                                    <div className="text-5xl">📅</div>
                                    <p className="text-4xl md:text-5xl font-black text-blue-600">
                                        {events.length}
                                    </p>
                                    <p className="text-blue-900 font-bold text-lg">Events Available</p>
                                </div>
                            </div>

                            {/* Location Found */}
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-lg border-2 border-green-300 hover:shadow-xl transition-all hover:-translate-y-1">
                                <div className="text-center space-y-3">
                                    <div className="text-5xl animate-bounce">{location ? "✅" : "🔄"}</div>
                                    <p className="text-4xl md:text-5xl font-black text-green-600">
                                        {location ? "1" : "0"}
                                    </p>
                                    <p className="text-green-900 font-bold text-lg">
                                        {location ? "Location Found" : "Finding..."}
                                    </p>
                                </div>
                            </div>

                            {/* Search Radius */}
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 shadow-lg border-2 border-purple-300 hover:shadow-xl transition-all hover:-translate-y-1">
                                <div className="text-center space-y-3">
                                    <div className="text-5xl">🎯</div>
                                    <p className="text-4xl md:text-5xl font-black text-purple-600">
                                        5km
                                    </p>
                                    <p className="text-purple-900 font-bold text-lg">Search Radius</p>
                                </div>
                            </div>
                        </div>

                        {/* Location Info Card */}
                        {location && (
                            <div className="w-full max-w-2xl mb-16 animate-fade-in">
                                <div className="bg-gradient-to-r from-primary-100 to-blue-100 rounded-2xl shadow-lg p-8 flex items-center gap-6 border-2 border-primary-300 hover:shadow-xl transition-all space-y-4">
                                    <div className="p-4 bg-white rounded-xl shadow-md">
                                        <MapPin className="w-8 h-8 text-primary-600 animate-bounce" />
                                    </div>
                                    <div className="flex-grow space-y-2">
                                        <p className="text-gray-900 font-black text-lg">
                                            📍 Showing events within <span className="text-primary-600 text-xl">5 km</span>
                                        </p>
                                        <p className="text-gray-700 font-semibold">
                                            Lat: {location.latitude.toFixed(4)} | Lng: {location.longitude.toFixed(4)}
                                        </p>
                                    </div>
                                    <div className="text-4xl animate-pulse">🌍</div>
                                </div>
                            </div>
                        )}

                        {/* Loading State */}
                        {loading && (
                            <div className="flex flex-col items-center justify-center py-32">
                                <div className="relative mb-8">
                                    <div className="w-20 h-20 border-4 border-gray-200 rounded-full"></div>
                                    <div className="w-20 h-20 border-4 border-primary-500 rounded-full border-t-transparent animate-spin absolute inset-0"></div>
                                </div>
                                <p className="text-2xl text-gray-700 font-bold mb-2">Loading events near you...</p>
                                <p className="text-gray-600">This might take a few seconds</p>
                            </div>
                        )}

                        {/* Events Grid */}
                        {!loading && (
                            <>
                                {events.length > 0 ? (
                                    <div className="w-full space-y-12">
                                        <div className="flex items-center gap-4 justify-center animate-fade-in">
                                            <Zap className="w-8 h-8 text-primary-600 animate-pulse" />
                                            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
                                                Available Events
                                            </h2>
                                            <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2 rounded-full font-black text-xl shadow-lg">
                                                {events.length}
                                            </div>
                                        </div>
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
                                    </div>
                                ) : (
                                    <div className="w-full bg-gradient-to-br from-white to-green-50 rounded-3xl shadow-xl p-16 text-center border-2 border-green-300 hover:shadow-2xl transition-all space-y-6">
                                        <div className="text-8xl animate-bounce">🌱</div>
                                        <h3 className="text-5xl font-black text-gray-900">
                                            No Events Yet!
                                        </h3>
                                        <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
                                            Be the first to create a cleanup event in your area and inspire others to join the movement! 🚀
                                        </p>
                                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                            ✨ Every event starts with one person taking action. You can be that person!
                                        </p>
                                        <div className="pt-4">
                                            <Link
                                                to="/events/create"
                                                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-12 py-5 rounded-xl hover:shadow-2xl hover:-translate-y-1 font-black text-lg transition-all duration-300 shadow-lg"
                                            >
                                                <Plus className="w-7 h-7" />
                                                Create First Event
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </section>
                </div>

                {/* Footer */}
                <Footer />
            </div>

            {/* Global CSS Animations */}
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

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }

                /* Glassmorphism effect */
                .backdrop-blur-md {
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                }

                /* Smooth scroll behavior */
                html {
                    scroll-behavior: smooth;
                }

                /* Custom scrollbar */
                ::-webkit-scrollbar {
                    width: 10px;
                }

                ::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.05);
                }

                ::-webkit-scrollbar-thumb {
                    background: rgba(34, 197, 94, 0.5);
                    border-radius: 5px;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: rgba(34, 197, 94, 0.8);
                }
            `}</style>
        </div>
    );
}
