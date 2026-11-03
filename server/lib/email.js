import nodemailer from "nodemailer";

const LOGO_URL =
  "https://cdn-nexlink.s3.us-east-2.amazonaws.com/Frame_1171275932.png";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function displayValue(value) {
  const trimmed = String(value || "").trim();
  return trimmed ? escapeHtml(trimmed) : "Not provided";
}

function getSmtpConfig() {
  const host = String(process.env.SMTP_HOST || "").trim();
  const port = Number(process.env.SMTP_PORT || 587);
  const user = String(process.env.SMTP_USER || "").trim();
  const pass = String(process.env.SMTP_PASS || "").trim();
  const fromEmail = String(process.env.FROM_EMAIL || "").trim();
  const toEmail = String(process.env.TO_EMAIL || "").trim();

  const missing = [];
  if (!host) missing.push("SMTP_HOST");
  if (!user) missing.push("SMTP_USER");
  if (!pass) missing.push("SMTP_PASS");
  if (!fromEmail) missing.push("FROM_EMAIL");
  if (!toEmail) missing.push("TO_EMAIL");

  return { host, port, user, pass, fromEmail, toEmail, missing };
}

export function buildEmailHtml(params) {
  const {
    name,
    email,
    phone,
    roleLabel,
    timelineLabel,
    hiringLocation,
    salaryBudget,
    comment,
  } = params;

  const rows = [
    { label: "Full Name", value: displayValue(name) },
    { label: "Email Address", value: displayValue(email) },
    { label: "Phone Number", value: displayValue(phone) },
    { label: "Role Needed", value: displayValue(roleLabel) },
    { label: "Hiring Timeline", value: displayValue(timelineLabel) },
    { label: "Hiring Location", value: displayValue(hiringLocation) },
    { label: "Salary Budget", value: displayValue(salaryBudget) },
    { label: "Comment", value: displayValue(comment) },
  ];

  const fieldRows = rows
    .map(
      (row, index) => `
        <tr>
          <td style="padding: 14px 18px; border-bottom: ${
            index === rows.length - 1 ? "none" : "1px solid #EDE4FF"
          }; vertical-align: top;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="38%" style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; color: #6B3FD4; letter-spacing: 0.2px; vertical-align: top; padding-right: 12px;">
                  ${row.label}
                </td>
                <td width="62%" style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #1A1033; line-height: 1.5; vertical-align: top; word-break: break-word;">
                  ${row.value}
                </td>
              </tr>
            </table>
          </td>
        </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Talent Consultation Request</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #F4F0FA;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F4F0FA; padding: 32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 600px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden;">
            <tr>
              <td align="center" style="background: linear-gradient(135deg, #1A1033 0%, #4B0082 45%, #8659EE 100%); padding: 32px 28px 28px;">
                <img src="${LOGO_URL}" alt="PurpleSynapz" width="220" style="display: block; margin: 0 auto 20px; max-width: 220px; width: 100%; height: auto; border: 0;" />
                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #C77DFF; margin-bottom: 10px;">PurpleTested</div>
                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 22px; font-weight: 700; color: #FFFFFF;">New Talent Consultation Request</div>
                <div style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: rgba(255,255,255,0.85); padding-top: 8px;">A new hiring inquiry was submitted from the website.</div>
              </td>
            </tr>
            <tr>
              <td style="height: 4px; background: linear-gradient(90deg, #FF6BF5, #C77DFF, #9D4EDD); font-size: 0; line-height: 0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding: 28px 28px 8px; font-family: Arial, Helvetica, sans-serif; font-size: 15px; color: #3D2A5C;">
                Here are all the details from the consultation form:
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 28px 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FAF7FF; border: 1px solid #E8DCFB; border-radius: 12px; overflow: hidden;">
                  ${fieldRows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 28px 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #1A1033; border-radius: 12px;">
                  <tr>
                    <td style="padding: 18px 20px; font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: rgba(255,255,255,0.9); text-align: center;">
                      Reply directly to <a href="mailto:${escapeHtml(email)}" style="color: #C77DFF; text-decoration: none; font-weight: 700;">${displayValue(email)}</a> to follow up with this lead.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="background-color: #F8F4FC; border-top: 1px solid #EDE4FF; padding: 20px 28px;">
                <p style="margin: 0 0 6px; font-family: Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; color: #4B0082;">PurpleSynapz</p>
                <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #7A6B94;">This consultation request was submitted via the PurpleSynapz website.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function buildPlainText(params) {
  return [
    "New Talent Consultation Request",
    "",
    `Full Name: ${params.name}`,
    `Email Address: ${params.email}`,
    `Phone Number: ${params.phone || "Not provided"}`,
    `Role Needed: ${params.roleLabel}`,
    `Hiring Timeline: ${params.timelineLabel}`,
    `Hiring Location: ${params.hiringLocation || "Not provided"}`,
    `Salary Budget: ${params.salaryBudget || "Not provided"}`,
    `Comment: ${params.comment || "Not provided"}`,
    "",
    "---",
    "This consultation request was submitted via PurpleSynapz website.",
  ].join("\n");
}

export async function sendConsultationEmail(payload) {
  const { host, port, user, pass, fromEmail, toEmail, missing } = getSmtpConfig();

  if (missing.length > 0) {
    const reason = `missing_smtp_config: ${missing.join(", ")}`;
    console.warn(reason);
    return { sent: false, reason };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: { user, pass },
  });

  const info = await transporter.sendMail({
    from: `PurpleSynapz <${fromEmail}>`,
    to: toEmail,
    replyTo: payload.email,
    subject: `New Consultation Request from ${payload.name}`,
    text: buildPlainText(payload),
    html: buildEmailHtml(payload),
  });

  console.log("Consultation email sent:", {
    to: toEmail,
    from: fromEmail,
    messageId: info.messageId,
    response: info.response,
  });

  return {
    sent: true,
    messageId: info.messageId,
    response: info.response,
  };
}
