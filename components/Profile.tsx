
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Flame, Award, LogOut, Camera, Target, Star, Shield, TrendingUp, Users, Edit3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { User } from '../types';

interface ProfileProps {
  user: User;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  // User data is now fed from App state which is synced with API
  const xpProgress = (user.xp % 1000) / 10;
  const levelBracket = Math.floor(user.level / 10);
  const titles = ['Rookie', 'Guardian', 'Captain', 'Master', 'Legend'];
  const userTitle = titles[Math.min(levelBracket, titles.length - 1)];

  const stats = [
    { label: 'Weekly XP', value: '2,450', icon: Zap, color: 'text-primary' },
    { label: 'Efficiency', value: '94%', icon: TrendingUp, color: 'text-emerald-500' },
    { label: 'Active Missions', value: '12', icon: Target, color: 'text-rose-500' },
  ];

  const leaderboard = [
    { name: 'Sarah Chen', level: 12, xp: '12.4k', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah', rank: 1 },
    { name: 'Alex Player (You)', level: user.level, xp: `${(user.xp / 1000).toFixed(1)}k`, avatar: user.avatar, rank: 2, isMe: true },
    { name: 'Jordan Smith', level: 4, xp: '4.2k', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jordan', rank: 3 },
  ];

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 pb-32 md:pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Left Column: Identity Card */}
        <div className="space-y-8">
          <div className="bg-theme-surface border border-theme-border rounded-[2.5rem] p-10 relative overflow-hidden shadow-pro group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10" />

            <div className="flex flex-col items-center text-center relative z-10">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] blur-2xl animate-pulse" />
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] border-4 border-primary p-1 bg-theme-page shadow-2xl relative"
                />
                <Link
                  to="/profile/edit-avatar"
                  className="absolute bottom-2 right-2 bg-theme-text text-theme-page w-10 h-10 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <Camera size={20} />
                </Link>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-lg mb-2">
                <Shield size={12} strokeWidth={3} />
                <span className="text-[10px] font-black uppercase tracking-widest">{userTitle}</span>
              </div>

              <div className="flex items-center gap-2 mb-1 group/name">
                <h1 className="text-3xl font-black text-theme-text">{user.name}</h1>
                <Link to="/profile/edit" className="text-theme-muted hover:text-primary transition-colors">
                  <Edit3 size={18} />
                </Link>
              </div>
              <p className="text-[10px] font-black uppercase text-theme-muted tracking-widest mb-4">{user.email}</p>

              {user.bio && (
                <p className="text-sm text-theme-muted font-medium italic mb-8 leading-relaxed max-w-xs">
                  "{user.bio}"
                </p>
              )}

              {!user.bio && (
                <Link to="/profile/edit" className="text-[10px] font-black uppercase text-primary tracking-widest mb-8 hover:underline">
                  + Add Personal Mission Statement
                </Link>
              )}

              <div className="grid grid-cols-2 gap-3 w-full">
                <div className="p-4 bg-theme-page border border-theme-border rounded-2xl">
                   <div className="text-2xl font-black text-primary">{user.level}</div>
                   <div className="text-[8px] font-black uppercase text-theme-muted tracking-widest">Level</div>
                </div>
                <div className="p-4 bg-theme-page border border-theme-border rounded-2xl">
                   <div className="text-2xl font-black text-orange-500">{user.streak}</div>
                   <div className="text-[8px] font-black uppercase text-theme-muted tracking-widest">Streak</div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full py-4 bg-rose-500/10 text-rose-500 font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
          >
            <LogOut size={18} />
            Terminate Session
          </button>
        </div>

        {/* Right Column: Stats & Progression */}
        <div className="lg:col-span-2 space-y-10">

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map(s => (
              <div key={s.label} className="bg-theme-surface border border-theme-border rounded-3xl p-6 flex flex-col items-center text-center shadow-sm hover:translate-y-[-2px] transition-all">
                <div className={`w-10 h-10 rounded-xl ${s.color} bg-opacity-10 flex items-center justify-center mb-4`}>
                  <s.icon size={20} />
                </div>
                <div className="text-2xl font-black text-theme-text">{s.value}</div>
                <div className="text-[9px] font-black uppercase text-theme-muted tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Level Progress */}
          <section className="bg-theme-surface border border-theme-border rounded-[2rem] p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Star className="text-primary" size={20} fill="currentColor" />
                <h3 className="text-xs font-black uppercase tracking-widest text-theme-text">Global Progression</h3>
              </div>
              <span className="text-xs font-black text-primary">{Math.floor(xpProgress)}% Completed</span>
            </div>
            <div className="h-6 bg-theme-page rounded-full border border-theme-border p-1 mb-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                className="h-full bg-primary rounded-full shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
              />
            </div>
            <div className="flex justify-between text-[9px] font-black uppercase text-theme-muted">
              <span>Lvl {user.level}</span>
              <span>Lvl {user.level + 1} Target</span>
            </div>
          </section>

          {/* Leaderboard */}
          <section className="bg-theme-surface border border-theme-border rounded-[2rem] p-8">
            <div className="flex items-center gap-3 mb-8">
               <Users className="text-primary" size={20} />
               <h3 className="text-xs font-black uppercase tracking-widest text-theme-text">Sync League Standings</h3>
            </div>
            <div className="space-y-4">
               {leaderboard.map(entry => (
                 <div
                   key={entry.name}
                   className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                    entry.isMe ? 'bg-primary/5 border-primary shadow-sm' : 'bg-theme-page border-theme-border'
                   }`}
                 >
                   <div className="flex items-center gap-4">
                      <div className="w-6 text-[10px] font-black text-theme-muted">#{entry.rank}</div>
                      <img src={entry.avatar} className="w-10 h-10 rounded-full border-2 border-theme-border" alt="p" />
                      <div>
                        <div className="text-sm font-black text-theme-text">{entry.name}</div>
                        <div className="text-[9px] font-bold text-theme-muted">Ranked Division {entry.level > 10 ? 'Elite' : 'Alpha'}</div>
                      </div>
                   </div>
                   <div className="text-right">
                      <div className="text-sm font-black text-primary">{entry.xp} XP</div>
                      <div className="text-[9px] font-bold text-theme-muted">Lvl {entry.level}</div>
                   </div>
                 </div>
               ))}
            </div>
            <button className="w-full mt-6 py-3 text-[10px] font-black uppercase tracking-widest text-theme-muted hover:text-primary transition-colors">View Global Leaderboard</button>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Profile;
