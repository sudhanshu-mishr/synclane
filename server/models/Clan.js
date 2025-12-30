import mongoose from 'mongoose';

const ClanSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  members: { type: Number, default: 1 }
});

export const Clan = mongoose.model('Clan', ClanSchema);
