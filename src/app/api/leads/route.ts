import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { notifyLead } from "@/lib/leads/notifier";
import { checkRateLimit } from "@/lib/leads/rate-limit";
import { leadSchema, type StoredLead } from "@/lib/leads/schema";
import { logLead } from "@/lib/leads/storage";

export const runtime = "nodejs";

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: NextRequest) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Некорректный формат заявки" },
      { status: 400 },
    );
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json(
      { ok: false, message: "Некорректный формат заявки" },
      { status: 400 },
    );
  }

  const rawPayload = payload as Record<string, unknown>;
  const honeypot = String(rawPayload.company || "").trim();

  if (honeypot) {
    return NextResponse.json({ ok: true, message: "Заявка принята" });
  }

  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(ip);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message: "Слишком много заявок. Попробуйте позже или позвоните.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(
            Math.max(1, Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
          ),
        },
      },
    );
  }

  const parsed = leadSchema.safeParse(rawPayload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Проверьте телефон и поля заявки",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const lead: StoredLead = {
    name: parsed.data.name,
    phone: parsed.data.phone,
    service: parsed.data.service,
    wheelSize: parsed.data.wheelSize,
    car: parsed.data.car,
    preferredTime: parsed.data.preferredTime,
    message: parsed.data.message,
    contactMethod: parsed.data.contactMethod,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ip,
    userAgent: request.headers.get("user-agent") || "",
    referrer: request.headers.get("referer") || "",
  };

  let logged = false;

  try {
    await logLead(lead);
    logged = true;
  } catch (error) {
    console.error(error);
  }

  const notifications = await notifyLead(lead);

  if (!logged && notifications.telegram !== "sent" && notifications.email !== "sent") {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Заявку не удалось сохранить. Позвоните, пожалуйста, по телефону на сайте.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Заявка принята",
    id: lead.id,
  });
}
