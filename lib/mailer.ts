

const TO = process.env.CONTACT_TO!; // required
const FROM = process.env.CONTACT_FROM || "noreply@scratchclub.app"; // default ok for Resend (use your domain)


const RESEND_KEY = process.env.RESEND_API_KEY; // if present, will use Resend first


const SMTP_HOST = process.env.SMTP_HOST; // if present (and no Resend key), will use SMTP
const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;


export async function sendContact(payload: z.infer<any> | ContactPayload) {
// prefer Resend if configured
if (RESEND_KEY) {
const resend = new Resend(RESEND_KEY);
const subject = `New contact form: ${payload.name}`;
const html = renderHtml(payload as ContactPayload);


const { error } = await resend.emails.send({
from: FROM,
to: [TO],
subject,
html,
replyTo: (payload as ContactPayload).email,
});


if (error) throw new Error(error.message);
return { ok: true as const, provider: "resend" as const };
}


// fallback to SMTP if configured
if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS) {
const transporter = nodemailer.createTransport({
host: SMTP_HOST,
port: SMTP_PORT,
secure: SMTP_PORT === 465, // true for 465, false for others
auth: { user: SMTP_USER, pass: SMTP_PASS },
});


await transporter.sendMail({
from: FROM,
to: TO,
subject: `New contact form: ${(payload as ContactPayload).name}`,
html: renderHtml(payload as ContactPayload),
replyTo: (payload as ContactPayload).email,
});


return { ok: true as const, provider: "smtp" as const };
}


throw new Error("No email provider configured. Add RESEND_API_KEY or SMTP_* envs.");
}


function renderHtml({ name, email, phone, message }: ContactPayload) {
const lines = [
`<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
`<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : "",
`<p><strong>Message:</strong></p>`,
`<pre style="white-space:pre-wrap;word-break:break-word;font-family:ui-monospace,Menlo,Consolas,monospace">${escapeHtml(message)}</pre>`,
].join("\n");


return `
<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.5;padding:12px">
<h2 style="margin:0 0 12px">The Scratch Club — Contact Form</h2>
${lines}
<hr style="margin:16px 0" />
<p style="font-size:12px;color:#667">Time: ${new Date().toLocaleString()}</p>
</div>
`;
}


function escapeHtml(input: string) {
return input
.replaceAll("&", "&amp;")
.replaceAll("<", "&lt;")
.replaceAll(">", "&gt;")
.replaceAll('"', "&quot;")
.replaceAll("'", "&#039;");
}