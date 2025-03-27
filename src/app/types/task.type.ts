export type Task = {
  id: string;
  title: string;
  description: string;
  userId: string;
  status: 'todo' | 'done' | 'in-progress' | 'deleted';
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
