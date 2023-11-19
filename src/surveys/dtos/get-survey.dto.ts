import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Survey } from '../entities/survey.entity';
import { CoreOutput } from 'src/common/dtos/coreOutput.dto';

@InputType()
export class GetSurveyInput extends PickType(Survey, ['id'], InputType) {}

@ObjectType()
export class GetSurveyOutput extends CoreOutput {
  @Field((type) => Survey)
  result: Survey;
}
