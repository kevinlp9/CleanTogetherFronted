import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Users, Leaf, Heart, Globe, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
    const isAuthenticated = !!localStorage.getItem('token');

    const features = [
        {
            icon: MapPin,
            title: 'Find Events Near You',
            description: 'Discover cleanup events happening in your community with real-time location tracking.'
        },
        {
            icon: Users,
            title: 'Join a Community',
            description: 'Connect with like-minded people passionate about keeping our planet clean.'
        },
        {
            icon: Leaf,
            title: 'Make an Impact',
            description: 'Contribute to meaningful environmental projects and track your impact.'
        },
        {
            icon: Heart,
            title: 'Share Your Passion',
            description: 'Organize your own cleanup events and inspire others to participate.'
        },
        {
            icon: Globe,
            title: 'Global Movement',
            description: 'Be part of a worldwide community dedicated to environmental sustainability.'
        },
        {
            icon: Zap,
            title: 'Easy to Use',
            description: 'Our intuitive platform makes organizing and joining cleanups simple and fun.'
        }
    ];

    const stats = [
        { number: '50K+', label: 'Volunteers' },
        { number: '1200+', label: 'Events' },
        { number: '500T+', label: 'Waste Collected' },
        { number: '150+', label: 'Cities' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
            <Navbar />

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-4 font-semibold">
                                <Leaf className="w-4 h-4" />
                                Together We Make a Difference
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
                                Clean Your
                                <span className="block bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                                    Community Today
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                                Join thousands of volunteers in making our cities cleaner, greener, and more beautiful. Every cleanup counts!
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to={isAuthenticated ? '/' : '/login'}
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-lg hover:shadow-glow transition-all duration-300 font-semibold text-lg group"
                            >
                                Get Started
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a
                                href="#features"
                                className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-primary-500 hover:text-primary-600 transition-all duration-300 font-semibold text-lg"
                            >
                                Learn More
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-6 pt-8">
                            {stats.map((stat, idx) => (
                                <div key={idx}>
                                    <p className="text-3xl font-bold text-primary-600">{stat.number}</p>
                                    <p className="text-gray-600 text-sm">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Illustration */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-accent-200 rounded-3xl transform rotate-3"></div>
                        <div className="relative bg-white rounded-3xl shadow-xl p-8 transform -rotate-1">
                            <div className="aspect-square bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-6xl mb-4">🌍</div>
                                    <p className="text-gray-600 font-semibold">Make the World Cleaner</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white rounded-3xl mx-4 sm:mx-6 lg:mx-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Why Choose Clean Together?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Our platform makes it easy to organize, discover, and participate in community cleanup events.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={idx}
                                className="p-8 border border-gray-200 rounded-2xl hover:shadow-lg hover:border-primary-300 transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-glow transition-all duration-300">
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Call to Action */}
            {!isAuthenticated && (
                <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="bg-gradient-to-r from-primary-600 to-accent-500 rounded-3xl p-12 md:p-16 text-center text-white shadow-xl">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Ready to Make a Difference?
                        </h2>
                        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                            Join our community of environmental advocates. Sign up today and start your cleanup journey!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/register"
                                className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold text-lg"
                            >
                                Create Account
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                to="/login"
                                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-all duration-300 font-semibold text-lg"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <Footer />
        </div>
    );
}

