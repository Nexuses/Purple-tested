import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LOGO_URL = "https://cdn-nexlink.s3.us-east-2.amazonaws.com/Frame_1171275932.png";

interface ConsultationRequest {
  name: string;
  email: string;
  phone: string;
  role: string;
  timeline: string;
  hiringLocation: string;
  salaryBudget: string;
  comment: string;
}

const roleLabels: Record<string, string> = {
  // Entry Level
  "security-analyst-l1": "Security Analyst (Level 1)",
  "soc-analyst-t1": "SOC Analyst (Tier 1)",
  "cybersecurity-trainee": "Cybersecurity Trainee",
  "information-security-associate": "Information Security Associate",
  "security-operations-trainee": "Security Operations Trainee",
  "junior-penetration-tester": "Junior Penetration Tester",
  "vulnerability-management-associate": "Vulnerability Management Associate",
  "it-security-support-engineer": "IT Security Support Engineer",
  "network-security-associate": "Network Security Associate",
  "cybersecurity-intern": "Cybersecurity Intern",
  // Mid Level
  "soc-analyst-t2": "SOC Analyst (Tier 2)",
  "security-analyst-l2": "Security Analyst (Level 2)",
  "incident-response-analyst": "Incident Response Analyst",
  "threat-intelligence-analyst": "Threat Intelligence Analyst",
  "malware-analyst": "Malware Analyst",
  "digital-forensics-analyst": "Digital Forensics Analyst",
  "cloud-security-analyst": "Cloud Security Analyst",
  "penetration-tester": "Penetration Tester / Ethical Hacker",
  "security-compliance-analyst": "Security Compliance Analyst",
  "grc-analyst": "Governance, Risk & Compliance (GRC) Analyst",
  "application-security-analyst": "Application Security Analyst",
  "iam-analyst": "Identity & Access Management (IAM) Analyst",
  "network-security-engineer": "Network Security Engineer",
  "endpoint-security-engineer": "Endpoint Security Engineer",
  "devsecops-engineer": "DevSecOps Engineer",
  "vapt-engineer": "Vulnerability Assessment & Penetration Testing (VAPT) Engineer",
  "red-team-operator": "Red Team Operator",
  "blue-team-analyst": "Blue Team Analyst",
  "ot-ics-security-analyst": "OT/ICS Security Analysts",
  // Senior Level
  "senior-soc-analyst-t3": "Senior SOC Analyst (Tier 3)",
  "senior-security-analyst": "Senior Security Analyst",
  "senior-penetration-tester": "Senior Penetration Tester",
  "senior-incident-response-specialist": "Senior Incident Response Specialist",
  "senior-cloud-security-engineer": "Senior Cloud Security Engineer",
  "senior-digital-forensics-investigator": "Senior Digital Forensics Investigator",
  "senior-threat-hunter": "Senior Threat Hunter",
  "senior-security-compliance-specialist": "Senior Security Compliance Specialist",
  "senior-grc-consultant": "Senior GRC Consultant",
  "senior-iam-engineer": "Senior IAM Engineer",
  "senior-appsec-engineer": "Senior AppSec Engineer",
  "senior-network-security-engineer": "Senior Network Security Engineer",
  "senior-devsecops-specialist": "Senior DevSecOps Specialist",
  "senior-ot-ics-security-engineer": "Senior OT/ICS Security Engineer",
  // Architect Level
  "cybersecurity-architect": "Cybersecurity Architect",
  "cloud-security-architect": "Cloud Security Architect",
  "network-security-architect": "Network Security Architect",
  "application-security-architect": "Application Security Architect",
  "security-solutions-architect": "Security Solutions Architect",
  "zero-trust-architect": "Zero Trust Architect",
  "iam-architect": "IAM Architect",
  "devsecops-architect": "DevSecOps Architect",
  "ot-ics-security-architect": "OT/ICS Security Architect",
  "threat-intelligence-specialist": "Threat Intelligence Specialist",
  "security-automation-specialist": "Security Automation Specialist",
  // Management Level
  "soc-team-lead": "SOC Team Lead",
  "soc-manager": "SOC Manager",
  "cybersecurity-manager": "Cybersecurity Manager",
  "it-security-manager": "IT Security Manager",
  "incident-response-manager": "Incident Response Manager",
  "threat-intelligence-manager": "Threat Intelligence Manager",
  "grc-manager": "GRC Manager",
  "compliance-manager": "Compliance Manager",
  "application-security-manager": "Application Security Manager",
  "cloud-security-manager": "Cloud Security Manager",
  "iam-manager": "IAM Manager",
  "vulnerability-management-lead": "Vulnerability Management Lead",
  "red-team-lead": "Red Team Lead",
  "blue-team-lead": "Blue Team Lead",
  // Director Level
  "director-cybersecurity": "Director of Cybersecurity",
  "director-information-security": "Director of Information Security",
  "director-soc-operations": "Director of SOC Operations",
  "director-risk-compliance": "Director of Risk & Compliance",
  "director-threat-intelligence": "Director of Threat Intelligence",
  "director-cloud-security": "Director of Cloud Security",
  "director-grc": "Director of Governance, Risk & Compliance (GRC)",
  // Executive Level
  "ciso": "Chief Information Security Officer (CISO)",
  "cso": "Chief Security Officer (CSO)",
  "cro": "Chief Risk Officer (CRO)",
};

