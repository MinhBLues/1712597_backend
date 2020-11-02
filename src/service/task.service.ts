import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTaskDTO } from 'src/dto/update_task.dto';
import { CreateTaskDTO } from '../dto/create_task.dto';
import { Task } from '../entity/task.entity';
import { TaskRepository } from '../reponsitory/task.responsitory';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskReponsitory: TaskRepository,
    ) { }


    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskReponsitory.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task ${id} not found`)
        }
        return found;
    }

    async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        return this.taskReponsitory.createTask(createTaskDTO);
    }

    async updateTask(id: number, taskDto: UpdateTaskDTO): Promise<Task> {
        return this.taskReponsitory.updateTask(id, taskDto);
    }

    async deleteTask(id: number): Promise<void> {
        const result = await this.taskReponsitory.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Board with id ${id} not found`);
        }
    }
}
