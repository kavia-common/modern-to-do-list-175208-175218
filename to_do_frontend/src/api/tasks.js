import { apiClient } from './client';

// PUBLIC_INTERFACE
export async function listTasks() {
  /** Returns all tasks */
  return apiClient.get('/tasks');
}

// PUBLIC_INTERFACE
export async function createTask(title) {
  /** Create a task with given title */
  return apiClient.post('/tasks', { title });
}

// PUBLIC_INTERFACE
export async function updateTask(id, data) {
  /** Update a task by id with partial data */
  return apiClient.put(`/tasks/${id}`, data);
}

// PUBLIC_INTERFACE
export async function deleteTask(id) {
  /** Delete a task by id */
  return apiClient.delete(`/tasks/${id}`);
}
