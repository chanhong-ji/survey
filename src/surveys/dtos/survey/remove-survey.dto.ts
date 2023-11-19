import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Survey } from '../../entities/survey.entity';
import { CoreOutput } from 'src/common/dtos/coreOutput.dto';

@InputType()
export class RemoveSurveyInput extends PickType(Survey, ['id'], InputType) {}

@ObjectType()
export class RemoveSurveyOutput extends CoreOutput {}
