import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  description: String,
  status: {
    type: String,
    enum: ['todo', 'progress', 'review', 'done'],
    default: 'todo'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  assignee: String,
  clanId: { type: String, default: null }, // Using clanId (camelCase) to match frontend, or stick to snake_case?
  // Previous SQL used clan_id. Frontend sends clanId.
  // Mongoose allows us to map easily. Let's use clanId to match JS objects.
  xpValue: Number,
  createdAt: String,
  labels: [String],
  comments: { type: Number, default: 0 },
  position: Number
});

export const Task = mongoose.model('Task', TaskSchema);
