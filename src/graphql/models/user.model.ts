import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Task } from './task.model';

@ObjectType()
export class User {
  @Field(type => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field(type => [Task], { nullable: true })
  tasks?: Task[];
}
