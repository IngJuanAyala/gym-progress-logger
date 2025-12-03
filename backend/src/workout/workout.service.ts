import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { WorkoutLog, WorkoutLogDocument } from '../schemas/workout-log.schema';

@Injectable()
export class WorkoutService {
    constructor(@InjectModel(WorkoutLog.name) private workoutLogModel: Model<WorkoutLogDocument>) { }

    async create(createWorkoutDto: CreateWorkoutDto): Promise<WorkoutLog> {
        const createdWorkout = new this.workoutLogModel(createWorkoutDto);
        return createdWorkout.save();
    }

    async findAll(): Promise<WorkoutLog[]> {
        return this.workoutLogModel.find().sort({ date: -1 }).exec();
    }

    async findOne(id: string): Promise<WorkoutLog> {
        const workout = await this.workoutLogModel.findById(id).exec();
        if (!workout) {
            throw new NotFoundException(`Workout with ID ${id} not found`);
        }
        return workout;
    }

    async findByPlan(planId: string): Promise<WorkoutLog[]> {
        return this.workoutLogModel.find({ planId }).sort({ date: -1 }).exec();
    }

    async update(id: string, updateWorkoutDto: UpdateWorkoutDto): Promise<WorkoutLog> {
        const updatedWorkout = await this.workoutLogModel.findByIdAndUpdate(id, updateWorkoutDto, { new: true }).exec();
        if (!updatedWorkout) {
            throw new NotFoundException(`Workout with ID ${id} not found`);
        }
        return updatedWorkout;
    }

    async remove(id: string): Promise<WorkoutLog> {
        const deletedWorkout = await this.workoutLogModel.findByIdAndDelete(id).exec();
        if (!deletedWorkout) {
            throw new NotFoundException(`Workout with ID ${id} not found`);
        }
        return deletedWorkout;
    }
}
