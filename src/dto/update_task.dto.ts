import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator'
import { TaskStatus } from 'src/enum/task-status.enum';
export class UpdateTaskDTO {

    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'description' })
    description: string;

    @IsNotEmpty()
    @ApiProperty({ type: Number, description: 'status' })
    status: TaskStatus.OPEN;

    @IsNotEmpty()
    @ApiProperty({ type: Number, description: 'like' })
    num_like: number;
}