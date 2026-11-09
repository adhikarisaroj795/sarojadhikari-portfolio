import { Router } from "express";
import { ENDPOINTS, PORTFOLIO } from "../data/portfolio.js";

export const portfolioRouter = Router();

// Browsers and proxies may cache these for 5 minutes; the data rarely changes.
portfolioRouter.use((req, res, next) => {
  res.set("Cache-Control", "public, max-age=300");
  next();
});

portfolioRouter.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Saroj Adhikari — portfolio API",
    endpoints: ENDPOINTS,
  });
});

portfolioRouter.get("/:section", (req, res, next) => {
  const { section } = req.params;
  if (!Object.hasOwn(PORTFOLIO, section)) return next(); // unknown section -> 404 handler
  res.json(PORTFOLIO[section]);
});
