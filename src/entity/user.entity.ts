import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from "bcrypt";
import { Board } from "./board.entity";
import { Task } from "./task.entity";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    display_name: string

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(type => Board, board => board.user, {eager: true, cascade: true,  onDelete: 'CASCADE' })
    boards: Board[];

    @OneToMany(type => Task, task => task.user_create, {eager: true, cascade: true, onDelete: 'CASCADE'})
    tasks: Task[];

    async validatorPassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}