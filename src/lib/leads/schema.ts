import { z } from "zod";
import { contactMethodValues, leadServiceValues } from "./options";

const phoneRegex = /^[+()\-\s\d]{7,32}$/;

export const leadSchema = z.object({
  name: z.string().trim().max(80).optional().default(""),
  phone: z
    .string()
    .trim()
    .min(7, "Укажите телефон для связи")
    .max(32, "Телефон слишком длинный")
    .regex(phoneRegex, "Укажите телефон в корректном формате"),
  service: z.enum(leadServiceValues).default("seasonal"),
  wheelSize: z.string().trim().max(40).optional().default(""),
  car: z.string().trim().max(80).optional().default(""),
  preferredTime: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().max(1000).optional().default(""),
  contactMethod: z.enum(contactMethodValues).default("call"),
  company: z.string().trim().max(100).optional().default(""),
});

export type LeadInput = z.infer<typeof leadSchema>;

export type StoredLead = Omit<LeadInput, "company"> & {
  id: string;
  createdAt: string;
  ip: string;
  userAgent: string;
  referrer: string;
};
