import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = env.MAIL_DRY_RUN
  ? null
  : nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465, // 465 = TLS from the start; 587 = STARTTLS
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    });

// Check the SMTP login at startup so a wrong password shows up immediately.
export async function verifyMailer() {
  if (env.MAIL_DRY_RUN) return "dry run (emails are printed, not sent)";
  await transporter.verify();
  return `sending as ${env.SMTP_USER}`;
}

export async function sendContactEmail({ name, email, message, ip }) {
  const mail = {
    from: { name: "Portfolio contact form", address: env.SMTP_USER },
    to: env.MAIL_TO,
    replyTo: { name, address: email }, // "Reply" in Gmail goes straight to the visitor
    subject: `Portfolio message from ${name}`,
    // Plain text only: nothing the visitor typed is ever rendered as HTML.
    text: [`Name: ${name}`, `Email: ${email}`, `IP: ${ip}`, "", message].join(
      "\n",
    ),
  };

  if (env.MAIL_DRY_RUN) {
    console.log("\n--- MAIL_DRY_RUN: email not sent ---");
    console.log(
      `To: ${mail.to}\nReply-To: ${email}\nSubject: ${mail.subject}\n\n${mail.text}`,
    );
    console.log("------------------------------------\n");
    return;
  }

  await transporter.sendMail(mail);
}
