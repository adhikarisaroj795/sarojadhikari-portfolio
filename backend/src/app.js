import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { readLimiter } from "./middleware/rateLimit.js";
import { rootHandler } from "./routes/card.js";
import { contactRouter } from "./routes/contact.routes.js";
import { portfolioRouter } from "./routes/portfolio.routes.js";

export const app = express();
const startedAt = new Date().toISOString();

app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use(helmet());

app.use(
  cors({
    origin: env.CORS_ORIGINS,
    methods: ["GET", "POST"],

    exposedHeaders: ["X-Hire-Me", "RateLimit", "RateLimit-Policy"],
  }),
);
app.use(express.json({ limit: "10kb" }));

app.use((req, res, next) => {
  res.set("X-Hire-Me", "adhikarisaroj291@gmail.com");
  next();
});

app.get("/", rootHandler);
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "OK",
    mailer: env.MAIL_DRY_RUN ? "dry-run" : "smtp",
    startedAt,
  });
});
app.use("/api/contact", contactRouter);
app.use("/api", readLimiter, portfolioRouter);

app.use(notFound);
app.use(errorHandler);
