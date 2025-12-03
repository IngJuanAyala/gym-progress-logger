import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTrainingPlanDto } from './dto/create-training-plan.dto';
import { UpdateTrainingPlanDto } from './dto/update-training-plan.dto';
import { Plan, PlanDocument } from '../schemas/plan.schema';

@Injectable()
export class TrainingPlanService {
    constructor(@InjectModel(Plan.name) private planModel: Model<PlanDocument>) { }

    async create(createTrainingPlanDto: CreateTrainingPlanDto): Promise<Plan> {
        const createdPlan = new this.planModel(createTrainingPlanDto);
        return createdPlan.save();
    }

    async findAll(): Promise<Plan[]> {
        return this.planModel.find().exec();
    }

    async findOne(id: string): Promise<Plan> {
        const plan = await this.planModel.findById(id).exec();
        if (!plan) {
            throw new NotFoundException(`Plan with ID ${id} not found`);
        }
        return plan;
    }

    async update(id: string, updateTrainingPlanDto: UpdateTrainingPlanDto): Promise<Plan> {
        const updatedPlan = await this.planModel.findByIdAndUpdate(id, updateTrainingPlanDto, { new: true }).exec();
        if (!updatedPlan) {
            throw new NotFoundException(`Plan with ID ${id} not found`);
        }
        return updatedPlan;
    }

    async remove(id: string): Promise<Plan> {
        const deletedPlan = await this.planModel.findByIdAndDelete(id).exec();
        if (!deletedPlan) {
            throw new NotFoundException(`Plan with ID ${id} not found`);
        }
        return deletedPlan;
    }
}
