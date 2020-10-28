import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "src/entity/board.entity";
import { BoardRepository } from "src/reponsitory/board.reponsitory";

@Injectable()
export class BoardService{
    constructor(
        @InjectRepository (BoardRepository)
        private BoardReponsitory: BoardRepository,
    ){}


    async getBoardByUserId(id: number): Promise<Board>{
        const found = await this.BoardReponsitory.findOne(id);
        if(!found)
        {
            throw new NotFoundException(`User ${id} not found`)
        }
        return found;
    }

}