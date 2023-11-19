import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Question } from 'src/surveys/entities/question.entity';
import { CoreOutput } from 'src/common/dtos/coreOutput.dto';

@InputType()
export class RemoveQuestionInput extends PickType(
  Question,
  ['id'],
  InputType,
) {}

@ObjectType()
export class RemoveQuestionOutput extends CoreOutput {}
