import Image from "next/image";
import {
  ArrowRight,
  CalendarCheck,
  Car,
  CheckCircle2,
  Clock3,
  Gauge,
  MapPin,
  MessageCircle,
  Phone,
  Recycle,
  ShieldCheck,
  Sparkles,
  Star,
  Timer,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { LeadForm } from "@/components/lead-form";
import { MobileCta } from "@/components/mobile-cta";
import { SiteHeader } from "@/components/site-header";
import { leadServiceOptions } from "@/lib/leads/options";
import { siteConfig } from "@/lib/site";

type IconItem = {
  title: string;
  text: string;
  icon: LucideIcon;
};

const trustPoints: IconItem[] = [
  {
    title: "Смета до подъёмника",
    text: "Размер, диски, датчики, ремонт и грузики проговариваем до начала работ.",
    icon: ShieldCheck,
  },
  {
    title: "Диски без лишних следов",
    text: "Работаем аккуратно с литьём, декоративными крышками и датчиками давления.",
    icon: Sparkles,
  },
  {
    title: "Запись без очереди",
    text: "Оставьте задачу в форме: мастер перезвонит уже с понятным планом.",
    icon: CalendarCheck,
  },
];

const services: IconItem[] = [
  {
    title: "Сезонная переобувка",
    text: "Снятие, монтаж, установка, давление и контроль перед выездом из бокса.",
    icon: Car,
  },
  {
    title: "Балансировка колёс",
    text: "Убираем биение руля, проверяем комплект перед трассой и новым сезоном.",
    icon: Gauge,
  },
  {
    title: "Ремонт и вулканизация",
    text: "Проколы, саморезы, боковые повреждения и ситуации, когда колесо травит.",
    icon: Wrench,
  },
  {
    title: "Хранение шин",
    text: "Организованное хранение комплекта без балкона, гаража и лишней пыли.",
    icon: ShieldCheck,
  },
  {
    title: "Утилизация шин",
    text: "Старую резину можно оставить после замены: разберём без лишних поездок.",
    icon: Recycle,
  },
  {
    title: "Базовый сервис",
    text: "Подскажем по колёсам, давлению, повреждениям и сопутствующим работам.",
    icon: CheckCircle2,
  },
];

const priceSteps = [
  "Фиксируем размер колёс, тип дисков и задачу: переобувка, ремонт, балансировка или хранение.",
  "Осматриваем резину и диск: проколы, боковины, датчики давления, состояние вентиля.",
  "Называем состав работ и стоимость до того, как колесо уедет на станок.",
  "После монтажа проверяем давление, затяжку и, при необходимости, балансировку.",
  "В сезон рекомендуем запись заранее, чтобы машина не простаивала у бокса.",
];

const situations = [
  "Нужно быстро переобуться к сезону и не стоять в длинной живой очереди.",
  "После 100 км/ч бьёт руль, есть подозрение на разбалансировку.",
  "Поймали саморез, колесо спускает, но хочется понять, можно ли ехать дальше.",
  "Повредили боковину в дороге и нужно решить: ремонт, замена или временный вариант.",
  "На дисках датчики, декоративные элементы или свежее литьё, с которым важна аккуратность.",
  "Нужна цена заранее: без сюрпризов после того, как машина уже на подъёмнике.",
];

const reviewSignals = [
  "делают быстро и аккуратно",
  "объясняют, что именно будут делать",
  "отмечают качественную балансировку",
  "помогают подобрать колесо на замену",
  "возвращаются на сезонную переобувку",
  "отдельно хвалят мастера Дениса",
  "ценят опыт и спокойное общение",
];

const heroStats = [
  { label: "График", value: "08:00-20:00", icon: Clock3 },
  { label: "Рейтинг", value: `${siteConfig.rating} / 60 оценок`, icon: Star },
  { label: "Формат", value: "Запись и срочно", icon: Timer },
];

function SectionHeading({
  eyebrow,
  title,
  children,
  tone = "dark",
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <div className="max-w-3xl">
      <p
        className={
          tone === "light"
            ? "mb-3 text-sm font-bold uppercase text-signal"
            : "mb-3 text-sm font-bold uppercase text-brand"
        }
      >
        {eyebrow}
      </p>
      <h2
        className={
          tone === "light"
            ? "text-3xl font-semibold leading-tight text-white sm:text-4xl"
            : "text-3xl font-semibold leading-tight text-ink sm:text-4xl"
        }
      >
        {title}
      </h2>
      {children ? (
        <p
          className={
            tone === "light"
              ? "mt-4 text-base leading-7 text-white/72 sm:text-lg"
              : "mt-4 text-base leading-7 text-muted sm:text-lg"
          }
        >
          {children}
        </p>
      ) : null}
    </div>
  );
}

function ServiceCard({ item, index }: { item: IconItem; index: number }) {
  const Icon = item.icon;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="group relative overflow-hidden rounded-lg border border-line bg-surface p-5 shadow-[0_18px_50px_rgba(15,18,20,0.08)] transition duration-300 hover:-translate-y-1 hover:border-brand/45 hover:bg-white">
      <div className="absolute right-4 top-4 text-4xl font-black text-ink/[0.04]">
        {number}
      </div>
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-ink/10 bg-ink text-signal shadow-inner">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </div>
      <h3 className="relative text-lg font-semibold text-ink">{item.title}</h3>
      <p className="relative mt-3 text-sm leading-6 text-muted">{item.text}</p>
      <div className="mt-5 h-1 w-16 rounded-full bg-[linear-gradient(90deg,var(--signal),var(--brand))]" />
    </article>
  );
}

