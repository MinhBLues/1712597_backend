import { BoardDTO } from 'src/dto/board.dto';
import { Board } from 'src/entity/board.entity';
import { User } from 'src/entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {

  async createBoard(title: string, user: User): Promise<Board> {

    const board = new Board();
    board.date = new Date()

    board.title = title;
    board.userId = user.id; 
    await board.save();

    return board;
  }

  async getBoards(user: User): Promise<Board[]> {
    const query = this.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id });
    const boards = await query.getMany();
    return boards;
  }
}
