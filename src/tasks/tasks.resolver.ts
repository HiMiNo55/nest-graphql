import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { List } from 'src/lists/entities/list.entity';
import { ReOrderInput } from './dto/reOrder-task.input';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.tasksService.create(createTaskInput);
  }

  @Query(() => [Task], { name: 'tasks' })
  findAll() {
    return this.tasksService.findAll();
  }

  @Query(() => Task, { name: 'task' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.findOne(id);
  }

  @Mutation(() => Boolean)
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.tasksService.update(updateTaskInput.id, updateTaskInput);
  }

  @Mutation(() => Boolean)
  removeTask(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.remove(id);
  }

  @Mutation(() => Boolean)
  reOrderTask(@Args('reOrderInput') reOrderInput: ReOrderInput) {
    return this.tasksService.reOrderTask(reOrderInput);
  }
}
