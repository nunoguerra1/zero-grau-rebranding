import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Anton, Montserrat } from "next/font/google";
import { GrainOverlay } from "@/components/effects/GrainOverlay";
import "../globals.css";

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});
const sans = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Pick<Props, "params">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return { title: t("title"), description: t("description") };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale === "pt" ? "pt-BR" : "es"}
      className={`${display.variable} ${sans.variable}`}
    >
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <GrainOverlay />
      </body>
    </html>
  );
}
