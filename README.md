# MentorLagbe — Smart Tuition & Mentorship Platform

MentorLagbe is a full-stack, role-based **EdTech & Smart Tuition Finder** platform built with **Next.js (App Router)**, **Express.js**, **MongoDB**, **BetterAuth + JWT**, **Stripe**, and **ImgBB**. It connects verified **Tutors** offering subject-wise batches or 1-on-1 mentorship with **Students** searching for personalized academic guidance, while **Admins** moderate listings, manage user roles, and track Stripe subscription revenue.

---

## Live Links & Repositories

- **Live Client URL:** https://mentorlagbe-seven.vercel.app/
- **Live Server API URL:** https://mentorlagbe-server-indol.vercel.app/
- **Client Repository:** https://github.com/Maruf-Ahmed-11/mentorlagbe-client
- **Server Repository:** https://github.com/Maruf-Ahmed-11/mentorlagbe-server

---

## Admin Access & Demo Setup

- **Admin Registration / Setup:** The `/sign-up` page supports first-time Administrator registration when no admin exists (`MENTOR_ADMIN_2026` default security key), or an existing Admin can promote any registered user via **Admin Dashboard → User Directory**.
- **Demo Accounts (Seeded via `scripts/seed.mjs`):**
  - **Tutor (Pro):** `tahmidur.buet@mentorlagbe.demo`
  - **Tutor (Pro):** `zarin.du@mentorlagbe.demo`
  - **Student (Pro):** `ayaan.student@mentorlagbe.demo`
  - *(Register a new Student or Tutor directly on `/sign-up` or sign in with Google OAuth to test end-to-end flows.)*

---

## Key Features

### Authentication & Role-Based Authorization
- **BetterAuth + MongoDB Adapter + JWT:** Email/Password registration & sign-in, Google OAuth, and JWT token issuance (`/api/auth/jwks`) for Express backend verification.
- **3 Distinct Roles:** `student`, `tutor`, and `admin`, with role-based dashboards and protected Express middlewares (`verifyToken`, `verifyStudent`, `verifyTutor`, `verifyAdmin`).

### Student Experience
- **Server-Side Search & Filters (`/tuitions`):** Live MongoDB search by title/subject/mentor/location and filters by Subject, Class Level, and Mode (`Online` / `Offline` / `Hybrid`).
- **Tuition Details & Application Flow (`/tuitions/[id]`):** View full batch details, tutor info, and verified student reviews; submit applications with Phone, Preferred Schedule, and Learning Note (duplicate applications prevented; non-student accounts blocked).
- **My Applications (`/dashboard/applications`):** Real-time application status tracking (`Pending`, `Accepted`, `Rejected`) with monthly fee display and **Cancel** action for `Pending` applications.
- **Saved Tuitions / Bookmarks (`/dashboard/saved-tuitions`):** Free students can bookmark up to 5 tuitions; Pro students have unlimited bookmarks.
- **Verified Student Reviews & Ratings:** Students with `Accepted` applications can submit 1–5 star ratings and feedback, dynamically powering the Hero top-rated showcase card.

### Tutor Experience
- **Post Tuition (`/dashboard/post-tuition`):** Validated listing form with direct **ImgBB** banner image upload (`approvalStatus: "pending"` by default). Free Tutors can post up to 2 tuitions; Pro Tutors have unlimited posts.
- **My Tuitions (`/dashboard/my-tuitions`):** Full CRUD (View, Edit with ImgBB upload, Delete, and Active/Closed status toggle).
- **Manage Applicants (`/dashboard/applicants`):** Review incoming student applications (including Preferred Schedule and note) and **Accept** or **Reject** applicants in real time.

### Admin Experience
- **System Overview (`/dashboard`):** Live platform metrics (**Total Users**, **Total Tutors**, **Pending Tuitions**, and **Total Stripe Revenue**).
- **Tuition Moderation:** Approve or reject tutor listings (`approved` / `rejected`).
- **User Directory:** View all registered students and tutors and update user roles.
- **Transactions Log:** Real-time Stripe payment history (`payments` collection).

### Stripe Pro Subscriptions & UI/UX
- **Stripe Checkout & Verification (`/pricing`, `/checkout`, `/payment/success`, `/payment/cancel`):** Pro Tutor Plan (`$15`) and Pro Student Plan (`$10`) automatically upgrade `plan: "pro"` in MongoDB and record transactions in `payments`.
- **Theme & States:** Midnight Azure / Oceanic Sapphire UI with smooth Dark & Light mode toggle, `react-hot-toast` notifications, and custom `loading.tsx`, `not-found.tsx`, and `error.tsx` pages.

---

## NPM Packages Used (Client)

| Package | Purpose |
| :--- | :--- |
| `next` (`^16.4.6`), `react`, `react-dom` | App Router framework and UI runtime |
| `typescript` | Static type checking |
| `better-auth`, `@better-auth/mongo-adapter` | Authentication, sessions, Google OAuth, and JWT plugin |
| `mongodb` | MongoDB database driver |
| `stripe`, `@stripe/stripe-js` | Stripe Checkout sessions and payment verification |
| `tailwindcss`, `@tailwindcss/turbopack`, `tw-animate-css` | Utility-first styling and animations |
| `shadcn`, `@base-ui/react`, `class-variance-authority`, `cn` | Accessible UI primitives and styling utilities |
| `lucide-react` | Crisp icon library |
| `react-hot-toast` | Toast notifications for forms, auth, and CRUD feedback |

---

## Environment Variables (`.env` / `.env.local`)

Configure these keys in `.env.local` (and in Vercel Project Settings for production):

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=https://mentorlagbe-seven.vercel.app
NEXT_PUBLIC_API_URI=https://mentorlagbe-server-indol.vercel.app
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
```

## Local Development

```bash
npm install
npm run dev
```
