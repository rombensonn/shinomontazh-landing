"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import {
  contactMethodOptions,
  leadServiceOptions,
} from "@/lib/leads/options";
import { siteConfig } from "@/lib/site";

type FormState = {
  name: string;
  phone: string;
  service: (typeof leadServiceOptions)[number]["value"];
  wheelSize: string;
  car: string;
  preferredTime: string;
  message: string;
  contactMethod: (typeof contactMethodOptions)[number]["value"];
  company: string;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  service: "seasonal",
  wheelSize: "",
  car: "",
  preferredTime: "",
  message: "",
  contactMethod: "call",
  company: "",
};

const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
const whatsappPhone = siteConfig.phoneHref.replace(/\D/g, "");

function buildWhatsAppMessage(form: FormState) {
  const serviceLabel =
    leadServiceOptions.find((option) => option.value === form.service)?.label ||
    form.service;
  const contactMethodLabel =
    contactMethodOptions.find((option) => option.value === form.contactMethod)
      ?.label || form.contactMethod;

  return [
    `Заявка с сайта: ${siteConfig.name}`,
    form.name ? `Имя: ${form.name}` : "",
    `Телефон: ${form.phone}`,
    `Услуга: ${serviceLabel}`,
    form.wheelSize ? `Размер колес: ${form.wheelSize}` : "",
    form.car ? `Автомобиль: ${form.car}` : "",
    form.preferredTime ? `Когда удобно: ${form.preferredTime}` : "",
    `Как связаться: ${contactMethodLabel}`,
    form.message ? `Комментарий: ${form.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

type SubmitState =
  | { type: "idle"; message: "" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

export function LeadForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitState>({
    type: "idle",
    message: "",
  });

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      if (isStaticExport) {
        const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
          buildWhatsAppMessage(form),
        )}`;

        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        setForm(initialForm);
        formElement.reset();
        setStatus({
          type: "success",
          message:
            "Открыли WhatsApp с заполненной заявкой. Отправьте сообщение, и мастер свяжется с вами.",
        });
        return;
      }

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(
          payload?.message ||
            "Не получилось отправить заявку. Позвоните по телефону выше.",
        );
      }

      setForm(initialForm);
      formElement.reset();
      setStatus({
        type: "success",
        message:
          "Заявка отправлена. Мастер свяжется с вами, уточнит детали и стоимость до начала работ.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Не получилось отправить заявку. Позвоните по телефону выше.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-ink/10 bg-ink p-5 text-white shadow-[0_24px_80px_rgba(7,9,10,0.28)] sm:p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-white">Имя</span>
          <input
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="min-h-12 rounded-lg border border-white/12 bg-white/8 px-3 text-base text-white outline-none transition placeholder:text-white/38 focus:border-signal"
            placeholder="Как к вам обратиться"
            autoComplete="name"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-white">Телефон</span>
          <input
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className="min-h-12 rounded-lg border border-white/12 bg-white/8 px-3 text-base text-white outline-none transition placeholder:text-white/38 focus:border-signal"
            placeholder="+7 (___) ___-__-__"
            autoComplete="tel"
            inputMode="tel"
            required
          />
        </label>

        <label className="grid gap-2 sm:col-span-2">
          <span className="text-sm font-semibold text-white">Что нужно</span>
          <select
            value={form.service}
            onChange={(event) =>
              updateField("service", event.target.value as FormState["service"])
            }
            className="min-h-12 rounded-lg border border-white/12 bg-white/8 px-3 text-base text-white outline-none transition focus:border-signal"
          >
            {leadServiceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-white">Размер колёс</span>
          <input
            value={form.wheelSize}
            onChange={(event) => updateField("wheelSize", event.target.value)}
            className="min-h-12 rounded-lg border border-white/12 bg-white/8 px-3 text-base text-white outline-none transition placeholder:text-white/38 focus:border-signal"
            placeholder="Например, R16"
            autoComplete="off"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-white">Автомобиль</span>
          <input
            value={form.car}
            onChange={(event) => updateField("car", event.target.value)}
            className="min-h-12 rounded-lg border border-white/12 bg-white/8 px-3 text-base text-white outline-none transition placeholder:text-white/38 focus:border-signal"
            placeholder="Марка и модель"
            autoComplete="off"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-white">
            Когда удобно подъехать
          </span>
          <input
            value={form.preferredTime}
            onChange={(event) =>
              updateField("preferredTime", event.target.value)
            }
            className="min-h-12 rounded-lg border border-white/12 bg-white/8 px-3 text-base text-white outline-none transition placeholder:text-white/38 focus:border-signal"
            placeholder="Сегодня после 17:00"
            autoComplete="off"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-white">Связаться</span>
          <select
            value={form.contactMethod}
            onChange={(event) =>
              updateField(
                "contactMethod",
                event.target.value as FormState["contactMethod"],
              )
            }
            className="min-h-12 rounded-lg border border-white/12 bg-white/8 px-3 text-base text-white outline-none transition focus:border-signal"
          >
            {contactMethodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 sm:col-span-2">
          <span className="text-sm font-semibold text-white">
            Коротко опишите проблему
          </span>
          <textarea
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            className="min-h-28 rounded-lg border border-white/12 bg-white/8 px-3 py-3 text-base text-white outline-none transition placeholder:text-white/38 focus:border-signal"
            placeholder="Например: поймал саморез, колесо спускает; нужно переобуть R17 и отбалансировать"
            maxLength={1000}
          />
        </label>
      </div>

      <label className="hidden" aria-hidden="true">
        Компания
        <input
          value={form.company}
          onChange={(event) => updateField("company", event.target.value)}
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </label>

      <div className="mt-5 grid gap-3 border-t border-white/10 pt-5">
        <label className="flex gap-3 rounded-lg border border-white/12 bg-white/6 p-3 text-sm leading-5 text-white/78">
          <input
            type="checkbox"
            required
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-white/30 bg-white/10 accent-signal"
          />
          <span>
            <span className="font-semibold text-white">
              Политика обработки персональных данных
            </span>{" "}
            принята и понятна.
          </span>
        </label>
        <label className="flex gap-3 rounded-lg border border-white/12 bg-white/6 p-3 text-sm leading-5 text-white/78">
          <input
            type="checkbox"
            required
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-white/30 bg-white/10 accent-signal"
          />
          <span>
            <span className="font-semibold text-white">
              Согласие на обработку персональных данных
            </span>{" "}
            даю для связи по заявке.
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-signal px-5 py-3 text-base font-black text-ink transition hover:bg-white disabled:cursor-not-allowed disabled:bg-muted"
      >
        <Send aria-hidden="true" className="h-5 w-5" />
        {isSubmitting ? "Отправляем..." : "Отправить заявку"}
      </button>

      <p className="mt-3 text-xs leading-5 text-white/52">
        Стоимость и состав работ согласуются до начала выполнения.
      </p>

      <div aria-live="polite" className="mt-4 min-h-6">
        {status.message ? (
          <p
            className={
              status.type === "success"
                ? "rounded-lg bg-green-400/15 px-3 py-2 text-sm text-green-100"
                : "rounded-lg bg-red-400/15 px-3 py-2 text-sm text-red-100"
            }
          >
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
