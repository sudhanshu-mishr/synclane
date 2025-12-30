
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Plus, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { Task, Status, User } from '../types';

const MOCK_TASKS: Task[] = [];

const COLUMNS: { id: Status; label: string }[] = [
  { id: 'todo', label: 'To Do' },
  { id: 'progress', label: 'In Progress' },
  { id: 'done', label: 'Completed' },
];

const ClanBoard: React.FC<{ user: User; onGainXP: (amount: number) => void }> = ({ user, onGainXP }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popups, setPopups] = useState<{ id: number; x: number; y: number; amount: number }[]>([]);
  const [recentlyCompletedId, setRecentlyCompletedId] = useState<string | null>(null);

  const showXPPopup = (x: number, y: number, amount: number) => {
    const id = Date.now();
    setPopups(prev => [...prev, { id, x, y, amount }]);
    onGainXP(amount);
    setTimeout(() => {
      setPopups(prev => prev.filter(p => p.id !== id));
    }, 1000);
  };

  const getTasksByStatus = (status: Status) => tasks.filter(t => t.status === status);

  const handleAddTask = (status: Status, e?: React.MouseEvent) => {
    const newTask: Task = {
      id: `t${Date.now()}`,
      title: 'New Mission',
      description: '',
      status: status,
      priority: 'medium',
      labels: [],
      position: tasks.length,
      xpValue: 10,
      createdAt: new Date().toISOString(),
      clanId: id
    };
    setTasks([...tasks, newTask]);
    setSelectedTask(newTask);
    setIsModalOpen(true);
    if (e) showXPPopup(e.clientX, e.clientY, 5);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const moveTask = (taskId: string, newStatus: Status, e?: React.DragEvent) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && task.status !== newStatus) {
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
      if (e) showXPPopup(e.clientX, e.clientY, 10);
      if (newStatus === 'done') {
        onGainXP(task.xpValue);
        setRecentlyCompletedId(taskId);
        setTimeout(() => setRecentlyCompletedId(null), 1500);
      }
    }
  };

  return (
    <div className="h-full overflow-hidden flex flex-col bg-white dark:bg-black">
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
      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-50 dark:border-white/5">
        <div className="flex items-center gap-4">
          <Link to={`/clans/${id}`} className="p-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg text-slate-400">
            <ChevronLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-black dark:text-white uppercase tracking-tighter">Product Clan Board</h1>
            <span className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">Shared Tasks</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
             <Activity size={14} className="text-emerald-500" />
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Collaborative Mode Active</span>
          </div>
          <button
            onClick={(e) => handleAddTask('todo', e as any)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg font-black text-xs hover:scale-105 transition-all"
          >
            <Plus size={14} strokeWidth={3} />
            Add Mission
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-x-auto p-6 bg-gray-50 dark:bg-black/50">
        <div className="flex h-full gap-6 min-w-max">
          {COLUMNS.map((column) => (
            <div
              key={column.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const taskId = e.dataTransfer.getData('taskId');
                if (taskId) moveTask(taskId, column.id, e as any);
              }}
              className="w-80 flex flex-col h-full bg-white dark:bg-black rounded-[2rem] border border-gray-100 dark:border-white/10 p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                 <h3 className="font-black text-slate-900 dark:text-white uppercase text-[10px] tracking-[0.2em]">{column.label}</h3>
                 <button onClick={(e) => handleAddTask(column.id, e)} className="w-6 h-6 flex items-center justify-center bg-gray-50 dark:bg-white/10 rounded-lg text-slate-400 hover:text-emerald-500 transition-colors">
                   <Plus size={14} strokeWidth={3} />
                 </button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-1">
                {getTasksByStatus(column.id).map(task => (
                  <motion.div
                    layout
                    key={task.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('taskId', task.id);
                      e.currentTarget.style.opacity = '0.5';
                    }}
                    onDragEnd={(e) => e.currentTarget.style.opacity = '1'}
                    animate={recentlyCompletedId === task.id ? {
                      scale: [1, 1.05, 1],
                      borderColor: ["#10b981", "#10b981", "rgba(0,0,0,0)"],
                      backgroundColor: ["rgba(16, 185, 129, 0.1)", "rgba(16, 185, 129, 0)", "rgba(16, 185, 129, 0)"]
                    } : {}}
                    transition={recentlyCompletedId === task.id ? { duration: 0.8 } : {}}
                    className="rounded-xl border border-transparent"
                  >
                    <TaskCard task={task} onClick={() => { setSelectedTask(task); setIsModalOpen(true); }} />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setIsModalOpen(false)}
          onSave={updateTask}
          onDelete={(id) => setTasks(prev => prev.filter(t => t.id !== id))}
          onComplete={() => {
            setTasks(prev => prev.map(t => t.id === selectedTask.id ? { ...t, status: 'done' } : t));
            onGainXP(selectedTask.xpValue);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ClanBoard;
