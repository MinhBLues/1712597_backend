import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { StatusTaskDTO } from 'src/dto/update_status_task.dto';
import { UpdateTaskDTO } from 'src/dto/update_task.dto';
import { CreateTaskDTO } from '../dto/create_task.dto';
import { Task } from '../entity/task.entity';
import { TaskService } from '../service/task.service';

@Controller('tasks')
// @UseGuards(AuthGuard())
@ApiBearerAuth()
export class TaskController {
    constructor(private tasksService: TaskService) { }

    @Get('/:id')
    @UseGuards(AuthGuard())
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ description: 'Create success task' })
    createTask(@Body() createTask: CreateTaskDTO): Promise<Task> {
        return this.tasksService.createTask(createTask);
    }

    @Patch('/:id/update')
    updateTask(
        @Param('id', ParseIntPipe) id: number,
        @Body() taskDto: UpdateTaskDTO,): Promise<Task> {
        return this.tasksService.updateTask(id, taskDto);
    }

    @Patch('/:id/updateStatus')
    updateStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body() {status}: StatusTaskDTO,): Promise<void> {
        return this.tasksService.updateStatus(id, status);
    }

    @Delete('/:id/delete')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.deleteTask(id);
    }
}
