import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DeleteResult, Repository } from 'typeorm';
import { Survey } from '../entities/survey.entity';
import { UpdateSurveyInput } from '../dtos/survey/update-survey.dto';
import { CreateSurveyInput } from '../dtos/survey/create-survey.dto';

@Injectable()
export class SurveysService {
  constructor(
    @InjectRepository(Survey) private readonly repo: Repository<Survey>,
    private readonly configService: ConfigService,
  ) {}

  async findOneWithDetail(id: number): Promise<Survey | null> {
    return this.repo.findOne({
      where: { id },
      relations: { questions: { choices: true } },
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
      order: { createdAt: 'DESC' },
    });
  }

  async update(
    survey: Survey,
    data: Omit<UpdateSurveyInput, 'id'>,
  ): Promise<Survey> {
    return this.repo.save({ ...survey, ...data });
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.repo.delete(id);
  }
}
