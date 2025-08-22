import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hyrivo – Scheduled Interviews",
  description: "Stay prepared and on top of upcoming, weekly, and overdue interviews in your job application tracker.",
  keywords: [
    "scheduled interviews",
    "upcoming interviews",
    "weekly interviews",
    "overdue interviews",
    "interview tracker",
    "job application tracker",
    "Hyrivo dashboard",
    "interview management",
    "job hunt organizer",
    "career tracking"
  ],
};

export default function ScheduledInterviewLayout({children}: {children: React.ReactNode}) {
  return (
      <>
      {children}
      </>
  );
}
