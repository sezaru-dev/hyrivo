export type JobStatus = 'applied' | 'interview' | 'offered' | 'hired' | 'rejected';
export type InterviewStatus = 'none' | 'scheduled' | 'completed' | 'missed';
export type InterviewMethod = 'phone' | 'online' | 'onsite';

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
  interviewStatus: InterviewStatus;
  interviewMethod: InterviewMethod;
  interviewNote: string | null;
  interviewRemarks: string | null;
  salary: number;
  jobType: JobType;
};

export type JobApplicationStats = {
  total: number| null
  applied: number
  interview: number
  offered: number
  hired: number
  rejected: number
}

export type InterviewStats = {
  nextInterviewIn: JobApplicationType | null;
  upcoming: number;
  thisWeek: number;
  overdue: number;
};

export type CompletedInterviewStats = {
  completedThisWeek: number;
  totalCompleted: number;
  completionRate: {
    rate: number,
    trend: {
      value: string,
      direction: 'neutral' | 'positive' | 'negative'
    }
  }
  lastCompletedInterview: string;
};