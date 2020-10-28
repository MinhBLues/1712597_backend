import { CreateTaskDTO } from "src/dto/create_task.dto";
import { EntityRepository, Repository } from "typeorm";
import { Task } from "../entity/task.entity";
import { TaskStatus } from "../enum/task-status.enum";

@EntityRepository(Task)
export class TaskRepository extends Repository <Task> {
    async createTask(createTaskDTO: CreateTaskDTO): Promise<Task>{
        const {description} = createTaskDTO;

        const task = new Task();
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();

        return task;
    }
}