import { setRequestLocale } from "next-intl/server";
import { AllProducts } from "@/components/sections/AllProducts";
import { ProductSwitcher } from "@/components/sections/ProductSwitcher";

type Props = { params: Promise<{ locale: string }> };

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <ProductSwitcher asPage />
      <AllProducts />
    </main>
  );
}
