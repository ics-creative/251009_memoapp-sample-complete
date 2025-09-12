import React, { useState, useEffect } from "react";
import type { Memo } from "../types/memo";
import { createMemo, updateMemo, deleteMemo } from "../logics/handleApi";
import "./MemoEditor.css";

type MemoEditorProps = {
  selectedMemo: Memo | null;
  isCreating: boolean;
  onSave: () => void;
  onDelete?: (id: number) => void;
};

const MemoEditor: React.FC<MemoEditorProps> = ({
  selectedMemo,
  isCreating,
  onSave,
  onDelete,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (selectedMemo) {
      setTitle(selectedMemo.title);
      setContent(selectedMemo.content);
    } else if (isCreating) {
      setTitle("");
      setContent("");
    }
  }, [selectedMemo, isCreating]);

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) {
      alert("タイトルまたは内容を入力してください");
      return;
    }

    setSaving(true);
    try {
      if (isCreating) {
        const newMemo = { title: title.trim(), content: content.trim() };
        await createMemo(newMemo);
      } else if (selectedMemo) {
        const updateData = { title: title.trim(), content: content.trim() };
        await updateMemo(selectedMemo.id, updateData);
      }
      onSave();
    } catch (error) {
      console.error("Failed to save memo:", error);
      alert("保存に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedMemo) return;

    if (window.confirm("このメモを削除しますか？")) {
      try {
        await deleteMemo(selectedMemo.id);
        if (onDelete) {
          onDelete(selectedMemo.id);
        }
      } catch (error) {
        console.error("Failed to delete memo:", error);
        alert("削除に失敗しました");
      }
    }
  };

  if (!isCreating && !selectedMemo) {
    return (
      <div className="memo-editor empty">
        <div className="empty-editor">
          <h3>メモを選択してください</h3>
          <p>左側のリストからメモを選択するか、新規作成してください。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="memo-editor">
      <div className="editor-header">
        <input
          type="text"
          placeholder="タイトルを入力..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
        />
        <div className="editor-actions">
          <button onClick={handleSave} className="save-button" disabled={saving}>
            {saving ? "保存中..." : "保存"}
          </button>
          {selectedMemo && onDelete && (
            <button onClick={handleDelete} className="delete-button">
              削除
            </button>
          )}
        </div>
      </div>

      <textarea
        placeholder="内容を入力..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="content-textarea"
      />

      {selectedMemo && (
        <div className="memo-info">
          <span>作成日: {new Date(selectedMemo.createdAt).toLocaleString("ja-JP")}</span>
          <span>更新日: {new Date(selectedMemo.updatedAt).toLocaleString("ja-JP")}</span>
        </div>
      )}
    </div>
  );
};

export default MemoEditor;
