#!/usr/bin/env node
// Quick script to test Resend transactional email sending.
// Usage (locally):
// RESEND_API_KEY=key CONTACT_TO=you@example.com node scripts/send_test_resend.js

const { Resend } = require("resend");

const key = process.env.RESEND_API_KEY;
const to = process.env.CONTACT_TO;
const from = process.env.CONTACT_FROM || "noreply@scratchclub.app";

if (!key) {
  console.error("Missing RESEND_API_KEY. Create one at https://resend.com and set RESEND_API_KEY in your environment.");
  process.exit(1);
}
if (!to) {
  console.error("Missing CONTACT_TO. Set CONTACT_TO=you@example.com to receive the test message.");
  process.exit(1);
}

async function run() {
  const resend = new Resend(key);

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject: "[Test] The Scratch Club - Resend delivery",
      html: `<div style="font-family:system-ui,Segoe UI,Roboto,sans-serif;line-height:1.4;padding:12px">
        <h2>Resend test message</h2>
        <p>This is a test message sent from <code>scripts/send_test_resend.js</code>.</p>
        <p>Time: ${new Date().toISOString()}</p>
      </div>`,
    });

    if (error) {
      console.error("Resend returned an error:", error);
      process.exit(2);
    }

    console.log(`Message queued successfully to ${to} (from ${from})`);
  } catch (err) {
    console.error("Unexpected error while sending with Resend:", err);
    process.exit(3);
  }
}

run();
