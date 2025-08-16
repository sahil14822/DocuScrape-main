import { z } from "zod";

// Validation schema for scrape requests
export const insertScrapeJobSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
  format: z.enum(["pdf", "docx"])
});

// User schema
export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string()
});

// Type definitions
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = {
  id: string;
  username: string;
  password: string;
};

export type InsertScrapeJob = z.infer<typeof insertScrapeJobSchema>;
export type ScrapeJob = {
  id: string;
  url: string;
  status: "pending" | "processing" | "completed" | "failed";
  format: "pdf" | "docx";
  progress: number;
  title?: string | null;
  filename?: string | null;
  fileSize?: number | null;
  pages?: number | null;
  error?: string | null;
  createdAt: Date;
  completedAt?: Date | null;
};
