import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { AuthCredentialDTO } from '../dto/auth-credentials.dto';
import { UserRepository } from '../reponsitory/user.reponsitory';
import { User } from 'src/entity/user.entity';
import { AuthSignInDTO } from 'src/dto/auth-signin.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
        
        ){

    }

    async signUp(authCredentialDTO: AuthCredentialDTO): Promise<{accessToken:string}>{
        const username =  await this.userRepository.signUp(authCredentialDTO);
        if(!username){
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload:JwtPayload = {username};
        const accessToken = this.jwtService.sign(payload);
        return {accessToken}; 
    }

    async signIn(authSignInDTO: AuthSignInDTO): Promise<{accessToken:string}>{
        const username = await this.userRepository.validatorUserPassword(authSignInDTO);
        
        if(!username){
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload:JwtPayload = {username};
        const accessToken = this.jwtService.sign(payload);
        return {accessToken};
    }

    async update(authCredentialDTO:AuthCredentialDTO, user:User):Promise<void>{
        await this.userRepository.updateUser(authCredentialDTO,user);
    }
}

