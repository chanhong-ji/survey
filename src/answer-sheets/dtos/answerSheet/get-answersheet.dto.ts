import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { AnswerSheet } from 'src/answer-sheets/entities/answerSheet.entity';
import { CoreOutput } from 'src/common/dtos/coreOutput.dto';

@InputType()
export class GetAnswerSheetInput extends PickType(
  AnswerSheet,
  ['id'],
  InputType,
) {}

@ObjectType()
export class GetAnswerSheetOutput extends CoreOutput {
  @Field((type) => AnswerSheet, { nullable: true })
  result?: AnswerSheet;
}
