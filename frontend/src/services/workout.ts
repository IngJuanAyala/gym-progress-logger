import api from '../api/axios';

export interface ExerciseLog {
    name: string;
    sets: number;
    reps: number[];
    weight: number[];
    notes: string;
}

export interface WorkoutLog {
    _id: string;
    planId: string;
    dayName: string;
    date: string;
    exercises: ExerciseLog[];
}

export const getWorkouts = async (planId?: string): Promise<WorkoutLog[]> => {
    const params = planId ? { planId } : {};
    const response = await api.get<WorkoutLog[]>('/workout', { params });
    return response.data;
};

export const getWorkoutById = async (id: string): Promise<WorkoutLog> => {
    const response = await api.get<WorkoutLog>(`/workout/${id}`);
    return response.data;
};

export const createWorkout = async (workout: Omit<WorkoutLog, '_id'>): Promise<WorkoutLog> => {
    const response = await api.post<WorkoutLog>('/workout', workout);
    return response.data;
};
