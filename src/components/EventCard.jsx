import { MapPin, Users, Calendar, ArrowRight } from 'lucide-react';

export default function EventCard({ event }) {
    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-1">
            {/* Event Image */}
            <div className="relative h-48 bg-gradient-to-br from-primary-200 to-accent-200 overflow-hidden">
                {event.imageBase64 ? (
                    <img
                        src={`data:image/jpeg;base64,${event.imageBase64}`}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="text-4xl">🌍</div>
                    </div>
                )}
                {/* Badge */}
                <div className="absolute top-4 right-4 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Active
                </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {event.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {event.description}
                </p>

                {/* Info Grid */}
                <div className="space-y-2 mb-6">
                    {/* Location */}
                    <div className="flex items-center gap-2 text-gray-700">
                        <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0" />
                        <span className="text-sm line-clamp-1">{event.location || 'Location TBD'}</span>
                    </div>

                    {/* Attendees */}
                    <div className="flex items-center gap-2 text-gray-700">
                        <Users className="w-5 h-5 text-accent-500 flex-shrink-0" />
                        <span className="text-sm font-medium">{event.attendeesCount || 0} volunteers</span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="w-5 h-5 text-primary-500 flex-shrink-0" />
                        <span className="text-sm">{event.date || 'TBD'}</span>
                    </div>
                </div>

                {/* Button */}
                <button className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold py-3 rounded-lg hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                    Join Cleanup
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}

