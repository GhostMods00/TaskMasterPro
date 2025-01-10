// src/types/index.ts
export interface Project {
  id: number;
  title: string;
  description?: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  startDate?: Date;
  dueDate?: Date;
  ownerId: number;
  progress?: number;
}

export interface CreateProjectDto {
  title: string;
  description?: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  startDate?: Date;
  dueDate?: Date;
}

export interface UpdateProjectDto extends Partial<CreateProjectDto> {}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: {
    id: number;
    username: string;
  };
}

export interface DragResult {
  draggableId: string;
  type: string;
  source: {
    droppableId: string;
    index: number;
  };
  destination?: {
    droppableId: string;
    index: number;
  };
}