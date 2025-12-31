
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Zap, Activity, Filter, ChevronDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task, Status, User, Priority } from '../types';
import TaskModal from './TaskModal';
import TaskCard from './TaskCard';
import { api } from '../services/api';

const COLUMNS: { id: Status; label: string; color: string }[] = [
  { id: 'todo', label: 'Todo', color: 'bg-zinc-400' },
  { id: 'progress', label: 'In Progress', color: 'bg-primary' },
  { id: 'review', label: 'Review', color: 'bg-amber-500' },
  { id: 'done', label: 'Done', color: 'bg-emerald-500' },
];

const Workspace: React.FC<{ user: User; onGainXP: (amount: number) => void }> = ({ user, onGainXP }) => {
  const { context } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [popups, setPopups] = useState<{ id: number; x: number; y: number; amount: number }[]>([]);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [activeCol, setActiveCol] = useState<Status>('todo');
  const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all');
  const scrollRef = useRef<HTMLDivElement>(null);

  const isPersonal = context === 'me';

  useEffect(() => {
    loadTasks();
  }, [context]);

  const loadTasks = async () => {
      try {
          const clanId = isPersonal ? 'me' : context;
          // If personal, filter by user name to ensure privacy
          const assignee = isPersonal ? user.name : undefined;
          const fetchedTasks = await api.getTasks(clanId, assignee);
          setTasks(fetchedTasks);
      } catch (err) {
          console.error("Failed to load tasks", err);
      }
  };

  const boardTasks = tasks.filter(t => filterPriority === 'all' || t.priority === filterPriority);

  const triggerXP = (x: number, y: number, amount: number) => {
    const id = Date.now();
    onGainXP(amount);
    setPopups(prev => [...prev, { id, x, y, amount }]);
    setTimeout(() => setPopups(prev => prev.filter(p => p.id !== id)), 1000);
  };

  const handleAddTask = async (status: Status = 'todo') => {
    const newTaskPartial: Partial<Task> = {
      title: 'New Mission',
      description: '',
      status: status,
      priority: 'medium',
      xpValue: 15,
      createdAt: new Date().toISOString(),
      clanId: isPersonal ? null : (context || null),
      // Assign to current user if personal workspace
      assignee: isPersonal ? user.name : undefined
    };

    try {
        const newTask = await api.createTask(newTaskPartial);
        setTasks([newTask, ...tasks]);
        setSelectedTask(newTask);
    } catch (err) {
        console.error("Failed to create task", err);
    }
  };

  const moveTask = async (taskId: string, newStatus: Status, e?: React.DragEvent) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.status === newStatus) return;

    // Optimistic update
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));

    try {
        await api.updateTask(taskId, { status: newStatus });
        const xpAmount = newStatus === 'done' ? task.xpValue : 5;
        const x = e?.clientX || window.innerWidth / 2;
        const y = e?.clientY || window.innerHeight / 2;
        triggerXP(x, y, xpAmount);
    } catch (err) {
        console.error("Failed to move task", err);
        // Revert optimistic update
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: task.status } : t));
    }
  };

  const scrollToColumn = (colId: Status) => {
    const element = document.getElementById(`col-${colId}`);
    if (element && scrollRef.current) {
      const left = element.offsetLeft - 16;
      scrollRef.current.scrollTo({ left, behavior: 'smooth' });
    }
    setActiveCol(colId);
  };

  const updateTask = async (t: Task) => {
    // Optimistic
    setTasks(prev => prev.map(item => item.id === t.id ? t : item));
    setSelectedTask(null);
    try {
        await api.updateTask(t.id, t);
    } catch (err) {
        console.error("Failed to update task", err);
        // Revert? Or reload
        loadTasks();
    }
  };

  const deleteTask = async (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    setSelectedTask(null);
    try {
        await api.deleteTask(id);
    } catch (err) {
        console.error("Failed to delete task", err);
        loadTasks();
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-theme-page">
      <AnimatePresence>
        {popups.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.5, y: 0 }}
            animate={{ opacity: 0, scale: 2, y: -120 }}
            className="fixed z-[999] pointer-events-none text-primary font-black text-3xl"
            style={{ left: p.x, top: p.y }}
          >
            +{p.amount} XP
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Dynamic Header */}
      <header className="flex-shrink-0 border-b border-theme-border bg-theme-page/70 backdrop-blur-xl">
        <div className="px-6 py-6 md:px-10 md:py-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shadow-inner group transition-all">
               {isPersonal ? <Activity size={28} className="group-hover:scale-110 transition-transform" /> : <Zap size={28} className="group-hover:scale-110 transition-transform" />}
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-theme-text uppercase">
                {isPersonal ? 'Missions' : context?.replace('-', ' ')}
              </h1>
              <div className="flex items-center gap-3 mt-1">
                 <div className="flex items-center gap-1.5 px-2 py-0.5 bg-primary text-white rounded-lg">
                   <span className="text-[10px] font-black uppercase">LVL {user.level}</span>
                 </div>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-theme-muted opacity-60">
                   {boardTasks.length} Active Objectives
                 </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center bg-theme-surface border border-theme-border rounded-xl px-4 py-2 text-theme-muted gap-3">
              <Search size={14} />
              <input type="text" placeholder="Locate mission..." className="bg-transparent text-xs font-bold outline-none w-32 focus:w-48 transition-all" />
            </div>
            <button
              onClick={() => handleAddTask()}
              className="flex-1 md:flex-none px-6 py-3.5 bg-primary text-white font-black rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all text-sm active:scale-95"
            >
              <Plus size={18} strokeWidth={4} />
              Deploy Task
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="px-6 md:px-10 pb-4 flex items-center gap-6 overflow-x-auto no-scrollbar">
           <div className="flex items-center gap-2 text-theme-muted">
              <Filter size={12} strokeWidth={3} />
              <span className="text-[10px] font-black uppercase tracking-widest">Filter:</span>
           </div>
           <div className="flex items-center gap-2">
             {(['all', 'low', 'medium', 'high'] as const).map(p => (
               <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
                  filterPriority === p
                    ? 'bg-theme-text text-theme-page border-theme-text'
                    : 'text-theme-muted border-theme-border hover:border-primary/50'
                }`}
               >
                 {p}
               </button>
             ))}
           </div>
        </div>
      </header>

      {/* Mobile Nav Switcher */}
      <div className="md:hidden flex items-center gap-1 px-4 py-3 border-b border-theme-border bg-theme-surface/50 overflow-x-auto no-scrollbar">
        {COLUMNS.map(col => (
          <button
            key={col.id}
            onClick={() => scrollToColumn(col.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
              activeCol === col.id
              ? 'bg-primary text-white shadow-lg shadow-primary/20'
              : 'text-theme-muted'
            }`}
          >
            {col.label}
          </button>
        ))}
      </div>

      {/* Kanban Grid */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-x-auto p-4 md:p-8 custom-scrollbar kanban-snap-container no-scrollbar md:scrollbar"
      >
        <div className="flex gap-4 md:gap-8 h-full min-w-max">
          {COLUMNS.map((column) => {
            const columnTasks = boardTasks.filter(t => t.status === column.id);
            return (
              <div
                id={`col-${column.id}`}
                key={column.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  const id = e.dataTransfer.getData('taskId');
                  if (id) moveTask(id, column.id, e);
                  setDraggedTaskId(null);
                }}
                className={`w-[85vw] md:w-80 flex flex-col h-full bg-theme-surface/30 rounded-3xl border border-theme-border/50 p-5 transition-all kanban-snap-column ${
                  draggedTaskId ? 'ring-2 ring-primary/20 bg-primary/5' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-6 px-1">
                   <div className="flex items-center gap-3">
                     <div className={`w-2 h-2 rounded-full ${column.color} shadow-sm`} />
                     <h3 className="font-black text-theme-text uppercase text-[10px] tracking-[0.25em]">{column.label}</h3>
                     <span className="px-2 py-0.5 bg-theme-border text-theme-muted rounded text-[9px] font-black">
                       {columnTasks.length}
                     </span>
                   </div>
                   <button
                    onClick={() => handleAddTask(column.id)}
                    className="w-8 h-8 flex items-center justify-center text-theme-muted hover:text-primary transition-all rounded-lg hover:bg-theme-page shadow-sm"
                   >
                     <Plus size={16} strokeWidth={3} />
                   </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-0.5">
                  <AnimatePresence initial={false}>
                    {columnTasks.map(task => (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData('taskId', task.id);
                          setDraggedTaskId(task.id);
                        }}
                        onDragEnd={() => setDraggedTaskId(null)}
                      >
                        <TaskCard task={task} onClick={() => setSelectedTask(task)} />
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {columnTasks.length === 0 && (
                    <div className="h-48 border border-dashed border-theme-border/60 rounded-3xl flex flex-col items-center justify-center text-center p-8 bg-theme-page/10 group">
                      <div className="w-12 h-12 bg-theme-surface rounded-2xl flex items-center justify-center text-theme-muted mb-4 group-hover:scale-110 transition-transform">
                        <Activity size={20} strokeWidth={1} />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-theme-muted opacity-30">Zone Secured</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div className="w-4 md:hidden flex-shrink-0" />
        </div>
      </div>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSave={updateTask}
          onDelete={deleteTask}
          onComplete={() => {
            moveTask(selectedTask.id, 'done');
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
};

export default Workspace;
