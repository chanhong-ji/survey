import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/coreOutput.dto';
import { Survey } from '../../entities/survey.entity';

@InputType()
export class GetSurveysInput {
  @Field((type) => Int, { defaultValue: 1 })
  @IsOptional()
  @IsInt()
  page: number;
}

@ObjectType()
export class GetSurveysOutput extends CoreOutput {
  @Field((type) => [Survey], { nullable: true })
  result?: Survey[];
}
