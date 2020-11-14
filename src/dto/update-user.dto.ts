import { ApiProperty } from "@nestjs/swagger";
import { NotContains, IsString, Matches, MaxLength, MinLength, IsNotEmpty, IsEmpty } from "class-validator";
import { MessageConstants } from "src/constant/message";

export class UpdateUserDTO{

    @IsString() 
    @IsNotEmpty({message:MessageConstants.ER01})
    @ApiProperty({type:String , description:'Display name'})
    display_name:string;

    @IsString() 
    // @MinLength(8, {message:MessageConstants.ER03,each: true})
    // @MaxLength(20,{message:MessageConstants.ER04,each: true})
    // @Matches(
    //     /((?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    //     {message:MessageConstants.ER05,each: true},
    // )
    @ApiProperty({type:String , description:'Old_Password'})
    old_password:string;

    @IsString() 
    // @MinLength(8, {message:MessageConstants.ER03,each: true})
    // @MaxLength(20,{message:MessageConstants.ER04,each: true})
    // @Matches(
    //     /((?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    //     {message:MessageConstants.ER05,each: true},
    // )
    @ApiProperty({type:String , description:'New_Password'})
    new_password:string;
}