
import React from 'react';
import { UserPlus, Shield, User as UserIcon, MoreHorizontal, Mail } from 'lucide-react';

const TEAM: any[] = [];

const Team: React.FC = () => {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-16">
        <div>
          <h1 className="text-4xl font-black mb-2 dark:text-white">Team Players</h1>
          <p className="text-slate-400 font-medium text-sm">{TEAM.length} Active collaborators in this workspace.</p>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-black flex items-center gap-2 transition-all">
          <UserPlus size={18} />
          Invite
        </button>
      </div>

      <div className="bg-white dark:bg-black rounded-3xl border border-gray-100 dark:border-white/10 overflow-hidden shadow-2xl shadow-emerald-500/5">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100 dark:border-white/10">
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Collaborator</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Role</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Experience</th>
              <th className="p-6"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-white/5">
            {TEAM.map((member, i) => (
              <tr key={i} className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <img src={member.avatar} className="w-10 h-10 rounded-full border border-gray-100 dark:border-white/10 bg-white dark:bg-black" />
                    <div>
                      <div className="font-black text-slate-900 dark:text-white">{member.name}</div>
                      <div className="text-xs text-slate-400 font-medium">{member.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    member.role === 'Owner' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-gray-100 dark:bg-white/10 text-slate-500'
                  }`}>
                    {member.role === 'Owner' ? <Shield size={10} /> : <UserIcon size={10} />}
                    {member.role}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-emerald-500">LVL {member.lvl}</span>
                    <div className="w-16 h-1 bg-gray-100 dark:bg-white/10 rounded-full">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </td>
                <td className="p-6 text-right">
                  <button className="p-2 text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <MoreHorizontal size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {TEAM.length === 0 && (
              <tr>
                <td colSpan={4} className="p-12 text-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                  No team members added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-12 p-10 rounded-[2.5rem] border border-dashed border-gray-200 dark:border-white/10 flex flex-col items-center justify-center text-center">
        <Mail size={32} className="text-slate-200 mb-4" />
        <h3 className="font-black text-slate-900 dark:text-white mb-2">Pending Invites</h3>
        <p className="text-slate-400 text-sm font-medium mb-6">No pending invitations. Everyone is in sync.</p>
        <button className="text-emerald-500 font-black text-xs uppercase tracking-widest hover:underline">Resend Invite to all</button>
      </div>
    </main>
  );
};

export default Team;
