export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                <div className="w-16 h-16 border-4 border-primary-500 rounded-full border-t-transparent animate-spin absolute inset-0"></div>
            </div>
            <p className="text-gray-600 mt-6 text-lg font-medium">Loading...</p>
        </div>
    );
}

