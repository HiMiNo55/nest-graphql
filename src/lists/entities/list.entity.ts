import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Task } from 'src/tasks/entities/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class List {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @OneToMany(() => Task, (task) => task.list)
  @Field((type) => [Task], { nullable: true })
  tasks?: Task[];
}
