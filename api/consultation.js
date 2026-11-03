import { config as loadEnv } from "dotenv";
import { handleConsultationSubmission } from "../server/lib/consultation.js";

loadEnv({ path: ".env.local" });

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const result = await handleConsultationSubmission(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Consultation error:", error);
    return res.status(400).json({
      success: false,
      error: error.message || "Failed to submit consultation request",
    });
  }
}
