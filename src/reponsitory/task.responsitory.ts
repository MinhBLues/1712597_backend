import { CreateTaskDTO } from "src/dto/create_task.dto";
import { UpdateTaskDTO } from "src/dto/update_task.dto";
import { EntityRepository, Repository } from "typeorm";
import { Task } from "../entity/task.entity";
import { TaskStatus } from "../enum/task-status.enum";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async updateTask(id: number, taskDto: UpdateTaskDTO): Promise<Task> {
        const { status, num_like, description } = taskDto;

        const task = await this.findOne(id);

        task.status = status;
        task.num_like = num_like;
        task.description = description;

        await task.save();
        
        return task;
    }
    async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        const { description, userCreateId, boardId , status} = createTaskDTO;

        const task = new Task();
        task.description = description;
        task.userCreateId = userCreateId;
        task.boardId = boardId;
        task.num_like = 0;
        task.status = status;
        await task.save();

        return task;
    }

    async getTasks(boardId: number): Promise<Task[]> {

        const query = this.createQueryBuilder('task');
        query.where('task.boardId = :boardId', { boardId: boardId });
        const tasks = await query.getMany();
        return tasks;


    }
}