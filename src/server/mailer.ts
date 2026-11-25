import nodemailer from "nodemailer";
import { confirmationEmail, enquiryEmail } from "./email-templates";

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

  await transporter.sendMail({
    from: cfg.from,
    to: cfg.to,
    replyTo: `${d.name} <${d.email}>`,
    ...enquiryEmail(d),
  });

  if (cfg.confirm) {
    await transporter
      .sendMail({
        from: cfg.from,
        to: d.email,
        replyTo: cfg.replyTo,
        ...confirmationEmail(d),
      })
      .catch((err) => console.error("[contact] confirmation not sent:", err)); // courtesy only, the enquiry already went through
  }
}
