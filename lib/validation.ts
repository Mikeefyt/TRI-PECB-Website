import { z } from "zod";

export const enquirySchema = z.object({
  fullName: z.string().trim().min(1, "Please enter your full name."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your work email.")
    .pipe(z.email("Please enter a valid email address.")),
  organisation: z.string().trim(),
  market: z.enum(["Australia", "Malaysia"]),
  interest: z.string().min(1, "Please select a course or team training."),
  goals: z.string().trim(),
});

export type EnquiryValues = z.infer<typeof enquirySchema>;
