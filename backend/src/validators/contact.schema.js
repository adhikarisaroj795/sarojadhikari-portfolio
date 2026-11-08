import { z } from "zod";

// No line breaks in single-line fields (blocks email header injection tricks).
const singleLine = (field, max) =>
  z
    .string({ error: `${field} is required` })
    .trim()
    .min(1, `${field} is required`)
    .max(max, `${field} must be at most ${max} characters`)
    .refine((v) => !/[\r\n]/.test(v), `${field} must be a single line`);

export const contactSchema = z.object({
  name: singleLine("Name", 100).pipe(
    z.string().min(2, "Name must be at least 2 characters"),
  ),
  email: singleLine("Email", 254).pipe(
    z.email("Email must be a valid email address"),
  ),
  message: z
    .string({ error: "Message is required" })
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be at most 2000 characters"),
  // Honeypot: real visitors never see this field, so it must be empty.
  website: z.string().max(200).optional().default(""),
});
