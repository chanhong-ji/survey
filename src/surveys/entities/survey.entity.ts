import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, UpdateDateColumn } from 'typeorm';
import { IsString } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';

@Entity()
@ObjectType()
@InputType('surveyEntity', { isAbstract: true })
export class Survey extends CommonEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  title: string;

  @Field((type) => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
