import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiHeader } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { AuthCredentialDTO } from '../dto/auth-credentials.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/entity/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService,){

    }

    @Post('/update')
    @ApiBody({type:AuthCredentialDTO})
    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    update(@Body(ValidationPipe)authCredentialDTO: AuthCredentialDTO,@GetUser()user:User):Promise<void>{
        return this.authService.update(authCredentialDTO,user );
    }

    @Post('/signup')
    @ApiBody({type: AuthCredentialDTO})
    signUp(@Body(ValidationPipe) authCredentialDTO : AuthCredentialDTO): Promise<{accessToken:string}>{
        return this.authService.signUp(authCredentialDTO);
    }

    @Post('/signin')
    // @ApiBody({type: AuthCredentialDTO})
    signIn(@Body(ValidationPipe) authCredentialDTO : AuthCredentialDTO): Promise<{accessToken:string}>{
        return this.authService.signIn(authCredentialDTO);
    }
}
