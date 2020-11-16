import { ApiProperty } from "@nestjs/swagger";
import { NotContains, IsString, Matches, MaxLength, MinLength, IsNotEmpty } from "class-validator";
import { MessageConstants } from "src/constant/message";

export class AuthGoogleDTO{

    @IsString() 
    @MinLength(4)
    @NotContains(' ', {message:MessageConstants.ER02})
    // @MaxLength(20)
    @ApiProperty({type:String , description:'username'})
    username:string;

    @IsString()
    @ApiProperty({type:String , description:'GoogleId'})
    googleId:string;
}