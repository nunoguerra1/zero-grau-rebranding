import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { TripleFiltration } from "@/components/sections/TripleFiltration";
import { Moments } from "@/components/sections/Moments";
import { ProductSwitcher } from "@/components/sections/ProductSwitcher";
import { ClosingCta } from "@/components/sections/ClosingCta";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Hero />
      <TripleFiltration />
      <ProductSwitcher />
      <Moments />
      <ClosingCta />
    </main>
  );
}
