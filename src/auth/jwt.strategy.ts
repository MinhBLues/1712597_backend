import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/reponsitory/user.reponsitory';
import { JwtPayload } from 'src/interface/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
      @InjectRepository(UserRepository)
      private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: 'topSecret51'
    });
  }
  async validate(payload: JwtPayload): Promise<User>{
    const {username} = payload;
    const user = await this.userRepository.findOne({ username});
    if(!user)
        throw new UnauthorizedException();
    return user;
  }
}
