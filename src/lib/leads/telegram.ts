import { formatLeadTelegramHtml } from "./format";
import type { StoredLead } from "./schema";

export async function sendTelegramLead(lead: StoredLead) {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!token || !chatId) {
    return { sent: false, skipped: true, reason: "telegram_not_configured" };
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: formatLeadTelegramHtml(lead),
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Telegram notification failed: ${response.status} ${text}`);
  }

  return { sent: true, skipped: false };
}
