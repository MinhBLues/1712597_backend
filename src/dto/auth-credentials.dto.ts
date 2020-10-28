import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialDTO{
    @IsString() 
    @MinLength(4)
    @MaxLength(20)
    @ApiProperty({type:String , description:'username'})
    username:string;

    @IsString() 
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /((?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message:'Password too week'},
    )
    @ApiProperty({type:String , description:'password'})
    password:string;

}