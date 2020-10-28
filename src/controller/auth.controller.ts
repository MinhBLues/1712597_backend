import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { AuthCredentialDTO } from '../dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService,){

    }

    @Post('/signup')
    @ApiBody({type: AuthCredentialDTO})
    signUp(@Body(ValidationPipe) authCredentialDTO : AuthCredentialDTO): Promise<void>{
        return this.authService.signUp(authCredentialDTO);
    }

    @Post('/signin')
    @ApiBody({type: AuthCredentialDTO})
    signIn(@Body(ValidationPipe) authCredentialDTO : AuthCredentialDTO): Promise<{accessToken:string}>{
        return this.authService.signIn(authCredentialDTO);
    }
}
