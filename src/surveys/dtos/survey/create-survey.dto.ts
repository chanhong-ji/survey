import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Survey } from '../../entities/survey.entity';
import { CoreOutput } from 'src/common/dtos/coreOutput.dto';

@InputType()
export class CreateSurveyInput extends PickType(Survey, ['title'], InputType) {}

@ObjectType()
export class CreateSurveyOutput extends CoreOutput {
  @Field((type) => Survey, { nullable: true })
  result?: Survey;
}
