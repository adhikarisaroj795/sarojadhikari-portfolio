import { Router } from "express";
import { submitContact } from "../controllers/contact.controller.js";
import { contactLimiter } from "../middleware/rateLimit.js";
import { validateBody } from "../middleware/validate.js";
import { contactSchema } from "../validators/contact.schema.js";

export const contactRouter = Router();

contactRouter.post(
  "/",
  contactLimiter,
  validateBody(contactSchema),
  submitContact,
);
