import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class TaskInputDto {
    @Field()
    @IsNotEmpty()
    @IsString()
    title: string;
  
    @Field()
    @IsNotEmpty()
    @IsString()
    description: string;
  
    @Field()
    @IsNotEmpty()
    due_date: string;
  
    @Field()
    @IsNotEmpty()
    @IsString()
    status: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    user_id: number;
}
