import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { AuthCredentialDTO } from '../dto/auth-credentials.dto';
import { UserRepository } from '../reponsitory/user.reponsitory';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
        
        ){

    }

    async signUp(authCredentialDTO: AuthCredentialDTO): Promise<void>{
        return this.userRepository.signUp(authCredentialDTO);
    }

    async signIn(authCredentialDTO: AuthCredentialDTO): Promise<{accessToken:string}>{
        const username = await this.userRepository.validatorUserPassword(authCredentialDTO);
        
        if(!username){
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload:JwtPayload = {username};
        const accessToken = this.jwtService.sign(payload);
        return {accessToken};
    }
}
