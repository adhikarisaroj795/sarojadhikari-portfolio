import express from "express";
import helmet from "helmet";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { contactRouter } from "./routes/contact.routes.js";

export const app = express();

app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use(helmet());
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "OK" });
});
app.use("/api/contact", contactRouter);

app.use(notFound);
app.use(errorHandler);
