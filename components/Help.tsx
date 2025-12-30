
import React from 'react';
import { HelpCircle, Zap, Layout, Users, BookOpen } from 'lucide-react';

const Help: React.FC = () => {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <HelpCircle size={32} />
        </div>
        <h1 className="text-4xl font-black mb-4 dark:text-white">Orientation</h1>
        <p className="text-slate-500 font-medium">Master the art of high-velocity sync.</p>
      </div>

      <div className="grid gap-12">
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Layout className="text-emerald-500" size={24} />
            <h2 className="text-xl font-black dark:text-white">Kanban Mechanics</h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
            SyncLane uses a standard Kanban methodology. Drag missions from <strong>To Do</strong> through <strong>Review</strong> to <strong>Done</strong>. Every move is synchronized instantly across your team's workspace.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <Zap className="text-emerald-500" size={24} />
            <h2 className="text-xl font-black dark:text-white">Experience (XP) & Levels</h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
            We believe productivity should be rewarding. You earn <strong>+10 XP</strong> for every task completed and <strong>+5 XP</strong> for moving tasks between columns.
          </p>
          <ul className="list-disc list-inside text-sm text-slate-500 space-y-2 ml-4 font-medium">
            <li>Reach 1,000 XP to Level Up.</li>
            <li>Maintain a daily streak to multiply XP rewards.</li>
            <li>Unlock unique Professional Titles at Level 20.</li>
          </ul>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <Users className="text-emerald-500" size={24} />
            <h2 className="text-xl font-black dark:text-white">Collaborative Sync</h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            Real-time collaboration is the heart of SyncLane. Look for the <strong>Live Players</strong> indicator to see who else is active in your workspace. Cursors and task updates appear in under 20ms.
          </p>
        </section>

        <div className="p-8 bg-black dark:bg-white rounded-3xl flex items-center justify-between group cursor-pointer transition-all hover:scale-[1.02]">
           <div className="flex items-center gap-4">
              <BookOpen className="text-emerald-500" size={24} />
              <div>
                 <h4 className="text-white dark:text-black font-black">Full Documentation</h4>
                 <p className="text-slate-500 text-xs">Read the detailed workspace manual</p>
              </div>
           </div>
           <Zap className="text-emerald-500 group-hover:translate-x-1 transition-transform" size={20} />
        </div>
      </div>
    </main>
  );
};

export default Help;
