import { ApiProperty } from "@nestjs/swagger";
import { NotContains, IsString, Matches, MaxLength, MinLength, IsNotEmpty } from "class-validator";
import { MessageConstants } from "src/constant/message";

export class AuthSignUpGoogleDTO{
    @IsString() 
    @IsNotEmpty({message:MessageConstants.ER01})
    @ApiProperty({type:String , description:'Display name'})
    display_name:string;

    @IsString() 
    @MinLength(4)
    @NotContains(' ', {message:MessageConstants.ER02})
    @MaxLength(20)
    @ApiProperty({type:String , description:'username'})
    username:string;

    @IsString() 
    @MinLength(8, {message:MessageConstants.ER03})
    @MaxLength(20,{message:MessageConstants.ER04})
    @Matches(
        /((?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message:MessageConstants.ER05},
    )
    @ApiProperty({type:String , description:'Password'})
    password:string;

    @IsString()
    @ApiProperty({type:String , description:'GoogleId'})
    googleId:string;
}