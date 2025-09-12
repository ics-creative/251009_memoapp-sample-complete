import { useState } from "react";
import type { Memo } from "./types/memo";
import MemoList from "./components/MemoList";
import MemoEditor from "./components/MemoEditor";
import "./App.css";

function App() {
  const [selectedMemo, setSelectedMemo] = useState<Memo | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSelectMemo = (memo: Memo) => {
    setSelectedMemo(memo);
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setSelectedMemo(null);
    setIsCreating(true);
  };

  const handleSave = () => {
    setIsCreating(false);
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleDelete = (id: number) => {
    if (selectedMemo && selectedMemo.id === id) {
      setSelectedMemo(null);
    }
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="app">
      <MemoList
        onSelectMemo={handleSelectMemo}
        onCreateNew={handleCreateNew}
        refreshTrigger={refreshTrigger}
      />
      <MemoEditor
        selectedMemo={selectedMemo}
        isCreating={isCreating}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
