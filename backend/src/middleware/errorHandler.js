import { env } from "../config/env.js";

export function notFound(req, res) {
  res
    .status(404)
    .json({ success: false, message: `Cannot ${req.method} ${req.path}` });
}

// Express 5 forwards errors thrown in async handlers here automatically.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  // Malformed JSON or a body over the size limit
  if (err.type === "entity.parse.failed") {
    return res
      .status(400)
      .json({ success: false, message: "Request body must be valid JSON" });
  }
  if (err.type === "entity.too.large") {
    return res
      .status(413)
      .json({ success: false, message: "Request body is too large" });
  }

  console.error(err);
  res.status(err.status ?? 500).json({
    success: false,
    message:
      env.NODE_ENV === "production" ? "Something went wrong" : err.message,
  });
}
