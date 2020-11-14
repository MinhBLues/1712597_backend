import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { AuthCredentialDTO } from '../dto/auth-credentials.dto';
import { UserRepository } from '../reponsitory/user.reponsitory';
import { User } from 'src/entity/user.entity';
import { AuthSignInDTO } from 'src/dto/auth-signin.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,

    ) {

    }

    async signUp(authCredentialDTO: AuthCredentialDTO): Promise<{ accessToken: string, user: User }> {
        const { user } = await this.userRepository.signUp(authCredentialDTO);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const username = user.username;
        const payload: JwtPayload = { username };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken, user };
    }

    async signIn(authSignInDTO: AuthSignInDTO): Promise<{ accessToken: string, user: User }> {
        const { user } = await this.userRepository.validatorUserPassword(authSignInDTO);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const username = user.username;
        const payload: JwtPayload = { username };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken, user };
    }

    async update(userUpdate: UpdateUserDTO, user: User): Promise<void> {
        await this.userRepository.updateUser(userUpdate, user);
    }

    async getUser(user: User): Promise<{ id: Number, display_name: string, username: string }> {
        const { id, display_name, username } = await this.userRepository.findOne({ id: user.id })
        return { id, display_name, username };
    }
}

