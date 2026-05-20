# Шиномонтаж на Угличской

Одностраничный коммерческий лендинг для шиномонтажа в Ярославле на Next.js App Router, TypeScript, Tailwind CSS и Framer Motion.

## Запуск

```bash
npm install
npm run dev
```

Откройте `http://localhost:3000`.

## Заявки

Форма отправляет данные в `POST /api/leads`.

- Zod-валидация на сервере.
- Honeypot-поле против простого спама.
- Базовый rate limit по IP: 5 заявок за 10 минут.
- Основная отправка в Telegram Bot API.
- Резервная отправка на email через SMTP.
- Локальный JSONL-лог в `data/leads.jsonl`.

Скопируйте `.env.example` в `.env.local` и заполните переменные:

```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
LEAD_RECEIVER_EMAIL=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_YANDEX_METRIKA_ID=
```

Если Telegram не настроен или не отвечает, API попробует отправить заявку на email. Если ни один канал не настроен, заявка все равно сохраняется в локальный JSONL-файл, когда файловая система доступна.

## SMS позже

Платные SMS-сервисы не подключены. Для SMSC.ru, Exolve, МТС Exolve или другого провайдера можно добавить отдельный канал в `src/lib/leads/notifier.ts` по аналогии с Telegram и email.

## SEO

В проекте настроены metadata, Open Graph, JSON-LD для `AutoRepair`, `robots.ts` и `sitemap.ts`. Для корректных canonical URL заполните `NEXT_PUBLIC_SITE_URL`.
