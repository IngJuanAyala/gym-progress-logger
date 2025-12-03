export class CreateExerciseDto {
    name: string;
    targetSets: number;
    targetReps: string;
    targetWeight: number;
    notes: string;
}

export class CreateDayDto {
    name: string;
    exercises: CreateExerciseDto[];
}

export class CreateTrainingPlanDto {
    name: string;
    description: string;
    days: CreateDayDto[];
}
