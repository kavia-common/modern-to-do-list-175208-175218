import React, { useEffect, useMemo, useState } from 'react';
import '../styles/theme.css';
import TaskInput from '../components/TaskInput';
import Filters from '../components/Filters';
import TaskItem from '../components/TaskItem';
import { listTasks, createTask, updateTask, deleteTask } from '../api/tasks';

// PUBLIC_INTERFACE
export default function TasksPage() {
  /**
   * Main tasks page containing input, filters, and task list.
   */
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = async () => {
    try {
      setLoading(true);
      const data = await listTasks();
      setTasks(data);
    } catch (e) {
      setError(e.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  const filtered = useMemo(() => {
    if (filter === 'active') return tasks.filter(t => !t.completed);
    if (filter === 'completed') return tasks.filter(t => t.completed);
    return tasks;
  }, [tasks, filter]);

  const onAdd = async (title) => {
    try {
      const t = await createTask(title);
      setTasks(prev => [t, ...prev]);
    } catch (e) {
      setError(e.message || 'Failed to add task');
    }
  };

  const onToggle = async (id, completed) => {
    try {
      const updated = await updateTask(id, { completed });
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
    } catch (e) {
      setError(e.message || 'Failed to update task');
    }
  };

  const onEdit = async (id, title) => {
    try {
      const updated = await updateTask(id, { title });
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
    } catch (e) {
      setError(e.message || 'Failed to edit task');
    }
  };

  const onDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (e) {
      setError(e.message || 'Failed to delete task');
    }
  };

  return (
    <div className="stack">
      <TaskInput onAdd={onAdd} />
      <div className="card">
        <Filters filter={filter} onChange={setFilter} />
        {error && <div className="helper" style={{ color: 'var(--color-error)', padding: '0 16px 8px' }}>{error}</div>}
        {loading ? (
          <div className="helper" style={{ padding: '12px 16px' }}>Loading...</div>
        ) : (
          <div className="task-list">
            {filtered.length === 0 ? (
              <div className="helper" style={{ padding: '12px 16px' }}>No tasks here. Add one to get started.</div>
            ) : (
              filtered.map(t => (
                <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
