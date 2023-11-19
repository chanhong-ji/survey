import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { Survey } from '../../entities/survey.entity';
import { CoreOutput } from 'src/common/dtos/coreOutput.dto';

@InputType()
export class UpdateSurveyInput extends PartialType(
  PickType(Survey, ['title'], InputType),
  InputType,
) {
  @Field((type) => Int)
  @IsInt()
  id: number;
}

@ObjectType()
export class UpdateSurveyOutput extends CoreOutput {
  @Field((type) => Survey, { nullable: true })
  result?: Survey;
}
