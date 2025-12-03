import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';
import { WorkoutLog, WorkoutLogSchema } from '../schemas/workout-log.schema';
import { Plan, PlanSchema } from '../schemas/plan.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkoutLog.name, schema: WorkoutLogSchema },
      { name: Plan.name, schema: PlanSchema },
    ]),
  ],
  controllers: [WorkoutController],
  providers: [WorkoutService]
})
export class WorkoutModule { }
