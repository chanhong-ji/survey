import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/coreOutput.dto';
import { Choice } from 'src/surveys/entities/choice.entity';

@InputType()
export class GetChoiceInput extends PickType(Choice, ['id'], InputType) {}

@ObjectType()
export class GetChoiceOutput extends CoreOutput {
  @Field((type) => Choice, { nullable: true })
  result?: Choice;
}
