
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Save, User as UserIcon, Type, Quote } from 'lucide-react';
import { User } from '../types';

interface ProfileEditProps {
  user: User;
  onUpdate: (updates: Partial<User>) => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ user, onUpdate }) => {
  const navigate = useNavigate();
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio || '');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await onUpdate({ name, bio });
    navigate('/profile');
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <header className="flex items-center gap-4 mb-12">
        <button onClick={() => navigate('/profile')} className="p-2 hover:bg-theme-surface rounded-xl text-theme-muted transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-black text-theme-text">Identity Sync</h1>
          <p className="text-[10px] font-black uppercase tracking-widest text-theme-muted">Refine your public persona</p>
        </div>
      </header>

      <form onSubmit={handleSave} className="space-y-10">
        <section className="space-y-6 bg-theme-surface border border-theme-border p-8 rounded-[2rem]">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-theme-muted tracking-widest ml-1 flex items-center gap-2">
              <UserIcon size={12} /> Call Sign (Name)
            </label>
            <div className="relative group">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Player"
                className="w-full px-6 py-4 bg-theme-page border border-theme-border rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none text-theme-text font-bold transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-theme-muted tracking-widest ml-1 flex items-center gap-2">
              <Quote size={12} /> Mission Statement (Bio)
            </label>
            <div className="relative group">
              <textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Obsessed with high-velocity output and clean code architecture..."
                className="w-full px-6 py-4 bg-theme-page border border-theme-border rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none text-theme-text font-bold transition-all resize-none leading-relaxed"
              />
            </div>
            <p className="text-[9px] font-bold text-theme-muted mt-2 ml-1 italic opacity-60">
              Your mission statement is visible to clan members and the global league.
            </p>
          </div>
        </section>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            <Save size={20} />
            Commit Changes
          </button>
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="px-8 py-5 bg-theme-surface text-theme-muted font-black rounded-2xl border border-theme-border hover:bg-theme-page transition-all"
          >
            Discard
          </button>
        </div>
      </form>

      {/* Aesthetic Identity Preview */}
      <div className="mt-16 pt-16 border-t border-theme-border flex flex-col items-center opacity-40">
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-theme-muted mb-8">Persona Preview</div>
        <div className="w-full max-w-sm bg-theme-surface p-6 rounded-3xl border border-theme-border flex items-center gap-4">
          <img src={user.avatar} className="w-12 h-12 rounded-xl grayscale" alt="preview" />
          <div className="flex-1 min-w-0">
             <div className="text-sm font-black text-theme-text truncate">{name || '---'}</div>
             <div className="text-[9px] font-bold text-theme-muted truncate">"{bio || 'No mission statement set...'}"</div>
          </div>
          <div className="w-6 h-6 rounded-full bg-primary/20" />
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
