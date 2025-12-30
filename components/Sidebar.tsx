
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, Briefcase, Trophy, Plus, X, Activity, Zap, Target } from 'lucide-react';
import { Clan } from '../types';
import { motion } from 'framer-motion';

interface SidebarProps {
  clans: Clan[];
  onAddClan: (name: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ clans, onAddClan }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newClanName, setNewClanName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newClanName.trim()) {
      onAddClan(newClanName);
      setNewClanName('');
      setIsAdding(false);
    }
  };

  return (
    <aside className="w-72 border-r border-theme-border bg-theme-page hidden lg:flex flex-col relative overflow-hidden">
      {/* Decorative Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="p-8 space-y-10 flex-1 overflow-y-auto custom-scrollbar relative z-10">

        {/* Workspace Section */}
        <section>
          <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-theme-muted mb-6 flex items-center gap-2">
            <Briefcase size={10} /> Workspace
          </h3>
          <div className="space-y-1.5">
            <NavLink
              to="/workspace/me"
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-black transition-all group hover:translate-x-1 ${
                  isActive ? 'bg-primary text-white shadow-xl shadow-primary/25 translate-x-1' : 'text-theme-muted hover:bg-theme-surface hover:text-theme-text'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Activity size={18} strokeWidth={isActive ? 3 : 2} className={`${isActive ? '' : 'group-hover:text-primary transition-all'}`} />
                  Personal Space
                </>
              )}
            </NavLink>
          </div>
        </section>

        {/* Clans Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-theme-muted flex items-center gap-2">
              <Shield size={10} /> Clans
            </h3>
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="w-7 h-7 flex items-center justify-center bg-theme-surface text-theme-muted hover:text-primary hover:scale-110 active:scale-95 rounded-xl transition-all border border-theme-border"
            >
              <Plus size={14} strokeWidth={3} />
            </button>
          </div>

          <div className="space-y-1.5">
            {isAdding && (
              <form onSubmit={handleSubmit} className="mb-4 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="relative">
                  <input
                    autoFocus
                    value={newClanName}
                    onChange={(e) => setNewClanName(e.target.value)}
                    placeholder="Initialize Clan..."
                    className="w-full bg-theme-surface border border-primary/30 rounded-2xl px-5 py-3 text-sm font-black focus:ring-4 focus:ring-primary/10 outline-none text-theme-text"
                  />
                  <button type="button" onClick={() => setIsAdding(false)} className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted hover:text-rose-500 transition-colors">
                    <X size={16} />
                  </button>
                </div>
              </form>
            )}

            {clans.map(clan => (
              <NavLink
                key={clan.id}
                to={`/workspace/${clan.id}`}
                className={({ isActive }) =>
                  `flex items-center justify-between px-5 py-3.5 rounded-2xl text-sm font-black transition-all group hover:translate-x-1 ${
                    isActive ? 'bg-primary text-white shadow-xl shadow-primary/25 translate-x-1' : 'text-theme-muted hover:bg-theme-surface hover:text-theme-text'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Shield size={18} strokeWidth={isActive ? 3 : 2} className={`${isActive ? '' : 'group-hover:text-primary transition-all'}`} />
                      <span className="truncate w-32">{clan.name}</span>
                    </div>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg border transition-all ${isActive ? 'bg-white/20 border-white/20' : 'bg-theme-page border-theme-border group-hover:border-primary/30 group-hover:text-primary'}`}>
                      L{clan.level}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </section>

        {/* Community Section */}
        <section>
          <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-theme-muted mb-6 flex items-center gap-2">
            <Trophy size={10} /> Progress
          </h3>
          <div className="space-y-1.5">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-black transition-all group hover:translate-x-1 ${
                  isActive ? 'bg-primary text-white shadow-xl shadow-primary/25 translate-x-1' : 'text-theme-muted hover:bg-theme-surface hover:text-theme-text'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Trophy size={18} strokeWidth={isActive ? 3 : 2} className={`${isActive ? '' : 'group-hover:text-primary transition-all'}`} />
                  Leaderboard
                </>
              )}
            </NavLink>
          </div>
        </section>
      </div>

      {/* Footer Progression Stats */}
      <div className="mt-auto p-8 border-t border-theme-border">
        <div className="p-5 bg-theme-surface border border-theme-border rounded-[1.75rem] relative overflow-hidden group cursor-default transition-all hover:shadow-lg hover:shadow-primary/5">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-black uppercase text-theme-muted tracking-widest flex items-center gap-1.5 group-hover:text-primary transition-colors">
                <Target size={12} className="text-primary transition-transform group-hover:scale-110" /> Weekly Rank
              </p>
              <span className="text-[11px] font-black text-primary">65%</span>
            </div>
            <div className="h-2 bg-theme-border rounded-full overflow-hidden">
               <motion.div
                initial={{ width: 0 }}
                animate={{ width: '65%' }}
                className="h-full bg-primary"
               />
            </div>
            <p className="mt-3 text-[9px] font-black text-theme-muted uppercase tracking-tighter">
              Next badge: <span className="text-primary group-hover:underline">XP GRINDER</span>
            </p>
          </div>
          <Zap className="absolute -bottom-4 -right-4 text-primary opacity-5 rotate-12 transition-all duration-500 group-hover:scale-150 group-hover:opacity-10" size={80} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
