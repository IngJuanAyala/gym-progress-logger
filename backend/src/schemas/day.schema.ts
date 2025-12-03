import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Exercise, ExerciseSchema } from './exercise.schema';

export type DayDocument = HydratedDocument<Day>;

@Schema()
export class Day {
    @Prop({ required: true })
    name: string; // e.g., "Leg Day", "Push Day"

    @Prop({ type: [ExerciseSchema], default: [] })
    exercises: Exercise[];
}

export const DaySchema = SchemaFactory.createForClass(Day);
