
import { useQuery } from '@tanstack/react-query';
import { getWorkouts } from '../services/workout';
import { Loader2, Calendar } from 'lucide-react';

const History = () => {
    const { data: workouts, isLoading } = useQuery({
        queryKey: ['workouts'],
        queryFn: () => getWorkouts(),
    });

    if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Workout History</h2>

            {workouts && workouts.length > 0 ? (
                workouts.map((workout) => (
                    <div key={workout._id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="font-bold text-lg">{workout.dayName}</h3>
                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                    <Calendar size={14} />
                                    {new Date(workout.date).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                        <div className="text-sm text-gray-300">
                            <p>{workout.exercises.length} Exercises Completed</p>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 text-center">No workouts logged yet.</p>
            )}
        </div>
    );
};

export default History;
