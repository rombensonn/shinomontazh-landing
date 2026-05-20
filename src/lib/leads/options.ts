export const leadServiceOptions = [
  { value: "seasonal", label: "Переобуться к сезону" },
  { value: "balancing", label: "Балансировка колёс" },
  { value: "puncture", label: "Ремонт прокола / саморез" },
  { value: "vulcanization", label: "Вулканизация" },
  { value: "storage", label: "Хранение шин" },
  { value: "disposal", label: "Утилизация шин" },
  { value: "service", label: "Базовое сервисное обслуживание" },
  { value: "consultation", label: "Уточнить стоимость" },
] as const;

export type LeadServiceValue = (typeof leadServiceOptions)[number]["value"];

export const leadServiceValues = leadServiceOptions.map(
  (option) => option.value,
) as [LeadServiceValue, ...LeadServiceValue[]];

export const contactMethodOptions = [
  { value: "call", label: "Позвонить" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "telegram", label: "Telegram" },
] as const;

export type ContactMethodValue = (typeof contactMethodOptions)[number]["value"];

export const contactMethodValues = contactMethodOptions.map(
  (option) => option.value,
) as [ContactMethodValue, ...ContactMethodValue[]];

export function getLeadServiceLabel(value: string) {
  return (
    leadServiceOptions.find((option) => option.value === value)?.label || value
  );
}

export function getContactMethodLabel(value: string) {
  return (
    contactMethodOptions.find((option) => option.value === value)?.label ||
    value
  );
}
