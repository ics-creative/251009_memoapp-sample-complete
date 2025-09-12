import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Memo } from './db/memo.entity';

/**
 * メモのサービスクラス
 */
@Injectable()
export class MemoService {
  constructor(
    @InjectRepository(Memo)
    private memoRepository: Repository<Memo>,
  ) {}

  /**
   * メモを全件取得する
   */
  async findAll(): Promise<Memo[]> {
    return this.memoRepository.find();
  }

  /**
   * メモを1件取得する
   * @param id メモID
   */
  async findOne(id: number): Promise<Memo | null> {
    return this.memoRepository.findOne({ where: { id } });
  }

  /**
   * メモを作成する
   * @param memo メモ
   */
  async create(memo: { title: string; content: string }): Promise<Memo> {
    const newMemo = this.memoRepository.create({
      title: memo.title,
      content: memo.content,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.memoRepository.save(newMemo);
  }

  /**
   * メモを更新する
   * @param id メモID
   * @param memo メモ
   */
  async update(id: number, memo: { title: string; content: string }): Promise<Memo | null> {
    const updatedMemo = await this.memoRepository.findOne({ where: { id } });
    if (!updatedMemo) return null;
    updatedMemo.title = memo.title;
    updatedMemo.content = memo.content;
    updatedMemo.updatedAt = new Date();
    return this.memoRepository.save(updatedMemo);
  }

  /**
   * メモを削除する
   * @param id メモID
   */
  async delete(id: number): Promise<void> {
    await this.memoRepository.delete(id);
  }
}
