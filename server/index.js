import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local", override: true });
loadEnv();

const { default: express } = await import("express");
const { default: cors } = await import("cors");
const { handleConsultationSubmission } = await import("./lib/consultation.js");

const app = express();
const port = Number(process.env.API_PORT || 3001);

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/consultation", async (req, res) => {
  try {
    const result = await handleConsultationSubmission(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error("Consultation error:", error);
    res.status(400).json({
      success: false,
      error: error.message || "Failed to submit consultation request",
    });
  }
});

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
