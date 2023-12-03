import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Choice } from '../entities/choice.entity';
import { CreateChoiceInput } from '../dtos/choice/create-choice.dto';
import { UpdateChoiceInput } from '../dtos/choice/update-choice.dto';

@Injectable()
export class ChoicesService {
  constructor(
    @InjectRepository(Choice) private readonly repo: Repository<Choice>,
  ) {}

  async findOneById(id: number): Promise<Choice | null> {
    return this.repo.findOne({ where: { id } });
  }

  async create(data: CreateChoiceInput): Promise<Choice> {
    return this.repo.save(
      this.repo.create({ question: { id: data.questionId }, ...data }),
    );
  }

  async update(
    choice: Choice,
    data: Omit<UpdateChoiceInput, 'id'>,
  ): Promise<Choice> {
    return this.repo.save({ ...choice, ...data });
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.repo.delete(id);
  }
}
