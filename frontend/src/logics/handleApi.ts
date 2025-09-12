import type { Memo } from "../types/memo";

const API_BASE_URL = "http://localhost:3000";

/**
 * メモを全件取得する
 */
export const getAllMemos = async (): Promise<Memo[]> => {
  const response = await fetch(`${API_BASE_URL}/memos`);
  if (!response.ok) throw new Error("Failed to fetch memos");
  return response.json();
};

/**
 * メモを1件取得する
 * @param id メモID
 */
export const getMemoById = async (id: number): Promise<Memo> => {
  const response = await fetch(`${API_BASE_URL}/memos/${id}`);
  if (!response.ok) throw new Error("Failed to fetch memo");
  return response.json();
};

/**
 * メモを作成する
 * @param memo メモ
 */
export const createMemo = async (memo: { title: string; content: string }): Promise<Memo> => {
  const response = await fetch(`${API_BASE_URL}/memos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memo),
  });
  if (!response.ok) throw new Error("Failed to create memo");
  return response.json();
};

/**
 * メモを更新する
 * @param id メモID
 * @param memo メモ
 */
export const updateMemo = async (
  id: number,
  memo: {
    title?: string;
    content?: string;
  },
): Promise<Memo> => {
  const response = await fetch(`${API_BASE_URL}/memos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memo),
  });
  if (!response.ok) throw new Error("Failed to update memo");
  return response.json();
};

/**
 * メモを削除する
 * @param id メモID
 */
export const deleteMemo = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/memos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete memo");
};
