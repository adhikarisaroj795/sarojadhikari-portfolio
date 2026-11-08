import { z } from "zod";

// Validate configuration once at startup so a missing value fails loudly,
// not on the first visitor's message.
const schema = z
  .object({
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    PORT: z.coerce.number().int().positive().default(5000),
    SMTP_HOST: z.string().min(1).default("smtp.gmail.com"),
    SMTP_PORT: z.coerce.number().int().positive().default(465),
    SMTP_USER: z.email(),
    SMTP_PASS: z.string().default(""),
    MAIL_TO: z.email(),
    // Comma-separated sites allowed to call the API from the browser
    CORS_ORIGINS: z
      .string()
      .default("http://localhost:5173")
      .transform((v) =>
        v
          .split(",")
          .map((o) => o.trim())
          .filter(Boolean),
      ),
    MAIL_DRY_RUN: z
      .enum(["true", "false"])
      .default("false")
      .transform((v) => v === "true"),
  })
  .refine((env) => env.MAIL_DRY_RUN || env.SMTP_PASS.length > 0, {
    message: "SMTP_PASS is required unless MAIL_DRY_RUN=true",
    path: ["SMTP_PASS"],
  });

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment configuration:");
  for (const issue of parsed.error.issues) {
    console.error(`  ${issue.path.join(".")}: ${issue.message}`);
  }
  process.exit(1);
}

export const env = parsed.data;