const timelineLabels: Record<string, string> = {
  "immediately": "Immediately",
  "within-30-days": "Within 30 days",
  "within-45-days": "Within 45 days",
  "2-3-months": "2-3 months",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function displayValue(value: string | undefined | null): string {
  const trimmed = (value || "").trim();
  return trimmed ? escapeHtml(trimmed) : "Not provided";
}

function buildEmailHtml(params: {
  name: string;
  email: string;
  phone: string;
  roleLabel: string;
  timelineLabel: string;
  hiringLocation: string;
  salaryBudget: string;
  comment: string;
}): string {
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

  const rows: Array<{ label: string; value: string }> = [
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
          <td style="padding: 14px 18px; border-bottom: ${index === rows.length - 1 ? "none" : "1px solid #EDE4FF"}; vertical-align: top;">
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
  <body style="margin: 0; padding: 0; background-color: #F4F0FA; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F4F0FA; padding: 32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 600px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 32px rgba(26, 16, 51, 0.12);">
            
            <!-- Header with logo -->
            <tr>
              <td align="center" style="background: linear-gradient(135deg, #1A1033 0%, #4B0082 45%, #8659EE 100%); padding: 32px 28px 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="center" style="padding-bottom: 20px;">
                      <img
                        src="${LOGO_URL}"
                        alt="PurpleSynapz"
                        width="220"
                        style="display: block; margin: 0 auto; max-width: 220px; width: 100%; height: auto; border: 0; outline: none; text-decoration: none;"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #C77DFF; padding-bottom: 10px;">
                      PurpleTested
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="font-family: Arial, Helvetica, sans-serif; font-size: 22px; font-weight: 700; color: #FFFFFF; line-height: 1.3;">
                      New Talent Consultation Request
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: rgba(255,255,255,0.85); padding-top: 8px; line-height: 1.5;">
                      A new hiring inquiry was submitted from the website.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Accent bar -->
            <tr>
              <td style="height: 4px; background: linear-gradient(90deg, #FF6BF5, #C77DFF, #9D4EDD); font-size: 0; line-height: 0;">&nbsp;</td>
            </tr>

            <!-- Intro -->
            <tr>
              <td style="padding: 28px 28px 8px; font-family: Arial, Helvetica, sans-serif; font-size: 15px; color: #3D2A5C; line-height: 1.6;">
                Here are all the details from the consultation form:
              </td>
            </tr>

            <!-- Details card -->
            <tr>
              <td style="padding: 12px 28px 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FAF7FF; border: 1px solid #E8DCFB; border-radius: 12px; overflow: hidden;">
                  ${fieldRows}
                </table>
              </td>
            </tr>

            <!-- Reply CTA hint -->
            <tr>
              <td style="padding: 0 28px 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #1A1033; border-radius: 12px;">
                  <tr>
                    <td style="padding: 18px 20px; font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: rgba(255,255,255,0.9); line-height: 1.5; text-align: center;">
                      Reply directly to <a href="mailto:${escapeHtml(email)}" style="color: #C77DFF; text-decoration: none; font-weight: 700;">${displayValue(email)}</a> to follow up with this lead.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="background-color: #F8F4FC; border-top: 1px solid #EDE4FF; padding: 20px 28px;">
                <p style="margin: 0 0 6px; font-family: Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; color: #4B0082;">
                  PurpleSynapz
                </p>
                <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #7A6B94; line-height: 1.5;">
                  This consultation request was submitted via the PurpleSynapz website.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-consultation-email");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      name,
      email,
      phone,
      role,
      timeline,
      hiringLocation,
      salaryBudget,
      comment,
    }: ConsultationRequest = await req.json();

    console.log("Processing consultation request for:", name);

    if (!name || name.trim().length === 0) {
      throw new Error("Name is required");
    }
    if (!email || email.trim().length === 0) {
      throw new Error("Email is required");
    }
    if (!role) {
      throw new Error("Role is required");
    }
    if (!timeline) {
      throw new Error("Timeline is required");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const roleLabel = roleLabels[role] || role;
    const timelineLabel = timelineLabels[timeline] || timeline;

    const { error: dbError } = await supabase
      .from("consultation_submissions")
      .insert({
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim() || null,
        company: `${roleLabel} | ${timelineLabel}`,
        hiring_location: hiringLocation?.trim() || null,
        salary_budget: salaryBudget?.trim() || null,
        message: comment?.trim() || null,
      });

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to store submission");
    }

    console.log("Submission stored in database");

    const smtpHost = Deno.env.get("SMTP_HOST");
    const smtpPort = Deno.env.get("SMTP_PORT") || "587";
    const smtpUser = Deno.env.get("SMTP_USER");
    const smtpPass = Deno.env.get("SMTP_PASS");
    const fromEmail = Deno.env.get("FROM_EMAIL");
    const toEmail = Deno.env.get("TO_EMAIL");

    if (!smtpHost || !smtpUser || !smtpPass || !fromEmail || !toEmail) {
      console.error("Missing SMTP configuration - skipping email");
      return new Response(
        JSON.stringify({
          success: true,
          message: "Consultation request submitted successfully",
          emailSent: false,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`Sending email via SMTP: ${smtpHost}:${smtpPort}`);

    const emailHtml = buildEmailHtml({
      name,
      email,
      phone,
      roleLabel,
      timelineLabel,
      hiringLocation,
      salaryBudget,
      comment,
    });

    const plainTextContent = [
      `New Talent Consultation Request`,
      ``,
      `Full Name: ${name.trim()}`,
      `Email Address: ${email.trim()}`,
      `Phone Number: ${phone?.trim() || "Not provided"}`,
      `Role Needed: ${roleLabel}`,
      `Hiring Timeline: ${timelineLabel}`,
      `Hiring Location: ${hiringLocation?.trim() || "Not provided"}`,
      `Salary Budget: ${salaryBudget?.trim() || "Not provided"}`,
      `Comment: ${comment?.trim() || "Not provided"}`,
      ``,
      `---`,
      `This consultation request was submitted via PurpleSynapz website.`,
    ].join("\r\n");

    const boundary = "----=_Part_" + Date.now().toString(36);
    const emailContent = [
      `From: PurpleSynapz <${fromEmail}>`,
      `To: ${toEmail}`,
      `Reply-To: ${email.trim()}`,
      `Subject: New Consultation Request from ${name.trim()}`,
      `MIME-Version: 1.0`,
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
      ``,
      `--${boundary}`,
      `Content-Type: text/plain; charset=UTF-8`,
      `Content-Transfer-Encoding: 7bit`,
      ``,
      plainTextContent,
      ``,
      `--${boundary}`,
      `Content-Type: text/html; charset=UTF-8`,
      `Content-Transfer-Encoding: 7bit`,
      ``,
      emailHtml,
      ``,
      `--${boundary}--`,
    ].join("\r\n");

    try {
      const conn = await Deno.connect({
        hostname: smtpHost,
        port: parseInt(smtpPort),
      });

      const encoder = new TextEncoder();
      const decoder = new TextDecoder();

      const readResponse = async (): Promise<string> => {
        const buf = new Uint8Array(1024);
        const n = await conn.read(buf);
        return decoder.decode(buf.subarray(0, n || 0));
      };

      const sendCommand = async (cmd: string): Promise<string> => {
        await conn.write(encoder.encode(cmd + "\r\n"));
        return await readResponse();
      };

      await readResponse();
      await sendCommand(`EHLO localhost`);
      await sendCommand(`STARTTLS`);

      const tlsConn = await Deno.startTls(conn, { hostname: smtpHost });

      const readTlsResponse = async (): Promise<string> => {
        const buf = new Uint8Array(1024);
        const n = await tlsConn.read(buf);
        return decoder.decode(buf.subarray(0, n || 0));
      };

      const sendTlsCommand = async (cmd: string): Promise<string> => {
        await tlsConn.write(encoder.encode(cmd + "\r\n"));
        return await readTlsResponse();
      };

      await sendTlsCommand(`EHLO localhost`);
      await sendTlsCommand(`AUTH LOGIN`);
      await sendTlsCommand(btoa(smtpUser));
      await sendTlsCommand(btoa(smtpPass));
      await sendTlsCommand(`MAIL FROM:<${fromEmail}>`);

      const recipients = toEmail.split(",").map((e) => e.trim()).filter((e) => e.length > 0);
      for (const recipient of recipients) {
        await sendTlsCommand(`RCPT TO:<${recipient}>`);
      }

      await sendTlsCommand(`DATA`);
      await tlsConn.write(encoder.encode(emailContent + "\r\n.\r\n"));
      await readTlsResponse();
      await sendTlsCommand(`QUIT`);
      tlsConn.close();

      console.log("Email sent successfully to:", toEmail);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Consultation request submitted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-consultation-email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
