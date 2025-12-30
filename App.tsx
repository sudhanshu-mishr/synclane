
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Workspace from './components/Workspace';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import AvatarEdit from './components/AvatarEdit';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import { User, Clan } from './types';
import { api } from './services/api';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [clans, setClans] = useState<Clan[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState('emerald');

  useEffect(() => {
    const savedUser = localStorage.getItem('synclane_user');
    const savedTheme = localStorage.getItem('synclane_theme');
    const savedDark = localStorage.getItem('synclane_dark');

    if (savedUser) {
        // Attempt to re-login silently or just trust local storage for now
        // Ideally we verify with backend, but for now we'll load from local and sync later
        // Or better: fetch user by email if we stored it?
        // Let's stick to local storage for session persistence for now, but update from API
        const u = JSON.parse(savedUser) as User;

        // Fetch fresh user data
        api.login(u.name, u.email, u.avatar).then(freshUser => {
            setUser(freshUser);
            localStorage.setItem('synclane_user', JSON.stringify(freshUser));
        }).catch(err => {
            console.error("Failed to sync user", err);
            // Fallback to local
            setUser(u);
        });
    }

    if (savedTheme) setTheme(savedTheme);
    if (savedDark) setIsDarkMode(savedDark === 'true');

    loadClans();
  }, []);

  const loadClans = async () => {
      try {
          const fetchedClans = await api.getClans();
          setClans(fetchedClans);
      } catch (err) {
          console.error("Failed to load clans", err);
      }
  };

  useEffect(() => {
    document.documentElement.className = isDarkMode ? 'dark' : '';
    localStorage.setItem('synclane_theme', theme);
    localStorage.setItem('synclane_dark', String(isDarkMode));
  }, [theme, isDarkMode]);

  const addXP = async (amount: number) => {
    if (!user) return;
    // Calculate locally for immediate feedback
    const streakBonus = user.streak >= 3 ? Math.floor(amount * 0.2) : 0;
    const finalAmount = amount + streakBonus;

    const newXP = user.xp + finalAmount;
    const nextLevel = Math.floor(newXP / 1000) + 1;
    const updatedUser = { ...user, xp: newXP, level: nextLevel > user.level ? nextLevel : user.level };

    setUser(updatedUser);
    localStorage.setItem('synclane_user', JSON.stringify(updatedUser));

    // Sync with backend
    try {
        await api.updateUser(user.id, { xp: newXP, level: updatedUser.level });
    } catch (err) {
        console.error("Failed to sync XP", err);
    }
  };

  const handleUpdateUser = async (updates: Partial<User>) => {
    if (!user) return;
    try {
        const updatedUser = await api.updateUser(user.id, updates);
        setUser(updatedUser);
        localStorage.setItem('synclane_user', JSON.stringify(updatedUser));
    } catch (err) {
        console.error("Failed to update user", err);
    }
  };

  const handleLogin = async (u: User) => {
    try {
        const loggedInUser = await api.login(u.name, u.email, u.avatar);
        setUser(loggedInUser);
        localStorage.setItem('synclane_user', JSON.stringify(loggedInUser));
        localStorage.setItem('synclane_last_active_date', new Date().toDateString());
    } catch (err) {
        console.error("Login failed", err);
        // Fallback or error handling
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('synclane_user');
  };

  const addClan = async (name: string) => {
    try {
        const newClan = await api.addClan(name);
        setClans([...clans, newClan]);
    } catch (err) {
        console.error("Failed to add clan", err);
    }
  };

  return (
    <Router>
      <div className={`min-h-screen transition-all duration-300 theme-${theme} ${isDarkMode ? 'dark bg-black text-white' : 'bg-slate-50 text-slate-900'}`}>
        {user && (
          <Navbar
            user={user}
            onLogout={handleLogout}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            currentTheme={theme}
            onSetTheme={setTheme}
          />
        )}
        <div className="flex h-screen pt-16 overflow-hidden">
          {user && <Sidebar clans={clans} onAddClan={addClan} />}
          <main className="flex-1 overflow-y-auto custom-scrollbar pb-24 md:pb-0">
            <Routes>
              <Route path="/login" element={!user ? <AuthPage onLogin={handleLogin} /> : <Navigate to="/workspace/me" />} />
              <Route path="/workspace/:context" element={user ? <Workspace user={user} onGainXP={addXP} /> : <Navigate to="/login" />} />
              <Route path="/profile" element={user ? <Profile user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
              <Route path="/profile/edit" element={user ? <ProfileEdit user={user} onUpdate={handleUpdateUser} /> : <Navigate to="/login" />} />
              <Route path="/profile/edit-avatar" element={user ? <AvatarEdit user={user} onUpdate={handleUpdateUser} /> : <Navigate to="/login" />} />
              <Route path="*" element={<Navigate to={user ? "/workspace/me" : "/login"} />} />
            </Routes>
          </main>
        </div>
        {user && <MobileNav clans={clans} />}
      </div>
    </Router>
  );
};

export default App;
