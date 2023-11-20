import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { Answer } from 'src/answer-sheets/entities/answer.entity';
import { CoreOutput } from 'src/common/dtos/coreOutput.dto';

@InputType()
export class CreateAnswerInput {
  @Field((type) => Int)
  @IsInt()
  answerSheetId: number;

  @Field((type) => Int)
  @IsInt()
  questionId: number;

  @Field((type) => Int)
  @IsInt()
  choiceId: number;
}

@ObjectType()
export class CreateAnswerOutput extends CoreOutput {
  @Field((type) => Answer, { nullable: true })
  result?: Answer;
}
