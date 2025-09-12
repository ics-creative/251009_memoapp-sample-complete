import React, { useState, useEffect } from "react";
import type { Memo } from "../types/memo";
import { getAllMemos } from "../logics/handleApi";
import "./MemoList.css";

interface MemoListProps {
  onSelectMemo: (memo: Memo) => void;
  onCreateNew: () => void;
  refreshTrigger: number;
}

const MemoList: React.FC<MemoListProps> = ({ onSelectMemo, onCreateNew, refreshTrigger }) => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMemos();
  }, [refreshTrigger]);

  const fetchMemos = async () => {
    try {
      setLoading(true);
      const fetchedMemos = await getAllMemos();
      setMemos(fetchedMemos);
    } catch (error) {
      console.error("Failed to fetch memos:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <div className="memo-list loading">読み込み中...</div>;
  }

  return (
    <div className="memo-list">
      <div className="memo-list-header">
        <h2>メモ一覧</h2>
        <button className="create-button" onClick={onCreateNew}>
          新規作成
        </button>
      </div>

      {memos.length === 0 ? (
        <div className="empty-state">
          <p>メモがありません</p>
        </div>
      ) : (
        <div className="memo-items">
          {memos.map((memo) => (
            <div key={memo.id} className="memo-item" onClick={() => onSelectMemo(memo)}>
              <h3>{memo.title || "無題"}</h3>
              <p className="memo-preview">{memo.content.substring(0, 100)}...</p>
              <span className="memo-date">{formatDate(memo.updatedAt)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemoList;
