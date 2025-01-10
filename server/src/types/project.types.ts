// src/types/project.types.ts
export interface CreateProjectDto {
  title: string;
  description?: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  startDate?: Date;
  dueDate?: Date;
}

export interface UpdateProjectDto extends Partial<CreateProjectDto> {}

export interface ProjectQuery {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}