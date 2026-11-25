import nodemailer from "nodemailer";

/* Mail sending through Resend's SMTP relay (domain hk-provision.com verified in Resend), so it never
   depends on the mailbox password. All credentials come from environment variables, see .env.example. Server-only. */

export type ContactMessage = {
  name: string;
  company: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
};

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function readConfig(env = process.env) {
  const missing = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"].filter((k) => !env[k]);
  if (missing.length) throw new Error(`Missing environment variables: ${missing.join(", ")}`);
  const port = Number(env.SMTP_PORT || 465);
  return {
    smtp: {
      host: env.SMTP_HOST,
      port,
      secure: port === 465, // 465 = direct SSL, 587 = STARTTLS
      auth: { user: env.SMTP_USER!, pass: env.SMTP_PASS! },
    },
    from: env.MAIL_FROM || `HK Provision <${env.SMTP_USER}>`,
    to: env.MAIL_TO || env.SMTP_USER!,
    // Where visitors' replies to the acknowledgement go (MAIL_FROM may be a no-reply address).
    replyTo: env.MAIL_REPLY_TO || env.MAIL_TO || undefined,
    confirm: env.MAIL_SEND_CONFIRMATION === "true",
  };
}

export async function sendContactEmail(d: ContactMessage) {
  const cfg = readConfig();
  const transporter = nodemailer.createTransport(cfg.smtp);

  const rows: [string, string][] = [
    ["Name", d.name],
    ["Company", d.company || "—"],
    ["Email", d.email],
    ["Phone", d.phone || "—"],
    ["Interested in", d.interest],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${d.message}`;
  const html = `<h2 style="font-family:Georgia,serif;color:#0f1f3a">New enquiry from hk-provision.com</h2>
<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
${rows.map(([k, v]) => `<tr><td style="color:#555"><b>${esc(k)}</b></td><td>${esc(v)}</td></tr>`).join("\n")}
</table>
<p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap"><b>Message:</b><br>${esc(d.message)}</p>`;

  await transporter.sendMail({
    from: cfg.from,
    to: cfg.to,
    replyTo: `${d.name} <${d.email}>`,
    subject: `Website enquiry · ${d.interest} · ${d.name}`,
    text,
    html,
  });

  if (cfg.confirm) {
    await transporter
      .sendMail({
        from: cfg.from,
        to: d.email,
        replyTo: cfg.replyTo,
        subject: "We've received your message · HK Provision",
        text: `Dear ${d.name},\n\nThank you for contacting HK Provision. Our team will reply within one business day.\n\nYour message:\n${text}\n\nHK Provision\nhakim.karoui@hk-provision.com · +966 567 567 063`,
      })
      .catch((err) => console.error("[contact] confirmation not sent:", err)); // courtesy only, the enquiry already went through
  }
}
