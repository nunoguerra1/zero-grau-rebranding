import { setRequestLocale } from "next-intl/server";
import { ContactHero } from "@/components/sections/ContactHero";

type Props = { params: Promise<{ locale: string }> };

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <ContactHero />
    </main>
  );
}
