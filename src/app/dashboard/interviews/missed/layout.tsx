import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hyrivo – Missed Interviews",
  description: "Review completed interviews, monitor trends, and analyze interview outcomes to track your job application progress.",
  keywords: [
    "missed interviews",
    "interview tracker",
    "job application management",
    "career tracking",
    "Hyrivo dashboard",
    "interview follow-up",
    "job hunt organizer",
    "application tracking",
    "interview schedule",
    "job seeker management"
  ],
};


export default function MissedInterviewLayout({children}: {children: React.ReactNode}) {
  return (
      <>
      {children}
      </>
  );
}
