import { CalendarCheck, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function MobileCta() {
  return (
    <div
      data-mobile-cta
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink/92 p-2 shadow-2xl backdrop-blur-2xl md:hidden"
    >
      <div className="grid grid-cols-3 gap-2">
        <a
          href={siteConfig.phoneHref}
          className="inline-flex min-h-12 w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-lg border border-white/12 bg-white/8 px-2 text-xs font-semibold text-white"
        >
          <Phone aria-hidden="true" className="h-4 w-4 text-signal" />
          Позвонить
        </a>
        <a
          href="#lead"
          className="inline-flex min-h-12 w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-lg bg-signal px-2 text-xs font-black text-ink"
        >
          <CalendarCheck aria-hidden="true" className="h-4 w-4" />
          Записаться
        </a>
        <a
          href={siteConfig.mapHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-12 w-full min-w-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-lg bg-brand px-2 text-xs font-semibold text-white"
        >
          <MapPin aria-hidden="true" className="h-4 w-4" />
          Маршрут
        </a>
      </div>
    </div>
  );
}
