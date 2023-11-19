import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, CreateDateColumn, Entity } from 'typeorm';
import { IsInt } from 'class-validator';

@ObjectType()
@Entity()
export class CommonEntity {
  @PrimaryGeneratedColumn('increment')
  @Field((type) => Int)
  @IsInt()
  id: number;

  @CreateDateColumn()
  @Field((type) => Date)
  createdAt: Date;
}
