import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from '../dto/create_task.dto';
import { Task } from '../entity/task.entity';
import { TaskRepository } from '../reponsitory/task.responsitory';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository (TaskRepository)
        private taskReponsitory: TaskRepository,
    ){}


    async getTaskById(id: number): Promise<Task>{
        const found = await this.taskReponsitory.findOne(id);
        if(!found)
        {
            throw new NotFoundException(`Task ${id} not found`)
        }
        return found;
    }

    async createTask(createTaskDTO: CreateTaskDTO): Promise<Task>{
        return this.taskReponsitory.createTask(createTaskDTO);
    }
    // getAllTasks():Task[]{
    //     return this.tasks;
    // }

    // createTask(title:string, description:string):Task{
    //     const task : Task = {
    //         id: uuid(), 
    //         title: title, 
    //         description:description,
    //         status: TaskStatus.OPEN
    //     };
    //     this.tasks.push(task);
    //     return task;
    // }
}
