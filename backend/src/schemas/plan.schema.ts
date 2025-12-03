import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Day, DaySchema } from './day.schema';

export type PlanDocument = HydratedDocument<Plan>;

@Schema({ timestamps: true })
export class Plan {
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ type: [DaySchema], default: [] })
    days: Day[];

    @Prop({ default: true })
    isActive: boolean;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
