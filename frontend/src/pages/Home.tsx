import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="space-y-4">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
                <p className="text-gray-400">Ready to crush your workout today?</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div className="bg-blue-600 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-blue-700 transition">
                    <div>
                        <h3 className="font-bold text-lg">Start Workout</h3>
                        <p className="text-blue-100 text-sm">Continue your 3-day split</p>
                    </div>
                    <span className="text-2xl">→</span>
                </div>
            </div>
        </div>
    );
};

export default Home;
