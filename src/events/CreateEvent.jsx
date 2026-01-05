import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Users, Loader, CheckCircle, ArrowLeft, Map } from "lucide-react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const containerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "8px",
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
    const [mapCenter, setMapCenter] = useState({ lat: 19.4326, lng: -99.1332 }); // CDMX default
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
            // Preview
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

        // Validations
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
        <div className="min-h-screen bg-linear-to-br from-green-50 via-blue-50 to-green-50 flex flex-col">
            <Navbar />

            <div className="grow max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Success Message */}
                {success && (
                    <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-xl text-center">
                        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-green-900">Event Created Successfully!</h3>
                        <p className="text-green-700 text-sm mt-2">
                            Redirecting to events list...
                        </p>
                    </div>
                )}

                {/* Back Button */}
                <button
                    onClick={() => navigate("/events")}
                    className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Events
                </button>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Decorative Header */}
                    <div className="h-32 bg-linear-to-br from-primary-500 to-primary-600 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
                        </div>
                        <div className="relative h-full flex items-center justify-center">
                            <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                                <Calendar className="w-8 h-8 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Form Container */}
                    <div className="p-8">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Create New Event
                            </h1>
                            <p className="text-gray-600">
                                Organize a cleanup event and make a difference in your community
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-700 text-sm font-medium">{error}</p>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Event Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="e.g., Community Beach Cleanup"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-0 transition-colors"
                                    required
                                />
                            </div>

                            {/* Description Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    placeholder="Describe your cleanup event, what needs to be done, and any special details..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-0 transition-colors resize-none"
                                    required
                                />
                            </div>

                            {/* Location Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Location
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="location"
                                        placeholder="e.g., Central Park, New York"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-0 transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Date and Time Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Date Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Date
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-0 transition-colors"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Time Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Time
                                    </label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-0 transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Google Map Section */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <div className="flex items-center gap-2">
                                        <Map className="w-5 h-5 text-primary-500" />
                                        Event Location on Map
                                    </div>
                                </label>
                                <p className="text-gray-600 text-sm mb-3">
                                    Click on the map to select the exact location of your cleanup event
                                </p>

                                {!isLoaded ? (
                                    <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                                        <p className="text-gray-600">Loading map...</p>
                                    </div>
                                ) : (
                                    <div className="relative rounded-lg overflow-hidden border-2 border-gray-200">
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
                                            <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md">
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {selectedLocation && (
                                    <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                                        ✓ Location selected successfully
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Event Image
                                </label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-0 transition-colors cursor-pointer"
                                    />
                                </div>

                                {/* Image Preview */}
                                {imagePreview && (
                                    <div className="mt-4 relative">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-48 object-cover rounded-lg"
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
                                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-linear-to-r from-primary-500 to-primary-600 text-white font-semibold py-3 rounded-lg hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader className="w-5 h-5 animate-spin" />
                                        Creating Event...
                                    </>
                                ) : (
                                    <>
                                        <Users className="w-5 h-5" />
                                        Create Event
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Info Box */}
                        <div className="mt-8 p-4 bg-primary-50 border border-primary-200 rounded-lg">
                            <p className="text-primary-800 text-sm">
                                <span className="font-semibold">💡 Tip:</span> Make sure to provide clear details about your event so volunteers can understand what to expect and how they can help!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
