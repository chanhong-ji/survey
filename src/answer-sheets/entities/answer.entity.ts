import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  RelationId,
} from 'typeorm';
import { AnswerSheet } from './answerSheet.entity';
import { Question } from 'src/surveys/entities/question.entity';
import { Choice } from 'src/surveys/entities/choice.entity';

@Entity()
@ObjectType()
@InputType('answerEntity', { isAbstract: true })
export class Answer {
  @PrimaryColumn()
  answersheet_id: number;

  @PrimaryColumn()
  question_id: number;

  @ManyToOne((type) => AnswerSheet, (answerSheet) => answerSheet.answers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'answersheet_id', referencedColumnName: 'id' })
  answerSheet: AnswerSheet;

  @ManyToOne((type) => Question, {
    onDelete: 'CASCADE',
  })
  @Field((type) => Question)
  @JoinColumn({ name: 'question_id', referencedColumnName: 'id' })
  question: Question;

  @ManyToOne((type) => Choice, { onDelete: 'CASCADE' })
  @Field((type) => Choice, { nullable: true })
  choice: Choice;

  @RelationId((answer: Answer) => answer.choice)
  @Field((type) => Int)
  choiceId: number;

  @CreateDateColumn()
  @Field((type) => Date)
  createdAt: Date;
}
