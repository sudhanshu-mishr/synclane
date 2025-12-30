
import React, { useState, useEffect } from 'react';
import { X, Trash2, Zap, Save, CheckCircle2, UserPlus, Check } from 'lucide-react';
import { Task, Priority } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskModalProps {
  task: Task;
  onClose: () => void;
  onSave: (task: Task) => void;
  onDelete: (id: string) => void;
  onComplete: () => void;
}

const CLAN_MEMBERS: any[] = [];

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose, onSave, onDelete, onComplete }) => {
  const [editedTask, setEditedTask] = useState<Task>({ ...task });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSave = () => {
    if (!editedTask.title.trim()) return;
    onSave(editedTask);
  };

  const toggleAssignee = (userId: string) => {
    setEditedTask(prev => ({
      ...prev,
      assignee: prev.assignee === userId ? undefined : userId
    }));
  };

  const variants = isMobile ? {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" }
  } : {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`relative bg-white dark:bg-zinc-900 w-full max-w-xl shadow-2xl flex flex-col overflow-hidden ${
          isMobile
            ? 'rounded-t-[2.5rem] max-h-[92vh] pb-safe'
            : 'rounded-[2rem] max-h-[85vh] border border-zinc-200 dark:border-white/10'
        }`}
      >
        {isMobile && (
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-12 h-1.5 bg-zinc-200 dark:bg-white/10 rounded-full" />
          </div>
        )}
        <div className="flex justify-between items-center p-6 md:p-8 border-b border-zinc-100 dark:border-white/5 flex-shrink-0">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-lg">
                {task.clanId ? '🛡️' : '🎯'}
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  {task.clanId ? 'Clan Mission' : 'Personal Quest'}
                </h4>
                <div className="text-primary font-bold text-[10px]">+{task.xpValue} XP Rewards</div>
              </div>
           </div>
           <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
             <X size={20} strokeWidth={2.5} />
           </button>
        </div>
        <div className="p-6 md:p-10 space-y-8 overflow-y-auto flex-grow custom-scrollbar">
          <div>
            <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-[0.2em] mb-4 block">Title</label>
            <input
              autoFocus
              type="text"
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              className="w-full text-2xl font-bold bg-transparent border-none focus:ring-0 text-zinc-900 dark:text-white p-0 placeholder:text-zinc-200 dark:placeholder:text-zinc-800"
              placeholder="Mission Objective"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-[0.2em] mb-4 block">Assign Player</label>
            <div className="flex flex-wrap gap-3">
              {CLAN_MEMBERS.map(member => (
                <button
                  key={member.id}
                  onClick={() => toggleAssignee(member.id)}
                  className={`relative flex items-center gap-2 p-1.5 rounded-xl border transition-all ${
                    editedTask.assignee === member.id
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-zinc-100 dark:border-white/5 bg-zinc-50 dark:bg-white/5 grayscale opacity-60 hover:grayscale-0 hover:opacity-100'
                  }`}
                >
                  <img src={member.avatar} className="w-7 h-7 rounded-lg" alt={member.name} />
                  <span className="text-[10px] font-bold pr-2">{member.name.split(' ')[0]}</span>
                </button>
              ))}
              <button className="w-10 h-10 rounded-xl border-2 border-dashed border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-400 hover:border-primary hover:text-primary transition-all">
                <UserPlus size={16} />
              </button>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-[0.2em] mb-4 block">Briefing</label>
            <textarea
              rows={4}
              value={editedTask.description}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-white/5 rounded-2xl p-4 text-sm text-zinc-600 dark:text-zinc-300 resize-none font-medium leading-relaxed outline-none focus:border-primary/30 transition-all"
              placeholder="Strategy and notes..."
            />
          </div>
          <div className="flex flex-wrap gap-8">
            <div className="flex-1 min-w-[140px]">
              <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-[0.2em] mb-4 block">Priority</label>
              <div className="flex gap-2">
                {(['low', 'medium', 'high'] as Priority[]).map(p => (
                  <button
                    key={p}
                    onClick={() => setEditedTask({ ...editedTask, priority: p })}
                    className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase transition-all border ${
                      editedTask.priority === p
                        ? 'bg-zinc-900 dark:bg-white text-white dark:text-black border-zinc-900 dark:border-white'
                        : 'bg-transparent text-zinc-400 border-zinc-100 dark:border-white/10 hover:border-zinc-200'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 min-w-[140px]">
              <label className="text-[10px] font-bold uppercase text-zinc-400 tracking-[0.2em] mb-4 block">XP Value</label>
              <div className="flex items-center gap-3 px-4 py-2 bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/5 rounded-xl">
                <Zap size={14} className="text-primary" />
                <span className="text-sm font-bold dark:text-white">{editedTask.xpValue} XP</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 md:p-8 bg-zinc-50/50 dark:bg-black/20 border-t border-zinc-100 dark:border-white/5 flex flex-col md:flex-row gap-4 flex-shrink-0">
          {task.status !== 'done' ? (
            <button
              onClick={onComplete}
              className="flex-[2] py-4 bg-primary text-white font-bold rounded-2xl shadow-pro hover:shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
            >
              <CheckCircle2 size={18} strokeWidth={2.5} />
              Commit Task
            </button>
          ) : (
            <div className="flex-[2] py-4 bg-emerald-500/10 text-emerald-600 font-bold rounded-2xl border border-emerald-500/20 flex items-center justify-center gap-2">
              <Check size={18} strokeWidth={3} />
              Mission Success
            </div>
          )}
          <div className="flex flex-1 gap-4">
            <button
              onClick={handleSave}
              className="flex-1 py-4 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold rounded-2xl border border-zinc-200 dark:border-white/10 hover:bg-zinc-50 transition-all flex items-center justify-center gap-2"
            >
              <Save size={18} />
              Save
            </button>
            <button
              onClick={() => { if(confirm('Abort mission?')) { onDelete(task.id); onClose(); } }}
              className="w-14 h-14 flex items-center justify-center text-zinc-400 hover:text-rose-500 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-2xl transition-all"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TaskModal;
