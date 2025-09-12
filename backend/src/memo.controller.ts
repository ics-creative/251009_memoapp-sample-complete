import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MemoService } from './memo.service';
import { Memo } from './db/memo.entity';

/**
 * メモのコントローラー
 */
@Controller('/memos')
export class MemoController {
  constructor(private readonly memoService: MemoService) {}

  /**
   * メモを全件取得する
   */
  @Get()
  getMemos(): Promise<Memo[]> {
    return this.memoService.findAll();
  }

  /**
   * メモを1件取得する
   * @param id メモID
   */
  @Get(':id')
  getMemo(@Param('id') id: number): Promise<Memo | null> {
    return this.memoService.findOne(id);
  }

  /**
   * メモを作成する
   * @param memo 作成するメモ
   */
  @Post()
  createMemo(@Body() memo: { title: string; content: string }): Promise<Memo> {
    return this.memoService.create(memo);
  }

  /**
   * メモを更新する
   * @param id メモID
   * @param memo 更新するメモ
   */
  @Patch(':id')
  updateMemo(@Param('id') id: number, @Body() memo: { title: string; content: string }): Promise<Memo | null> {
    return this.memoService.update(id, memo);
  }

  /**
   * メモを削除する
   * @param id メモID
   */
  @Delete(':id')
  deleteMemo(@Param('id') id: number): Promise<void> {
    return this.memoService.delete(id);
  }
}
