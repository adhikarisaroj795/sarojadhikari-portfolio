import { sendContactEmail } from "../services/mail.service.js";

export async function submitContact(req, res) {
  const { name, email, message, website } = req.body;

  // Bot filled the hidden field: pretend it worked so it doesn't retry.
  if (website) {
    return res.status(200).json({ success: true, message: "Message sent" });
  }

  await sendContactEmail({ name, email, message, ip: req.ip });
  res.status(200).json({ success: true, message: "Message sent" });
}
