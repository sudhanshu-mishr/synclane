
import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight, Zap, Trophy, Flame, Globe,
  Shield, Users, Layout, Clock, MousePointer2,
  Github, Chrome, CheckCircle2, ChevronDown,
  Activity, Star, Target, BarChart3, Command,
  MessageCircle, Layers, Cloud
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { User } from '../types';

interface AuthPageProps {
  onLogin: (user: User) => void;
}

const FloatingRobot = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseY, [-500, 500], [15, -15]);
  const rotateY = useTransform(mouseX, [-500, 500], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        perspective: 1000,
        transformStyle: "preserve-3d"
      }}
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-24 h-24 md:w-32 md:h-32 pointer-events-none"
    >
      <div
        className="absolute inset-0 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] border-4 border-slate-200 dark:border-white/10 shadow-2xl flex flex-col items-center justify-center p-4"
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="w-full h-[60%] bg-slate-900 rounded-2xl flex flex-col items-center justify-center gap-2 overflow-hidden relative border-2 border-slate-700 dark:border-white/5 shadow-inner">
          <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />
          <div className="flex gap-3 relative z-10">
            <motion.div
              animate={{ height: [8, 8, 1, 8, 8] }}
              transition={{ duration: 3, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] }}
              className="w-2 md:w-3 h-2 md:h-2 bg-emerald-400 rounded-full shadow-[0_0_12px_#10b981]"
            />
            <motion.div
              animate={{ height: [8, 8, 1, 8, 8] }}
              transition={{ duration: 3, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] }}
              className="w-2 md:w-3 h-2 md:h-2 bg-emerald-400 rounded-full shadow-[0_0_12px_#10b981]"
            />
          </div>
          <motion.div
             animate={{ y: [-20, 20] }}
             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
             className="absolute top-0 left-0 right-0 h-px bg-emerald-500/20 blur-[1px]"
          />
        </div>
        <div className="mt-3 flex gap-1">
          {[1,2,3,4].map(i => (
            <div key={i} className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full" />
          ))}
        </div>
        <div className="absolute -top-6 w-1 h-6 bg-slate-400 dark:bg-slate-700 rounded-full" style={{ transform: "translateZ(-10px)" }}>
           <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50 flex items-center justify-center"
           >
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
           </motion.div>
        </div>
      </div>
      <div
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-16 h-4 bg-black/10 dark:bg-emerald-500/5 blur-md rounded-full"
        style={{ transform: "translateZ(-50px) scale(0.8)" }}
      />
    </motion.div>
  );
};

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [view, setView] = useState<'landing' | 'login'>('landing');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [livePlayers, setLivePlayers] = useState(124);
  const containerRef = useRef(null);

  const [tickerIndex, setTickerIndex] = useState(0);
  const activities = [
    { user: "@alex", action: "finished 'API Docs'", xp: "+25 XP" },
    { user: "@sarah", action: "moved 'Design' to Review", xp: "+10 XP" },
    { user: "Clan Nexus", action: "reached LEVEL 10", xp: "⭐ BONUS" },
    { user: "@jordan", action: "started a 5-day streak", xp: "🔥 STREAK" },
    { user: "@elena", action: "completed 'Auth Flow'", xp: "+50 XP" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLivePlayers(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      setTickerIndex(prev => (prev + 1) % activities.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin({
        id: 'u1',
        name: 'Alex Player',
        email: email || 'alex@synclane.app',
        avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=alex',
        xp: 142,
        level: 7,
        streak: 3
      });
      setLoading(false);
    }, 1200);
  };

  const features = [
    {
      icon: Zap,
      title: 'Ultra-Low Latency',
      desc: 'Real-time updates delivered in <20ms across all global nodes.',
      color: 'bg-emerald-500/10 text-emerald-500'
    },
    {
      icon: Cloud,
      title: 'Instant Cloud Sync',
      desc: 'Seamless collaboration with automatic background synchronization.',
      color: 'bg-primary/10 text-primary'
    },
    {
      icon: Trophy,
      title: 'Gamified Velocity',
      desc: 'Turn productivity into a progression system with XP and Streaks.',
      color: 'bg-amber-500/10 text-amber-500'
    }
  ];

  const steps = [
    { num: '01', title: 'Initialize', desc: 'Sync your workspace with your team in one click.' },
    { num: '02', title: 'Deploy', desc: 'Move missions through our high-performance Kanban board.' },
    { num: '03', title: 'Level Up', desc: 'Earn XP and climb the global leaderboard with every commit.' }
  ];

  const { scrollYProgress } = useScroll();
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="relative min-h-screen bg-white dark:bg-black overflow-x-hidden selection:bg-primary/30" ref={containerRef}>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#10b98115,transparent)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_800px,#a855f710,transparent)]"></div>
      </div>

      <nav className="fixed top-0 left-0 right-0 h-20 z-50 px-6 flex items-center justify-between max-w-7xl mx-auto backdrop-blur-md bg-white/10 dark:bg-black/10 border-b border-slate-100 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white font-black shadow-xl shadow-primary/20">S</div>
          <span className="text-xl font-black tracking-tighter dark:text-white">SyncLane</span>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setView('login')}
            className="text-sm font-bold text-slate-500 hover:text-primary transition-colors hidden sm:block"
          >
            Sign In
          </button>
          <button
            onClick={() => setView('login')}
            className="px-6 py-2.5 bg-slate-900 dark:bg-white dark:text-black text-white rounded-xl text-sm font-black shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            Launch Workspace
          </button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10"
          >
            <section className="pt-48 pb-32 px-6">
              <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative">
                <div className="absolute -top-12 right-[10%] md:right-[20%] hidden lg:block">
                  <FloatingRobot />
                </div>
                <div className="flex flex-col items-center gap-4 mb-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/5 rounded-full border border-emerald-500/10"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                      {livePlayers} Players online now
                    </span>
                  </motion.div>
                  <div className="flex flex-col md:flex-row items-center gap-6 mt-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map(i => (
                        <img
                          key={i}
                          src={`https://api.dicebear.com/7.x/notionists/svg?seed=user${i}`}
                          className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800"
                          alt="active user"
                        />
                      ))}
                      <div className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 bg-primary flex items-center justify-center text-[8px] font-black text-white">
                        +5k
                      </div>
                    </div>
                    <div className="h-8 overflow-hidden relative w-64 md:w-80 border-l border-slate-200 dark:border-white/10 pl-6 flex items-center">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={tickerIndex}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          className="flex items-center gap-3 whitespace-nowrap"
                        >
                          <Activity size={14} className="text-emerald-500 flex-shrink-0" />
                          <span className="text-xs font-bold text-slate-400">
                            <span className="text-slate-900 dark:text-white mr-1.5">{activities[tickerIndex].user}</span>
                            {activities[tickerIndex].action}
                          </span>
                          <span className="text-[10px] font-black bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-500/10">
                            {activities[tickerIndex].xp}
                          </span>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
                <motion.h1
                  style={{ opacity: opacityHero }}
                  className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-8 dark:text-white"
                >
                  Sync your <span className="text-primary italic">work.</span><br />
                  Level your <span className="text-slate-300 dark:text-slate-800">life.</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg md:text-xl text-slate-500 max-w-2xl mb-12 font-medium"
                >
                  The first multiplayer productivity workspace that blends high-performance
                  Kanban with deep RPG mechanics. Designed for the modern high-velocity team.
                </motion.p>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <button
                    onClick={() => setView('login')}
                    className="w-full sm:w-auto px-10 py-5 bg-primary text-white font-black rounded-2xl shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 text-lg"
                  >
                    Get Started Free
                    <ArrowRight size={20} strokeWidth={3} />
                  </button>
                  <button className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 dark:text-white font-black rounded-2xl hover:bg-slate-50 transition-all text-lg">
                    Watch Demo
                  </button>
                </div>
              </div>
            </section>
            <section className="py-12 border-y border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/20">
              <div className="max-w-7xl mx-auto px-6">
                <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Trusted by squads at</p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale group hover:grayscale-0 transition-all">
                  <div className="flex items-center gap-2 font-black text-xl"><Chrome size={24} /> ChromeLab</div>
                  <div className="flex items-center gap-2 font-black text-xl"><Github size={24} /> GitFlow</div>
                  <div className="flex items-center gap-2 font-black text-xl"><Layout size={24} /> GridSystems</div>
                  <div className="flex items-center gap-2 font-black text-xl"><Globe size={24} /> TerraNova</div>
                </div>
              </div>
            </section>
            <section className="py-32 px-6">
               <div className="max-w-7xl mx-auto">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                      <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8 dark:text-white">
                        Multiplayer <span className="text-primary italic">Kanban</span> engineered for teams.
                      </h2>
                      <p className="text-lg text-slate-500 font-medium mb-10 leading-relaxed">
                        Say goodbye to stagnant boards. SyncLane updates every pixel in real-time,
                        making collaboration feel like a competitive sport. Track presence,
                        velocity, and clan ranking in one unified dash.
                      </p>
                      <ul className="space-y-4">
                        {[
                          'Presence indicators for every team member',
                          'Action-triggered XP and progression',
                          'Optimized task management and workflow',
                          'Instant synchronization (<20ms latency)'
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 font-bold dark:text-white">
                            <div className="w-6 h-6 bg-emerald-500/10 text-emerald-500 rounded-lg flex items-center justify-center">
                              <CheckCircle2 size={14} />
                            </div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <motion.div
                      initial={{ rotate: 2, y: 40 }}
                      whileInView={{ rotate: 0, y: 0 }}
                      className="relative bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-white/10 shadow-2xl p-8 aspect-square flex flex-col overflow-hidden"
                    >
                        <div className="flex items-center justify-between mb-10">
                          <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-rose-400" />
                            <div className="w-3 h-3 rounded-full bg-amber-400" />
                            <div className="w-3 h-3 rounded-full bg-emerald-400" />
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase rounded-full">
                            <Users size={12} /> 4 Members Active
                          </div>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-4">
                          {[1, 2, 3, 4].map(i => (
                            <div key={i} className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                               <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-white/10 mb-4" />
                               <div className="h-3 w-3/4 bg-slate-200 dark:bg-white/10 rounded-full mb-2" />
                               <div className="h-2 w-1/2 bg-slate-100 dark:bg-white/5 rounded-full" />
                            </div>
                          ))}
                        </div>
                    </motion.div>
                 </div>
               </div>
            </section>
            <section className="py-32 px-6 bg-slate-50 dark:bg-black/50 border-y border-slate-100 dark:border-white/5">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                  <h2 className="text-4xl font-black dark:text-white mb-4">How it works</h2>
                  <p className="text-slate-500 font-medium">Three steps to elite productivity.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {steps.map((s, i) => (
                    <div key={i} className="relative group">
                      <div className="text-8xl font-black text-slate-100 dark:text-white/5 absolute -top-8 -left-4 z-0 group-hover:text-primary/10 transition-colors">{s.num}</div>
                      <div className="relative z-10 pt-10">
                        <h3 className="text-2xl font-black mb-4 dark:text-white">{s.title}</h3>
                        <p className="text-slate-500 leading-relaxed font-medium">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <footer className="py-20 px-6 border-t border-slate-100 dark:border-white/10">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-white font-black">S</div>
                  <span className="text-lg font-black dark:text-white">SyncLane</span>
                </div>
                <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <a href="#" className="hover:text-primary transition-colors">Twitter</a>
                  <a href="#" className="hover:text-primary transition-colors">GitHub</a>
                  <a href="#" className="hover:text-primary transition-colors">Discord</a>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">© 2026 SyncLane Inc.</p>
              </div>
            </footer>
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-white/80 dark:bg-black/95 backdrop-blur-xl"
          >
            <div className="absolute inset-0 z-0" onClick={() => setView('landing')} />
            <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-white/10 shadow-2xl flex flex-col lg:flex-row overflow-hidden relative z-10">
              <div className="lg:w-1/2 bg-slate-50 dark:bg-black/50 p-12 flex flex-col justify-between border-r border-slate-100 dark:border-white/10">
                <div className="space-y-6">
                  <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-xl">S</div>
                  <h2 className="text-4xl font-black tracking-tight dark:text-white">Welcome back, Captain.</h2>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    Reconnect with your team, monitor clan progress, and continue your quest for maximum efficiency.
                  </p>
                </div>
              </div>
              <div className="lg:w-1/2 p-12 lg:p-16">
                <div className="mb-10 flex items-center justify-between">
                  <h3 className="text-2xl font-black dark:text-white">Sign In</h3>
                  <button
                    onClick={() => setView('landing')}
                    className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <ChevronDown className="rotate-90" size={24} />
                  </button>
                </div>
                <form onSubmit={handleLoginSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Work Email</label>
                    <div className="relative group">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@synclane.app"
                        className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none dark:text-white font-bold transition-all"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {loading ? "Initializing..." : "Continue to Workspace"}
                  </button>
                  <div className="grid grid-cols-2 gap-4">
                    <button type="button" className="flex items-center justify-center gap-3 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl hover:bg-slate-50 transition-all">
                      <Chrome size={20} className="text-rose-500" />
                      <span className="text-sm font-bold dark:text-white">Google</span>
                    </button>
                    <button type="button" className="flex items-center justify-center gap-3 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl hover:bg-slate-50 transition-all">
                      <Github size={20} className="dark:text-white" />
                      <span className="text-sm font-bold dark:text-white">GitHub</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 dark:opacity-40">
        <motion.div
          animate={{ y: [0, 40, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[20%] left-[5%] text-primary"
        ><Zap size={64} /></motion.div>
        <motion.div
          animate={{ y: [0, -60, 0], rotate: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-[20%] right-[10%] text-emerald-500"
        ><Flame size={48} /></motion.div>
      </div>
    </div>
  );
};

const RefreshCcw = ({ className, size }: { className?: string, size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24} height={size || 24}
    viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
    className={className}
  >
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 16h5v5" />
  </svg>
);

export default AuthPage;
