import { Test, TestingModule } from '@nestjs/testing';
import { TrainingPlanController } from './training-plan.controller';

describe('TrainingPlanController', () => {
  let controller: TrainingPlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingPlanController],
    }).compile();

    controller = module.get<TrainingPlanController>(TrainingPlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
