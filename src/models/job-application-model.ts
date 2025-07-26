import mongoose from 'mongoose';

const { Schema } = mongoose;

const jobApplicationSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },
    appliedDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Applied', 'Interview', 'Offered', 'Hired', 'Rejected', 'Inactive'],
      default: 'Applied',
    },
    interviewAt: {
      type: String,
      default: null,
    },
    interviewStatus: {
      type: String,
      enum: ['None', 'Scheduled', 'Completed', 'Missed'],
      default: 'None',
    },
    interviewNote: {
      type: String,
      default: null,
    },
    interviewRemarks: {
      type: String,
      default: null,
    },
    followUp: {
      type: String,
      default: '',
    },
    salary: {
      type: Number,
      default: 0,
    },
    jobType: {
      type: String,
      enum: [
        'Full-Time Remote',
        'On-Site Full-Time',
        'Hybrid',
        'Contract',
        'Internship',
        'Remote Contract',
        'Remote Full-Time',
        'Hybrid Remote',
      ],
      default: 'Full-Time Remote',
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    archiveRemarks: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite in development
const JobApplication =
  mongoose.models.JobApplication ||
  mongoose.model('JobApplication', jobApplicationSchema);

export default JobApplication;
