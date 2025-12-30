
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, Zap, Layout, Users, TrendingUp, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { User } from '../types';

const ClanOverview: React.FC<{ user: User }> = ({ user }) => {
  const { id } = useParams();

  const xpProgress = 0;
  const activityList: any[] = [];
  const topContributors: any[] = [];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-emerald-500/20">
            <Shield size={40} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-4xl font-black mb-1 dark:text-white">{id?.replace('-', ' ') || 'New Clan'}</h1>
            <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
              <span className="text-emerald-500 font-black uppercase tracking-widest text-xs">Level 1</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span>1 Member Active</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to={`/clans/${id}/tasks`} className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-black shadow-xl shadow-emerald-500/20 transition-all flex items-center gap-2">
            <Layout size={20} strokeWidth={3} />
            Board
          </Link>
          <button className="p-3.5 bg-white dark:bg-black border border-gray-100 dark:border-white/10 rounded-xl text-slate-400 hover:text-slate-600 transition-colors">
            <Users size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-8">
           <section className="bg-white dark:bg-black p-8 rounded-[2rem] border border-gray-100 dark:border-white/10 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Clan Vitality</h3>
                 <span className="text-xs font-black text-emerald-500">{xpProgress}% to Level 2</span>
              </div>
              <div className="h-6 bg-gray-50 dark:bg-white/5 rounded-full overflow-hidden border border-gray-100 dark:border-white/10 p-1 mb-8">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${xpProgress}%` }}
                  className="h-full bg-emerald-500 rounded-full"
                />
              </div>
              <div className="grid grid-cols-3 gap-8">
                <div>
                   <div className="text-2xl font-black dark:text-white">0</div>
                   <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Weekly XP</div>
                </div>
                <div>
                   <div className="text-2xl font-black dark:text-white">0</div>
                   <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Tasks Sync'd</div>
                </div>
                <div>
                   <div className="text-2xl font-black dark:text-white">0</div>
                   <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Velocity</div>
                </div>
              </div>
           </section>

           <section>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 ml-2">Recent Activity</h3>
              <div className="space-y-4">
                 {activityList.map(item => (
                    <div key={item.id} className="flex items-center gap-4 bg-white dark:bg-black p-6 rounded-2xl border border-gray-100 dark:border-white/10 transition-all hover:border-emerald-500/30">
                       <img src={item.avatar} className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5" />
                       <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold dark:text-white truncate">
                             <span className="text-emerald-500">@{item.user}</span> completed task <span className="text-slate-500 font-medium">"{item.task}"</span>
                          </p>
                          <span className="text-[9px] font-black uppercase text-slate-300">{item.time} • +{item.xp} XP</span>
                       </div>
                    </div>
                 ))}
                 {activityList.length === 0 && (
                   <div className="p-12 text-center border-2 border-dashed border-theme-border rounded-[2rem] opacity-30">
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">No activity yet</p>
                   </div>
                 )}
              </div>
           </section>
        </div>

        <div className="space-y-8">
           <section className="bg-white dark:bg-black p-8 rounded-[2rem] border border-gray-100 dark:border-white/10 shadow-sm">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Top Contributors</h3>
              <div className="space-y-6">
                 {topContributors.map(item => (
                    <div key={item.id} className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <img src={item.avatar} className="w-8 h-8 rounded-full border border-gray-100 dark:border-white/10" />
                          <div className="text-sm font-black dark:text-white">{item.name}</div>
                       </div>
                       <span className="text-[10px] font-black text-emerald-500">{item.xp} XP</span>
                    </div>
                 ))}
                 {topContributors.length === 0 && (
                   <p className="text-center py-4 text-[10px] font-black text-slate-300 uppercase">Awaiting reports...</p>
                 )}
              </div>
              <button className="w-full mt-10 py-3 bg-gray-50 dark:bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-500 transition-colors">View All Members</button>
           </section>
        </div>
      </div>
    </div>
  );
};

export default ClanOverview;
