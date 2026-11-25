/* Branded HTML emails for the contact form. Email clients ignore <style> blocks and modern CSS, so the markup
   is table-based with inline styles, web-safe fonts and no images (nothing to block). Every template also returns
   a plain-text version for clients that don't render HTML. Server-only. */

import type { ContactMessage } from "./mailer";

export type Email = { subject: string; html: string; text: string };

const C = {
  navy: "#0E2A47",
  navyDeep: "#0A1F36",
  gold: "#C8A14D",
  goldSoft: "#E6D3A3",
  cream: "#F6F4EE",
  page: "#ECEAE4",
  ink: "#0E2A47",
  muted: "#5F6B7A",
  line: "#E3DFD4",
};
const SERIF = "Georgia,'Times New Roman',serif";
const SANS = "Arial,Helvetica,sans-serif";

const CONTACT = {
  site: "https://www.hk-provision.com",
  email: "info@hk-provision.com",
  phone: "+966 567 567 063",
  tel: "+966567567063",
  whatsapp: "https://wa.me/966567567063",
};

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const multiline = (s: string) => esc(s).replace(/\r?\n/g, "<br>");
const firstName = (name: string) => name.trim().split(/\s+/)[0] || name;
const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
const sentAt = () =>
  new Intl.DateTimeFormat("en-GB", { dateStyle: "full", timeStyle: "short", timeZone: "Asia/Riyadh" }).format(new Date());

function button(href: string, label: string, primary = true) {
  const bg = primary ? C.gold : "#FFFFFF";
  const border = primary ? C.gold : C.navy;
  return `<a href="${esc(href)}" style="display:inline-block;background:${bg};border:1px solid ${border};color:${C.navy};font-family:${SANS};font-size:14px;font-weight:bold;letter-spacing:.04em;text-decoration:none;padding:13px 26px;margin:0 8px 10px 0">${esc(label)}</a>`;
}

function detailsTable(rows: [string, string][]) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse">
${rows
  .map(
    ([k, v]) => `<tr>
<td valign="top" style="padding:12px 0;border-bottom:1px solid ${C.line};font-family:${SANS};font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:${C.muted};width:130px">${esc(k)}</td>
<td valign="top" style="padding:12px 0;border-bottom:1px solid ${C.line};font-family:${SANS};font-size:15px;color:${C.ink}">${v}</td>
</tr>`,
  )
  .join("\n")}
</table>`;
}

function messageBlock(label: string, message: string) {
  return `<p style="margin:28px 0 10px;font-family:${SANS};font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:${C.muted}">${esc(label)}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="background:${C.cream};border-left:3px solid ${C.gold};padding:18px 22px;font-family:${SERIF};font-size:16px;line-height:1.6;color:${C.ink}">${multiline(message)}</td>
</tr></table>`;
}

function layout({ preheader, eyebrow, body, footer }: { preheader: string; eyebrow: string; body: string; footer: string }) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>HK Provision</title></head>
<body style="margin:0;padding:0;background:${C.page};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.page}">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.page}" style="background:${C.page}"><tr><td align="center" style="padding:32px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#FFFFFF">
<tr><td bgcolor="${C.navy}" style="background:${C.navy};padding:34px 40px 28px">
<div style="font-family:${SERIF};font-size:26px;letter-spacing:.18em;color:#FFFFFF">HK&nbsp;PROVISION</div>
<div style="width:48px;height:2px;background:${C.gold};margin:14px 0 12px;line-height:2px;font-size:0">&nbsp;</div>
<div style="font-family:${SANS};font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:${C.goldSoft}">${esc(eyebrow)}</div>
</td></tr>
<tr><td style="padding:36px 40px 40px">${body}</td></tr>
<tr><td bgcolor="${C.navyDeep}" style="background:${C.navyDeep};padding:24px 40px;font-family:${SANS};font-size:12px;line-height:1.7;color:#AEB8C6">${footer}</td></tr>
</table>
</td></tr></table>
</body></html>`;
}

const footerLinks = `<b style="color:#FFFFFF;letter-spacing:.12em">HK PROVISION</b> · Hospitality solutions · Riyadh, Saudi Arabia<br>
<a href="${CONTACT.site}" style="color:${C.gold};text-decoration:none">hk-provision.com</a> · <a href="mailto:${CONTACT.email}" style="color:${C.gold};text-decoration:none">${CONTACT.email}</a> · <a href="tel:${CONTACT.tel}" style="color:${C.gold};text-decoration:none">${CONTACT.phone}</a>`;

