import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialDTO } from "../dto/auth-credentials.dto";
import { User } from "../entity/user.entity";
import * as bcrypt from 'bcrypt';
import { AuthSignInDTO } from "src/dto/auth-signin.dto";
import { UpdateUserDTO } from "src/dto/update-user.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async signUp(authCredentialDTO: AuthCredentialDTO): Promise<{ user: User }> {
        const { display_name, username, password, googleId } = authCredentialDTO;
        let user = await this.findOne({googleId});

        if (user) {
            throw new ConflictException('GoogleId already exists');
        }

        user = new User();
        user.display_name = display_name
        user.username = username
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        user.googleId = googleId.length > 0 ? googleId : null;
        try {
            await user.save();
            return { user };
        } catch (err) {
            if (err.code === '23505') {
                throw new ConflictException('Username already exists');
            }
            else
                throw new InternalServerErrorException();
        }
    }

    async updateUser(authCredentialDTO: UpdateUserDTO, user: User): Promise<void> {
        const { display_name, old_password, new_password } = authCredentialDTO;

        user.display_name = display_name;


        if (old_password.length > 0) {
            if (! await user.validatorPassword(old_password)) {
                throw new ConflictException("Old password wrong")
            }
            user.password = await this.hashPassword(new_password, user.salt);
            await this.update(
                { id: user.id },
                {
                    display_name: user.display_name,
                    password: user.password
                }
            );
        }
        else {
            await this.update(
                { id: user.id },
                {
                    display_name: user.display_name,
                }
            );
        }
    }

    async validatorUserPassword(authSignInDTO: AuthSignInDTO): Promise<{ user: User }> {
        const { username, password } = authSignInDTO;
        const user = await this.findOne({ username })
        if (user && await user.validatorPassword(password)) {
            return { user };
        }
        else
            return null;
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}