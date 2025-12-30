
import React from 'react';
import { Zap, UserCircle, MessageSquare, Clock, ArrowRight } from 'lucide-react';
import { Task } from '../types';
import { motion } from 'framer-motion';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

const ID_TO_SEED: Record<string, string> = {
  'u1': 'alex',
  'u2': 'sarah',
  'u3': 'jordan',
  'u4': 'elena'
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const avatarSeed = task.assignee ? (ID_TO_SEED[task.assignee] || task.assignee) : `task-${task.id}`;
  const avatarUrl = `https://api.dicebear.com/7.x/notionists/svg?seed=${avatarSeed}`;

  const priorityThemes = {
    high: {
      dot: 'bg-rose-500 shadow-[0_0_8px_#f43f5e]',
      badge: 'text-rose-600 bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20',
      border: 'hover:border-rose-500/40'
    },
    medium: {
      dot: 'bg-amber-500 shadow-[0_0_8px_#f59e0b]',
      badge: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20',
      border: 'hover:border-amber-500/40'
    },
    low: {
      dot: 'bg-emerald-500 shadow-[0_0_8px_#10b981]',
      badge: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20',
      border: 'hover:border-emerald-500/40'
    },
  };

  const theme = priorityThemes[task.priority];

  return (
    <motion.div
      whileHover={{ y: -4, x: 2 }}
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      className={`group relative bg-theme-page border border-theme-border rounded-2xl p-4 md:p-5 transition-all duration-300 cursor-pointer shadow-pro hover:shadow-xl ${
        task.status === 'done' ? 'opacity-60 grayscale-[0.4]' : ''
      } ${theme.border}`}
    >
      {/* Glow highlight for priority */}
      {task.priority === 'high' && ! (task.status === 'done') && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 blur-3xl pointer-events-none" />
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
           <div className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
           <span className="text-[9px] font-black text-theme-muted uppercase tracking-[0.2em] opacity-50">
             Mission {task.id.slice(-4)}
           </span>
        </div>
        <div className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border ${theme.badge}`}>
          {task.priority}
        </div>
      </div>

      <div className="mb-5">
        <h4 className={`font-black text-[15px] leading-tight mb-2 transition-colors ${
          task.status === 'done' ? 'text-theme-muted line-through' : 'text-theme-text group-hover:text-primary'
        }`}>
          {task.title}
        </h4>
        {task.description && (
          <p className="text-[11px] text-theme-muted line-clamp-2 font-medium leading-relaxed opacity-80">
            {task.description}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-theme-border">
        <div className="flex items-center gap-2">
           <div className="w-7 h-7 rounded-xl bg-theme-surface overflow-hidden flex-shrink-0 border border-theme-border shadow-inner">
              {task.assignee ? (
                <img src={avatarUrl} className="w-full h-full object-cover" alt="member" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-theme-muted opacity-40">
                  <UserCircle size={14} />
                </div>
              )}
           </div>
           {task.assignee && (
             <span className="text-[9px] font-black text-theme-muted opacity-70 group-hover:opacity-100 transition-opacity">
               @{ID_TO_SEED[task.assignee] || 'member'}
             </span>
           )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[10px] font-black text-primary bg-primary/10 px-2 py-1 rounded-lg">
            <Zap size={10} fill="currentColor" />
            {task.xpValue}
          </div>
          <div className="w-6 h-6 flex items-center justify-center text-theme-muted opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
             <ArrowRight size={14} strokeWidth={3} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
