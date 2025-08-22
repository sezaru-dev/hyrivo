import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hyrivo – Job Applications",
  description: "View and manage all your job applications in one place.",
  keywords: ["job applications", "applied jobs", "job tracker", "Hyrivo"],
};

export default function JobApplicationLayout({children}: {children: React.ReactNode}) {
  return (
      <>
      {children}
      </>
  );
}
