
import React, { useState } from 'react';
import { User, Bell, Shield, Zap, Monitor, Globe } from 'lucide-react';

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [xpVisible, setXpVisible] = useState(true);

  // Added '?' to children to fix TypeScript error where children might not be detected correctly in some environments
  const Section = ({ title, icon: Icon, children }: { title: string; icon: any; children?: React.ReactNode }) => (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center">
          <Icon size={20} />
        </div>
        <h3 className="font-black text-slate-900 dark:text-white uppercase text-xs tracking-[0.2em]">{title}</h3>
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </section>
  );

  const Toggle = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-50 dark:border-white/5">
      <span className="font-bold dark:text-white">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`w-12 h-6 rounded-full p-1 transition-all ${checked ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-white/10'}`}
      >
        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`}></div>
      </button>
    </div>
  );

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-black mb-16 dark:text-white">Settings</h1>

      <Section title="Account" icon={User}>
        <div className="grid gap-6">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Display Name</label>
            <input
              type="text"
              defaultValue="Alex Player"
              className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl p-4 font-bold outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Work Email</label>
            <input
              type="email"
              defaultValue="alex@synclane.app"
              className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl p-4 font-bold outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </Section>

      <Section title="Notifications" icon={Bell}>
        <Toggle label="Email Notifications" checked={notifications} onChange={setNotifications} />
        <Toggle label="In-App Push Alerts" checked={true} onChange={() => {}} />
        <Toggle label="Achievement Sound Effects" checked={true} onChange={() => {}} />
      </Section>

      <Section title="Gamification" icon={Zap}>
        <Toggle label="Public XP Profile" checked={xpVisible} onChange={setXpVisible} />
        <Toggle label="Daily Streak Counter" checked={true} onChange={() => {}} />
        <Toggle label="Global Leaderboard Entry" checked={false} onChange={() => {}} />
      </Section>

      <Section title="Workspace" icon={Globe}>
        <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-between">
          <div>
            <h4 className="font-black text-emerald-600 mb-1">Professional Plan</h4>
            <p className="text-xs text-emerald-500/80 font-medium">Valid until Dec 2026 • Managed by Stripe</p>
          </div>
          <button className="text-xs font-black uppercase bg-emerald-500 text-white px-4 py-2 rounded-lg">Manage</button>
        </div>
      </Section>

      <div className="pt-8">
        <button className="w-full py-4 bg-black dark:bg-white dark:text-black text-white font-black rounded-xl hover:scale-[1.02] transition-all">Save Changes</button>
      </div>
    </main>
  );
};

export default Settings;
