
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getTrainingPlans } from '../services/trainingPlan';
import { Dumbbell, Loader2 } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();
    const { data: plans, isLoading, error } = useQuery({
        queryKey: ['trainingPlans'],
        queryFn: getTrainingPlans,
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-blue-500" size={48} />
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center p-4">Error loading plans. Is the backend running?</div>;
    }

    return (
        <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
                <p className="text-gray-400">Ready to crush your workout today?</p>
            </div>

            <h3 className="text-xl font-bold">Your Training Plans</h3>

            <div className="grid grid-cols-1 gap-4">
                {plans && plans.length > 0 ? (
                    plans.map((plan) => (
                        <div
                            key={plan._id}
                            onClick={() => navigate(`/workout?planId=${plan._id}`)}
                            className="bg-gray-800 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-700 transition border border-gray-700"
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-600 p-3 rounded-full">
                                    <Dumbbell size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">{plan.name}</h4>
                                    <p className="text-gray-400 text-sm">{plan.days.length} Days Split</p>
                                </div>
                            </div>
                            <span className="text-2xl text-gray-500">→</span>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 py-8">
                        No plans found. Create one in Settings (or use Postman for now).
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
