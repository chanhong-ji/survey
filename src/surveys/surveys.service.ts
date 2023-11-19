import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Survey } from './entities/survey.entity';
import { Question } from './entities/question.entity';
import { UpdateSurveyInput } from './dtos/survey/update-survey.dto';
import { CreateSurveyInput } from './dtos/survey/create-survey.dto';
import { CreateQuestionInput } from './dtos/question/create-question.dto';
import { UpdateQuestionInput } from './dtos/question/update-question.dto';

@Injectable()
export class SurveysService {
  constructor(
    @InjectRepository(Survey) private readonly repo: Repository<Survey>,
    private readonly configService: ConfigService,
  ) {}

  async findOneWithDetail(id: number): Promise<Survey | null> {
    return this.repo.findOne({
      where: { id },
      relations: { questions: true },
      select: { questions: true },
      order: { questions: { order: 'ASC' } },
    });
  }

  async findOneById(id: number): Promise<Survey | null> {
    return this.repo.findOne({ where: { id } });
  }

  async create(data: CreateSurveyInput): Promise<Survey> {
    const survey = this.repo.create(data);
    return this.repo.save(survey);
  }

  async findAll(page: number): Promise<Survey[]> {
    const pageSize = this.configService.get('constants.surveys.pageSize');
    return this.repo.find({
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
  }

  async update(
    survey: Survey,
    data: Omit<UpdateSurveyInput, 'id'>,
  ): Promise<Survey> {
    return this.repo.save({ ...survey, ...data });
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question) private readonly repo: Repository<Question>,
  ) {}

  async findOneWithDetail(id: number): Promise<Question | null> {
    return this.repo.findOne({
      where: { id },
      relations: { choices: true },
    });
  }

  async findOneById(id: number): Promise<Question | null> {
    return this.repo.findOne({ where: { id } });
  }

  async create(data: CreateQuestionInput): Promise<Question> {
    return this.repo.save(
      this.repo.create({ survey: { id: data.surveyId }, ...data }),
    );
  }

  async update(
    question: Question,
    data: Omit<UpdateQuestionInput, 'id'>,
  ): Promise<Question> {
    return this.repo.save({ ...question, ...data });
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
