import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Keeping custom ID for consistency with frontend generation, or we can migrate to _id
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: String,
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  streak: { type: Number, default: 0 },
  bio: String,
  last_active_date: String
});

export const User = mongoose.model('User', UserSchema);
