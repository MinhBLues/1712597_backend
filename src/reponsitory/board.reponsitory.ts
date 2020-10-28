
import { Board } from "src/entity/board.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Board)
export class BoardRepository extends Repository <Board> {
    
}