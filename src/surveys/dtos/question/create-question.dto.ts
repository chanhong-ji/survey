import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/coreOutput.dto';
import { Question } from 'src/surveys/entities/question.entity';

@InputType()
export class CreateQuestionInput extends PickType(
  Question,
  ['content', 'order'],
  InputType,
) {
  @Field((type) => Int)
  @IsInt()
  surveyId: number;
}

@ObjectType()
export class CreateQuestionOutput extends CoreOutput {
  @Field((type) => Question, { nullable: true })
  result?: Question;
}
