import React from 'react';
import '../styles/theme.css';

// PUBLIC_INTERFACE
export default function Header({ user, onLogout, onNavigate }) {
  /**
   * Header with brand and user actions
   */
  return (
    <div className="header card app-gradient">
      <div className="brand">
        <div className="brand-badge" />
        <div>
          <div className="brand-title">Ocean Pro To‑Do</div>
          <div className="helper">Stay on top of your tasks</div>
        </div>
      </div>
      <div className="header-actions">
        {user ? (
          <>
            <span className="helper">Hi, {user.email}</span>
            <button className="btn" onClick={() => onNavigate('tasks')}>Tasks</button>
            <button className="btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <button className="btn" onClick={() => onNavigate('login')}>Login</button>
            <button className="btn btn-primary" onClick={() => onNavigate('signup')}>Sign up</button>
          </>
        )}
      </div>
    </div>
  );
}
