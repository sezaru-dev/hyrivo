import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hyrivo – Hired",
  description: "View all job applications where you’ve accepted offers and are officially hired, helping you track your career progress.",
  keywords: [
    "hired jobs",
    "accepted offers",
    "job tracker",
    "career progress",
    "Hyrivo dashboard",
    "employment status",
    "job applications",
    "career management",
    "job acceptance",
    "job tracking app"
  ],
};

export default function AcceptedOffersLayout({children}: {children: React.ReactNode}) {
  return (
      <>
      {children}
      </>
  );
}
