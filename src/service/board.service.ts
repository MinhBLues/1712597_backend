import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BoardDTO } from "src/dto/board.dto";
import { Board } from "src/entity/board.entity";
import { User } from "src/entity/user.entity";
import { BoardRepository } from "src/reponsitory/board.reponsitory";

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardReponsitory: BoardRepository,
    ) { }

    async getBoardById(id:number, user:User):Promise<Board>{
        return await this.boardReponsitory.getBoardById(id, user);
    }

    async createBoard(boardDTO: BoardDTO, user: User): Promise<Board> {
        return await this.boardReponsitory.createBoard(boardDTO, user);
    }

    async getBoards(user: User): Promise<Board[]> {
        const found = await this.boardReponsitory.getBoards(user);
        if (!found) {
            throw new NotFoundException(`User ${user} not found`)
        }
        return found;
    }

    async deleteBoard(id: number, user: User): Promise<void> {
        const result = await this.boardReponsitory.delete({ id, userId: user.id });

        if (result.affected === 0) {
            throw new NotFoundException(`Board with id ${id} not found`);
        }
    }

    async updateBoard(id: number, title: string, user: User): Promise<Board> {
        const board = await this.getBoardById(id, user);
        
        board.title = title;
        board.save();
        
        return board;
    }

}