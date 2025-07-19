export type JobStatus = 'Applied' | 'Interview' | 'Offered' | 'Hired' | 'Rejected' | 'Inactive';

export type JobType =
  | 'Full-Time Remote'
  | 'On-Site Full-Time'
  | 'Hybrid'
  | 'Contract'
  | 'Internship'
  | 'Remote Contract'
  | 'Remote Full-Time'
  | 'Hybrid Remote';

export type JobApplicationType = {
  _id: string;
  companyName: string;
  jobTitle: string;
  appliedDate: string;
  status: JobStatus;
  interviewAt: string | null;
  followUp: string;
  salary: number;
  jobType: JobType;
  isArchived: boolean;
};