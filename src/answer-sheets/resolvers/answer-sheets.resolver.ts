import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AnswerSheet } from '../entities/answerSheet.entity';
import { Answer } from '../entities/answer.entity';
import { AnswerSheetsService } from '../services/answer-sheets.service';
import {
  CreateAnswerSheetInput,
  CreateAnswerSheetOutput,
} from '../dtos/answerSheet/create-answersheet.dto';
import {
  GetAnswerSheetInput,
  GetAnswerSheetOutput,
} from '../dtos/answerSheet/get-answersheet.dto';
import {
  GetAnswerSheetsInput,
  GetAnswerSheetsOutput,
} from '../dtos/answerSheet/get-answersheets.dto';
import { Survey } from 'src/surveys/entities/survey.entity';
import {
  RemoveAnswerSheetInput,
  RemoveAnswerSheetOutput,
} from '../dtos/answerSheet/remove-answersheet.dto';
import {
  UpdateAnswerInput,
  UpdateAnswerOutput,
} from '../dtos/answer/update-answer.dto';

@Resolver((of) => AnswerSheet)
export class AnswerSheetsResolver {
  constructor(private readonly service: AnswerSheetsService) {}

  @Mutation((returns) => CreateAnswerSheetOutput)
  async createAnswerSheet(
    @Args('input') { surveyId, answers }: CreateAnswerSheetInput,
  ): Promise<CreateAnswerSheetOutput> {
    await this.findSurveyById(surveyId);

    let answerSheet;

    answerSheet = await this.service
      .create(surveyId, answers)
      .catch((error) => {
        if (error instanceof QueryFailedError) {
          throw new UnprocessableEntityException('Foreign key constraints');
        } else {
          throw error;
        }
      });

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

  @Mutation((returns) => UpdateAnswerOutput)
  async updateAnswer(
    @Args('input') { answersheetId, questionId, choiceId }: UpdateAnswerInput,
  ): Promise<UpdateAnswerOutput> {
    const answer = await this.findAnswerByIds(answersheetId, questionId);

    const updatedAnswer = await this.service.updateAnswer(answer, choiceId);

    return { ok: updatedAnswer != null, result: updatedAnswer };
  }

  // internal-use-only function
  private async findOneById(id: number): Promise<AnswerSheet> {
    const answerSheet = await this.service.findOneById(id);

    if (answerSheet == null) {
      throw new NotFoundException('AnswerSheet not found');
    }

    return answerSheet;
  }

  private async findAnswerByIds(
    answersheetId: number,
    questionId: number,
  ): Promise<Answer> {
    const answer = await this.service.findAnswerByIds(
      answersheetId,
      questionId,
    );

    if (answer == null) {
      throw new NotFoundException('Answer not found');
    }

    return answer;
  }

  private async findSurveyById(id: number): Promise<Survey> {
    const survey = await this.service.findSurveyById(id);

    if (survey == null) {
      throw new NotFoundException('Survey not found');
    }

    return survey;
  }
}
