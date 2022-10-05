import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class ReOrderInput {
  @Field(() => Int)
  taskId: number;

  @Field(() => Int)
  newOrder: number;
}
