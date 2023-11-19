import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/coreOutput.dto';
import { Question } from 'src/surveys/entities/question.entity';

@InputType()
export class GetQuestionInput extends PickType(Question, ['id'], InputType) {}

@ObjectType()
export class GetQuestionOutput extends CoreOutput {
  @Field((type) => Question, { nullable: true })
  result?: Question;
}
