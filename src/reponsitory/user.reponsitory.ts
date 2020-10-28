import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialDTO } from "../dto/auth-credentials.dto";
import { User } from "../entity/user.entity";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    
    async signUp(authCredentialDTO: AuthCredentialDTO) : Promise<void>{
        const {username, password} = authCredentialDTO;

        
        const user = new User();
        user.username = username
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        try{
            await user.save();
        }catch(err){
            if(err.code ==='23505'){
                throw  new ConflictException('Username already exists');
            }
            else
                throw new InternalServerErrorException();
        }
    }

    async validatorUserPassword(authCredentialDTO: AuthCredentialDTO): Promise<string>{
        const {username, password} = authCredentialDTO;
        const user = await this.findOne({username})
        if(user && await user.validatorPassword(password)){
            return user.username;
        }
        else
            return null;
    }

    private async hashPassword (password: string, salt: string): Promise<string>{
        return bcrypt.hash(password, salt);
    }
}