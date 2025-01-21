import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
  
    @Field({ nullable: true }) 
    @IsOptional()
    @IsString()
    status?: string;
}
