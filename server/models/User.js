import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: String,
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  streak: { type: Number, default: 0 },
  bio: String,
  last_active_date: String,
  clanId: { type: String, default: null } // Added to support future clan membership logic
});

export const User = mongoose.model('User', UserSchema);
