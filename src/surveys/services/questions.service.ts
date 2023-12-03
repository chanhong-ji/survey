import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Question } from '../entities/question.entity';
import { CreateQuestionInput } from '../dtos/question/create-question.dto';
import { UpdateQuestionInput } from '../dtos/question/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question) private readonly repo: Repository<Question>,
  ) {}

  async findOneWithDetail(id: number): Promise<Question | null> {
    return this.repo.findOne({
      where: { id },
      relations: { choices: true },
      order: { choices: { order: 'ASC' } },
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

  async remove(id: number): Promise<DeleteResult> {
    return this.repo.delete(id);
  }
}
