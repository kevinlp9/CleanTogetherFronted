import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Users, Loader, CheckCircle, ArrowLeft, Sparkles, Trash2, AlertCircle } from "lucide-react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const containerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "12px",
};

export default function CreateEvent() {
    const navigate = useNavigate();
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        image: null,
    });
    const [mapCenter, setMapCenter] = useState({ lat: 19.4326, lng: -99.1332 });
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                image: file,
            }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.title || !formData.description || !formData.location || !formData.date || !formData.time) {
            setError("All fields are required");
            return;
        }

        if (!selectedLocation) {
            setError("Please select a location on the map");
            return;
        }

        setLoading(true);
        try {
            const submitData = new FormData();
            submitData.append("title", formData.title);
            submitData.append("description", formData.description);
            submitData.append("location", formData.location);
            submitData.append("date", formData.date);
            submitData.append("time", formData.time);
            submitData.append("latitude", selectedLocation.lat);
            submitData.append("longitude", selectedLocation.lng);
            if (formData.image) {
                submitData.append("image", formData.image);
            }

            await api.post("/events", submitData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setSuccess(true);
            setTimeout(() => {
                navigate("/events");
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create event");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50"></div>
                {/* Animated blobs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                {/* Main Content */}
                <div className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center">
                    <div className="w-full max-w-2xl">
                        {/* Success Message */}
                        {success && (
                            <div className="mb-8 p-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl text-center animate-pulse shadow-lg">
                                <div className="flex justify-center mb-4">
                                    <CheckCircle className="w-16 h-16 text-green-600 animate-bounce" />
                                </div>
                                <h3 className="text-2xl font-black text-green-900 mb-2">🎉 Event Created Successfully!</h3>
                                <p className="text-green-700 text-lg font-semibold">
                                    Redirecting to events list...
                                </p>
                            </div>
                        )}

                        {/* Back Button */}
                        <button
                            onClick={() => navigate("/events")}
                            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-bold mb-8 transition-all hover:-translate-x-1"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Events
                        </button>

                        {/* Main Card */}
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-primary-200">
                            {/* Decorative Header */}
                            <div className="h-40 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 relative overflow-hidden">
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
                                <div className="mb-10">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Sparkles className="w-6 h-6 text-primary-600 animate-spin" style={{ animationDuration: '3s' }} />
                                        <span className="text-primary-600 font-bold text-lg">Create Your Event</span>
                                    </div>
                                    <h1 className="text-4xl font-black text-gray-900 mb-3">
                                        Organize a Cleanup
                                    </h1>
                                    <p className="text-xl text-gray-600 leading-relaxed">
                                        Make a real difference in your community. Create an event and inspire others to join! 🌱
                                    </p>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="mb-8 p-4 bg-red-50 border-2 border-red-300 rounded-xl flex items-start gap-3">
                                        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                                        <p className="text-red-700 font-semibold">{error}</p>
                                    </div>
                                )}

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Title Field */}
                                    <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                                        <label className="block text-sm font-bold text-gray-800 mb-3">
                                            <span className="text-primary-600">✨</span> Event Title
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="e.g., Community Beach Cleanup"
                                            value={formData.title}
                                            onChange={handleChange}
                                            className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all text-lg"
                                            required
                                        />
                                    </div>

                                    {/* Description Field */}
                                    <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                                        <label className="block text-sm font-bold text-gray-800 mb-3">
                                            <span className="text-blue-600">📝</span> Description
                                        </label>
                                        <textarea
                                            name="description"
                                            placeholder="Describe your cleanup event, what needs to be done, and any special details..."
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows="4"
                                            className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all resize-none text-lg"
                                            required
                                        />
                                    </div>

                                    {/* Location Field */}
                                    <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                                        <label className="block text-sm font-bold text-gray-800 mb-3">
                                            <span className="text-red-600">📍</span> Location
                                        </label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                                            <input
                                                type="text"
                                                name="location"
                                                placeholder="e.g., Central Park, New York"
                                                value={formData.location}
                                                onChange={handleChange}
                                                className="w-full pl-14 pr-5 py-3 border-2 border-gray-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all text-lg"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Date and Time Row */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Date Field */}
                                        <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
                                            <label className="block text-sm font-bold text-gray-800 mb-3">
                                                <span className="text-green-600">📅</span> Date
                                            </label>
                                            <div className="relative">
                                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                                                <input
                                                    type="date"
                                                    name="date"
                                                    value={formData.date}
                                                    onChange={handleChange}
                                                    className="w-full pl-14 pr-5 py-3 border-2 border-gray-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all text-lg"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Time Field */}
                                        <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
                                            <label className="block text-sm font-bold text-gray-800 mb-3">
                                                <span className="text-orange-600">🕐</span> Time
                                            </label>
                                            <input
                                                type="time"
                                                name="time"
                                                value={formData.time}
                                                onChange={handleChange}
                                                className="w-full px-5 py-3 border-2 border-gray-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all text-lg"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Google Map Section */}
                                    <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
                                        <label className="block text-sm font-bold text-gray-800 mb-3">
                                            <span className="text-purple-600">🗺️</span> Event Location on Map
                                        </label>
                                        <p className="text-gray-600 text-sm mb-4 font-medium">
                                            Click on the map to select the exact location of your cleanup event
                                        </p>

                                        {!isLoaded ? (
                                            <div className="w-full h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center border-2 border-gray-300">
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="w-12 h-12 border-4 border-gray-400 border-t-primary-500 rounded-full animate-spin"></div>
                                                    <p className="text-gray-600 font-semibold">Loading map...</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="relative rounded-2xl overflow-hidden border-2 border-gray-300 shadow-lg hover:shadow-xl transition-shadow">
                                                <GoogleMap
                                                    mapContainerStyle={containerStyle}
                                                    center={mapCenter}
                                                    zoom={13}
                                                    onClick={(e) => {
                                                        const newLocation = {
                                                            lat: e.latLng.lat(),
                                                            lng: e.latLng.lng(),
                                                        };
                                                        setSelectedLocation(newLocation);
                                                        setMapCenter(newLocation);
                                                    }}
                                                >
                                                    {selectedLocation && (
                                                        <Marker position={selectedLocation} />
                                                    )}
                                                </GoogleMap>
                                                {selectedLocation && (
                                                    <div className="absolute top-4 right-4 bg-white px-5 py-3 rounded-xl shadow-lg border-2 border-green-300 animate-bounce">
                                                        <p className="text-sm font-black text-gray-900">
                                                            ✓ {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {selectedLocation && (
                                            <p className="text-green-600 text-sm mt-3 flex items-center gap-2 font-semibold">
                                                <span className="text-lg">✅</span> Location selected successfully
                                            </p>
                                        )}
                                    </div>

                                    {/* Image Field */}
                                    <div className="animate-fade-in" style={{ animationDelay: '700ms' }}>
                                        <label className="block text-sm font-bold text-gray-800 mb-3">
                                            <span className="text-cyan-600">🖼️</span> Event Image
                                        </label>
                                        <div className="relative group">
                                            <input
                                                type="file"
                                                name="image"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="w-full px-5 py-4 border-2 border-dashed border-gray-400 rounded-2xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all cursor-pointer group-hover:border-primary-500 bg-gradient-to-br from-gray-50 to-gray-100 text-lg font-medium"
                                            />
                                            <p className="text-gray-600 text-sm mt-2">💡 Drag an image or click to browse</p>
                                        </div>

                                        {/* Image Preview */}
                                        {imagePreview && (
                                            <div className="mt-6 relative group animate-fade-in">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="w-full h-64 object-cover rounded-2xl shadow-lg border-2 border-green-300 group-hover:shadow-xl transition-all"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setImagePreview(null);
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            image: null,
                                                        }));
                                                    }}
                                                    className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg flex items-center gap-2"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Remove
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-black py-4 rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg shadow-lg animate-fade-in"
                                        style={{ animationDelay: '800ms' }}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader className="w-6 h-6 animate-spin" />
                                                Creating Event...
                                            </>
                                        ) : (
                                            <>
                                                <Users className="w-6 h-6" />
                                                Create Event
                                            </>
                                        )}
                                    </button>
                                </form>

                                {/* Info Box */}
                                <div className="mt-10 p-6 bg-gradient-to-r from-primary-50 to-blue-50 border-2 border-primary-300 rounded-2xl animate-fade-in" style={{ animationDelay: '900ms' }}>
                                    <p className="text-primary-900 text-base font-semibold leading-relaxed">
                                        <span className="text-2xl mr-2">💡</span>
                                        <span className="font-black">Pro Tip:</span> Make sure to provide clear details about your event so volunteers can understand what to expect and how they can help!
                                    </p>
                                </div>
                            </div>
                        </div>
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
