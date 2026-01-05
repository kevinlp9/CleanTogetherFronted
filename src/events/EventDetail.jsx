import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Users, Clock, Share2, Heart, Sparkles, Check, AlertCircle } from "lucide-react";
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
    const [joinSuccess, setJoinSuccess] = useState(false);

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
            const res = await api.get(`/events/${id}`);
            setEvent(res.data);
            setJoinSuccess(true);
            setTimeout(() => setJoinSuccess(false), 3000);
        } catch (err) {
            console.error("Failed to join event:", err);
        } finally {
            setJoining(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex flex-col">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <div className="relative mb-6 inline-block">
                            <div className="w-20 h-20 border-4 border-gray-200 rounded-full"></div>
                            <div className="w-20 h-20 border-4 border-primary-500 rounded-full border-t-transparent animate-spin absolute inset-0"></div>
                        </div>
                        <p className="text-2xl text-gray-700 font-bold">Cargando evento...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex flex-col">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center bg-white rounded-3xl shadow-xl p-12 border-2 border-red-300">
                        <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
                        <p className="text-red-600 font-bold text-xl mb-4">{error || "Evento no encontrado"}</p>
                        <button
                            onClick={() => navigate("/events")}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Volver a Eventos
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

                <div className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center">
                    <div className="w-full max-w-6xl">
                        {/* Back Button */}
                        <button
                            onClick={() => navigate("/events")}
                            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-bold mb-8 transition-all hover:-translate-x-1 text-lg"
                        >
                            <ArrowLeft className="w-6 h-6" />
                            Volver a Eventos
                        </button>

                        {/* Join Success Message */}
                        {joinSuccess && (
                            <div className="mb-8 p-6 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 rounded-2xl flex items-center gap-4 animate-pulse shadow-lg">
                                <Check className="w-8 h-8 text-green-600 flex-shrink-0" />
                                <div>
                                    <p className="text-green-900 font-black text-lg">🎉 ¡Te uniste al evento!</p>
                                    <p className="text-green-800">Ahora eres parte de esta iniciativa de limpieza</p>
                                </div>
                            </div>
                        )}

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column - Event Details */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Event Image */}
                                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-primary-200 hover:shadow-2xl transition-all animate-fade-in">
                                    {event.imageBase64 ? (
                                        <img
                                            src={`data:image/jpeg;base64,${event.imageBase64}`}
                                            alt={event.title}
                                            className="w-full h-96 object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-96 bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 flex items-center justify-center">
                                            <div className="text-8xl animate-bounce">🌍</div>
                                        </div>
                                    )}
                                </div>

                                {/* Event Info Card */}
                                <div className="bg-white rounded-3xl shadow-xl p-10 border-2 border-primary-200 animate-fade-in" style={{ animationDelay: '100ms' }}>
                                    <div className="mb-8">
                                        <h1 className="text-5xl font-black text-gray-900 mb-4">
                                            {event.title}
                                        </h1>
                                        <div className="flex flex-wrap gap-6">
                                            <div className="flex items-center gap-3 bg-blue-50 px-5 py-3 rounded-xl border-2 border-blue-200">
                                                <Calendar className="w-6 h-6 text-blue-600" />
                                                <div>
                                                    <p className="text-sm text-blue-600 font-semibold">Fecha</p>
                                                    <p className="text-lg font-black text-blue-900">{event.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 bg-orange-50 px-5 py-3 rounded-xl border-2 border-orange-200">
                                                <Clock className="w-6 h-6 text-orange-600" />
                                                <div>
                                                    <p className="text-sm text-orange-600 font-semibold">Hora</p>
                                                    <p className="text-lg font-black text-orange-900">{event.time}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 bg-green-50 px-5 py-3 rounded-xl border-2 border-green-200">
                                                <Users className="w-6 h-6 text-green-600" />
                                                <div>
                                                    <p className="text-sm text-green-600 font-semibold">Voluntarios</p>
                                                    <p className="text-lg font-black text-green-900">{event.attendeesCount || 0}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t-2 border-gray-200 pt-8">
                                        <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-2">
                                            <Sparkles className="w-8 h-8 text-primary-600" />
                                            Acerca de este Evento
                                        </h2>
                                        <p className="text-xl text-gray-700 leading-relaxed whitespace-pre-line font-medium">
                                            {event.description}
                                        </p>
                                    </div>

                                    <div className="border-t-2 border-gray-200 mt-8 pt-8">
                                        <h3 className="text-2xl font-black text-gray-900 mb-5 flex items-center gap-2">
                                            <MapPin className="w-7 h-7 text-red-600" />
                                            📍 Ubicación
                                        </h3>
                                        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-6">
                                            <p className="text-2xl font-black text-gray-900 mb-2">
                                                {event.location}
                                            </p>
                                            {event.latitude && event.longitude && (
                                                <p className="text-gray-600 font-semibold">
                                                    📌 Coordenadas: {parseFloat(event.latitude).toFixed(4)}, {parseFloat(event.longitude).toFixed(4)}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Map Section */}
                                {isLoaded && event.latitude && event.longitude && (
                                    <div className="bg-white rounded-3xl shadow-xl p-10 border-2 border-primary-200 animate-fade-in" style={{ animationDelay: '200ms' }}>
                                        <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-2">
                                            🗺️ Mapa de Ubicación del Evento
                                        </h2>
                                        <div className="rounded-2xl overflow-hidden border-2 border-gray-300 shadow-lg hover:shadow-xl transition-all">
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
                                <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-24 border-2 border-primary-200 animate-fade-in" style={{ animationDelay: '300ms' }}>
                                    {/* Volunteers Counter */}
                                    <div className="mb-8 text-center bg-gradient-to-br from-primary-100 to-blue-100 rounded-2xl p-8 border-2 border-primary-300">
                                        <p className="text-gray-700 text-sm font-bold mb-2">👥 Total de Voluntarios</p>
                                        <p className="text-6xl font-black bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                                            {event.attendeesCount || 0}
                                        </p>
                                    </div>

                                    {/* Join Button */}
                                    <button
                                        onClick={handleJoinEvent}
                                        disabled={joining}
                                        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-black py-4 rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-4 flex items-center justify-center gap-2 text-lg shadow-lg"
                                    >
                                        {joining ? (
                                            <>
                                                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Uniéndote...
                                            </>
                                        ) : (
                                            <>
                                                <Users className="w-6 h-6" />
                                                Unirse al Evento
                                            </>
                                        )}
                                    </button>

                                    {/* Save Button */}
                                    <button
                                        onClick={() => setIsLiked(!isLiked)}
                                        className="w-full flex items-center justify-center gap-2 border-2 border-primary-500 text-primary-600 font-black py-4 rounded-xl hover:bg-primary-50 transition-all duration-300 mb-4 text-lg"
                                    >
                                        <Heart className={`w-6 h-6 transition-all ${isLiked ? "fill-current text-red-600" : ""}`} />
                                        {isLiked ? "Guardado ❤️" : "Guardar Evento"}
                                    </button>

                                    {/* Share Button */}
                                    <button className="w-full flex items-center justify-center gap-2 border-2 border-gray-400 text-gray-700 font-black py-4 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-300 mb-8 text-lg">
                                        <Share2 className="w-6 h-6" />
                                        Compartir Evento
                                    </button>

                                    {/* Pro Tip Box */}
                                    <div className="p-6 bg-gradient-to-r from-primary-50 to-purple-50 border-2 border-primary-300 rounded-2xl">
                                        <p className="text-primary-900 font-bold text-base leading-relaxed">
                                            <span className="text-2xl block mb-2">💡</span>
                                            <span className="font-black">Consejo:</span> Trae guantes, bolsas y tu entusiasmo. ¡Cada pequeña acción hace una gran diferencia en nuestra comunidad!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
