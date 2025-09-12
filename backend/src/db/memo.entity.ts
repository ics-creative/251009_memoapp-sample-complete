import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * メモのテーブル定義
 */
@Entity()
export class Memo {
  /** メモID */
  @PrimaryGeneratedColumn()
  id: number;

  /** メモのタイトル */
  @Column()
  title: string;

  /** メモの内容 */
  @Column()
  content: string;

  /** 作成日時 */
  @Column()
  createdAt: Date;

  /** 更新日時 */
  @Column()
  updatedAt: Date;
}
