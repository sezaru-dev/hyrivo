import mongoose from "mongoose";

const { Schema } = mongoose;

const jobApplicationTimelineSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    weekStart: {
      type: Date,
      required: true,
      index: true, // helps with querying ranges
    },
    weekEnd: {
      type: Date,
      required: true,
      index: true,
    },
    applied: {
      type: Number,
      default: 0,
      min: 0,
    },
    interview: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true, // keep track of when this timeline doc was created/updated
  }
);

// Prevent model overwrite in development
const JobApplicationTimeline =
  mongoose.models.JobApplicationTimeline ||
  mongoose.model("JobApplicationTimeline", jobApplicationTimelineSchema);

export default JobApplicationTimeline;
