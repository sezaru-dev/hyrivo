export type JobStatus = 'Applied' | 'Interview' | 'Offer' | 'Hired' | 'Rejected' | 'Inactive';

export type JobType =
  | 'Full-Time Remote'
  | 'On-Site Full-Time'
  | 'Hybrid'
  | 'Contract - 6 months'
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
  salary: string;
  jobType: JobType;
};