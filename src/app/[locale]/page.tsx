import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { TripleFiltration } from "@/components/sections/TripleFiltration";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Hero />
      <TripleFiltration />
    </main>
  );
}
