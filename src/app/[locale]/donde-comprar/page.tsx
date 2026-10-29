import { setRequestLocale } from "next-intl/server";
import { LookFor } from "@/components/sections/LookFor";
import { StoreFinder } from "@/components/sections/StoreFinder";
import { WhereHero } from "@/components/sections/WhereHero";

type Props = { params: Promise<{ locale: string }> };

export default async function WhereToBuyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <WhereHero />
      <LookFor />
      <StoreFinder />
    </main>
  );
}
