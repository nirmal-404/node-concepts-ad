export type User = {
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'user';
}

export type Task = {
  id: number;
  user_id: number;
  title: string;
  description : string;
  created_at : string;
}