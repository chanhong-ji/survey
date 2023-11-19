import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { Survey } from './entities/survey.entity';
import { GetSurveyInput, GetSurveyOutput } from './dtos/get-survey.dto';
import { GetSurveysInput, GetSurveysOutput } from './dtos/get-surveys.dto';
import {
  CreateSurveyInput,
  CreateSurveyOutput,
} from './dtos/create-survey.dto';
import {
  UpdateSurveyInput,
  UpdateSurveyOutput,
} from './dtos/update-survey.dto';
import {
  RemoveSurveyInput,
  RemoveSurveyOutput,
} from './dtos/remove-survey.dto';

@Resolver((of) => Survey)
export class SurveysResolver {
  constructor(private readonly service: SurveysService) {}

  @Query((returns) => GetSurveyOutput)
  async getSurvey(
    @Args('input') { id }: GetSurveyInput,
  ): Promise<GetSurveyOutput> {
    const survey = await this.findOne(id);
    return { ok: true, result: survey };
  }

  @Query((returns) => GetSurveysOutput)
  async getSurveys(
    @Args('input') { page }: GetSurveysInput,
  ): Promise<GetSurveysOutput> {
    const surveys = await this.service.findAll(page);
    return { ok: true, result: surveys };
  }

  @Mutation((returns) => CreateSurveyOutput)
  async createSurvey(
    @Args('input') input: CreateSurveyInput,
  ): Promise<CreateSurveyOutput> {
    const survey = await this.service.create(input);

    return { ok: true, result: survey };
  }

  @Mutation((returns) => UpdateSurveyOutput)
  async updateSurvey(
    @Args('input') { id, ...input }: UpdateSurveyInput,
  ): Promise<UpdateSurveyOutput> {
    const survey = await this.findOne(id);

    const updatedSurvey = await this.service.update(survey, { ...input });

    return { ok: true, result: updatedSurvey };
  }

  @Mutation((returns) => RemoveSurveyOutput)
  async removeSurvey(
    @Args('input') { id }: RemoveSurveyInput,
  ): Promise<RemoveSurveyOutput> {
    await this.findOne(id);
    await this.service.remove(id);
    return { ok: true };
  }

  async findOne(id: number): Promise<Survey> {
    const survey = await this.service.findOneById(id);

    if (survey == null) {
      throw new NotFoundException('Survey not found');
    }

    return survey;
  }
}
