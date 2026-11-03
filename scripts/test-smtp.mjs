import { config as loadEnv } from "dotenv";
import nodemailer from "nodemailer";

loadEnv({ path: ".env.local", override: true });

const {
  SMTP_HOST,
  SMTP_PORT = "587",
  SMTP_USER,
  SMTP_PASS,
  FROM_EMAIL,
  TO_EMAIL,
} = process.env;

console.log("SMTP config check:", {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER: SMTP_USER ? `${SMTP_USER.slice(0, 4)}...` : "(missing)",
  SMTP_PASS: SMTP_PASS ? `(len=${SMTP_PASS.length})` : "(missing)",
  FROM_EMAIL,
  TO_EMAIL,
});

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !FROM_EMAIL || !TO_EMAIL) {
  console.error("Missing SMTP env vars");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: Number(SMTP_PORT) === 465,
  requireTLS: Number(SMTP_PORT) === 587,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

try {
  await transporter.verify();
  console.log("SMTP verify: OK");
} catch (err) {
  console.error("SMTP verify FAILED:", err.message);
  process.exit(1);
}

try {
  const info = await transporter.sendMail({
    from: `PurpleSynapz <${FROM_EMAIL}>`,
    to: TO_EMAIL,
    subject: "PurpleTested SMTP test",
    text: "If you received this, SMTP is working.",
    html: "<p>If you received this, <strong>SMTP is working</strong>.</p>",
  });
  console.log("SMTP send: OK", {
    messageId: info.messageId,
    response: info.response,
    accepted: info.accepted,
    rejected: info.rejected,
  });
} catch (err) {
  console.error("SMTP send FAILED:", {
    message: err.message,
    code: err.code,
    response: err.response,
    responseCode: err.responseCode,
  });
  process.exit(1);
}
