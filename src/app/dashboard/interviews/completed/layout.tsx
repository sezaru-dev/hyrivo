import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hyrivo – Completed Interviews ",
  description: "Review completed interviews, monitor trends, and analyze interview outcomes to track your job application progress.",
  keywords: [
    "completed interviews",
    "interview outcomes",
    "interview review",
    "job application tracker",
    "career tracking",
    "Hyrivo dashboard",
    "interview trends",
    "job hunt organizer",
    "interview analysis",
    "application tracking"
  ],
};


export default function CompletedInterviewLayout({children}: {children: React.ReactNode}) {
  return (
      <>
      {children}
      </>
  );
}
