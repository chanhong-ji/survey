import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { Answer } from 'src/answer-sheets/entities/answer.entity';
import { CoreOutput } from 'src/common/dtos/coreOutput.dto';

@InputType()
export class UpdateAnswerInput {
  @Field((type) => Int)
  @IsInt()
  choiceId: number;

  @Field((type) => Int)
  @IsInt()
  answersheetId: number;

  @Field((type) => Int)
  @IsInt()
  questionId: number;
}

@ObjectType()
export class UpdateAnswerOutput extends CoreOutput {
  @Field((type) => Answer, { nullable: true })
  result?: Answer;
}
