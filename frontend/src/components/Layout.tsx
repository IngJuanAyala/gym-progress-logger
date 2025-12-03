import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Dumbbell, Home, Settings, History } from 'lucide-react';

const Layout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            <header className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <Dumbbell className="text-blue-500" />
                    Gym Notes
                </h1>
            </header>

            <main className="flex-1 p-4 overflow-y-auto">
                <Outlet />
            </main>

            <nav className="bg-gray-800 border-t border-gray-700 p-2 flex justify-around">
                <Link to="/" className="flex flex-col items-center p-2 text-gray-400 hover:text-blue-500">
                    <Home size={24} />
                    <span className="text-xs">Home</span>
                </Link>
                <Link to="/workout" className="flex flex-col items-center p-2 text-gray-400 hover:text-blue-500">
                    <Dumbbell size={24} />
                    <span className="text-xs">Workout</span>
                </Link>
                <Link to="/history" className="flex flex-col items-center p-2 text-gray-400 hover:text-blue-500">
                    <History size={24} />
                    <span className="text-xs">History</span>
                </Link>
                <Link to="/settings" className="flex flex-col items-center p-2 text-gray-400 hover:text-blue-500">
                    <Settings size={24} />
                    <span className="text-xs">Settings</span>
                </Link>
            </nav>
        </div>
    );
};

export default Layout;
