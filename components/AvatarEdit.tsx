
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Check, Dice6, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

const PRESET_SEEDS = [
  'alex', 'sarah', 'jordan', 'elena',
  'shadow', 'neon', 'phoenix', 'atlas',
  'nova', 'terra', 'orbit', 'pulse',
  'vega', 'cypher', 'zenith', 'titan',
  'echo', 'mist', 'raider', 'scout',
  'ghost', 'blade', 'spark', 'vortex',
  'omega', 'alpha', 'luna', 'sol',
  'riven', 'koda', 'jinx', 'vi'
];

const STYLES = [
  'notionists',
  'avataaars',
  'pixel-art',
  'bottts',
  'adventurer',
  'big-smile',
  'lorelei-neutral',
  'miniavs'
];

// Added missing interface definition for AvatarEdit component props
interface AvatarEditProps {
  user: User;
  onUpdate: (updates: Partial<User>) => void;
}

const AvatarEdit: React.FC<AvatarEditProps> = ({ user, onUpdate }) => {
  const navigate = useNavigate();
  const [currentSeed, setCurrentSeed] = useState(user.avatar.split('seed=')[1] || 'alex');
  const [currentStyle, setCurrentStyle] = useState(user.avatar.split('7.x/')[1]?.split('/')[0] || 'notionists');

  const getAvatarUrl = (seed: string, style: string) =>
    `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`;

  const handleSave = async () => {
    await onUpdate({ avatar: selectedAvatar });
    navigate('/profile');
  };

  const randomize = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    setCurrentSeed(randomSeed);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 pb-32">
      <header className="flex items-center gap-4 mb-12">
        <button onClick={() => navigate('/profile')} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl text-slate-400">
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-black dark:text-white">Customizing Persona</h1>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Level {user.level} Identity Core</p>
        </div>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <section className="flex flex-col items-center">
          <div className="relative group mb-8">
            <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-3xl" />
            <motion.div
              key={`${currentSeed}-${currentStyle}`}
              initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              className="relative w-64 h-64 md:w-80 md:h-80 bg-white dark:bg-slate-900 border-4 border-primary p-2 rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <img
                src={getAvatarUrl(currentSeed, currentStyle)}
                alt="preview"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <button
              onClick={randomize}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 text-primary hover:scale-110 transition-transform active:rotate-180"
            >
              <Dice6 size={24} />
            </button>
          </div>
          <div className="w-full max-w-sm space-y-4">
             <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-white/5 rounded-2xl">
               {STYLES.map(s => (
                 <button
                   key={s}
                   onClick={() => setCurrentStyle(s)}
                   className={`py-2 px-1 text-[9px] font-black uppercase rounded-xl transition-all truncate ${
                     currentStyle === s ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'
                   }`}
                 >
                   {s.replace('-', ' ')}
                 </button>
               ))}
             </div>
          </div>
        </section>
        <section className="space-y-10">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 block">Legacy Presets</label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {PRESET_SEEDS.map(seed => (
                <button
                  key={seed}
                  onClick={() => setCurrentSeed(seed)}
                  className={`group relative aspect-square bg-white dark:bg-white/5 border rounded-2xl p-1 overflow-hidden transition-all ${
                    currentSeed === seed ? 'border-primary ring-2 ring-primary/20 scale-105' : 'border-slate-100 dark:border-white/10 hover:border-primary/50'
                  }`}
                >
                  <img src={getAvatarUrl(seed, currentStyle)} className="w-full h-full object-contain" alt={seed} />
                  {currentSeed === seed && (
                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                      <div className="bg-primary text-white rounded-full p-0.5"><Check size={12} strokeWidth={4} /></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 dark:border-white/5 flex gap-4">
            <button
              onClick={handleSave}
              className="flex-1 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Save size={20} />
              Apply Avatar
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="px-6 py-4 bg-slate-100 dark:bg-white/10 text-slate-400 font-black rounded-2xl hover:bg-slate-200 transition-all"
            >
              Discard
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AvatarEdit;
