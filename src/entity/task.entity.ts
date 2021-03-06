import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { TaskStatus } from '../enum/task-status.enum';
  import { Board } from './board.entity';
  import { User } from './user.entity';
  import { Comment } from './comment.entity';
  
  
  @Entity()
  export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    description: string;
  
    @Column()
    status: TaskStatus.OPEN;
  
    @Column()
    num_like: number;

    @Column()
    boardId: number;

    @Column({ nullable:true })
    userCreateId: number;
  
    @ManyToOne(
      type => Board,
      board => board.tasks,
      { eager: false , onDelete: "CASCADE"},
    )
    board: Board;
  
    @ManyToOne(
      type => User,
      user => user.tasks,
      { eager: false, onDelete:"SET NULL" },
    )
    user_create: User;

    // @OneToOne(() => User)
    // @JoinColumn()
    // public user_create: User;
  
    @OneToMany(type => Comment, comment => comment.task, {eager: true, cascade: true})
      comments: Comment[];
  
  }
  