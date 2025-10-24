import React, { useState } from 'react';
import '../styles/theme.css';

// PUBLIC_INTERFACE
export default function TaskInput({ onAdd }) {
  /** Input row to add a task */
  const [title, setTitle] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    onAdd(t);
    setTitle('');
  };

  return (
    <form onSubmit={submit} className="task-input card">
      <div className="row">
        <input
          aria-label="Task title"
          className="input"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">Add</button>
      </div>
    </form>
  );
}
