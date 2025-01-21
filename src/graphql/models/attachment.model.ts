import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Attachment {
  @Field(type => Int)
  id: number;

  @Field()
  filename: string;

  @Field()
  fileUrl: string;

  @Field(type => Int)
  taskId: number;
}
