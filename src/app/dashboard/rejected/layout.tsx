import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hyrivo – Rejected Applications",
  description: "View all job applications that were declined by employers or that you decided to reject, helping you manage and analyze your job search.",
  keywords: [
    "rejected jobs",
    "declined applications",
    "job tracker",
    "job search management",
    "Hyrivo dashboard",
    "job applications",
    "career tracking",
    "application status",
    "job hunt organizer",
    "employment tracking"
  ],
};

export default function RejectedApplicationLayout({children}: {children: React.ReactNode}) {
  return (
      <>
      {children}
      </>
  );
}
