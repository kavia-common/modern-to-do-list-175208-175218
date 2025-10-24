import React, { useState } from 'react';
import '../styles/theme.css';

// PUBLIC_INTERFACE
export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  /** Single task row with inline edit */
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.title);

  const save = () => {
    const v = value.trim();
    if (!v || v === task.title) {
      setEditing(false);
      return;
    }
    onEdit(task.id, v);
    setEditing(false);
  };

  return (
    <div className="task-item">
      <input
        className="checkbox"
        type="checkbox"
        checked={!!task.completed}
        onChange={() => onToggle(task.id, !task.completed)}
      />
      {editing ? (
        <input
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => { if (e.key === 'Enter') save(); if (e.key === 'Escape') setEditing(false); }}
          autoFocus
        />
      ) : (
        <div
          className={`task-title ${task.completed ? 'completed' : ''}`}
          onDoubleClick={() => setEditing(true)}
        >
          {task.title}
        </div>
      )}
      <div className="task-actions">
        {!editing && (
          <button className="btn" onClick={() => setEditing(true)}>Edit</button>
        )}
        <button className="btn btn-danger" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}
