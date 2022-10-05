import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { TasksService } from 'src/tasks/tasks.service';
import { Repository } from 'typeorm';
import { CreateListInput } from './dto/create-list.input';
import { UpdateListInput } from './dto/update-list.input';
import { List } from './entities/list.entity';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List) private listsRepository: Repository<List>,
    private taskService: TasksService,
  ) {}

  create(createListInput: CreateListInput) {
    const list = this.listsRepository.create(createListInput);
    return this.listsRepository.save(list);
  }

  findAll() {
    return this.listsRepository.find();
  }

  findOne(id: number) {
    return this.listsRepository.findOneBy({ id });
  }

  getTasksByListId(listId: number): Promise<Task[]> {
    return this.taskService.getTaskByListId(listId);
  }

  update(id: number, updateListInput: UpdateListInput) {
    return this.listsRepository.update(updateListInput.id, updateListInput);
  }

  async remove(id: number) {
    try {
      await this.listsRepository.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
