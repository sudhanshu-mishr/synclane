
import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, Shield, Briefcase } from 'lucide-react';
import { Clan } from '../types';

interface MobileNavProps {
  clans: Clan[];
}

const MobileNav: React.FC<MobileNavProps> = ({ clans }) => {
  const latestClan = clans[0] || { id: 'default', label: 'Clan' };

  const links = [
    { to: '/workspace/me', icon: Briefcase, label: 'Me' },
    { to: `/workspace/${latestClan.id}`, icon: Shield, label: 'Clan' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-white/90 dark:bg-black/90 backdrop-blur-xl border-t border-slate-200 dark:border-white/10 z-50 px-6 pb-safe flex items-center justify-around">
      {links.map(link => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-all ${
              isActive ? 'text-primary' : 'text-slate-400'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <link.icon size={22} strokeWidth={isActive ? 3 : 2} />
              <span className="text-[10px] font-black uppercase tracking-widest">{link.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default MobileNav;
