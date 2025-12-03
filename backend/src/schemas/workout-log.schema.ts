import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type WorkoutLogDocument = HydratedDocument<WorkoutLog>;

@Schema()
export class ExerciseLog {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    sets: number;

    @Prop({ required: true })
    reps: number[]; // Array of reps per set

    @Prop({ required: true })
    weight: number[]; // Array of weight per set

    @Prop()
    notes: string;
}

const ExerciseLogSchema = SchemaFactory.createForClass(ExerciseLog);

@Schema({ timestamps: true })
export class WorkoutLog {
    @Prop({ type: Types.ObjectId, ref: 'Plan', required: true })
    planId: Types.ObjectId;

    @Prop({ required: true })
    dayName: string; // Snapshot of the day name

    @Prop({ type: Date, default: Date.now })
    date: Date;

    @Prop({ type: [ExerciseLogSchema], default: [] })
    exercises: ExerciseLog[];
}

export const WorkoutLogSchema = SchemaFactory.createForClass(WorkoutLog);
