import { NotFoundException } from '@nestjs/common';
import { BoardDTO } from 'src/dto/board.dto';
import { Board } from 'src/entity/board.entity';
import { User } from 'src/entity/user.entity';
import { UserBoard } from 'src/entity/user_board.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {

  async createBoard(boardDTO: BoardDTO, user: User): Promise<Board> {

    const { title } = boardDTO;

    const board = new Board();
    board.date = new Date()

    board.title = title;
    board.userId = user.id;
    await board.save();

    // const user_board = new UserBoard();
    // user_board.boardId = board.id;
    // user_board.userId = user.id;
    // await user_board.save();

    return board;
  }

  async getBoardById(id: number, user: User): Promise<Board> {

    const board = await this.findOne({ id: id });
    if (!board) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }

    // let query = this.createQueryBuilder('board')
    //   .leftJoinAndSelect("board.user_boards", "user_board")
    //   .where("board.id = :id", { id: id })
    //   .andWhere("user_board.userId = :userId", { userId: user.id })

    // let boards = await query.getOne();

    // if (!boards) {
    //   const user_board = new UserBoard();
    //   user_board.boardId = id;
    //   user_board.userId = user.id;
    //   await user_board.save();

    //   query = this.createQueryBuilder('board')
    //     .leftJoinAndSelect("board.user_boards", "user_board")
    //     .where("board.id = :id", { id: id })
    //     .andWhere("user_board.userId = :userId", { userId: user.id })

    //   boards = await query.getOne();
    // }

    // board = this.findOne({ id: id });

    return board;
  }

  async getBoards(user: User): Promise<Board[]> {
    const query = this.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id });
    const boards = await query.getMany();
    return boards;
  }
}
