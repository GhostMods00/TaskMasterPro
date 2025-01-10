// src/types/dashboard.types.ts
export interface DashboardStats {
  total_projects: number;
  total_tasks: number;
  completed_tasks: number;
  active_users: number;
}

export interface RecentActivity {
  projects: Array<{
    id: number;
    title: string;
    progress: number;
  }>;
  tasks: Array<{
    id: number;
    title: string;
    project_title: string;
    assignee_name: string;
  }>;
}