import { rateLimit } from "express-rate-limit";

export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many messages from this address. Please try again later or email me directly.",
  },
});
