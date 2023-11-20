import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerSheetsResolver } from './answer-sheets.resolver';
import { AnswerSheetsService } from './answer-sheets.service';
import { AnswerSheet } from './entities/answerSheet.entity';
import { Answer } from './entities/answer.entity';
import { Survey } from 'src/surveys/entities/survey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerSheet, Answer, Survey])],
  providers: [AnswerSheetsResolver, AnswerSheetsService],
})
export class AnswerSheetsModule {}
