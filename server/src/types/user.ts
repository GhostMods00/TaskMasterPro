// server/src/types/user.ts
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  first_name?: string;
  last_name?: string;
  created_at?: Date;
  updated_at?: Date;
}