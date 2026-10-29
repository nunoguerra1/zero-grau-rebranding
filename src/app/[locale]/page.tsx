import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

const SWATCHES = [
  "bg-ice-100",
  "bg-ice-400",
  "bg-brand-sky",
  "bg-cobalt-500",
  "bg-navy-800",
  "bg-sun-400",
];

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-ice-dark px-6 text-center">
      <h1 className="font-display text-display uppercase">{t("title")}</h1>
      <p className="max-w-xl text-ice-100">{t("subtitle")}</p>
      <ul className="flex gap-3" aria-hidden>
        {SWATCHES.map((s) => (
          <li key={s} className={`${s} size-12 rounded-full ring-2 ring-white/30`} />
        ))}
      </ul>
    </main>
  );
}
