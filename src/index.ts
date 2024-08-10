import cron, { ScheduledTask } from "node-cron";

interface Job {
  name: string;
  schedule: string;
  task: () => void;
  timezone?: string; // Optional timezone property
}

// List of scheduled jobs with timezone
const jobs: Job[] = [

  {
    name: "Job 2",
    schedule: "*/2 * * * * *", // Every 10 seconds
    task: () => {
      console.log("Executing Job 2");
    },
    timezone: "Asia/Tokyo", // Specify timezone for Job 2
  },
  {
    name: "Job 3",
    schedule: "*/3 * * * * *", // Every 15 seconds
    task: () => {
      console.log("Executing Job 3");
    },
    timezone: "Asis/Kolkata", // Specify timezone for Job 3
  },
];

// Function to trigger scheduled jobs
const triggerJobs = (): void => {
  console.log("Triggering scheduled jobs...");
  jobs.forEach((job) => {
    const options = job.timezone ? { timezone: job.timezone } : undefined;
    cron.schedule(job.schedule, job.task, options as cron.ScheduleOptions);
    console.log(
      `Scheduled ${job.name} to run according to its schedule in timezone ${
        job.timezone || "default"
      }.`
    );
  });
};

// Continuous cron job that runs every minute in a specific timezone
const continuousCron: ScheduledTask = cron.schedule(
  "* * * * *",
  () => {
    console.log("Continuous cron job running...");
    triggerJobs();
  },
  {
    timezone: "America/New_York", // Set the timezone for the continuous job
  }
);

// Start the continuous cron job
console.log("Starting the continuous cron job...");
continuousCron.start();
