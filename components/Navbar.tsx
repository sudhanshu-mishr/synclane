
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Palette, LogOut, Flame, Check } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  currentTheme: string;
  onSetTheme: (theme: string) => void;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, isDarkMode, onToggleDarkMode, currentTheme, onSetTheme, onLogout }) => {
  const [showThemes, setShowThemes] = useState(false);
  const xpProgress = (user.xp % 1000) / 10;

  const themes = [
    { id: 'emerald', color: 'bg-emerald-500', name: 'Emerald', desc: 'Focus & Growth' },
    { id: 'cobalt', color: 'bg-blue-500', name: 'Midnight', desc: 'Deep Work' },
    { id: 'amethyst', color: 'bg-purple-500', name: 'Creative', desc: 'Amethyst' },
    { id: 'rose', color: 'bg-rose-500', name: 'Rose', desc: 'High Energy' },
    { id: 'amber', color: 'bg-amber-500', name: 'Solar', desc: 'Classic Paper' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-theme-page/80 backdrop-blur-xl border-b border-theme-border z-50 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-primary/20 group-hover:scale-110 group-hover:rotate-12 transition-all">S</div>
          <span className="text-lg font-black tracking-tighter hidden sm:block text-theme-text group-hover:text-primary transition-colors">SyncLane</span>
        </Link>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Streak Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 text-orange-600 rounded-full border border-orange-500/10 hover:bg-orange-500/20 hover:scale-105 transition-all cursor-default group">
          <Flame size={14} strokeWidth={3} className="group-hover:animate-bounce" />
          <span className="text-[10px] font-black uppercase">{user.streak} Days</span>
        </div>

        {/* XP Progress */}
        <Link to="/profile" className="flex items-center gap-3 bg-theme-surface px-3 py-1.5 rounded-2xl border border-theme-border hover:border-primary/50 hover:bg-theme-page transition-all group">
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-black uppercase text-theme-muted group-hover:text-primary transition-colors">Lvl {user.level}</span>
            <div className="w-16 h-1 bg-theme-border rounded-full mt-0.5 overflow-hidden">
              <div className="h-full bg-primary transition-all duration-500" style={{ width: `${xpProgress}%` }}></div>
            </div>
          </div>
          <img src={user.avatar} className="w-7 h-7 rounded-full bg-theme-page border border-theme-border group-hover:scale-110 group-hover:border-primary transition-all" alt="avatar" />
        </Link>

        <div className="h-6 w-px bg-theme-border mx-1 hidden sm:block"></div>

        <div className="flex items-center gap-1">
          {/* Theme Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowThemes(!showThemes)}
              className={`p-2 transition-all rounded-lg hover:scale-110 active:scale-90 ${showThemes ? 'text-primary bg-primary/5' : 'text-theme-muted hover:text-primary'}`}
            >
              <Palette size={20} />
            </button>

            {showThemes && (
              <>
                <div className="fixed inset-0 z-0" onClick={() => setShowThemes(false)} />
                <div className="absolute right-0 mt-3 p-3 bg-theme-surface border border-theme-border rounded-2xl shadow-2xl flex flex-col gap-1.5 z-10 w-56 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-2 text-[9px] font-black uppercase text-theme-muted tracking-widest">Environment Themes</div>
                  {themes.map(t => (
                    <button
                      key={t.id}
                      onClick={() => { onSetTheme(t.id); setShowThemes(false); }}
                      className={`flex items-center justify-between w-full p-2.5 rounded-xl transition-all ${currentTheme === t.id ? 'bg-primary/10 text-primary ring-1 ring-primary/20' : 'hover:bg-theme-page text-theme-muted hover:text-theme-text hover:translate-x-1'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${t.color} shadow-sm transition-transform group-hover:scale-125`} />
                        <div className="text-left">
                          <div className="text-xs font-black">{t.name}</div>
                          <div className="text-[9px] opacity-60 font-medium">{t.desc}</div>
                        </div>
                      </div>
                      {currentTheme === t.id && <Check size={14} strokeWidth={3} />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            onClick={onToggleDarkMode}
            className="p-2 text-theme-muted hover:text-primary hover:scale-110 active:scale-90 transition-all"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {onLogout && (
            <button
              onClick={onLogout}
              className="p-2 text-theme-muted hover:text-rose-500 hover:scale-110 active:scale-90 transition-all"
            >
              <LogOut size={20} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
