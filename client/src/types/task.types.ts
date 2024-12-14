import { User } from './auth.types';
import { Project } from './project.types';

export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'completed' | 'cancelled';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Subtask {
  id: number;
  title: string;
  completed: boolean;
  completedAt?: string;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  editedAt?: string;
}

export interface Attachment {
  id: number;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedBy: User;
  createdAt: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate?: string;
  dueDate: string;
  completedAt?: string;
  estimatedHours?: number;
  loggedHours?: number;
  progress: number;
  project: Project;
  assignee?: User;
  creator: User;
  subtasks: Subtask[];
  comments: Comment[];
  attachments: Attachment[];
  tags: string[];
  watchers: User[];
  createdAt: string;
  updatedAt: string;
}

export interface TaskCreate {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: number;
  assigneeId?: number;
  startDate?: string;
  dueDate: string;
  estimatedHours?: number;
  tags?: string[];
}

export interface TaskUpdate extends Partial<TaskCreate> {
  id: number;
}

export interface TaskFilters {
  status?: TaskStatus | TaskStatus[];
  priority?: TaskPriority;
  projectId?: number;
  assigneeId?: number;
  creatorId?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
  tags?: string[];
}

export interface TaskActivity {
  id: number;
  taskId: number;
  type: 'created' | 'updated' | 'commented' | 'status_changed' | 'assigned' | 'attachment_added';
  user: User;
  data: Record<string, any>;
  createdAt: string;
}

export interface TimeLog {
  id: number;
  task: Task;
  user: User;
  hours: number;
  description?: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskStats {
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  upcomingTasks: number;
  tasksByStatus: Record<TaskStatus, number>;
  tasksByPriority: Record<TaskPriority, number>;
  averageCompletionTime: number;
}

// Task Board Types
export interface TaskBoard {
  columns: TaskColumn[];
}

export interface TaskColumn {
  id: string;
  title: string;
  taskIds: number[];
  status: TaskStatus;
}

export interface TaskDragResult {
  source: {
    columnId: string;
    index: number;
  };
  destination: {
    columnId: string;
    index: number;
  };
  taskId: number;
}