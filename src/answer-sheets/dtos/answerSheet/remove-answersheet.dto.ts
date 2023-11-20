import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { AnswerSheet } from 'src/answer-sheets/entities/answerSheet.entity';
import { CoreOutput } from 'src/common/dtos/coreOutput.dto';

@InputType()
export class RemoveAnswerSheetInput extends PickType(
  AnswerSheet,
  ['id'],
  InputType,
) {}

@ObjectType()
export class RemoveAnswerSheetOutput extends CoreOutput {}
