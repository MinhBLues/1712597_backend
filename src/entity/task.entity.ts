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
    status: TaskStatus;
  
    @Column()
    num_like: number;
  
    @ManyToOne(
      type => Board,
      board => board.tasks,
      { eager: false },
    )
    board: Board;
  
    @OneToOne(() => User)
    @JoinColumn()
    public user_create: User;
  
    @OneToMany(type => Comment, comment => comment.task, {eager: true})
      comments: Comment[];
  
  }
  