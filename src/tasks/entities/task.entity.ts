import { ObjectType, Field, Int } from '@nestjs/graphql';
import { List } from 'src/lists/entities/list.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  status: string;

  @Column()
  @Field((type) => Int)
  listId: number;

  @ManyToOne(() => List, (list) => list.tasks)
  @Field((type) => List)
  list: List;

  @Column()
  @Field(() => Int)
  order: number;
}
