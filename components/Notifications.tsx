
import React from 'react';
import { Activity, Zap, CheckCircle2, UserPlus, Flame } from 'lucide-react';

const NOTIFICATIONS: any[] = [];

const Notifications: React.FC = () => {
  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-black dark:text-white">Activity Feed</h1>
        <button className="text-[10px] font-black uppercase text-emerald-500 hover:underline">Mark all read</button>
      </div>

      <div className="space-y-4">
        {NOTIFICATIONS.map((notif, i) => (
          <div key={i} className="flex items-start gap-4 p-6 bg-white dark:bg-black border border-gray-100 dark:border-white/10 rounded-2xl hover:border-emerald-500/30 transition-all">
            <div className={`p-2 rounded-xl bg-gray-50 dark:bg-white/5 ${notif.color}`}>
              <notif.icon size={20} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-slate-900 dark:text-white mb-1">{notif.msg}</p>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{notif.time}</span>
            </div>
          </div>
        ))}
        {NOTIFICATIONS.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-theme-border rounded-3xl opacity-40">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-theme-muted">Operational silence detected</p>
          </div>
        )}
      </div>

      <div className="mt-12 text-center">
        <button className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-emerald-500">Load Older Activity</button>
      </div>
    </main>
  );
};

export default Notifications;
