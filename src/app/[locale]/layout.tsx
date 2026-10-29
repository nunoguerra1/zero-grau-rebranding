import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Anton, Montserrat } from "next/font/google";
import { GrainOverlay } from "@/components/effects/GrainOverlay";
import "../globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Preloader } from "@/components/effects/Preloader";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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

  // Registra o locale para o escopo da requisição/build estático
  setRequestLocale(locale);

  // Carrega as mensagens de tradução corretamente dentro do escopo do request
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale === "pt" ? "pt-BR" : "es"}
      className={`${display.variable} ${sans.variable}`}
    >
      <body className="min-h-screen">
        <NextIntlClientProvider>
          <SmoothScrollProvider>
            <Preloader />
            <Header />
            <div id="content">{children}</div>
            <Footer />
          </SmoothScrollProvider>
        </NextIntlClientProvider>
        <GrainOverlay />
      </body>
    </html>
  );
}
