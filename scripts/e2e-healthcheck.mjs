import { config as loadEnv } from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

loadEnv({ path: ".env.local", override: true });

const results = [];
function pass(name, detail = "") {
  results.push({ name, ok: true, detail });
  console.log(`PASS  ${name}${detail ? ` — ${detail}` : ""}`);
}
function fail(name, detail = "") {
  results.push({ name, ok: false, detail });
  console.error(`FAIL  ${name}${detail ? ` — ${detail}` : ""}`);
}

const marker = `e2e-${Date.now()}`;
const payload = {
  name: `E2E Healthcheck ${marker}`,
  email: "e2e.healthcheck@example.com",
  phone: "+91 90000 00000",
  role: "soc-analyst-t1",
  timeline: "within-30-days",
  hiringLocation: "Remote",
  salaryBudget: "₹15-20 LPA",
  comment: `Automated MongoDB+SMTP healthcheck ${marker}`,
};

// 1) No live Supabase runtime files
const supabasePaths = [
  "src/integrations/supabase/client.ts",
  "supabase/functions/send-consultation-email/index.ts",
  "supabase/config.toml",
];
const leftover = supabasePaths.filter((p) => existsSync(resolve(process.cwd(), p)));
if (leftover.length === 0) {
  pass("No Supabase runtime files");
} else {
  fail("No Supabase runtime files", leftover.join(", "));
}

// 2) CTA uses Mongo API, not supabase
const cta = readFileSync(resolve(process.cwd(), "src/components/landing/CTASection.tsx"), "utf8");
if (cta.includes('fetch("/api/consultation"') && !cta.includes("supabase")) {
  pass("CTASection uses /api/consultation (not Supabase)");
} else {
  fail("CTASection uses /api/consultation (not Supabase)");
}

// 3) Env has Mongo, not required VITE_SUPABASE
if (process.env.MONGODB_URI) pass("MONGODB_URI present");
else fail("MONGODB_URI present");
if (!process.env.VITE_SUPABASE_URL) pass("VITE_SUPABASE_URL not active");
else fail("VITE_SUPABASE_URL not active", "still set in env");

// 4) API health
let apiOk = false;
try {
  const health = await fetch("http://localhost:3001/api/health");
  const body = await health.json();
  if (health.ok && body.ok) {
    pass("API health", "localhost:3001");
    apiOk = true;
  } else fail("API health", JSON.stringify(body));
} catch (err) {
  fail("API health", err.message);
}

// 5) Vite proxy to API
try {
  const proxied = await fetch("http://localhost:8080/api/health");
  const body = await proxied.json();
  if (proxied.ok && body.ok) pass("Vite /api proxy", "localhost:8080 → API");
  else fail("Vite /api proxy", JSON.stringify(body));
} catch (err) {
  fail("Vite /api proxy", err.message);
}

// 6) Submit consultation via proxy (same path as browser)
let insertedId = null;
if (apiOk) {
  try {
    const res = await fetch("http://localhost:8080/api/consultation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await res.json();
    if (res.ok && body.success && body.id) {
      insertedId = body.id;
      if (body.emailSent) pass("Form submit + email", `id=${body.id}`);
      else fail("Form submit + email", body.emailError || "emailSent=false");
    } else {
      fail("Form submit + email", JSON.stringify(body));
    }
  } catch (err) {
    fail("Form submit + email", err.message);
  }
}

// 7) Verify document in MongoDB (not Supabase)
try {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const collection = client.db("purple_tested").collection("consultation_submissions");
  const count = await collection.countDocuments();
  pass("MongoDB connected", `purple_tested.consultation_submissions count=${count}`);

  if (insertedId) {
    const doc = await collection.findOne({ _id: new ObjectId(insertedId) });
    if (
      doc &&
      doc.name === payload.name &&
      doc.email === payload.email &&
      doc.source === "website" &&
      !doc.supabaseId
    ) {
      pass("Submission stored in MongoDB", `name=${doc.name}`);
    } else {
      fail("Submission stored in MongoDB", doc ? JSON.stringify(doc) : "not found");
    }
  }
  await client.close();
} catch (err) {
  fail("MongoDB connected", err.message);
}

const failed = results.filter((r) => !r.ok);
console.log("\n---");
console.log(`Result: ${results.length - failed.length}/${results.length} passed`);
if (failed.length) process.exit(1);
