import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { SurveysService } from '../services/surveys.service';
import { QuestionsService } from '../services/questions.service';
import { Survey } from '../entities/survey.entity';
import { Question } from '../entities/question.entity';
import {
  CreateQuestionInput,
  CreateQuestionOutput,
} from '../dtos/question/create-question.dto';
import {
  GetQuestionInput,
  GetQuestionOutput,
} from '../dtos/question/get-question.dto';
import {
  UpdateQuestionInput,
  UpdateQuestionOutput,
} from '../dtos/question/update-question.dto';
import {
  RemoveQuestionInput,
  RemoveQuestionOutput,
} from '../dtos/question/remove-question.dto';

@Resolver((of) => Question)
export class QuestionsResolver {
  constructor(
    private readonly service: QuestionsService,
    private readonly surveysService: SurveysService,
  ) {}

  @Query((returns) => GetQuestionOutput)
  async getQuestion(
    @Args('input') input: GetQuestionInput,
  ): Promise<GetQuestionOutput> {
    const question = await this.service.findOneWithDetail(input.id);

    if (question == null) throw new NotFoundException('Question not found');

    return { ok: question != null, result: question };
  }

  @Mutation((returns) => CreateQuestionOutput)
  async createQuestion(
    @Args('input') input: CreateQuestionInput,
  ): Promise<CreateQuestionOutput> {
    await this.findSurveyById(input.surveyId);

    const question = await this.service.create(input);

    return { ok: question != null, result: question };
  }

  @Mutation((returns) => UpdateQuestionOutput)
  async updateQuestion(
    @Args('input') { id, ...data }: UpdateQuestionInput,
  ): Promise<UpdateQuestionOutput> {
    const question = await this.findOneById(id);

    const updatedQuestion = await this.service.update(question, data);

    return { ok: updatedQuestion != null, result: updatedQuestion };
  }

  @Mutation((returns) => RemoveQuestionOutput)
  async removeQuestion(
    @Args('input') { id }: RemoveQuestionInput,
  ): Promise<RemoveQuestionOutput> {
    await this.findOneById(id);
    const result = await this.service.remove(id);
    return { ok: result.affected !== 0 };
  }

  // internal-use-only function
  private async findOneById(id: number): Promise<Question> {
    const question = await this.service.findOneById(id);

    if (question == null) throw new NotFoundException('Question not found');

    return question;
  }

  private async findSurveyById(id: number): Promise<Survey> {
    const survey = await this.surveysService.findOneById(id);

    if (survey == null) {
      throw new NotFoundException('Survey not found');
    }

    return survey;
  }
}
