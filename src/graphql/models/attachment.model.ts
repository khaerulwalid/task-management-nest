import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Task } from './task.model';

@ObjectType()
export class Attachment {
  @Field(type => Int)
  id: number;

  @Field()
  file_path: string;

  @Field(type => Int)
  task_id: number;

  @Field(type => Task, { nullable: true })
  task: Task;
}
