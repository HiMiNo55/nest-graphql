import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ListsService } from './lists.service';
import { List } from './entities/list.entity';
import { CreateListInput } from './dto/create-list.input';
import { UpdateListInput } from './dto/update-list.input';
import { Task } from 'src/tasks/entities/task.entity';

@Resolver(() => List)
export class ListsResolver {
  constructor(private readonly listsService: ListsService) {}

  @Mutation(() => List)
  createList(@Args('createListInput') createListInput: CreateListInput) {
    return this.listsService.create(createListInput);
  }

  @Query(() => [List], { name: 'lists' })
  findAll() {
    return this.listsService.findAll();
  }

  @Query(() => List, { name: 'list' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.listsService.findOne(id);
  }

  @ResolveField((type) => [Task])
  tasks(@Parent() list: List): Promise<Task[]> {
    return this.listsService.getTasksByListId(list.id);
  }

  @Mutation(() => Boolean)
  updateList(@Args('updateListInput') updateListInput: UpdateListInput) {
    return this.listsService.update(updateListInput.id, updateListInput);
  }

  @Mutation(() => Boolean)
  removeList(@Args('id', { type: () => Int }) id: number) {
    return this.listsService.remove(id);
  }
}
