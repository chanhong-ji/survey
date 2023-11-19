import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { IsString, IsInt } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Survey } from './survey.entity';
import { Choice } from './choice.entity';

@Entity()
@ObjectType()
@InputType('questionEntity', { isAbstract: true })
export class Question extends CommonEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  content: string;

  @ManyToOne((type) => Survey)
  survey: Survey;

  @Field((type) => Int, { nullable: true })
  @Column({ nullable: true })
  @IsInt()
  order?: number;

  @OneToMany((type) => Choice, (choice) => choice.question, {
    cascade: ['remove'], // 수정
  })
  choices: Choice[];
}
