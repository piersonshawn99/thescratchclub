# Resend - quick setup and test

This project supports Resend for transactional emails (preferred) via the `RESEND_API_KEY` env var.

Quick checklist

- Create an API key at https://resend.com/account/api-keys
- In Vercel (or your hosting provider) add an environment variable named `RESEND_API_KEY` with that key
- Ensure `CONTACT_TO` is set to the recipient address for contact form notifications (e.g. your inbox)
- Optionally set `CONTACT_FROM` to the sender address you prefer (defaults to `noreply@scratchclub.app`)

Local smoke test

1. In your shell run:

```bash
RESEND_API_KEY=key_here CONTACT_TO=you@example.com node scripts/send_test_resend.js
```

If successful you should see "Message queued successfully..." and receive the test message.

Vercel / Production

- Add these environment variables in your Vercel project settings (Environment Variables):
  - `RESEND_API_KEY` - your Resend API key
  - `CONTACT_TO` - the email to receive contact notifications
  - `CONTACT_FROM` - optional, the "from" email used in messages

Notes

- The application code will prefer Resend when `RESEND_API_KEY` is present. Otherwise it falls back to SMTP using `SMTP_*` env vars.
- If you want me to add a simple send-test route or automated check on deploy, I can add that too.
