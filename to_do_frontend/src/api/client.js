const BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Simple API client wrapper. If BASE_URL is not defined, uses in-memory mock.
 */
class RealClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl?.replace(/\/+$/, '');
  }

  async request(path, options = {}) {
    const url = `${this.baseUrl}${path}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };
    const res = await fetch(url, { ...options, headers });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API error ${res.status}: ${text || res.statusText}`);
    }
    const ct = res.headers.get('content-type') || '';
    return ct.includes('application/json') ? res.json() : res.text();
  }

  get(path) {
    return this.request(path, { method: 'GET' });
  }
  post(path, body) {
    return this.request(path, { method: 'POST', body: JSON.stringify(body) });
  }
  put(path, body) {
    return this.request(path, { method: 'PUT', body: JSON.stringify(body) });
  }
  patch(path, body) {
    return this.request(path, { method: 'PATCH', body: JSON.stringify(body) });
  }
  delete(path) {
    return this.request(path, { method: 'DELETE' });
  }
}

/**
 * LocalStorage-backed mock client implementing same methods.
 */
class MockTasksStore {
  constructor(key = 'mock_tasks_v1') {
    this.key = key;
    if (!localStorage.getItem(this.key)) {
      localStorage.setItem(this.key, JSON.stringify([]));
    }
  }
  list() {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }
  save(list) {
    localStorage.setItem(this.key, JSON.stringify(list));
  }
}

class MockClient {
  constructor() {
    this.tasks = new MockTasksStore();
    this.users = new Map(); // simple in-memory users map
    // seed
    if (this.tasks.list().length === 0) {
      this.tasks.save([
        { id: '1', title: 'Welcome to Ocean Pro To-Do', completed: false, createdAt: Date.now() },
        { id: '2', title: 'Click the checkbox to complete tasks', completed: true, createdAt: Date.now() },
      ]);
    }
  }

  // emulate endpoints

  // tasks
  async get(path) {
    if (path === '/tasks') {
      return this.tasks.list();
    }
    throw new Error(`Mock GET not implemented for ${path}`);
  }

  async post(path, body) {
    if (path === '/tasks') {
      const list = this.tasks.list();
      const item = {
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        title: body?.title || '',
        completed: false,
        createdAt: Date.now(),
      };
      list.push(item);
      this.tasks.save(list);
      return item;
    }
    if (path === '/auth/login') {
      // accept any user for now
      return { token: 'mock-token', user: { id: 'u1', email: body?.email || 'user@example.com' } };
    }
    if (path === '/auth/signup') {
      return { token: 'mock-token', user: { id: 'u2', email: body?.email || 'new@example.com' } };
    }
    throw new Error(`Mock POST not implemented for ${path}`);
  }

  async put(path, body) {
    const match = path.match(/^\/tasks\/([^/]+)$/);
    if (match) {
      const id = match[1];
      const list = this.tasks.list();
      const idx = list.findIndex(t => t.id === id);
      if (idx === -1) throw new Error('Task not found');
      const updated = { ...list[idx], ...body };
      list[idx] = updated;
      this.tasks.save(list);
      return updated;
    }
    throw new Error(`Mock PUT not implemented for ${path}`);
  }

  async delete(path) {
    const match = path.match(/^\/tasks\/([^/]+)$/);
    if (match) {
      const id = match[1];
      const list = this.tasks.list();
      const next = list.filter(t => t.id !== id);
      this.tasks.save(next);
      return { success: true };
    }
    throw new Error(`Mock DELETE not implemented for ${path}`);
  }

  async patch(path, body) {
    return this.put(path, body);
  }
}

export const apiClient = BASE_URL ? new RealClient(BASE_URL) : new MockClient();

export function isMock() {
  return !BASE_URL;
}
