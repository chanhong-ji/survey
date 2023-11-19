import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { Choice } from 'src/surveys/entities/choice.entity';
import { CoreOutput } from 'src/common/dtos/coreOutput.dto';

@InputType()
export class UpdateChoiceInput extends PartialType(
  PickType(Choice, ['content', 'order', 'score'], InputType),
  InputType,
) {
  @Field((type) => Int)
  @IsInt()
  id: number;
}

@ObjectType()
export class UpdateChoiceOutput extends CoreOutput {
  @Field((type) => Choice, { nullable: true })
  result?: Choice;
}
