import { Controller, Get, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Board } from "src/entity/board.entity";
import { BoardService } from "src/service/board.service";


@Controller('Boards')
@UseGuards(AuthGuard())
@ApiBearerAuth()

export class BoardController {
    constructor(
        private boardService: BoardService,
    ){
        
    }

    @Get('/:id')
    getBoardByUserId(@Param('id', ParseIntPipe) id:number):Promise<Board> {
        return this.boardService.getBoardByUserId(id);
    }
    
}
