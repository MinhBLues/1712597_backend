import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Task } from './task.entity';
  
  @Entity()
  export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    comment: string;
  
    @ManyToOne(
      type => Task,
      task => task.comments,
      { eager: false },
    )
    task: Task;
  }
  