import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const publicSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

const yandexMetrikaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.trim();
const hasYandexMetrika = Boolean(
  yandexMetrikaId && /^\d+$/.test(yandexMetrikaId),
);

export const metadata: Metadata = {
  metadataBase: new URL(publicSiteUrl),
  title: {
    default: "Шиномонтаж на Угличской, 39Д в Ярославле",
    template: "%s | Шиномонтаж на Угличской",
  },
  description:
    "Шиномонтаж на Угличской, 39Д в Ярославле: сезонная переобувка, балансировка, ремонт колёс, вулканизация и хранение шин. Стоимость согласуем до начала работ.",
  keywords: [
    "шиномонтаж Ярославль",
    "шиномонтаж Угличская",
    "шиномонтаж Угличская 39Д",
    "переобувка шин Ярославль",
    "балансировка колёс Ярославль",
    "вулканизация Ярославль",
    "ремонт колёс Ярославль",
    "хранение шин Ярославль",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Шиномонтаж на Угличской, 39Д",
    description:
      "Быстрая запись, понятный расчёт до начала работ, шиномонтаж и ремонт колёс ежедневно с 08:00 до 20:00.",
    url: "/",
    siteName: "Шиномонтаж на Угличской",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/industrial-hero-tire-service.png",
        width: 1680,
        height: 960,
        alt: "Индустриальный шиномонтажный бокс",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">
        {children}
        {hasYandexMetrika ? (
          <>
            <Script id="yandex-metrika" strategy="afterInteractive">
              {`
                (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {
                    if (document.scripts[j].src === r) { return; }
                  }
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                ym(${yandexMetrikaId}, "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });
              `}
            </Script>
            <noscript>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://mc.yandex.ru/watch/${yandexMetrikaId}`}
                  style={{ position: "absolute", left: "-9999px" }}
                  alt=""
                />
              </div>
            </noscript>
          </>
        ) : null}
      </body>
    </html>
  );
}
