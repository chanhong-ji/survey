import { Test, TestingModule } from '@nestjs/testing';
import { SurveysController } from '../surveys.resolver';

describe('SurveysController', () => {
  let controller: SurveysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveysController],
    }).compile();

    controller = module.get<SurveysController>(SurveysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
