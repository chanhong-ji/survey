import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { Question } from './entities/question.entity';
import { Choice } from './entities/choice.entity';
import { SurveysResolver } from './resolvers/surveys.resolver';
import { QuestionsResolver } from './resolvers/questions.resolver';
import { ChoicesResolver } from './resolvers/choices.resolver';
import { SurveysService } from './services/surveys.service';
import { QuestionsService } from './services/questions.service';
import { ChoicesService } from './services/choices.service';

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
