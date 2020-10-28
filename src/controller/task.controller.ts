import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { CreateTaskDTO } from '../dto/create_task.dto';
import { Task } from '../entity/task.entity';
import { TaskService } from '../service/task.service';

@Controller('tasks')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class TaskController {
    constructor(private tasksService: TaskService){}

    @Get('/:id')
    @UseGuards(AuthGuard())
    getTaskById(@Param('id', ParseIntPipe) id:number):Promise<Task>{
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    @ApiOkResponse({description:'Create success task'})
    createTask(@Body() createTask: CreateTaskDTO): Promise<Task>{
        return this.tasksService.createTask(createTask);
    }
}
