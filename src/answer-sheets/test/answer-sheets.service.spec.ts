import { Test, TestingModule } from '@nestjs/testing';
import { AnswerSheetsService } from '../answer-sheets.service';

describe('AnswerSheetsService', () => {
  let service: AnswerSheetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerSheetsService],
    }).compile();

    service = module.get<AnswerSheetsService>(AnswerSheetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
