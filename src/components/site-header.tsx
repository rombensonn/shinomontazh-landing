import { CalendarCheck, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";

const navItems = [
  { href: "#services", label: "Услуги" },
  { href: "#price", label: "Стоимость" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contacts", label: "Контакты" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/82 text-white backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex min-w-0 items-center gap-3">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-signal text-sm font-black text-ink">
            <span className="absolute inset-y-0 left-0 w-2 bg-brand" />
            У39
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-black sm:text-base">
              Шиномонтаж на Угличской
            </span>
            <span className="hidden items-center gap-1 text-xs text-white/62 sm:flex">
              <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
              Угличская ул., 39Д
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Главное">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.phoneHref}
            className="hidden min-h-10 items-center gap-2 rounded-lg border border-white/18 bg-white/8 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/14 sm:inline-flex"
          >
            <Phone aria-hidden="true" className="h-4 w-4 text-signal" />
            {siteConfig.phone}
          </a>
          <a
            href="#lead"
            aria-label="Записаться"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-signal px-3 py-2 text-sm font-black text-ink transition hover:bg-white"
          >
            <CalendarCheck aria-hidden="true" className="h-4 w-4" />
            <span className="hidden sm:inline">Запись</span>
          </a>
        </div>
      </div>
    </header>
  );
}
