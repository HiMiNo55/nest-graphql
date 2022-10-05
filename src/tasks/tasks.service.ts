import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throws } from 'assert';
import { List } from 'src/lists/entities/list.entity';
import { ListsService } from 'src/lists/lists.service';
import {
  Between,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { CreateTaskInput } from './dto/create-task.input';
import { ReOrderInput } from './dto/reOrder-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    @Inject(forwardRef(() => ListsService))
    private listsService: ListsService,
  ) {}

  async create(createTaskInput: CreateTaskInput) {
    const task = this.tasksRepository.create(createTaskInput);
    task.status = 'New';

    const condition = {
      listId: createTaskInput.listId,
    };

    const count = await this.tasksRepository.countBy(condition);

    task.order = count + 1;

    return this.tasksRepository.save(task);
  }

  findAll() {
    return this.tasksRepository.find();
  }

  findOne(id: number) {
    return this.tasksRepository.findOneBy({ id });
  }

  getTaskByListId(listId: number) {
    return this.tasksRepository.find({
      where: { listId },
      order: { order: 'ASC' },
    });
  }

  async update(id: number, updateTaskInput: UpdateTaskInput) {
    await this.tasksRepository.update(id, updateTaskInput);
    return true;
  }

  async remove(id: number) {
    try {
      await this.tasksRepository.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }

  async reOrderTask(reOrderInput: ReOrderInput) {
    try {
      const task = await this.findOne(reOrderInput.taskId);

      // Case: Move task up
      if (task.order > reOrderInput.newOrder) {
        const condition = {
          listId: task.listId,
          order: MoreThanOrEqual(reOrderInput.newOrder),
        };
        this.tasksRepository.increment(condition, 'order', 1);

        task.order = reOrderInput.newOrder;
        this.tasksRepository.save(task);
      }
      // Case : Move task down
      else if (task.order < reOrderInput.newOrder) {
        const condition = {
          listId: task.listId,
          order: Between(task.order + 1, reOrderInput.newOrder),
        };
        this.tasksRepository.decrement(condition, 'order', 1);

        task.order = reOrderInput.newOrder;
        this.tasksRepository.save(task);
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}
