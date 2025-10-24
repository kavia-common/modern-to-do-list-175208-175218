import React, { useState } from 'react';
import '../../styles/theme.css';
import { signup } from '../../api/auth';

// PUBLIC_INTERFACE
export default function SignupPage({ onSuccess }) {
  /** Basic signup form calling API stub */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const res = await signup(email, password);
      localStorage.setItem('auth_token', res.token);
      localStorage.setItem('auth_user', JSON.stringify(res.user));
      onSuccess(res.user);
    } catch (e2) {
      setErr(e2.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card auth-card">
      <form className="stack" onSubmit={submit}>
        <h2 style={{ margin: 0 }}>Create account</h2>
        <div className="form-group">
          <label className="label">Email</label>
          <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required />
        </div>
        <div className="form-group">
          <label className="label">Password</label>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required />
        </div>
        {err && <div className="helper" style={{ color: 'var(--color-error)' }}>{err}</div>}
        <button className="btn btn-primary" disabled={loading} type="submit">{loading ? 'Creating...' : 'Sign up'}</button>
      </form>
    </div>
  );
}
