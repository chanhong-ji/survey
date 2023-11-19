import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveysResolver } from './surveys.resolver';
import { SurveysService } from './surveys.service';
import { Survey } from './entities/survey.entity';
import { Question } from './entities/question.entity';
import { Choice } from './entities/choice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Survey, Question, Choice])],
  providers: [SurveysResolver, SurveysService],
})
export class SurveysModule {}
