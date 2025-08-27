# Hyrivo – Job Application Tracker Web App

## 1. Project Overview

Hyrivo is a personal job application tracking tool designed to help users manage their applications, take notes, and visualize their progress. It is built for individuals who want to stay organized during their job hunt.

**Key Highlights:**
- Track multiple job applications per user
- Add notes and remarks for each application
- Download application data as CSV/XLSX (planned/optional)
- Clean, responsive interface built with modern web technologies

---

## 2. Tech Stack

- **Frontend:** Next.js 14, React, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend / Database:** MongoDB, Mongoose, Bcryptjs
- **Authentication:** NextAuth.js (GitHub + Credentials)
- **Deployment:** Vercel
- **State Management & Data Fetching:** Zustand, TanStack Query

---

## 3. Features

- User authentication (Sign up, Login, GitHub OAuth)
- Dashboard with an overview of job applications
- Add, edit, and delete job applications
- Track application status (e.g., Applied, Interview, Hired, Rejected)
- Add notes and remarks for each application
- **Planned:** CSV/XLSX export functionality
- **Planned:** Framer Motion animations for UI polish

---

## 4. Getting Started

**Prerequisites:**
- Node.js v20+
- npm or yarn
- MongoDB account
- GitHub OAuth app (if using GitHub sign-in)

**Installation Steps:**

1. Clone the repository:
```bash
git clone https://github.com/sezaru-dev/hyrivo.git
cd hyrivo
```
2. Install dependencies.
```bash
npm install
# or
yarn
```
3. Setup environment variables (.env.local) with MongoDB URI, MONGODB Name, GITHUB ID & SECRET, NextAuth Secret and URL
```bash
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
MONGO_URI=
MONGO_DB=
```
4. Run the development server.
```bash
npm run dev
```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.


## 5. Usage

- Sign up or login via credentials/GitHub
- Add new job applications with status and notes
- Use filters and search to find specific applications
- Planned: Download all data in CSV/XLSX format

## 6. Future Enhancements

- Framer Motion animations for dashboard and modals
- CSV/XLSX export functionality
- Optional email notifications for application updates
- In-app notifications

