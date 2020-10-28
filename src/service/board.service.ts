import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "src/entity/board.entity";
import { User } from "src/entity/user.entity";
import { BoardRepository } from "src/reponsitory/board.reponsitory";

@Injectable()
export class BoardService{
    constructor(
        @InjectRepository (BoardRepository)
        private BoardReponsitory: BoardRepository,
    ){}


    async getBoards(user: User): Promise<Board[]>{
        const found = await this.BoardReponsitory.getBoards(user);
        if(!found)
        {
            throw new NotFoundException(`User ${user} not found`)
        }
        return found;
    }

}