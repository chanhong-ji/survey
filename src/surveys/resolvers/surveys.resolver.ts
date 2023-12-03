import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { SurveysService } from '../services/surveys.service';
import { Survey } from '../entities/survey.entity';
import { GetSurveyInput, GetSurveyOutput } from '../dtos/survey/get-survey.dto';
import {
  GetSurveysInput,
  GetSurveysOutput,
} from '../dtos/survey/get-surveys.dto';
import {
  CreateSurveyInput,
  CreateSurveyOutput,
} from '../dtos/survey/create-survey.dto';
import {
  UpdateSurveyInput,
  UpdateSurveyOutput,
} from '../dtos/survey/update-survey.dto';
import {
  RemoveSurveyInput,
  RemoveSurveyOutput,
} from '../dtos/survey/remove-survey.dto';

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
