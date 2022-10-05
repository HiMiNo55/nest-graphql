import { forwardRef, Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { ListsModule } from 'src/lists/lists.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), forwardRef(() => ListsModule)],
  providers: [TasksResolver, TasksService],
  exports: [TasksService],
})
export class TasksModule {}
