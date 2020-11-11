import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator'
export class CreateTaskDTO{
    @IsNotEmpty()
    @ApiProperty({type:Number , description:'user create'})
    userCreateId: number;

    @IsNotEmpty()
    @ApiProperty({type:String , description:'description'})
    description:string;

    @IsNotEmpty()
    @ApiProperty({type:Number, description: 'boardId'})
    boardId: number;

    @IsNotEmpty()
    @ApiProperty({ type: Number, description: 'status' })
    status: number;
}