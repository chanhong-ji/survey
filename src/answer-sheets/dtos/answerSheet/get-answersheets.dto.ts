import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';
import { AnswerSheet } from 'src/answer-sheets/entities/answerSheet.entity';
import { CoreOutput } from 'src/common/dtos/coreOutput.dto';

@InputType()
export class GetAnswerSheetsInput {
  @Field((type) => Int, { defaultValue: 1 })
  @IsOptional()
  @IsInt()
  page: number;

  @Field((type) => Int)
  @IsInt()
  surveyId: number;
}

@ObjectType()
export class GetAnswerSheetsOutput extends CoreOutput {
  @Field((type) => [AnswerSheet], { nullable: true })
  result?: AnswerSheet[];
}
