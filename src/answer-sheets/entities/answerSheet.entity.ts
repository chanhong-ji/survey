import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  ManyToOne,
  OneToMany,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Answer } from './answer.entity';
import { Survey } from 'src/surveys/entities/survey.entity';

@Entity()
@ObjectType()
@InputType('answerSheetEntity', { isAbstract: true })
export class AnswerSheet extends CommonEntity {
  @ManyToOne((type) => Survey, { nullable: true, onDelete: 'SET NULL' })
  survey?: Survey;

  @RelationId((answerSheet: AnswerSheet) => answerSheet.survey)
  @Field((type) => Int, { nullable: true })
  surveyId?: number;

  @Field((type) => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field((type) => [Answer], { nullable: true })
  @OneToMany((type) => Answer, (answer) => answer.answerSheet, {
    onDelete: 'CASCADE',
  })
  answers: Answer[];

  @Field((type) => Number, { nullable: true })
  totalScore: number;
}
