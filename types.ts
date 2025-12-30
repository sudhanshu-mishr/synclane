
export type Priority = 'low' | 'medium' | 'high';
// Added 'review' to Status type to support advanced Kanban columns
export type Status = 'todo' | 'progress' | 'review' | 'done';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  bio?: string;
}

export interface Clan {
  id: string;
  name: string;
  level: number;
  xp: number;
  members: number;
}

// Added Board interface for the Dashboard component
export interface Board {
  id: string;
  name: string;
  taskCount: number;
  users: number;
  gradient: string;
  activeUsers: number;
  streak: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee?: string;
  clanId?: string | null;
  xpValue: number;
  createdAt: string;
  // Added optional fields used in Kanban and Personal tasks
  labels?: string[];
  comments?: number;
  position?: number;
}
