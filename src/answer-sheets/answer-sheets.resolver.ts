import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { AnswerSheet } from './entities/answerSheet.entity';
import { AnswerSheetsService } from './answer-sheets.service';
import {
  CreateAnswerSheetInput,
  CreateAnswerSheetOutput,
} from './dtos/answerSheet/create-answersheet.dto';
import {
  GetAnswerSheetInput,
  GetAnswerSheetOutput,
} from './dtos/answerSheet/get-answersheet.dto';
import {
  GetAnswerSheetsInput,
  GetAnswerSheetsOutput,
} from './dtos/answerSheet/get-answersheets.dto';
import { Survey } from 'src/surveys/entities/survey.entity';
import {
  RemoveAnswerSheetInput,
  RemoveAnswerSheetOutput,
} from './dtos/answerSheet/remove-answersheet.dto';

@Resolver((of) => AnswerSheet)
export class AnswerSheetsResolver {
  constructor(private readonly service: AnswerSheetsService) {}

  @Mutation((returns) => CreateAnswerSheetOutput)
  async createAnswerSheet(
    @Args('input') { surveyId, answers }: CreateAnswerSheetInput,
  ): Promise<CreateAnswerSheetOutput> {
    await this.findSurveyById(surveyId);

    const answerSheet = await this.service.create(surveyId, answers);

    return { ok: answerSheet != null, result: answerSheet };
  }

  @Query((returns) => GetAnswerSheetOutput)
  async getAnswerSheet(
    @Args('input') { id }: GetAnswerSheetInput,
  ): Promise<GetAnswerSheetOutput> {
    const answerSheet = await this.service.findOneWithDetail(id);

    if (answerSheet == null)
      throw new NotFoundException('AnswerSheet not found');

    const totalScore = answerSheet.answers
      .map((answer) => answer.choice.score)
      .reduce((prev, curr) => prev + curr, 0);

    answerSheet.totalScore = totalScore;

    return { ok: answerSheet != null, result: answerSheet };
  }

  @Query((returns) => GetAnswerSheetsOutput)
  async getAnswerSheets(
    @Args('input') { page, surveyId }: GetAnswerSheetsInput,
  ): Promise<GetAnswerSheetsOutput> {
    await this.findSurveyById(surveyId);

    const answerSheets = await this.service.findAll(surveyId, page);

    return { ok: answerSheets != null, result: answerSheets };
  }

  @Mutation((returns) => RemoveAnswerSheetOutput)
  async removeAnswerSheet(
    @Args('input') { id }: RemoveAnswerSheetInput,
  ): Promise<RemoveAnswerSheetOutput> {
    await this.findOneById(id);

    const result = await this.service.remove(id);

    return { ok: result.affected !== 0 };
  }

  // internal-use-only function
  async findOneById(id: number): Promise<AnswerSheet> {
    const answerSheet = await this.service.findOneById(id);

    if (answerSheet == null) {
      throw new NotFoundException('AnswerSheet not found');
    }

    return answerSheet;
  }

  async findSurveyById(id: number): Promise<Survey> {
    const survey = await this.service.findSurveyById(id);

    if (survey == null) {
      throw new NotFoundException('Survey not found');
    }

    return survey;
  }
}
