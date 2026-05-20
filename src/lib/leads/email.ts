import nodemailer from "nodemailer";
import { formatLeadPlainText } from "./format";
import type { StoredLead } from "./schema";

export async function sendEmailLead(lead: StoredLead) {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  const receiver = process.env.LEAD_RECEIVER_EMAIL?.trim();

  if (!host || !receiver) {
    return { sent: false, skipped: true, reason: "smtp_not_configured" };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: user && pass ? { user, pass } : undefined,
  });

  await transporter.sendMail({
    from: user || receiver,
    to: receiver,
    subject: `Заявка на шиномонтаж: ${lead.phone}`,
    text: formatLeadPlainText(lead),
  });

  return { sent: true, skipped: false };
}
