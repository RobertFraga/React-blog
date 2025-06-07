export type Post = {
  id: string;
  title: string;
  body: string;
  user_id: string;
  user: {
    id: string;
    email: string;
  };
  completed: boolean;
  created_at: string;
};
