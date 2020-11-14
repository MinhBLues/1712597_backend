import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator'
export class StatusTaskDTO{
    @IsNotEmpty()
    @ApiProperty({ type: Number, description: 'status' })
    status: number;
}