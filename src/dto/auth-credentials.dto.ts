import { ApiProperty } from "@nestjs/swagger";
import { NotContains, IsString, Matches, MaxLength, MinLength, IsNotEmpty } from "class-validator";

export class AuthCredentialDTO{

    @IsString() 
    @IsNotEmpty()
    @ApiProperty({type:String , description:'display name'})
    display_name:string;

    @IsString() 
    @MinLength(4)
    @NotContains(' ', {message:'Username should not contain a space'})
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