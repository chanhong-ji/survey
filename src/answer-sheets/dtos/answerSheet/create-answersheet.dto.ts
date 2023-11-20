import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsArray, IsInt } from 'class-validator';
import { AnswerSheet } from 'src/answer-sheets/entities/answerSheet.entity';
import { CoreOutput } from 'src/common/dtos/coreOutput.dto';

@InputType()
export class AnswerInput {
  @Field((type) => Int)
  questionId: number;

  @Field((type) => Int)
  choiceId: number;
}

@InputType()
export class CreateAnswerSheetInput {
  @Field((type) => Int)
  @IsInt()
  surveyId: number;

  @Field((type) => [AnswerInput], { nullable: true })
  @IsArray()
  answers?: AnswerInput[];
}

@ObjectType()
export class CreateAnswerSheetOutput extends CoreOutput {
  @Field((type) => AnswerSheet, { nullable: true })
  result?: AnswerSheet;
}
