import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
    ["Phone", `${countryCode ?? ""} ${phone}`.trim()],
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

  const sendToPrivyr = process.env.PRIVYR_WEBHOOK_URL
    ? fetch(process.env.PRIVYR_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          lead_source: "Decofice Website",
          email,
          phone: `${countryCode ?? ""} ${phone}`.trim(),
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
      })
    : Promise.reject(new Error("PRIVYR_WEBHOOK_URL not configured"));

  const [emailResult, privyrResult] = await Promise.allSettled([sendEmail, sendToPrivyr]);

  if (emailResult.status === "rejected") {
    console.error("Failed to send enquiry email:", emailResult.reason);
  }
  if (privyrResult.status === "rejected") {
    console.error("Failed to push lead to Privyr:", privyrResult.reason);
  }

  if (emailResult.status === "rejected" && privyrResult.status === "rejected") {
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
