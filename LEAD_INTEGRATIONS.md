# Lead Form Integrations — Setup Guide

When someone submits the enquiry form on the site, three things happen at once:

1. **Email** — a notification lands in your inbox.
2. **Privyr CRM** — the lead is created as a client/lead record.
3. **Gallabox WhatsApp** — for *approved* leads only (budget above the minimum threshold), a WhatsApp message is triggered.

All the code is already wired up. What's left is filling in your own account credentials and, for Gallabox, mapping the WhatsApp template. This doc walks through exactly what to do on each platform.

---

## 1. Where credentials live

All credentials go in a file called `.env.local` in the project root. This file is never committed to git (it's in `.gitignore`), so credentials stay private to whoever has the server.

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password
MAIL_FROM=your-email@gmail.com
MAIL_TO=your-email@gmail.com

PRIVYR_WEBHOOK_URL=https://www.privyr.com/api/v1/incoming-leads/xxxxx/xxxxx
GALLABOX_WEBHOOK_URL=https://server.gallabox.com/accounts/xxxxx/integrations/genericWebhook/xxxxx/webhook
```

> **Important for going live:** `.env.local` only works on your local machine. Once the site is deployed (e.g. on Vercel), you must add these same variables under **Project Settings → Environment Variables** on the hosting platform, or the form will silently stop sending email/CRM/WhatsApp data in production. After restoring `.env.local`, restart the dev server (`npm run dev`) so it picks up changes.

---

## 2. Email (Gmail SMTP)

Uses a Gmail account with an **App Password** (not your regular Gmail password — Google blocks plain passwords for this).

1. Go to your Google Account → **Security**.
2. Turn on **2-Step Verification** if it isn't already on (required for App Passwords).
3. Go to **Security → App Passwords**.
4. Create a new app password (name it something like "Decofice Website").
5. Copy the 16-character password (looks like `abcd efgh ijkl mnop`) into `SMTP_PASS`.
6. Set `SMTP_USER`, `MAIL_FROM`, and `MAIL_TO` to the Gmail address sending/receiving these leads.

If email stops arriving later, the most common cause is this app password being revoked (e.g. after a security review or 2FA change) — just generate a new one and update `SMTP_PASS`.

---

## 3. Privyr CRM

1. Log into Privyr — either **web.privyr.com** or the mobile app.
2. Go to the **Integrations** tab.
3. Find **Webhook Integration** (sometimes labelled "Generic Webhook").
4. Copy the **Webhook URL** shown there — it looks like:
   `https://www.privyr.com/api/v1/incoming-leads/XXXXXXXX/XXXXXXXX`
5. Paste it into `PRIVYR_WEBHOOK_URL` in `.env.local` (or your hosting platform's env settings).

That's it — no further mapping needed. Every submission creates a lead in Privyr with:
- Name, email, phone (as dedicated fields)
- Budget, start time, project kind, location, service, project description, and how they heard about you (as custom fields on the lead)

**To test:** submit the form once with real-looking (or clearly test) data, then check your Privyr leads list — it should appear within seconds.

---

## 4. Gallabox (WhatsApp)

Gallabox is different from Privyr — instead of a fixed schema, it needs to **see one real submission first**, then you map the fields to your WhatsApp template visually in their dashboard.

### Step A — Get the webhook URL
1. Log into Gallabox.
2. Go to **Integrations → Available Integrations → Generic Webhooks**.
3. Click **Connect**, give it a name (e.g. "Decofice Website Leads"), and select the **WhatsApp number/channel** you want messages sent from.
4. Copy the generated webhook URL — it looks like:
   `https://server.gallabox.com/accounts/XXXXXXXX/integrations/genericWebhook/XXXXXXXX/webhook`
5. Paste it into `GALLABOX_WEBHOOK_URL` in `.env.local` (or your hosting platform's env settings).

### Step B — Trigger one test submission
Gallabox only shows you which fields it received *after* it gets a real payload. Submit the enquiry form once with:
- A **budget option other than the lowest one** (only "approved" leads trigger Gallabox — see note below)
- ⚠️ Use a **fake/placeholder phone number** for this first test if you haven't mapped a template yet — once a template *is* mapped and live, real submissions will send an actual WhatsApp message to that phone number.

### Step C — Map the WhatsApp template
1. Back in Gallabox, open the webhook integration you just created — it should now list the fields it received:
   `name`, `phone`, `email`, `tags`, `lead_source`, `lead_stage`, `payment_status`, `service`
2. Choose or create the WhatsApp template you want to send.
3. Map each template variable to the matching field above (e.g. `{{1}}` → `name`, `{{2}}` → `service`, etc.).
4. Save and activate the workflow.

### About Tags / Lead Source / Lead Stage / Payment Status
These four are sent as **placeholder text** right now, since they're dropdown fields configured inside your Gallabox account and I don't have visibility into your exact predefined option names:

| Field | Placeholder sent | Meaning |
|---|---|---|
| `tags` | `"Website"` | Tag applied to every lead from this form |
| `lead_source` | `"Website"` | Where the lead came from |
| `lead_stage` | `"New"` | Pipeline stage for a brand-new enquiry |
| `payment_status` | `"Unpaid"` | Payment status before anything's been paid |

**Tell your developer the exact option names from your Gallabox dropdowns** (Contacts → field settings, or wherever these predefined lists live) if they should say something different — it's a one-line change in `src/app/api/enquiry/route.ts` per field.

### Who does the WhatsApp message go to?
Right now, `phone` in the payload is the **lead's own number** — so once a template is mapped and active, the lead themselves will receive a WhatsApp message. **If you actually want your sales team notified instead (not the lead directly), tell your developer** — the fix is to send the message to a fixed internal number rather than the lead's number, which is a small code change, not a Gallabox-side change.

### Only "approved" leads reach Gallabox
The code currently only pushes to Gallabox when the enquiry's budget is **above** the minimum threshold — i.e. the same leads that see the "This Lead Has Been Approved" thank-you page, not the ones redirected to the budget-notice page. If you want *every* submission (including below-threshold ones) sent to Gallabox too, that's also a one-line change — just ask.

---

## 5. Quick checklist before going live

- [ ] `.env.local` values are also added to your hosting platform's environment variables (Vercel, etc.)
- [ ] Sent at least one real test enquiry and confirmed:
  - [ ] Email arrived
  - [ ] Lead appeared in Privyr
  - [ ] WhatsApp message arrived (once template mapping is done)
- [ ] Deleted any obvious test leads from Privyr (e.g. named "Test", "Schema Probe", etc.)
- [ ] Confirmed with your developer whether the Gallabox WhatsApp message should go to the **lead** or to your **sales team**
