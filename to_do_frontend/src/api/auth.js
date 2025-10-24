import { apiClient } from './client';

// PUBLIC_INTERFACE
export async function login(email, password) {
  /** Login and return {token, user} */
  return apiClient.post('/auth/login', { email, password });
}

// PUBLIC_INTERFACE
export async function signup(email, password) {
  /** Signup and return {token, user} */
  return apiClient.post('/auth/signup', { email, password });
}

// PUBLIC_INTERFACE
export function logout() {
  /** Clear stored token (client-side) */
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
}
