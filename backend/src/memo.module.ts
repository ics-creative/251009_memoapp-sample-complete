import { Module } from '@nestjs/common';
import { MemoController } from './memo.controller';
import { MemoService } from './memo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memo } from './db/memo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/memo.sqlite',
      entities: [Memo],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Memo]),
  ],
  controllers: [MemoController],
  providers: [MemoService],
})
export class MemoModule {}
