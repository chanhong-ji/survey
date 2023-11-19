import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ChoicesResolver,
  QuestionsResolver,
  SurveysResolver,
} from './surveys.resolver';
import {
  ChoicesService,
  QuestionsService,
  SurveysService,
} from './surveys.service';
import { Survey } from './entities/survey.entity';
import { Question } from './entities/question.entity';
import { Choice } from './entities/choice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Survey, Question, Choice])],
  providers: [
    SurveysResolver,
    SurveysService,
    QuestionsResolver,
    QuestionsService,
    ChoicesResolver,
    ChoicesService,
  ],
})
export class SurveysModule {}
