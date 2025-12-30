
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ChevronRight, Layers, Zap, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { Board, User } from '../types';

const INITIAL_BOARDS: Board[] = [];

const Dashboard: React.FC<{ user: User }> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2 dark:text-white">Your Workspace</h1>
          <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
            <span>Progress: {user.xp} / {user.level * 1000} XP to Level {user.level + 1}</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span className="text-emerald-500 font-black flex items-center gap-1">
              <Activity size={14} />
              🔥 {user.streak} Day Streak
            </span>
          </div>
        </div>

        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-black shadow-xl shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-2">
          <Plus size={20} strokeWidth={3} />
          New Board
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {INITIAL_BOARDS.map((board, idx) => (
          <motion.div
            key={board.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ delay: idx * 0.1, duration: 0.3 }}
            onClick={() => navigate(`/workspace/${board.id}`)}
            className="group cursor-pointer bg-white dark:bg-black rounded-2xl border border-gray-100 dark:border-white/10 p-8 hover:border-emerald-500 transition-all active:scale-[0.98] shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10"
          >
            <div className="flex justify-between items-start mb-6">
               <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white group-hover:rotate-6 transition-transform">
                 <Layers size={24} strokeWidth={2.5} />
               </div>
               {board.activeUsers ? (
                 <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase rounded-full border border-emerald-500/20 transition-all group-hover:scale-110 group-hover:bg-emerald-500/20">
                    <Zap size={10} fill="currentColor" />
                    {board.activeUsers} Players
                 </div>
               ) : null}
            </div>

            <h3 className="text-2xl font-black mb-1 group-hover:text-emerald-500 transition-colors dark:text-white">{board.name}</h3>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-6 group-hover:text-slate-500 transition-colors">{board.taskCount} Tasks • 🔥 {board.streak} Streak</p>

            <div className="flex items-center justify-between pt-6 border-t border-gray-50 dark:border-white/5">
               <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <img key={i} src={`https://api.dicebear.com/7.x/notionists/svg?seed=board${board.id}u${i}`} className="w-8 h-8 rounded-full border-2 border-white dark:border-black bg-white group-hover:scale-110 transition-transform" style={{ transitionDelay: `${i * 50}ms` }} alt="user" />
                  ))}
               </div>
               <div className="flex items-center gap-2 text-emerald-500 font-black text-sm group-hover:translate-x-1 transition-transform">
                  Enter
                  <ChevronRight size={16} strokeWidth={3} />
               </div>
            </div>
          </motion.div>
        ))}

        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="border-2 border-dashed border-gray-100 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center p-8 group hover:border-emerald-500 hover:bg-emerald-500/5 transition-all cursor-pointer min-h-[260px] bg-gray-50/30 dark:bg-white/5 shadow-sm"
        >
          <Plus size={32} className="text-slate-200 group-hover:text-emerald-500 group-hover:scale-125 transition-all mb-2" />
          <span className="text-slate-400 font-black text-xs uppercase tracking-widest group-hover:text-emerald-500">Add Project</span>
        </motion.div>
      </div>
    </main>
  );
};

export default Dashboard;
