import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import {
  ChoicesService,
  QuestionsService,
  SurveysService,
} from './surveys.service';
import { Survey } from './entities/survey.entity';
import { Question } from './entities/question.entity';
import { Choice } from './entities/choice.entity';
import { GetSurveyInput, GetSurveyOutput } from './dtos/survey/get-survey.dto';
import {
  GetSurveysInput,
  GetSurveysOutput,
} from './dtos/survey/get-surveys.dto';
import {
  CreateSurveyInput,
  CreateSurveyOutput,
} from './dtos/survey/create-survey.dto';
import {
  UpdateSurveyInput,
  UpdateSurveyOutput,
} from './dtos/survey/update-survey.dto';
import {
  RemoveSurveyInput,
  RemoveSurveyOutput,
} from './dtos/survey/remove-survey.dto';
import {
  CreateQuestionInput,
  CreateQuestionOutput,
} from './dtos/question/create-question.dto';
import {
  GetQuestionInput,
  GetQuestionOutput,
} from './dtos/question/get-question.dto';
import {
  UpdateQuestionInput,
  UpdateQuestionOutput,
} from './dtos/question/update-question.dto';
import {
  RemoveQuestionInput,
  RemoveQuestionOutput,
} from './dtos/question/remove-question.dto';
import { GetChoiceInput, GetChoiceOutput } from './dtos/choice/get-choice.dto';
import {
  CreateChoiceInput,
  CreateChoiceOutput,
} from './dtos/choice/create-choice.dto';
import {
  UpdateChoiceInput,
  UpdateChoiceOutput,
} from './dtos/choice/update-choice.dto';
import {
  RemoveChoiceInput,
  RemoveChoiceOutput,
} from './dtos/choice/remove- choice.dto';

@Resolver((of) => Survey)
export class SurveysResolver {
  constructor(private readonly service: SurveysService) {}

  @Query((returns) => GetSurveyOutput)
  async getSurvey(
    @Args('input') { id }: GetSurveyInput,
  ): Promise<GetSurveyOutput> {
    const survey = await this.service.findOneWithDetail(id);

    if (survey == null) throw new NotFoundException('Survey not found');

    return { ok: survey != null, result: survey };
  }

  @Query((returns) => GetSurveysOutput)
  async getSurveys(
    @Args('input') { page }: GetSurveysInput,
  ): Promise<GetSurveysOutput> {
    const surveys = await this.service.findAll(page);

    return { ok: surveys != null, result: surveys };
  }

  @Mutation((returns) => CreateSurveyOutput)
  async createSurvey(
    @Args('input') input: CreateSurveyInput,
  ): Promise<CreateSurveyOutput> {
    const survey = await this.service.create(input);

    return { ok: survey != null, result: survey };
  }

  @Mutation((returns) => UpdateSurveyOutput)
  async updateSurvey(
    @Args('input') { id, ...data }: UpdateSurveyInput,
  ): Promise<UpdateSurveyOutput> {
    const survey = await this.findOneById(id);

    const updatedSurvey = await this.service.update(survey, data);

    return { ok: updatedSurvey != null, result: updatedSurvey };
  }

  @Mutation((returns) => RemoveSurveyOutput)
  async removeSurvey(
    @Args('input') { id }: RemoveSurveyInput,
  ): Promise<RemoveSurveyOutput> {
    await this.findOneById(id);
    const result = await this.service.remove(id);
    return { ok: result.affected !== 0 };
  }

  // internal-use-only function
  private async findOneById(id: number): Promise<Survey> {
    const survey = await this.service.findOneById(id);

    if (survey == null) {
      throw new NotFoundException('Survey not found');
    }

    return survey;
  }
}

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
