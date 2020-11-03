import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./task.entity";
import { User } from "./user.entity";

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column({ nullable: true })
    date: Date = new Date;

    @OneToMany(type => Task, task => task.board, {eager: true, cascade: true})
    tasks: Task[];
   
    @ManyToOne(
        type => User,
        user => user.boards,
        { eager: false },
    )
    user: User;

    @Column()
    userId: number;

}