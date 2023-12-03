import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { Question } from '../entities/question.entity';
import { Choice } from '../entities/choice.entity';
import { ChoicesService } from '../services/choices.service';
import { QuestionsService } from '../services/questions.service';
import { GetChoiceInput, GetChoiceOutput } from '../dtos/choice/get-choice.dto';
import {
  CreateChoiceInput,
  CreateChoiceOutput,
} from '../dtos/choice/create-choice.dto';
import {
  UpdateChoiceInput,
  UpdateChoiceOutput,
} from '../dtos/choice/update-choice.dto';
import {
  RemoveChoiceInput,
  RemoveChoiceOutput,
} from '../dtos/choice/remove- choice.dto';

@Resolver((of) => Choice)
export class ChoicesResolver {
  constructor(
    private readonly service: ChoicesService,
    private readonly questionsService: QuestionsService,
  ) {}

  @Query((returns) => GetChoiceOutput)
  async getChoice(
    @Args('input') input: GetChoiceInput,
  ): Promise<GetChoiceOutput> {
    const choice = await this.findOneById(input.id);

    return { ok: choice != null, result: choice };
  }

  @Mutation((returns) => CreateChoiceOutput)
  async createChoice(
    @Args('input') input: CreateChoiceInput,
  ): Promise<CreateChoiceOutput> {
    await this.findQuestionById(input.questionId);

    const choice = await this.service.create(input);

    return { ok: choice != null, result: choice };
  }

  @Mutation((returns) => UpdateChoiceOutput)
  async updateChoice(
    @Args('input') { id, ...data }: UpdateChoiceInput,
  ): Promise<UpdateChoiceOutput> {
    const choice = await this.findOneById(id);

    const updatedChoice = await this.service.update(choice, data);

    return { ok: updatedChoice != null, result: updatedChoice };
  }

  @Mutation((returns) => RemoveChoiceOutput)
  async removeChoice(
    @Args('input') { id }: RemoveChoiceInput,
  ): Promise<RemoveChoiceOutput> {
    await this.findOneById(id);
    const result = await this.service.remove(id);
    return { ok: result.affected !== 0 };
  }

  // internal-use-only function
  private async findOneById(id: number): Promise<Choice> {
    const choice = await this.service.findOneById(id);

    if (choice == null) throw new NotFoundException('Choice not found');

    return choice;
  }

  private async findQuestionById(id: number): Promise<Question> {
    const question = await this.questionsService.findOneById(id);

    if (question == null) {
      throw new NotFoundException('Question not found');
    }

    return question;
  }
}
