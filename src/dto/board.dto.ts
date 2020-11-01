import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator'
export class BoardDTO{
    @IsNotEmpty()
    @ApiProperty({type:String , description:'title'})
    title:string;

    // @IsNotEmpty()
    // @ApiProperty({type:String , description:'create at'})
    // date:Date;
}