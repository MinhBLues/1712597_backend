import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOkResponse } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { title } from "process";
import { GetUser } from "src/auth/get-user.decorator";
import { BoardDTO } from "src/dto/board.dto";
import { Board } from "src/entity/board.entity";
import { User } from "src/entity/user.entity";
import { BoardService } from "src/service/board.service";


@Controller('board')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class BoardController {
    constructor(
        private boardService: BoardService,
    ) {

    }

    @Get()
    getBoards(@GetUser() user: User): Promise<Board[]> {
        return this.boardService.getBoards(user);
    }

    @Get('/:id')
    getBoardById(@Param('id',ParseIntPipe)id:number, @GetUser() user:User){
        return this.boardService.getBoardById(id, user);
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createBoard(@Body() boardDTO: BoardDTO, @GetUser() user: User): Promise<Board> {
        return this.boardService.createBoard(boardDTO, user);
    }

    @Patch('/:id/update')
    updateBoard(
        @Param('id', ParseIntPipe) id: number,
        @Body() { title }: BoardDTO,
        @GetUser() user: User): Promise<Board> {
        return this.boardService.updateBoard(id, title, user);
    }


    @Delete('/:id/delete')
    deleteBoard(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User): Promise<void> {
        return this.boardService.deleteBoard(id, user);
    }


}
