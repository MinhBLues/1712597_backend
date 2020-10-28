import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/module/auth.module';
import { TaskRepository } from '../reponsitory/task.responsitory';
import { TaskController } from '../controller/task.controller';
import { TaskService } from '../service/task.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
    AuthModule
  ],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
