import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getSql } from "@/db";

interface EnquiryPayload {
  name: string;
  email: string;
  phone: string;
  countryCode?: string;
  budget: string;
  startTime: string;
  projectKind: string;
  location: string;
  service: string;
  aboutProject: string;
  heardAbout: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  let payload: EnquiryPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const {
    name,
    email,
    phone,
    countryCode,
    budget,
    startTime,
    projectKind,
    location,
    service,
    aboutProject,
    heardAbout,
  } = payload;

  if (!name?.trim() || !email?.trim() || !phone?.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // "Approved" leads are the ones that clear the minimum budget threshold
  // (the same check EnquiryForm uses to route to /thank-you vs /budget-notice).
  const clearsThreshold = budget !== "Under 50 Lakhs" && budget !== "Under 75 Lakhs";
  const normalizedPhone = `${countryCode ?? ""} ${phone}`.trim();

  const sql = getSql();

  let previouslyRejected = false;
  try {
    const rows = await sql`
      SELECT 1 FROM rejected_leads
      WHERE phone = ${normalizedPhone} AND rejected_at > now() - interval '1 year'
    `;
    previouslyRejected = rows.length > 0;
  } catch (err) {
    console.error("Failed to check rejected_leads table:", err);
  }

  const isApprovedLead = clearsThreshold && !previouslyRejected;

  if (!isApprovedLead) {
    if (!clearsThreshold) {
      try {
        await sql`
          INSERT INTO rejected_leads (phone, rejected_at)
          VALUES (${normalizedPhone}, now())
          ON CONFLICT (phone) DO UPDATE SET rejected_at = now()
        `;
      } catch (err) {
        console.error("Failed to record rejected lead:", err);
      }
    }
    return NextResponse.json({ success: true });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const rows: [string, string | undefined][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", normalizedPhone],
    ["Budget", budget],
    ["Start Time", startTime],
    ["Kind of Project", projectKind],
    ["Location", location],
    ["Service Needed", service],
    ["About the Project", aboutProject],
    ["Heard About Us Via", heardAbout],
  ];

  const html = `
    <h2>New Project Enquiry</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
      ${rows
        .map(
          ([label, value]) => `
        <tr>
          <td style="font-weight:600; vertical-align:top; border-bottom:1px solid #eee;">${escapeHtml(label)}</td>
          <td style="border-bottom:1px solid #eee;">${escapeHtml(value ?? "-")}</td>
        </tr>`
        )
        .join("")}
    </table>
  `;

  const sendEmail = transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to: process.env.MAIL_TO,
    replyTo: email,
    subject: `New Enquiry from ${name}`,
    html,
  });

  const sendToPrivyr = !process.env.PRIVYR_WEBHOOK_URL
    ? Promise.resolve("skipped: PRIVYR_WEBHOOK_URL not configured" as const)
    : fetch(process.env.PRIVYR_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          lead_source: "Decofice Website",
          email,
          phone: normalizedPhone,
          other_fields: {
            Budget: budget,
            "Start Time": startTime,
            "Kind of Project": projectKind,
            Location: location,
            "Service Needed": service,
            "About the Project": aboutProject,
            "Heard About Us Via": heardAbout,
          },
        }),
      }).then(async (res) => {
        if (!res.ok) throw new Error(`Privyr responded ${res.status}: ${await res.text()}`);
      });

  const sendToGallabox = !process.env.GALLABOX_WEBHOOK_URL
    ? Promise.resolve("skipped: GALLABOX_WEBHOOK_URL not configured" as const)
    : fetch(process.env.GALLABOX_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: normalizedPhone,
          email,
          // Placeholder text — swap these for your real Gallabox dropdown option
          // names once you've mapped this webhook to its predefined fields.
          tags: "Website",
          lead_source: "Website",
          lead_stage: "New",
          payment_status: "Unpaid",
          service,
        }),
      }).then(async (res) => {
        if (!res.ok) throw new Error(`Gallabox responded ${res.status}: ${await res.text()}`);
      });

  const [emailResult, privyrResult, gallaboxResult] = await Promise.allSettled([
    sendEmail,
    sendToPrivyr,
    sendToGallabox,
  ]);

  if (emailResult.status === "rejected") {
    console.error("Failed to send enquiry email:", emailResult.reason);
  }
  if (privyrResult.status === "rejected") {
    console.error("Failed to push lead to Privyr:", privyrResult.reason);
  } else if (typeof privyrResult.value === "string") {
    console.log(`Privyr push ${privyrResult.value}`);
  }
  if (gallaboxResult.status === "rejected") {
    console.error("Failed to notify Gallabox:", gallaboxResult.reason);
  } else if (typeof gallaboxResult.value === "string") {
    console.log(`Gallabox notification ${gallaboxResult.value}`);
  }

  if (emailResult.status === "rejected" && privyrResult.status === "rejected") {
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
