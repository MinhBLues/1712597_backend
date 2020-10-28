import { Controller, Get, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth } from "@nestjs/swagger";
import { GetUser } from "src/auth/get-user.decorator";
import { Board } from "src/entity/board.entity";
import { User } from "src/entity/user.entity";
import { BoardService } from "src/service/board.service";


@Controller('board')
@ApiBearerAuth()

export class BoardController {
    constructor(
        private boardService: BoardService,
    ){
        
    }

    @Get()
    @UseGuards(AuthGuard())
    getBoards( @GetUser()user:User):Promise<Board[]> {
        return this.boardService.getBoards(user);
    }
    
}
