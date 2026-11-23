export interface DashboardUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
}

export interface DashboardViewProps {
  user?: DashboardUser;
  userName: string;
  userEmail: string;
}
