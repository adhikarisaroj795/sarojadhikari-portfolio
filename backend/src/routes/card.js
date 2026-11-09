import { ENDPOINTS, PORTFOLIO } from "../data/portfolio.js";

const CLI = /^(curl|wget|httpie|xh)\//i;

const { me } = PORTFOLIO;
const CARD = [
  "",
  "  ┌──────────────────────────────────────────────────────┐",
  `  │  ${me.name.padEnd(52)}│`,
  `  │  ${`${me.role}, ${me.based_in}`.padEnd(52)}│`,
  "  │                                                      │",
  `  │  ${"web      https://sarojadhikari.info.np".padEnd(52)}│`,
  `  │  ${"github   https://github.com/adhikarisaroj795".padEnd(52)}│`,
  `  │  ${"email    adhikarisaroj291@gmail.com".padEnd(52)}│`,
  "  │                                                      │",
  `  │  ${"Try:  curl api.sarojadhikari.info.np/api/stack".padEnd(52)}│`,
  "  └──────────────────────────────────────────────────────┘",
  "",
  "",
].join("\n");

export function rootHandler(req, res) {
  if (CLI.test(req.get("user-agent") ?? "")) {
    return res.type("text/plain; charset=utf-8").send(CARD);
  }
  res.json({
    success: true,
    message: "Saroj Adhikari — portfolio API",
    endpoints: ENDPOINTS,
  });
}
