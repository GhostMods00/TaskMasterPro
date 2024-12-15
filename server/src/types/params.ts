export interface ProjectParams {
    id: string;
  }
  
  export interface TaskParams {
    id: string;
  }
  
  export interface CreateProjectBody {
    title: string;
    description?: string;
    startDate?: Date;
    dueDate?: Date;
  }
  
  export interface UpdateProjectBody extends Partial<CreateProjectBody> {}