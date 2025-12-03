export class CreateExerciseLogDto {
    name: string;
    sets: number;
    reps: number[];
    weight: number[];
    notes: string;
}

export class CreateWorkoutDto {
    planId: string;
    dayName: string;
    date: Date;
    exercises: CreateExerciseLogDto[];
}
