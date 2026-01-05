import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Users, Leaf, Heart, Globe, Zap, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
    const isAuthenticated = !!localStorage.getItem('token');

    const features = [
        {
            icon: MapPin,
            title: 'Find Events Near You',
            description: 'Discover cleanup events happening in your community with real-time location tracking.',
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-100'
        },
        {
            icon: Users,
            title: 'Join a Community',
            description: 'Connect with like-minded people passionate about keeping our planet clean.',
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-100'
        },
        {
            icon: Leaf,
            title: 'Make an Impact',
            description: 'Contribute to meaningful environmental projects and track your impact.',
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-100'
        },
        {
            icon: Heart,
            title: 'Share Your Passion',
            description: 'Organize your own cleanup events and inspire others to participate.',
            color: 'from-red-500 to-red-600',
            bgColor: 'bg-red-100'
        },
        {
            icon: Globe,
            title: 'Global Movement',
            description: 'Be part of a worldwide community dedicated to environmental sustainability.',
            color: 'from-cyan-500 to-cyan-600',
            bgColor: 'bg-cyan-100'
        },
        {
            icon: Zap,
            title: 'Easy to Use',
            description: 'Our intuitive platform makes organizing and joining cleanups simple and fun.',
            color: 'from-yellow-500 to-yellow-600',
            bgColor: 'bg-yellow-100'
        }
    ];

    const stats = [
        { number: '50K+', label: 'Volunteers', icon: '👥', color: 'text-blue-600' },
        { number: '1200+', label: 'Events', icon: '📍', color: 'text-green-600' },
        { number: '500T+', label: 'Waste Collected', icon: '♻️', color: 'text-purple-600' },
        { number: '150+', label: 'Cities', icon: '🌍', color: 'text-orange-600' }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50"></div>
                {/* Animated background blobs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="relative z-10">
                <Navbar />

                {/* Hero Section */}
                <section className="w-full px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex items-center justify-center">
                    <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-10 flex flex-col justify-center">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-400 to-blue-400 text-white px-6 py-3 rounded-full font-bold shadow-lg">
                                <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '3s' }} />
                                🌱 Community Cleanup Platform
                            </div>

                            {/* Title */}
                            <div className="space-y-6">
                                <h1 className="text-6xl md:text-7xl font-black text-gray-900 leading-tight">
                                    Clean Your
                                    <span className="block bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mt-2">
                                        Community Today
                                    </span>
                                </h1>
                                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-2xl">
                                    Join thousands of volunteers in making our cities cleaner, greener, and more beautiful. Every cleanup counts! 🌍
                                </p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-5 pt-6">
                                {isAuthenticated ? (
                                    <>
                                        <Link
                                            to="/events"
                                            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-12 py-5 rounded-xl hover:shadow-2xl hover:-translate-y-1 font-bold text-lg transition-all duration-300 shadow-lg group"
                                        >
                                            Browse Events
                                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                        <Link
                                            to="/events/create"
                                            className="inline-flex items-center justify-center gap-3 border-2 border-green-500 text-green-600 px-12 py-5 rounded-xl hover:bg-green-50 transition-all duration-300 font-bold text-lg"
                                        >
                                            Create Event
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-12 py-5 rounded-xl hover:shadow-2xl hover:-translate-y-1 font-bold text-lg transition-all duration-300 shadow-lg group"
                                        >
                                            Get Started
                                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                        <a
                                            href="#features"
                                            className="inline-flex items-center justify-center gap-3 border-2 border-gray-400 text-gray-700 px-12 py-5 rounded-xl hover:border-green-500 hover:text-green-600 transition-all duration-300 font-bold text-lg"
                                        >
                                            Learn More
                                        </a>
                                    </>
                                )}
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-8 pt-12">
                                {stats.map((stat, idx) => (
                                    <div key={idx} className="bg-white bg-opacity-70 backdrop-blur-md rounded-xl p-6 shadow-md border border-white border-opacity-50">
                                        <div className="text-4xl mb-3">{stat.icon}</div>
                                        <p className={`text-3xl font-black mb-2 ${stat.color}`}>{stat.number}</p>
                                        <p className="text-gray-600 text-base font-semibold">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Content - Illustration with emojis */}
                        <div className="relative hidden lg:block">
                            <div className="relative h-96">
                                {/* Main Circle */}
                                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
                                    <div className="text-center">
                                        <div className="text-8xl mb-4 animate-bounce">🌍</div>
                                        <div className="text-gray-900 font-bold text-2xl">Make a Difference</div>
                                    </div>
                                    {/* Floating elements */}
                                    <div className="absolute top-8 left-8 text-6xl animate-pulse">🌱</div>
                                    <div className="absolute bottom-8 right-8 text-6xl animate-pulse" style={{ animationDelay: '1s' }}>♻️</div>
                                    <div className="absolute top-1/2 right-8 text-5xl animate-pulse" style={{ animationDelay: '2s' }}>🌿</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="w-full px-4 sm:px-6 lg:px-8 py-24 flex items-center justify-center">
                    <div className="max-w-7xl w-full">
                    <div className="text-center mb-24">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-blue-400 text-white px-6 py-3 rounded-full font-bold mb-8 shadow-lg">
                            <Leaf className="w-5 h-5" />
                            Why Choose Us
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8">
                            Everything You Need
                            <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mt-2">
                                To Make an Impact
                            </span>
                        </h2>
                        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Our platform makes it easy to organize, discover, and participate in community cleanup events.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {features.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={idx}
                                    className="group bg-white rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-green-300 animate-fade-in"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    {/* Icon */}
                                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed text-base">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                    </div>
                </section>

                {/* Impact Section */}
                <section className="w-full px-4 sm:px-6 lg:px-8 py-24 flex items-center justify-center">
                    <div className="max-w-7xl w-full">
                    <div className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-3xl overflow-hidden shadow-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 p-12 md:p-20 items-center">
                            {/* Left */}
                            <div className="text-white space-y-6">
                                <h2 className="text-5xl md:text-6xl font-black leading-tight">
                                    Join a Global Movement
                                </h2>
                                <p className="text-xl text-white text-opacity-90 leading-relaxed">
                                    Be part of something bigger. Together, we're creating cleaner, healthier communities around the world. Your actions inspire others to take action.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-5 pt-4">
                                    <Link
                                        to={isAuthenticated ? '/events' : '/login'}
                                        className="inline-flex items-center justify-center gap-3 bg-white text-green-600 px-10 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-300 shadow-lg"
                                    >
                                        Start Now
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>
                                    <a
                                        href="#features"
                                        className="inline-flex items-center justify-center gap-3 border-2 border-white text-white px-10 py-4 rounded-xl font-bold hover:bg-white hover:text-green-600 transition-all duration-300"
                                    >
                                        Learn More
                                    </a>
                                </div>
                            </div>

                            {/* Right - Emojis */}
                            <div className="text-center">
                                <div className="grid grid-cols-2 gap-8 text-6xl">
                                    <div className="animate-bounce" style={{ animationDelay: '0s' }}>🌱</div>
                                    <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>♻️</div>
                                    <div className="animate-bounce" style={{ animationDelay: '0.4s' }}>🌍</div>
                                    <div className="animate-bounce" style={{ animationDelay: '0.6s' }}>🌿</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </section>

                {/* CTA Section */}
                {!isAuthenticated && (
                    <section className="w-full px-4 sm:px-6 lg:px-8 py-24 flex items-center justify-center">
                        <div className="max-w-7xl w-full">
                        <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-20 text-center border-4 border-green-300 space-y-8">
                            <div className="text-6xl">🚀</div>
                            <h2 className="text-5xl md:text-6xl font-black text-gray-900">
                                Ready to Make a Difference?
                            </h2>
                            <p className="text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                                Join our community of environmental advocates. Sign up today and start your cleanup journey!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4">
                                <Link
                                    to="/register"
                                    className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-4 rounded-xl hover:shadow-2xl font-bold text-lg transition-all duration-300 shadow-lg"
                                >
                                    Create Account
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    to="/login"
                                    className="inline-flex items-center justify-center gap-3 border-2 border-green-500 text-green-600 px-10 py-4 rounded-xl hover:bg-green-50 font-bold text-lg transition-all duration-300"
                                >
                                    Sign In
                                </Link>
                            </div>
                        </div>
                        </div>
                    </section>
                )}

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

                /* Smooth scroll */
                html {
                    scroll-behavior: smooth;
                }
            `}</style>
        </div>
    );
}
