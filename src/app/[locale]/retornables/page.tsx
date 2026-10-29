import { setRequestLocale } from "next-intl/server";
import { ReturnableSteps } from "@/components/sections/ReturnableSteps";
import { ReturnablesHero } from "@/components/sections/ReturnablesHero";

type Props = { params: Promise<{ locale: string }> };

export default async function ReturnablesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <ReturnablesHero />
      <ReturnableSteps />
    </main>
  );
}