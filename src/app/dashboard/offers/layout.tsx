import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hyrivo – Job Offers",
  description: "Track and manage all your job applications where you’ve received offers, helping you stay organized and make informed decisions.",
  keywords: [
    "job offers",
    "job application tracker",
    "career management",
    "job acceptance",
    "Hyrivo dashboard",
    "offer tracking",
    "job hunt organizer",
    "application status",
    "job opportunities",
    "job decision making"
  ],
};

export default function OffersLayout({children}: {children: React.ReactNode}) {
  return (
      <>
      {children}
      </>
  );
}
