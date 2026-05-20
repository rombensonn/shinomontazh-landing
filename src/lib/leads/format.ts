import {
  getContactMethodLabel,
  getLeadServiceLabel,
} from "./options";
import type { StoredLead } from "./schema";

function valueOrDash(value: string) {
  return value.trim() || "-";
}

export function escapeTelegramHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function formatLeadPlainText(lead: StoredLead) {
  return [
    "Новая заявка с сайта шиномонтажа",
    `ID: ${lead.id}`,
    `Дата: ${lead.createdAt}`,
    `Имя: ${valueOrDash(lead.name)}`,
    `Телефон: ${lead.phone}`,
    `Услуга: ${getLeadServiceLabel(lead.service)}`,
    `Размер колёс: ${valueOrDash(lead.wheelSize)}`,
    `Автомобиль: ${valueOrDash(lead.car)}`,
    `Когда удобно: ${valueOrDash(lead.preferredTime)}`,
    `Связаться: ${getContactMethodLabel(lead.contactMethod)}`,
    `Сообщение: ${valueOrDash(lead.message)}`,
    `IP: ${lead.ip}`,
    `Источник: ${valueOrDash(lead.referrer)}`,
  ].join("\n");
}

export function formatLeadTelegramHtml(lead: StoredLead) {
  return [
    "<b>Новая заявка с сайта шиномонтажа</b>",
    `<b>ID:</b> ${escapeTelegramHtml(lead.id)}`,
    `<b>Имя:</b> ${escapeTelegramHtml(valueOrDash(lead.name))}`,
    `<b>Телефон:</b> ${escapeTelegramHtml(lead.phone)}`,
    `<b>Услуга:</b> ${escapeTelegramHtml(getLeadServiceLabel(lead.service))}`,
    `<b>Размер колёс:</b> ${escapeTelegramHtml(valueOrDash(lead.wheelSize))}`,
    `<b>Автомобиль:</b> ${escapeTelegramHtml(valueOrDash(lead.car))}`,
    `<b>Когда удобно:</b> ${escapeTelegramHtml(valueOrDash(lead.preferredTime))}`,
    `<b>Связаться:</b> ${escapeTelegramHtml(
      getContactMethodLabel(lead.contactMethod),
    )}`,
    `<b>Сообщение:</b> ${escapeTelegramHtml(valueOrDash(lead.message))}`,
  ].join("\n");
}
