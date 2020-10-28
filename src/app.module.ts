import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TaskModule } from './module/task.module';
import { AuthModule } from './module/auth.module';
import { BoardModule } from './module/board.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TaskModule,
    BoardModule,
    AuthModule],
})
export class AppModule {}
