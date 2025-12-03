import api from '../api/axios';

export interface Exercise {
    name: string;
    targetSets: number;
    targetReps: string;
    targetWeight: number;
    notes: string;
}

export interface Day {
    name: string;
    exercises: Exercise[];
}

export interface TrainingPlan {
    _id: string;
    name: string;
    description: string;
    days: Day[];
    isActive: boolean;
}

export const getTrainingPlans = async (): Promise<TrainingPlan[]> => {
    const response = await api.get<TrainingPlan[]>('/training-plan');
    return response.data;
};

export const getTrainingPlanById = async (id: string): Promise<TrainingPlan> => {
    const response = await api.get<TrainingPlan>(`/training-plan/${id}`);
    return response.data;
};

export const createTrainingPlan = async (plan: Omit<TrainingPlan, '_id' | 'isActive'>): Promise<TrainingPlan> => {
    const response = await api.post<TrainingPlan>('/training-plan', plan);
    return response.data;
};
