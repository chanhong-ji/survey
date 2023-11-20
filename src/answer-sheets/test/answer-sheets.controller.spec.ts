import { Test, TestingModule } from '@nestjs/testing';
import { AnswerSheetsController } from '../answer-sheets.resolver';

describe('AnswerSheetsController', () => {
  let controller: AnswerSheetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswerSheetsController],
    }).compile();

    controller = module.get<AnswerSheetsController>(AnswerSheetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
