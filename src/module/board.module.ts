import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/module/auth.module';
import { BoardRepository } from 'src/reponsitory/board.reponsitory';
import { BoardController } from 'src/controller/board.controller';
import { BoardService } from 'src/service/board.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardRepository]),
    AuthModule
  ],
  controllers: [BoardController],
  providers: [BoardService]
})
export class BoardModule {}
