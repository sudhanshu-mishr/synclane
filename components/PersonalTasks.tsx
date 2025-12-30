
import React, { useState } from 'react';
import { Plus, CheckCircle2, Circle, MoreVertical, Calendar, Zap, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task, User } from '../types';

const INITIAL_TASKS: Task[] = [];

const PersonalTasks: React.FC<{ user: User; onGainXP: (amount: number) => void }> = ({ user, onGainXP }) => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [popups, setPopups] = useState<{ id: number; x: number; y: number; amount: number }[]>([]);

  const toggleTask = (taskId: string, e: React.MouseEvent) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const newStatus = task.status === 'done' ? 'todo' : 'done';
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));

    if (newStatus === 'done') {
      const id = Date.now();
      setPopups(prev => [...prev, { id, x: e.clientX, y: e.clientY, amount: task.xpValue }]);
      onGainXP(task.xpValue);
      setTimeout(() => setPopups(prev => prev.filter(p => p.id !== id)), 1000);
    }
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: `p${Date.now()}`,
      title: newTaskTitle,
      description: '',
      status: 'todo',
      priority: 'medium',
      labels: [],
      position: tasks.length,
      xpValue: 10,
      createdAt: new Date().toISOString(),
      clanId: null
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  const todoTasks = tasks.filter(t => t.status !== 'done');
  const doneTasks = tasks.filter(t => t.status === 'done');

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <AnimatePresence>
        {popups.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -50 }}
            exit={{ opacity: 0 }}
            className="fixed z-[999] pointer-events-none text-emerald-500 font-black text-xl"
            style={{ left: p.x, top: p.y }}
          >
            +{p.amount} XP
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="mb-12">
        <div className="flex items-center gap-2 mb-2">
           <Flame size={16} className="text-orange-500" />
           <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{user.streak} Day Streak</span>
        </div>
        <h1 className="text-4xl font-black mb-1 dark:text-white">Personal Tasks</h1>
        <p className="text-sm text-slate-400 font-medium">Focused productivity without distractions.</p>
      </div>

      <form onSubmit={addTask} className="mb-10 relative group">
        <Plus className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={20} strokeWidth={3} />
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full bg-white dark:bg-black border border-gray-100 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 font-bold outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm transition-all dark:text-white"
        />
      </form>

      <div className="space-y-12">
        <section>
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Upcoming</h3>
            <span className="text-[10px] font-black text-slate-300">{todoTasks.length} Tasks</span>
          </div>
          <div className="space-y-2">
            {todoTasks.map(task => (
              <TaskRow key={task.id} task={task} onToggle={(e) => toggleTask(task.id, e)} />
            ))}
            {todoTasks.length === 0 && (
              <div className="py-10 text-center border-2 border-dashed border-gray-100 dark:border-white/5 rounded-3xl opacity-30">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">All clear for now</p>
              </div>
            )}
          </div>
        </section>

        {doneTasks.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Completed</h3>
            </div>
            <div className="space-y-2 opacity-60 grayscale-[0.5]">
              {doneTasks.map(task => (
                <TaskRow key={task.id} task={task} onToggle={(e) => toggleTask(task.id, e)} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

// Fixed TaskRow: Explicitly typed as React.FC to ensure proper handling of 'key' prop in map() calls
const TaskRow: React.FC<{ task: Task; onToggle: (e: React.MouseEvent) => void }> = ({ task, onToggle }) => (
  <motion.div
    layout
    className="flex items-center gap-4 bg-white dark:bg-black p-4 rounded-2xl border border-gray-50 dark:border-white/5 shadow-sm hover:border-emerald-500/30 transition-all group"
  >
    <button
      onClick={onToggle}
      className={`p-1 rounded-full transition-colors ${
        task.status === 'done' ? 'text-emerald-500' : 'text-slate-200 hover:text-emerald-500'
      }`}
    >
      {task.status === 'done' ? <CheckCircle2 size={24} fill="currentColor" className="text-white dark:text-black bg-emerald-500 rounded-full" /> : <Circle size={24} />}
    </button>

    <div className="flex-1 min-w-0">
      <h4 className={`font-black text-sm truncate ${task.status === 'done' ? 'line-through text-slate-300' : 'text-slate-900 dark:text-white'}`}>
        {task.title}
      </h4>
      <div className="flex items-center gap-3 mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
        <span className="flex items-center gap-1">
          <Zap size={10} className="text-emerald-500" />
          {task.xpValue} XP
        </span>
        {task.priority === 'high' && (
          <span className="text-rose-500">• High Priority</span>
        )}
      </div>
    </div>

    <button className="text-slate-200 hover:text-slate-600 transition-colors opacity-0 group-hover:opacity-100">
      <MoreVertical size={16} />
    </button>
  </motion.div>
);

export default PersonalTasks;
