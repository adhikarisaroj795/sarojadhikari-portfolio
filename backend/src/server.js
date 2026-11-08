import { app } from "./app.js";
import { env } from "./config/env.js";
import { verifyMailer } from "./services/mail.service.js";

const server = app.listen(env.PORT, "127.0.0.1", async () => {
  console.log(
    `API listening on http://127.0.0.1:${env.PORT} (${env.NODE_ENV})`,
  );
  try {
    console.log(`Mailer: ${await verifyMailer()}`);
  } catch (err) {
    console.error(
      `Mailer: cannot log in to the mail server (${err.message}). Check SMTP_USER / SMTP_PASS.`,
    );
  }
});

const shutdown = () => server.close(() => process.exit(0));
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