function JsonLd() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

  const data = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: siteConfig.fullName,
    image: `${siteUrl}/industrial-hero-tire-service.png`,
    url: siteUrl,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Угличская ул., 39Д",
      addressLocality: "Ярославль",
      addressCountry: "RU",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "20:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.ratingValue,
      ratingCount: siteConfig.ratingCount,
      reviewCount: siteConfig.reviewCount,
    },
    areaServed: "Ярославль",
    hasMap: siteConfig.mapHref,
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <JsonLd />
      <SiteHeader />
      <main className="industrial-shell overflow-hidden bg-background pb-24 md:pb-0">
        <section className="relative min-h-[86svh] overflow-hidden bg-ink text-white">
          <Image
            src="/industrial-hero-tire-service.png"
            alt="Индустриальный шиномонтажный бокс с мастером и станком"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,10,0.94)_0%,rgba(7,9,10,0.78)_42%,rgba(7,9,10,0.26)_100%)]" />
          <div className="industrial-grid absolute inset-0 opacity-55" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,var(--ink)_0%,rgba(7,9,10,0)_100%)]" />

          <div className="relative mx-auto flex min-h-[86svh] max-w-7xl flex-col justify-end px-4 pb-7 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pb-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_25rem] lg:items-end">
              <div className="max-w-4xl">
                <p className="mb-5 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white backdrop-blur-xl">
                  <MapPin aria-hidden="true" className="h-4 w-4 text-signal" />
                  Ярославль, Угличская ул., 39Д
                </p>
                <h1 className="max-w-4xl text-4xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">
                  Шиномонтаж на Угличской, 39Д
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82 sm:text-xl">
                  Рабочий бокс для переобувки, балансировки и ремонта колёс:
                  металл, точность, понятный расчёт и спокойная запись без
                  сервисной суеты.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#lead"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-signal px-5 py-3 text-base font-black text-ink shadow-[0_18px_45px_rgba(255,199,44,0.25)] transition hover:bg-white"
                  >
                    <CalendarCheck aria-hidden="true" className="h-5 w-5" />
                    Записаться в бокс
                  </a>
                  <a
                    href={siteConfig.phoneHref}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-3 text-base font-semibold text-white backdrop-blur-xl transition hover:bg-white/18"
                  >
                    <Phone aria-hidden="true" className="h-5 w-5" />
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              <aside className="glass-panel hidden p-5 lg:block">
                <p className="text-sm font-bold uppercase text-signal">
                  Операционный пост
                </p>
                <h2 className="mt-3 text-2xl font-semibold">
                  Сначала диагностика, потом станок
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  Мастер уточняет задачу, осматривает колесо и называет состав
                  работ до старта. Это экономит время и убирает сюрпризы по
                  цене.
                </p>
                <div className="mt-5 grid gap-2">
                  {["Осмотр", "Смета", "Монтаж", "Контроль"].map((step) => (
                    <div
                      key={step}
                      className="flex items-center justify-between border-t border-white/10 py-2 text-sm"
                    >
                      <span className="text-white/62">{step}</span>
                      <CheckCircle2
                        aria-hidden="true"
                        className="h-4 w-4 text-signal"
                      />
                    </div>
                  ))}
                </div>
              </aside>
            </div>

            <dl className="mt-8 grid gap-3 sm:grid-cols-3 lg:max-w-4xl">
              {heroStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="glass-panel flex items-center gap-3 p-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-signal text-ink">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span>
                      <dt className="text-sm text-white/62">{stat.label}</dt>
                      <dd className="mt-1 font-semibold text-white">
                        {stat.value}
                      </dd>
                    </span>
                  </div>
                );
              })}
            </dl>
          </div>
        </section>

        <AnimatedSection className="relative border-y border-white/10 bg-ink py-6 text-white">
          <div className="hazard-stripe absolute inset-x-0 top-0 h-1" />
          <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
            {trustPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  className="flex gap-3 border-white/10 md:border-r md:pr-5 md:last:border-r-0"
                >
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-white/8 text-signal">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-white">
                      {point.title}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-white/62">
                      {point.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedSection>

        <AnimatedSection id="services" className="relative py-16 sm:py-20">
          <div className="machine-lines absolute inset-0" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <SectionHeading
                eyebrow="Цеховые услуги"
                title="Не витрина, а рабочая линия по колёсам"
              >
                Собрали основные операции в одном боксе: от сезонной
                переобувки до ремонта проколов, балансировки и хранения шин.
              </SectionHeading>
              <div className="rounded-lg border border-line bg-surface p-5 shadow-[0_18px_50px_rgba(15,18,20,0.08)]">
                <p className="text-sm font-semibold uppercase text-brand">
                  Подход к работе
                </p>
                <p className="mt-3 text-base leading-7 text-muted">
                  Каждый заказ начинается с понятной задачи: что с колесом, где
                  повреждение, какой размер, есть ли датчики и что важно
                  сохранить аккуратно.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <ServiceCard key={service.title} item={service} index={index} />
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection
          id="price"
          className="relative overflow-hidden bg-ink py-16 text-white sm:py-20"
        >
          <div className="industrial-grid absolute inset-0 opacity-40" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
            <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-white/12">
              <Image
                src="/industrial-balancing-wheel.png"
                alt="Балансировка колеса на промышленном станке"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,9,10,0.84)_0%,rgba(7,9,10,0.18)_58%)]" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <p className="text-sm font-bold uppercase text-signal">
                  Балансировка и ремонт
                </p>
                <h2 className="mt-3 max-w-md text-2xl font-semibold">
                  Точность видна в деталях: грузики, давление, затяжка,
                  контроль перед выездом.
                </h2>
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow="Без сюрпризов по цене"
                title="Стоимость согласуем до того, как колесо попадёт на станок"
                tone="light"
              >
                Цена зависит от размера колёс, типа дисков, состояния резины,
                грузиков, ремонта прокола и дополнительных операций. Поэтому
                сначала уточняем вводные, а затем согласуем итог.
              </SectionHeading>
              <ol className="mt-8 grid gap-3">
                {priceSteps.map((step, index) => (
                  <li
                    key={step}
                    className="glass-panel grid grid-cols-[2.75rem_1fr] gap-4 p-4"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-signal text-base font-black text-ink">
                      {index + 1}
                    </span>
                    <span className="self-center text-base leading-7 text-white/84">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
              <a
                href="#lead"
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-base font-black text-ink transition hover:bg-signal"
              >
                Узнать стоимость
                <ArrowRight aria-hidden="true" className="h-5 w-5" />
              </a>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="lead" className="relative py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
            <div>
              <SectionHeading
                eyebrow="Запись"
                title="Опишите задачу заранее, а не на шумном участке"
              >
                Напишите размер колёс, что случилось и когда удобно подъехать.
                Мастер перезвонит, уточнит детали и сориентирует по стоимости
                до начала работ.
              </SectionHeading>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {leadServiceOptions.slice(0, 6).map((option) => (
                  <div
                    key={option.value}
                    className="flex min-h-12 items-center gap-3 rounded-lg border border-line bg-surface px-4 text-sm font-medium text-ink shadow-sm"
                  >
                    <CheckCircle2
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-brand"
                    />
                    <span>{option.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <LeadForm />
          </div>
        </AnimatedSection>

        <AnimatedSection className="relative overflow-hidden bg-surface-muted py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-8">
            <div>
              <SectionHeading
                eyebrow="Когда помогает"
                title="Для плановой переобувки и срочных ситуаций в дороге"
              >
                Если проблему сложно описать одним словом, просто оставьте
                заявку или позвоните. По телефону можно сразу уточнить, есть ли
                смысл ремонтировать колесо или лучше искать замену.
              </SectionHeading>
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {situations.map((situation) => (
                  <div
                    key={situation}
                    className="rounded-lg border border-line bg-background p-5"
                  >
                    <p className="text-base leading-7 text-ink">{situation}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[460px] overflow-hidden rounded-lg border border-line bg-ink shadow-[0_24px_70px_rgba(15,18,20,0.18)]">
              <Image
                src="/industrial-tire-storage.png"
                alt="Индустриальная зона хранения шин"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-[45%_center]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,10,0.04)_0%,rgba(7,9,10,0.16)_48%,rgba(7,9,10,0.62)_100%)]" />
              <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/30 bg-ink/60 px-3 py-2 text-xs font-bold uppercase text-white backdrop-blur">
                  Сухая зона
                </span>
                <span className="rounded-full border border-white/30 bg-ink/60 px-3 py-2 text-xs font-bold uppercase text-white backdrop-blur">
                  Маркировка
                </span>
              </div>
              <div className="absolute inset-x-5 bottom-5 rounded-lg border border-white/20 bg-ink/72 p-5 text-white shadow-[0_18px_45px_rgba(0,0,0,0.28)] backdrop-blur-md">
                <p className="text-sm font-bold uppercase text-signal">
                  Хранение и порядок
                </p>
                <h3 className="mt-3 text-2xl font-semibold">
                  Комплект можно оставить в сервисе и не превращать гараж в
                  склад резины.
                </h3>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="reviews" className="py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
            <div className="relative overflow-hidden rounded-lg bg-ink p-6 text-white shadow-[0_22px_70px_rgba(7,9,10,0.28)] sm:p-8">
              <div className="industrial-grid absolute inset-0 opacity-30" />
              <div className="relative">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-signal text-ink">
                    <Star aria-hidden="true" className="h-8 w-8" />
                  </span>
                  <div>
                    <p className="text-5xl font-black">{siteConfig.rating}</p>
                    <p className="mt-1 text-sm text-white/66">
                      {siteConfig.ratingCount} оценок,{" "}
                      {siteConfig.reviewCount} отзывов
                    </p>
                  </div>
                </div>
                <p className="mt-7 text-base leading-7 text-white/76">
                  В отзывах чаще всего отмечают скорость, аккуратность,
                  вежливое общение и то, что сюда возвращаются каждый сезон.
                </p>
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow="Доверие"
                title="Что клиенты ценят в работе сервиса"
              >
                Мы не выводим спорные отзывы на сайт, но учитываем частые
                опасения клиентов: цену называют заранее, детали работы
                проговаривают до начала, а проверку балансировки и затяжки можно
                попросить после монтажа.
              </SectionHeading>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {reviewSignals.map((signal) => (
                  <div key={signal} className="flex gap-3">
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-1 h-5 w-5 shrink-0 text-brand"
                    />
                    <p className="text-base leading-7 text-muted">{signal}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="relative overflow-hidden bg-signal py-14 text-ink sm:py-16">
          <div className="hazard-stripe absolute inset-x-0 top-0 h-2" />
          <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
            <div>
              <p className="text-sm font-black uppercase">Срочный въезд</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
                Спускает колесо или поймали саморез? Позвоните, чтобы быстро
                понять, можно ли ехать на ремонт.
              </h2>
            </div>
            <a
              href={siteConfig.phoneHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3 text-base font-black text-white transition hover:bg-brand"
            >
              <Phone aria-hidden="true" className="h-5 w-5" />
              Позвонить сейчас
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection id="contacts" className="py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
            <div>
              <SectionHeading
                eyebrow="Контакты"
                title="Адрес, график и телефон всегда под рукой"
              >
                Удобная точка на Угличской улице. Работают каждый день, в сезон
                лучше записаться заранее.
              </SectionHeading>
              <div className="mt-8 grid gap-4">
                <a
                  href={siteConfig.mapHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex gap-3 rounded-lg border border-line bg-surface p-5 transition hover:border-brand hover:bg-white"
                >
                  <MapPin
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 shrink-0 text-brand"
                  />
                  <span>
                    <span className="block font-semibold text-ink">Адрес</span>
                    <span className="mt-1 block text-sm text-muted">
                      {siteConfig.address}
                    </span>
                  </span>
                </a>
                <a
                  href={siteConfig.phoneHref}
                  className="flex gap-3 rounded-lg border border-line bg-surface p-5 transition hover:border-brand hover:bg-white"
                >
                  <Phone
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 shrink-0 text-brand"
                  />
                  <span>
                    <span className="block font-semibold text-ink">
                      Телефон
                    </span>
                    <span className="mt-1 block text-sm text-muted">
                      {siteConfig.phone}
                    </span>
                  </span>
                </a>
                <div className="flex gap-3 rounded-lg border border-line bg-surface p-5">
                  <Clock3
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 shrink-0 text-brand"
                  />
                  <span>
                    <span className="block font-semibold text-ink">
                      График
                    </span>
                    <span className="mt-1 block text-sm text-muted">
                      Ежедневно: 08:00-20:00
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-line bg-background text-ink shadow-[0_24px_80px_rgba(7,9,10,0.16)]">
              <div className="industrial-grid absolute inset-0 opacity-20" />
              <div className="relative">
                <div className="p-6 pb-5 sm:p-8 sm:pb-6">
                  <p className="text-sm font-bold uppercase text-signal">
                    Интерактивная карта
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold">
                    Яндекс Карта: Угличская ул., 39Д
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-7 text-muted">
                    Точка открывается прямо на странице. Можно приблизить карту,
                    осмотреть подъезд и затем построить маршрут в Яндекс Картах.
                  </p>
                </div>

                <div className="relative h-[360px] border-y border-line bg-surface-muted sm:h-[400px]">
                  <iframe
                    title={`Яндекс Карта: ${siteConfig.address}`}
                    src={siteConfig.mapEmbedSrc}
                    className="h-full w-full border-0"
                    loading="eager"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>

                <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5">
                  <a
                    href={siteConfig.mapHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3 text-base font-black text-white transition hover:bg-signal hover:text-ink"
                  >
                    <MapPin aria-hidden="true" className="h-5 w-5" />
                    Открыть карту
                  </a>
                  <a
                    href={siteConfig.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-line bg-surface-muted px-5 py-3 text-base font-semibold text-ink transition hover:border-ink/20 hover:bg-background"
                  >
                    <MessageCircle aria-hidden="true" className="h-5 w-5" />
                    Написать
                  </a>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>
      <MobileCta />
    </>
  );
}
