export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
  owner_id: number;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  project_id: number;
  assignee_id: number;
}