import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Users, Clock, Share2, Heart } from "lucide-react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const containerStyle = {
    width: "100%",
    height: "500px",
    borderRadius: "12px",
};

export default function EventDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const [joining, setJoining] = useState(false);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                console.log("Fetching event with ID:", id);
                const res = await api.get(`/events/${id}`);
                console.log("Event data received:", res.data);
                setEvent(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching event:", err);
                console.error("Error status:", err.response?.status);
                console.error("Error data:", err.response?.data);
                setError(err.response?.data?.message || "Failed to load event details");
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    const handleJoinEvent = async () => {
        setJoining(true);
        try {
            await api.post(`/events/${id}/join`);
            // Actualizar el evento
            const res = await api.get(`/events/${id}`);
            setEvent(res.data);
        } catch (err) {
            console.error("Failed to join event:", err);
        } finally {
            setJoining(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-green-50 via-blue-50 to-green-50 flex flex-col">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                        <div className="w-16 h-16 border-4 border-primary-500 rounded-full border-t-transparent animate-spin absolute inset-0"></div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="min-h-screen bg-linear-to-br from-green-50 via-blue-50 to-green-50 flex flex-col">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-red-600 font-semibold mb-4">{error || "Event not found"}</p>
                        <button
                            onClick={() => navigate("/events")}
                            className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                            Back to Events
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const mapCenter = event.latitude && event.longitude
        ? { lat: parseFloat(event.latitude), lng: parseFloat(event.longitude) }
        : { lat: 19.4326, lng: -99.1332 };

    return (
        <div className="min-h-screen bg-linear-to-br from-green-50 via-blue-50 to-green-50 flex flex-col">
            <Navbar />

            <div className="flex-grow max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Back Button */}
                <button
                    onClick={() => navigate("/events")}
                    className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Events
                </button>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Event Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Event Image */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            {event.imageBase64 ? (
                                <img
                                    src={`data:image/jpeg;base64,${event.imageBase64}`}
                                    alt={event.title}
                                    className="w-full h-96 object-cover"
                                />
                            ) : (
                                <div className="w-full h-96 bg-gradient-to-br from-primary-200 to-accent-200 flex items-center justify-center">
                                    <div className="text-6xl">🌍</div>
                                </div>
                            )}
                        </div>

                        {/* Event Info Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <div className="mb-6">
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                    {event.title}
                                </h1>
                                <div className="flex flex-wrap gap-4 text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-primary-500" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-primary-500" />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5 text-accent-500" />
                                        <span>{event.attendeesCount || 0} volunteers</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    About this event
                                </h2>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {event.description}
                                </p>
                            </div>

                            <div className="border-t border-gray-200 mt-8 pt-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-primary-500" />
                                    Location
                                </h3>
                                <p className="text-gray-700 text-lg font-medium">
                                    {event.location}
                                </p>
                                {event.latitude && event.longitude && (
                                    <p className="text-gray-600 text-sm mt-2">
                                        Coordinates: {parseFloat(event.latitude).toFixed(4)}, {parseFloat(event.longitude).toFixed(4)}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Map Section */}
                        {isLoaded && event.latitude && event.longitude && (
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Event Location Map
                                </h2>
                                <div className="rounded-xl overflow-hidden border-2 border-gray-200">
                                    <GoogleMap
                                        mapContainerStyle={containerStyle}
                                        center={mapCenter}
                                        zoom={15}
                                    >
                                        <Marker position={mapCenter} />
                                    </GoogleMap>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Join Card */}
                    <div>
                        <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
                            <div className="mb-6">
                                <div className="text-center mb-6">
                                    <p className="text-gray-600 text-sm mb-2">Total Volunteers</p>
                                    <p className="text-5xl font-bold text-primary-600">
                                        {event.attendeesCount || 0}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleJoinEvent}
                                disabled={joining}
                                className="w-full bg-linear-to-r from-primary-500 to-primary-600 text-white font-semibold py-3 rounded-lg hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                            >
                                {joining ? "Joining..." : "Join Event"}
                            </button>

                            <button
                                onClick={() => setIsLiked(!isLiked)}
                                className="w-full flex items-center justify-center gap-2 border-2 border-primary-500 text-primary-600 font-semibold py-3 rounded-lg hover:bg-primary-50 transition-all duration-300 mb-4"
                            >
                                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                                {isLiked ? "Saved" : "Save Event"}
                            </button>

                            <button className="w-full flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:border-gray-400 transition-all duration-300">
                                <Share2 className="w-5 h-5" />
                                Share
                            </button>

                            <div className="mt-8 p-4 bg-primary-50 border border-primary-200 rounded-lg">
                                <p className="text-primary-800 text-sm">
                                    <span className="font-semibold">📍 Pro Tip:</span> Bring gloves, bags, and your enthusiasm! Every small action makes a big difference.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
