import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExerciseDocument = HydratedDocument<Exercise>;

@Schema()
export class Exercise {
    @Prop({ required: true })
    name: string;

    @Prop()
    targetSets: number;

    @Prop()
    targetReps: string; // String to allow ranges like "10-12"

    @Prop()
    targetWeight: number; // In kg

    @Prop()
    notes: string;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
