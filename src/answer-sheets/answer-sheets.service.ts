import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Survey } from 'src/surveys/entities/survey.entity';
import { AnswerSheet } from './entities/answerSheet.entity';
import { AnswerInput } from './dtos/answerSheet/create-answersheet.dto';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswerSheetsService {
  constructor(
    @InjectRepository(AnswerSheet)
    private readonly repo: Repository<AnswerSheet>,
    @InjectRepository(Answer)
    private readonly answersRepo: Repository<Answer>,
    @InjectRepository(Survey)
    private readonly surveysRepo: Repository<Survey>,
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(surveyId: number, page: number): Promise<AnswerSheet[]> {
    const pageSize = this.configService.get('constants.answerSheets.pageSize');
    return this.repo.find({
      where: { survey: { id: surveyId } },
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { createdAt: 'DESC' },
    });
  }

  async findOneById(id: number): Promise<AnswerSheet | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findOneWithDetail(id: number): Promise<AnswerSheet | null> {
    return this.repo.findOne({
      where: { id },
      relations: { answers: { question: true, choice: true } },
      order: { answers: { choice: { order: 'ASC' } } },
    });
  }

  async create(surveyId: number, answers: AnswerInput[]): Promise<AnswerSheet> {
    let answerSheet;

    await this.dataSource.transaction(async (manage) => {
      const answerSheetEntity = this.repo.create({ survey: { id: surveyId } });
      answerSheet = await manage.save(answerSheetEntity);

      for (const { questionId, choiceId } of answers) {
        const answerEntity = this.answersRepo.create({
          answerSheet: { id: answerSheet.id },
          question: { id: questionId },
          choice: { id: choiceId },
        });
        await manage.save([answerEntity]);
      }
    });

    return answerSheet;
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.repo.delete(id);
  }

  async findSurveyById(id: number): Promise<Survey | null> {
    return this.surveysRepo.findOne({ where: { id } });
  }

  async findAnswerByIds(
    answersheetId: number,
    questionId: number,
  ): Promise<Answer | null> {
    return this.answersRepo.findOne({
      where: { answersheet_id: answersheetId, question_id: questionId },
    });
  }

  async updateAnswer(answer: Answer, choiceId): Promise<Answer> {
    return this.answersRepo.save({ ...answer, choice: { id: choiceId } });
  }
}
