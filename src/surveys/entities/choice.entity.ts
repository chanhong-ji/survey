import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IsString, IsInt, IsNumber } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Question } from './question.entity';

@Entity()
@ObjectType()
@InputType('choiceEntity', { isAbstract: true })
export class Choice extends CommonEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  content: string;

  @Field((type) => Int, { nullable: true })
  @Column({ nullable: true })
  @IsInt()
  order: number;

  @Field((type) => Number)
  @Column()
  @IsNumber()
  score: number;

  @ManyToOne((type) => Question, (question) => question.choices)
  question: Question;
}
