// Stakeholder Roles & Subscription Plans
export type UserRole = "student" | "tutor" | "admin";
export type UserPlan = "free" | "pro";

// Business Logic Quotas
export const FREE_TUTOR_POST_LIMIT = 2;
export const FREE_STUDENT_BOOKMARK_LIMIT = 5;

// 1. users collection
export interface User {
  _id?: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
  phone?: string;
  bio?: string;
  plan: UserPlan;
  bookmarks?: string[]; // Array of tuitionId strings bookmarked by student
  createdAt: Date | string;
}

// 2. tuitions collection
export type TuitionMode = "Online" | "Offline";
export type TuitionApprovalStatus = "pending" | "approved" | "rejected";

export interface Tuition {
  _id?: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: TuitionMode;
  location: string;
  monthlyFee: number;
  daysPerWeek: number;
  bannerImage?: string;
  description: string;
  tutorName: string;
  tutorEmail: string;
  approvalStatus: TuitionApprovalStatus;
  isActive: boolean;
  createdAt: Date | string;
}

// 3. applications collection
export type ApplicationStatus = "pending" | "accepted" | "rejected";

export interface Application {
  _id?: string;
  tuitionId: string;
  tuitionTitle: string;
  subject: string;
  monthlyFee: number;
  tutorEmail: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  preferredSchedule: string;
  studentNote?: string;
  status: ApplicationStatus;
  appliedAt: Date | string;
}

// 4. payments collection
export interface Payment {
  _id?: string;
  userEmail: string;
  userName: string;
  userRole: UserRole;
  planName: string;
  amount: number;
  currency: string;
  transactionId: string;
  stripeSessionId: string;
  paymentStatus: "paid";
  paidAt: Date | string;
}
