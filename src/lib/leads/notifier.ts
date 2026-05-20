import { sendEmailLead } from "./email";
import type { StoredLead } from "./schema";
import { sendTelegramLead } from "./telegram";

export type NotificationResult = {
  telegram: "sent" | "skipped" | "failed";
  email: "sent" | "skipped" | "failed";
};

export async function notifyLead(lead: StoredLead): Promise<NotificationResult> {
  const result: NotificationResult = {
    telegram: "skipped",
    email: "skipped",
  };

  try {
    const telegram = await sendTelegramLead(lead);
    result.telegram = telegram.sent ? "sent" : "skipped";

    if (telegram.sent) {
      return result;
    }
  } catch (error) {
    result.telegram = "failed";
    console.error(error);
  }

  try {
    const email = await sendEmailLead(lead);
    result.email = email.sent ? "sent" : "skipped";
  } catch (error) {
    result.email = "failed";
    console.error(error);
  }

  return result;
}

// SMS can be added later as another notification channel after Telegram/email.
