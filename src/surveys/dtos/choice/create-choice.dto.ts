import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/coreOutput.dto';
import { Choice } from 'src/surveys/entities/choice.entity';

@InputType()
export class CreateChoiceInput extends PickType(
  Choice,
  ['content', 'score', 'order'],
  InputType,
) {
  @Field((type) => Int)
  @IsInt()
  questionId: number;
}

@ObjectType()
export class CreateChoiceOutput extends CoreOutput {
  @Field((type) => Choice, { nullable: true })
  result?: Choice;
}
