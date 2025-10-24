import React, { useEffect, useMemo, useState } from 'react';
import './index.css';
import './styles/theme.css';
import Header from './components/Header';
import TasksPage from './pages/TasksPage';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import { logout } from './api/auth';

// PUBLIC_INTERFACE
function App() {
  /**
   * Root component handling simple view state (tasks/login/signup) and user session.
   * No external router is used to keep dependencies minimal.
   */
  const [view, setView] = useState('tasks');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Restore session
    const stored = localStorage.getItem('auth_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
    }
  }, []);

  const onLogout = () => {
    logout();
    setUser(null);
    setView('login');
  };

  const content = useMemo(() => {
    if (view === 'login') return <LoginPage onSuccess={(u) => { setUser(u); setView('tasks'); }} />;
    if (view === 'signup') return <SignupPage onSuccess={(u) => { setUser(u); setView('tasks'); }} />;
    return <TasksPage />;
  }, [view]);

  return (
    <div className="app-gradient">
      <div className="container stack" style={{ paddingTop: 28, paddingBottom: 28 }}>
        <Header user={user} onLogout={onLogout} onNavigate={setView} />
        {content}
      </div>
    </div>
  );
}

export default App;
