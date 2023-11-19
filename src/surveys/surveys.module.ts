import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsResolver, SurveysResolver } from './surveys.resolver';
import { QuestionsService, SurveysService } from './surveys.service';
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
  ],
})
export class SurveysModule {}
