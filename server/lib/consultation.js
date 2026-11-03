import { getConsultationsCollection } from "./mongo.js";
import { roleLabels, timelineLabels } from "./labels.js";
import { sendConsultationEmail } from "./email.js";

export async function handleConsultationSubmission(body) {
  const name = String(body?.name || "").trim();
  const email = String(body?.email || "").trim();
  const phone = String(body?.phone || "").trim();
  const role = String(body?.role || "").trim();
  const timeline = String(body?.timeline || "").trim();
  const hiringLocation = String(body?.hiringLocation || "").trim();
  const salaryBudget = String(body?.salaryBudget || "").trim();
  const comment = String(body?.comment || "").trim();

  if (!name) throw new Error("Name is required");
  if (!email) throw new Error("Email is required");
  if (!role) throw new Error("Role is required");
  if (!timeline) throw new Error("Timeline is required");

  const roleLabel = roleLabels[role] || role;
  const timelineLabel = timelineLabels[timeline] || timeline;

  const collection = await getConsultationsCollection();
  const doc = {
    name,
    email,
    phone: phone || null,
    role,
    roleLabel,
    timeline,
    timelineLabel,
    company: `${roleLabel} | ${timelineLabel}`,
    hiringLocation: hiringLocation || null,
    salaryBudget: salaryBudget || null,
    message: comment || null,
    createdAt: new Date(),
    source: "website",
  };

  const insertResult = await collection.insertOne(doc);

  let emailResult = { sent: false };
  try {
    emailResult = await sendConsultationEmail({
      name,
      email,
      phone,
      roleLabel,
      timelineLabel,
      hiringLocation,
      salaryBudget,
      comment,
    });
  } catch (emailError) {
    console.error("Email sending failed:", emailError);
    emailResult = {
      sent: false,
      reason: emailError.response || emailError.message || "email_send_failed",
    };
  }

  return {
    success: true,
    id: String(insertResult.insertedId),
    emailSent: Boolean(emailResult.sent),
    emailError: emailResult.sent ? undefined : emailResult.reason,
    message: emailResult.sent
      ? "Consultation request submitted successfully"
      : "Consultation saved, but email failed to send",
  };
}
