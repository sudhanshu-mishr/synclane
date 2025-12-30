import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDb } from './database.js';
import { User } from './models/User.js';
import { Clan } from './models/Clan.js';
import { Task } from './models/Task.js';
import { suggestTaskContent, suggestTaskDescription } from './ai.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize Database
connectDb();

// Helper to wrap async routes
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// --- USERS ---

app.get('/api/users/:email', asyncHandler(async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email });
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
}));

app.post('/api/auth/login', asyncHandler(async (req, res) => {
  const { name, email, avatar } = req.body;
  let user = await User.findOne({ email });

  if (!user) {
    // Create new user
    const id = Math.random().toString(36).substr(2, 9);
    const now = new Date().toDateString();
    user = await User.create({
      id,
      name,
      email,
      avatar,
      xp: 0,
      level: 1,
      streak: 1,
      last_active_date: now
    });
  } else {
    // Update streak logic
    const lastActiveDate = user.last_active_date;
    const today = new Date().toDateString();

    if (lastActiveDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastActiveDate === yesterday.toDateString()) {
        user.streak += 1;
      } else {
        user.streak = 1;
      }
      user.last_active_date = today;
      await user.save();
    }
  }
  res.json(user);
}));

app.put('/api/users/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const user = await User.findOneAndUpdate({ id }, updates, { new: true });
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
}));

// --- CLANS ---

app.get('/api/clans', asyncHandler(async (req, res) => {
  const clans = await Clan.find();
  res.json(clans);
}));

app.post('/api/clans', asyncHandler(async (req, res) => {
  const { name } = req.body;
  const id = name.toLowerCase().replace(/\s+/g, '-');

  try {
    const existing = await Clan.findOne({ id });
    if (existing) {
        return res.status(400).json({ error: 'Clan already exists' });
    }

    const clan = await Clan.create({
        id,
        name,
        level: 1,
        xp: 0,
        members: 1
    });
    res.json(clan);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
}));

// --- TASKS ---

app.get('/api/tasks', asyncHandler(async (req, res) => {
  const { clanId, assignee } = req.query;
  const filter = {};

  if (clanId) {
    if (clanId === 'me') {
        filter.clanId = null;
    } else {
        filter.clanId = clanId;
    }
  }

  // Note: Previous logic filtered assignee implicitly via frontend context sometimes,
  // but if needed we can add `if (assignee) filter.assignee = assignee;`

  const tasks = await Task.find(filter).sort({ position: 1, _id: -1 });
  res.json(tasks);
}));

app.post('/api/tasks', asyncHandler(async (req, res) => {
  const taskData = req.body;
  const id = taskData.id || Math.random().toString(36).substr(2, 9);

  const task = await Task.create({
      ...taskData,
      id,
      clanId: taskData.clanId || null // Ensure null if undefined/empty
  });

  res.json(task);
}));

app.put('/api/tasks/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const task = await Task.findOneAndUpdate({ id }, updates, { new: true });
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
}));

app.delete('/api/tasks/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Task.findOneAndDelete({ id });
    res.json({ success: true });
}));

// --- AI ---

app.post('/api/ai/suggest-task', asyncHandler(async (req, res) => {
    const { context } = req.body;
    const result = await suggestTaskContent(context);
    res.json(result);
}));

app.post('/api/ai/suggest-description', asyncHandler(async (req, res) => {
    const { title, currentDescription } = req.body;
    const result = await suggestTaskDescription(title, currentDescription);
    res.json({ description: result });
}));

// --- SERVE FRONTEND (Production) ---
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Catch-all route to serve index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
