import { useEffect, useState } from "react";
import { MapPin, Sparkles } from "lucide-react";
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
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50 flex flex-col">
            <Navbar />

            {/* Main Content */}
            <div className="flex-grow">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="w-8 h-8 text-primary-500" />
                        <span className="text-primary-600 font-semibold text-lg">Find Your Community</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                        Discover Nearby
                        <span className="block bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                            Cleanup Events
                        </span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Join local cleanup initiatives in your area. Together, we can make our communities cleaner and greener.
                    </p>
                </div>

                {/* Location Info */}
                {location && (
                    <div className="bg-white rounded-xl shadow-md p-4 mb-12 flex items-center gap-2 max-w-md mx-auto">
                        <MapPin className="w-5 h-5 text-primary-500" />
                        <p className="text-gray-700">
                            <span className="font-semibold">Showing events within 5 km</span> of your location
                        </p>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                            <div className="w-16 h-16 border-4 border-primary-500 rounded-full border-t-transparent animate-spin absolute inset-0"></div>
                        </div>
                        <p className="text-gray-600 mt-6 text-lg font-medium">Loading events near you...</p>
                    </div>
                )}

                {/* Events Grid */}
                {!loading && (
                    <>
                        {events.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {events.map((event) => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <div className="text-6xl mb-4">🌱</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    No events yet!
                                </h3>
                                <p className="text-gray-600 mb-8">
                                    No cleanup events found in your area. Check back soon or create one!
                                </p>
                                <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-lg hover:shadow-glow font-semibold transition-all duration-300">
                                    Create First Event
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
