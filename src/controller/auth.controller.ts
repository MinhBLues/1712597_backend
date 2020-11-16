import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiHeader } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { AuthCredentialDTO } from '../dto/auth-credentials.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/entity/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthSignInDTO } from 'src/dto/auth-signin.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';
import { AuthSignUpGoogleDTO } from 'src/dto/google-signUp.dto';
import { AuthGoogleDTO } from 'src/dto/auth-google.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService,){

    }

    @Post('/update')
    @ApiBody({type:UpdateUserDTO})
    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    update(@Body(ValidationPipe)userUpdate: UpdateUserDTO,@GetUser() user:User):Promise<void>{
        return this.authService.update(userUpdate,user );
    }

    @Post('/signup')
    @ApiBody({type: AuthCredentialDTO})
    signUp(@Body(ValidationPipe) authCredentialDTO : AuthCredentialDTO): Promise<{accessToken:string, user:User}>{
        return this.authService.signUp(authCredentialDTO);
    }

    @Post('/signin')
    @ApiBody({type: AuthSignInDTO})
    signIn(@Body(ValidationPipe) authSignInDTO : AuthSignInDTO): Promise<{accessToken:string, user:User}>{
        return this.authService.signIn(authSignInDTO);
    }

    @Post('/google/signin')
    @ApiBody({type: AuthGoogleDTO})
    getUserByGooleId(@Body(ValidationPipe) authGoogleDTO : AuthGoogleDTO): Promise<{accessToken:string, user:User}>{
        return this.authService.getUserByGooleId(authGoogleDTO);
    }

    @Get('/getUser')
    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    getUSer(@GetUser() user:User): Promise<{ id: number, display_name: string, username:string }>{
        return this.authService.getUser(user);
    }
}
