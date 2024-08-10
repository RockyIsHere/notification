"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
// List of scheduled jobs with timezone
const jobs = [
    // {
    //   name: "Job 1",
    //   schedule: "*/5 * * * * *", // Every 5 seconds
    //   task: () => {
    //     console.log("Executing Job 1");
    //   },
    //   timezone: "America/New_York", // Specify timezone for Job 1
    // },
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
const triggerJobs = () => {
    console.log("Triggering scheduled jobs...");
    jobs.forEach((job) => {
        const options = job.timezone ? { timezone: job.timezone } : undefined;
        node_cron_1.default.schedule(job.schedule, job.task, options);
        console.log(`Scheduled ${job.name} to run according to its schedule in timezone ${job.timezone || "default"}.`);
    });
};
// Continuous cron job that runs every minute in a specific timezone
const continuousCron = node_cron_1.default.schedule("* * * * *", () => {
    console.log("Continuous cron job running...");
    triggerJobs();
}, {
    timezone: "America/New_York", // Set the timezone for the continuous job
});
// Start the continuous cron job
console.log("Starting the continuous cron job...");
continuousCron.start();
