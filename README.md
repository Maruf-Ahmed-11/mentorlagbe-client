# MentorLagbe — Smart Tuition & Mentorship Platform

## Purpose

**MentorLagbe** is a full-stack, role-based EdTech platform designed to connect qualified **Tutors** offering subject-wise batches or 1-on-1 mentorship with **Students** seeking personalized academic guidance across Bangladesh and beyond. The ecosystem provides dedicated workspaces for **Students**, **Tutors**, and **Admins**—streamlining tuition discovery, enrollment applications, content moderation, and subscription management in one unified experience.

---

## Live URLs

- **Live Web Application:** https://mentorlagbe-seven.vercel.app/
- **Backend API Service:** https://mentorlagbe-server-indol.vercel.app/
- **Client Repository:** https://github.com/Maruf-Ahmed-11/mentorlagbe-client
- **Server Repository:** https://github.com/Maruf-Ahmed-11/mentorlagbe-server

---

## Key Features

### Authentication & Role Management
- **Multi-Role Onboarding:** Secure registration and sign-in for Students, Tutors, and Admins with Email/Password and Google OAuth.
- **JWT Session Security:** Automated client-side JWT synchronization for protected backend API communication.
- **Profile & Media Management:** Self-service profile editing with direct image uploads powered by ImgBB.

### Student Experience
- **Server-Side Search & Filtering:** Search approved tuition batches by title, subject, mentor, or location and filter by subject, class level, and delivery mode (Online, Offline, Hybrid).
- **Application & Enrollment Tracking:** Apply to open tuitions with contact details, preferred schedule, and learning notes; track real-time status updates (`Pending`, `Accepted`, `Rejected`) and cancel pending applications.
- **Bookmarked Tuitions:** Save favorite tuition listings for quick access (up to 5 bookmarks on the Free tier, unlimited on Pro).
- **Verified Student Reviews & Ratings:** Accepted students can submit 1–5 star ratings and feedback on completed or ongoing tuitions, dynamically surfacing top-rated mentors.

### Tutor Experience
- **Tuition Creation & Banner Uploads:** Create rich tuition listings with subject, class level, schedule, monthly fee, and custom ImgBB banner uploads (up to 2 posts on the Free tier, unlimited on Pro).
- **Batch Management:** Full CRUD control to edit details, delete listings, or toggle batch availability (`Active` / `Closed`), while tracking Admin approval status.
- **Applicant Management:** Review incoming student applications, inspect preferred schedules and notes, and accept or reject applicants in real time.

### Admin Experience
- **Platform Analytics:** Real-time overview of total registered users, active tutors, pending moderation items, and cumulative Stripe revenue.
- **Tuition Moderation:** Approve or reject newly submitted tutor listings before they appear on the public marketplace.
- **User Directory & Transactions:** Manage user roles across the platform and audit Stripe subscription payment records.

### Subscriptions & User Interface
- **Stripe Pro Upgrades:** Dedicated Free vs. Pro subscription plans for both Tutors and Students with Stripe Checkout and automated database synchronization.
- **Modern Responsive UI:** Consistent Midnight Azure & Oceanic Sapphire design system with Light/Dark theme switching, toast notifications, custom loading skeletons, and dedicated 404 and error boundary pages.

---

## NPM Packages Used

### Core Framework & Language
| Package | Description |
| :--- | :--- |
| `next` | React App Router framework for SSR, routing, and API handlers |
| `react`, `react-dom` | Core UI rendering library |
| `typescript` | Static type safety across components and APIs |

### Authentication, Database & Payments
| Package | Description |
| :--- | :--- |
| `better-auth` | Full-stack authentication, session management, OAuth, and JWT plugin |
| `@better-auth/mongo-adapter` | MongoDB persistence adapter for BetterAuth |
| `mongodb` | Official MongoDB Node.js driver |
| `stripe`, `@stripe/stripe-js` | Stripe Checkout sessions and server-side payment verification |

### Styling, UI Components & Feedback
| Package | Description |
| :--- | :--- |
| `tailwindcss`, `@tailwindcss/turbopack` | Utility-first CSS framework and Turbopack integration |
| `tw-animate-css` | Prebuilt CSS animation utilities |
| `shadcn`, `@base-ui/react` | Accessible UI component primitives |
| `class-variance-authority`, `cn` | Variant-driven class composition utilities |
| `lucide-react` | Icon library used across navigation, cards, and dashboards |
| `react-hot-toast` | Non-blocking toast notifications for user actions and errors |

### Tooling & Code Quality
| Package | Description |
| :--- | :--- |
| `eslint`, `eslint-config-next` | Linting and Next.js best-practice enforcement |
| `babel-plugin-react-compiler` | React Compiler optimization plugin |
| `@types/node`, `@types/react`, `@types/react-dom` | TypeScript type definitions |
