import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "./board.entity";
import { Task } from "./task.entity";
import { User } from "./user.entity";

@Entity()
export class UserBoard extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    boardId: number;

    @Column()
    userId: number;

    // @ManyToOne(
    //     type => Board,
    //     board => board.user_boards,
    //     { eager: false, onDelete: "CASCADE" },
    // )
    // board: Board;

    // @ManyToOne(
    //     type => User,
    //     user => user.user_boards,
    //     { eager: false, onDelete: "CASCADE" },
    // )
    // user: User;

}