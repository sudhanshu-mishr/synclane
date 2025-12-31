import { User, Clan, Task } from '../types';

export const api = {
  // Users
  login: async (name: string, email: string, avatar: string): Promise<User> => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, avatar })
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },

  updateUser: async (id: string, updates: Partial<User>): Promise<User> => {
    const res = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Update failed');
    return res.json();
  },

  getLeaderboard: async (): Promise<User[]> => {
    const res = await fetch('/api/users');
    if (!res.ok) throw new Error('Failed to fetch leaderboard');
    return res.json();
  },

  // Clans
  getClans: async (): Promise<Clan[]> => {
    const res = await fetch('/api/clans');
    if (!res.ok) throw new Error('Failed to fetch clans');
    return res.json();
  },

  addClan: async (name: string): Promise<Clan> => {
    const res = await fetch('/api/clans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    if (!res.ok) throw new Error('Failed to add clan');
    return res.json();
  },

  // Tasks
  getTasks: async (clanId?: string, assignee?: string, ownerId?: string): Promise<Task[]> => {
    const params = new URLSearchParams();
    if (clanId) params.append('clanId', clanId);
    if (assignee) params.append('assignee', assignee);
    if (ownerId) params.append('ownerId', ownerId);

    const res = await fetch(`/api/tasks?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch tasks');
    return res.json();
  },

  createTask: async (task: Partial<Task>): Promise<Task> => {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
    if (!res.ok) throw new Error('Failed to create task');
    return res.json();
  },

  updateTask: async (id: string, updates: Partial<Task>): Promise<Task> => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update task');
    return res.json();
  },

  deleteTask: async (id: string): Promise<void> => {
    const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete task');
  },

  // AI
  suggestTaskContent: async (context: string): Promise<any> => {
    const res = await fetch('/api/ai/suggest-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context })
    });
    if (!res.ok) throw new Error('AI suggestion failed');
    return res.json();
  },

  suggestTaskDescription: async (title: string, currentDescription: string): Promise<string> => {
    const res = await fetch('/api/ai/suggest-description', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, currentDescription })
    });
    if (!res.ok) throw new Error('AI suggestion failed');
    const data = await res.json();
    return data.description;
  }
};
