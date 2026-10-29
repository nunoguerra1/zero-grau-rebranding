import Image from "next/image";
import { useTranslations } from "next-intl";
import { IceBackdrop } from "@/components/effects/IceBackdrop";
import { RevealText } from "@/components/ui/RevealText";

export function ReturnablesHero() {
  const t = useTranslations("Returnables");

  return (
    <section className="relative overflow-hidden bg-cobalt-500">
      <IceBackdrop
        imageClassName="opacity-60 mix-blend-soft-light"
        overlayClassName="bg-[linear-gradient(180deg,rgba(6,18,61,0.5),rgba(2,135,208,0.2)_60%,rgba(2,135,208,0.85))]"
      />

      <div className="relative mx-auto grid min-h-[86svh] max-w-7xl items-center gap-10 px-5 pt-32 pb-20 sm:px-8 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <h1 className="font-display text-headline uppercase">
            <RevealText text={t("titleLine1")} delay={0.3} />
            <RevealText text={t("titleLine2")} delay={0.6} className="text-sun-400" />
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-ice-100 lg:mx-0">{t("body")}</p>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[min(88vw,30rem)]">
          <svg
            role="img"
            aria-label={t("cycleLabel")}
            viewBox="0 0 200 200"
            className="absolute inset-0 size-full animate-[spin_40s_linear_infinite]"
          >
            <path
              d="M20 100 A80 80 0 0 1 180 100"
              fill="none"
              stroke="#ffc800"
              strokeWidth="14"
            />
            <polygon points="162,98 198,98 180,124" fill="#ffc800" />
            <path
              d="M180 100 A80 80 0 0 1 20 100"
              fill="none"
              stroke="#ffffff"
              strokeWidth="14"
            />
            <polygon points="2,102 38,102 20,76" fill="#ffffff" />
          </svg>

          <div className="absolute inset-x-[34%] inset-y-[14%]">
            <Image
              src="/products/zero-grau-600ml.png"
              alt={t("bottleAlt")}
              fill
              priority
              sizes="(min-width: 1024px) 14vw, 30vw"
              className="object-contain drop-shadow-[0_24px_36px_rgba(0,0,0,0.4)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
