import { Field, ObjectType, Int } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class Task {
  @Field(type => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  due_date: string;

  @Field()
  status: string;

  @Field(type => Int)
  user_id: number;

  @Field(type => User, { nullable: true })
  user: User;
}
