import { User } from './auth.types';
import { Task } from './task.types';

export type ProjectStatus = 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
export type ProjectPriority = 'low' | 'medium' | 'high';

export interface ProjectMember {
  id: number;
  user: User;
  role: 'owner' | 'manager' | 'member';
  joinedAt: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  startDate: string;
  dueDate: string;
  completedAt?: string;
  progress: number;
  owner: User;
  members: ProjectMember[];
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectCreate {
  title: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  startDate: string;
  dueDate: string;
  memberIds?: number[];
}

export interface ProjectUpdate extends Partial<ProjectCreate> {
  id: number;
}

export interface ProjectFilters {
  status?: ProjectStatus;
  priority?: ProjectPriority;
  search?: string;
  memberId?: number;
  startDate?: string;
  endDate?: string;
}

export interface ProjectStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  overdueProjects: number;
  projectsByStatus: Record<ProjectStatus, number>;
  projectsByPriority: Record<ProjectPriority, number>;
}