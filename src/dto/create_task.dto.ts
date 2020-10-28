import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator'
export class CreateTaskDTO{
    // @IsNotEmpty()
    // @ApiProperty({type:String , description:'title'})
    // title:string;

    @IsNotEmpty()
    @ApiProperty({type:String , description:'description'})
    description:string;
}