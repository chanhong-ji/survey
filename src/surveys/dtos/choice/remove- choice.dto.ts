import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/coreOutput.dto';
import { Choice } from 'src/surveys/entities/choice.entity';

@InputType()
export class RemoveChoiceInput extends PickType(Choice, ['id'], InputType) {}

@ObjectType()
export class RemoveChoiceOutput extends CoreOutput {}