/* To the team: a new enquiry from the website. */
export function enquiryEmail(d: ContactMessage): Email {
  const rows: [string, string][] = [
    ["Name", d.name],
    ["Company", d.company || "—"],
    ["Email", d.email],
    ["Phone", d.phone || "—"],
    ["Interested in", d.interest],
  ];
  const subject = `Website enquiry · ${d.interest} · ${d.name}`;
  const replyHref = `mailto:${d.email}?subject=${encodeURIComponent(`Re: your enquiry to HK Provision (${d.interest})`)}`;

  const body = `<p style="margin:0 0 6px"><span style="display:inline-block;background:${C.cream};border:1px solid ${C.goldSoft};color:${C.navy};font-family:${SANS};font-size:11px;font-weight:bold;letter-spacing:.14em;text-transform:uppercase;padding:6px 12px">${esc(d.interest)}</span></p>
<h1 style="margin:14px 0 4px;font-family:${SERIF};font-size:30px;font-weight:normal;line-height:1.2;color:${C.navy}">${esc(d.name)}</h1>
<p style="margin:0 0 26px;font-family:${SANS};font-size:14px;color:${C.muted}">${d.company ? `${esc(d.company)} · ` : ""}${esc(sentAt())}</p>
${detailsTable([
  ["Name", esc(d.name)],
  ["Company", esc(d.company || "—")],
  ["Email", `<a href="mailto:${esc(d.email)}" style="color:${C.navy}">${esc(d.email)}</a>`],
  ["Phone", d.phone ? `<a href="${esc(telHref(d.phone))}" style="color:${C.navy}">${esc(d.phone)}</a>` : "—"],
  ["Interested in", esc(d.interest)],
])}
${messageBlock("Message", d.message)}
<p style="margin:30px 0 0">${button(replyHref, `Reply to ${firstName(d.name)}`)}${d.phone ? button(telHref(d.phone), "Call", false) : ""}</p>`;

  return {
    subject,
    html: layout({
      preheader: `${d.name}${d.company ? ` (${d.company})` : ""}: ${d.message.slice(0, 120)}`,
      eyebrow: "New website enquiry",
      body,
      footer: `Sent from the contact form on hk-provision.com. Replying to this email answers ${esc(d.name)} directly.`,
    }),
    text: `New website enquiry\n\n${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${d.message}`,
  };
}

/* To the visitor: acknowledgement with a copy of their message. */
export function confirmationEmail(d: ContactMessage): Email {
  const subject = "We've received your message · HK Provision";
  const steps: [string, string][] = [
    ["01", "Our team reviews your request and the right specialist takes it on."],
    ["02", "We reply within one business day by email or phone."],
    ["03", "We schedule a call to go through your project in detail."],
  ];

  const body = `<h1 style="margin:0 0 16px;font-family:${SERIF};font-size:32px;font-weight:normal;line-height:1.2;color:${C.navy}">Thank you, ${esc(firstName(d.name))}.</h1>
<p style="margin:0 0 28px;font-family:${SANS};font-size:15px;line-height:1.7;color:${C.ink}">We've received your enquiry about <b>${esc(d.interest)}</b> and a member of the HK Provision team will be in touch within one business day.</p>
<p style="margin:0 0 6px;font-family:${SANS};font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:${C.muted}">What happens next</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${steps
  .map(
    ([n, t]) => `<tr><td valign="top" style="padding:12px 16px 12px 0;border-bottom:1px solid ${C.line};font-family:${SERIF};font-size:20px;color:${C.gold};width:34px">${n}</td>
<td valign="top" style="padding:14px 0;border-bottom:1px solid ${C.line};font-family:${SANS};font-size:15px;line-height:1.55;color:${C.ink}">${t}</td></tr>`,
  )
  .join("\n")}
</table>
${messageBlock("Your message", d.message)}
<p style="margin:32px 0 14px;font-family:${SANS};font-size:15px;line-height:1.7;color:${C.ink}">Need to reach us sooner? Simply reply to this email, or contact us directly:</p>
<p style="margin:0">${button(CONTACT.whatsapp, "WhatsApp us")}${button(`tel:${CONTACT.tel}`, CONTACT.phone, false)}</p>
<p style="margin:30px 0 0;font-family:${SERIF};font-size:17px;font-style:italic;color:${C.navy}">The HK Provision team</p>`;

  return {
    subject,
    html: layout({
      preheader: "Thank you for contacting HK Provision. We'll reply within one business day.",
      eyebrow: "Message received",
      body,
      footer: footerLinks,
    }),
    text: `Dear ${d.name},\n\nThank you for contacting HK Provision. We've received your enquiry about ${d.interest} and our team will reply within one business day.\n\nYour message:\n${d.message}\n\nNeed us sooner? Reply to this email, call ${CONTACT.phone} or WhatsApp ${CONTACT.whatsapp}\n\nThe HK Provision team\n${CONTACT.site}`,
  };
}
