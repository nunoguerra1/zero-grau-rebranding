import { setRequestLocale } from "next-intl/server";
import { HeritageHero } from "@/components/sections/HeritageHero";
import { HeritageStory } from "@/components/sections/HeritageStory";

type Props = { params: Promise<{ locale: string }> };

export default async function HeritagePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <HeritageHero />
      <HeritageStory />
    </main>
  );
}
