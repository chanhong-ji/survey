import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { Question } from 'src/surveys/entities/question.entity';
import { CoreOutput } from 'src/common/dtos/coreOutput.dto';

@InputType()
export class UpdateQuestionInput extends PartialType(
  PickType(Question, ['content', 'order'], InputType),
  InputType,
) {
  @Field((type) => Int)
  @IsInt()
  id: number;
}

@ObjectType()
export class UpdateQuestionOutput extends CoreOutput {
  @Field((type) => Question, { nullable: true })
  result?: Question;
}
