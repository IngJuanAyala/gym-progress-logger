import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTrainingPlanById } from '../services/trainingPlan';
import { createWorkout, type ExerciseLog } from '../services/workout';
import { Loader2, Save } from 'lucide-react';

const Workout = () => {
    const [searchParams] = useSearchParams();
    const planId = searchParams.get('planId');
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
    const [logs, setLogs] = useState<Record<string, ExerciseLog>>({});

    const { data: plan, isLoading } = useQuery({
        queryKey: ['trainingPlan', planId],
        queryFn: () => getTrainingPlanById(planId!),
        enabled: !!planId,
    });

    const mutation = useMutation({
        mutationFn: createWorkout,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['workouts'] });
            navigate('/history');
        },
    });

    useEffect(() => {
        if (plan && plan.days.length > 0) {
            // Initialize logs for the selected day
            const day = plan.days[selectedDayIndex];
            const initialLogs: Record<string, ExerciseLog> = {};
            day.exercises.forEach((ex) => {
                initialLogs[ex.name] = {
                    name: ex.name,
                    sets: ex.targetSets,
                    reps: Array(ex.targetSets).fill(0),
                    weight: Array(ex.targetSets).fill(ex.targetWeight),
                    notes: ex.notes || '',
                };
            });
            setLogs(initialLogs);
        }
    }, [plan, selectedDayIndex]);

    if (!planId) return <div className="p-4">Please select a plan from Home.</div>;
    if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;
    if (!plan) return <div className="p-4">Plan not found.</div>;

    const handleLogChange = (exerciseName: string, setIndex: number, field: 'reps' | 'weight', value: string) => {
        setLogs((prev) => {
            const exerciseLog = { ...prev[exerciseName] };
            const newArray = [...exerciseLog[field]];
            newArray[setIndex] = Number(value);
            exerciseLog[field] = newArray;
            return { ...prev, [exerciseName]: exerciseLog };
        });
    };

    const handleSave = () => {
        const exercises = Object.values(logs);
        mutation.mutate({
            planId,
            dayName: plan.days[selectedDayIndex].name,
            date: new Date().toISOString(),
            exercises,
        });
    };

    return (
        <div className="p-4 pb-20 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{plan.name}</h2>
                <button
                    onClick={handleSave}
                    disabled={mutation.isPending}
                    className="bg-green-600 px-4 py-2 rounded flex items-center gap-2 disabled:opacity-50"
                >
                    {mutation.isPending ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                    Save
                </button>
            </div>

            {/* Day Selector */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {plan.days.map((day, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedDayIndex(index)}
                        className={`px-4 py-2 rounded whitespace-nowrap ${selectedDayIndex === index ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                            }`}
                    >
                        {day.name}
                    </button>
                ))}
            </div>

            {/* Exercises */}
            <div className="space-y-4">
                {plan.days[selectedDayIndex].exercises.map((exercise) => {
                    const log = logs[exercise.name];
                    if (!log) return null;

                    return (
                        <div key={exercise.name} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                            <h3 className="font-bold text-lg mb-1">{exercise.name}</h3>
                            <p className="text-xs text-gray-400 mb-3">Target: {exercise.targetSets} sets x {exercise.targetReps} reps @ {exercise.targetWeight}kg</p>

                            <div className="space-y-2">
                                {Array.from({ length: exercise.targetSets }).map((_, setIndex) => (
                                    <div key={setIndex} className="flex items-center gap-2">
                                        <span className="text-gray-500 w-6 text-sm">#{setIndex + 1}</span>
                                        <input
                                            type="number"
                                            placeholder="kg"
                                            value={log.weight[setIndex] || ''}
                                            onChange={(e) => handleLogChange(exercise.name, setIndex, 'weight', e.target.value)}
                                            className="bg-gray-700 rounded p-2 w-20 text-center"
                                        />
                                        <span className="text-gray-500">kg</span>
                                        <input
                                            type="number"
                                            placeholder="reps"
                                            value={log.reps[setIndex] || ''}
                                            onChange={(e) => handleLogChange(exercise.name, setIndex, 'reps', e.target.value)}
                                            className="bg-gray-700 rounded p-2 w-20 text-center"
                                        />
                                        <span className="text-gray-500">reps</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Workout;
