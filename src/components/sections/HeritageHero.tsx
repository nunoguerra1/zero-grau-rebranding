"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { IceBackdrop } from "@/components/effects/IceBackdrop";
import { RevealText } from "@/components/ui/RevealText";
import { BRAND } from "@/config/media";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { useSiteReady } from "@/lib/site-ready";

export function HeritageHero() {
  const t = useTranslations("Heritage");
  const ready = useSiteReady();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".heritage-crest", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-navy-950">
      <IceBackdrop
        imageClassName="opacity-50"
        overlayClassName="bg-[radial-gradient(70%_60%_at_50%_35%,rgba(11,34,112,0.55),rgba(6,18,61,0.96))]"
      />

      <div className="relative mx-auto flex min-h-svh max-w-5xl flex-col items-center justify-center px-5 pt-28 pb-16 text-center sm:px-8">
        <motion.div
          className="heritage-crest relative w-[min(78vw,26rem)]"
          initial={{ opacity: 0, y: 48, scale: 0.96, filter: "blur(10px)" }}
          animate={
            ready ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : undefined
          }
          transition={{ duration: 1.5, ease: EASE_OUT_EXPO, delay: 0.2 }}
        >
          <div
            aria-hidden
            className="absolute inset-0 m-auto size-[120%] bg-[radial-gradient(closest-side,rgba(24,197,232,0.25),transparent)]"
          />
          <Image
            src={BRAND.casaWhite.src}
            width={BRAND.casaWhite.width}
            height={BRAND.casaWhite.height}
            alt={t("crestAlt")}
            priority
            sizes="(min-width: 640px) 416px, 78vw"
            className="relative h-auto w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
          />
        </motion.div>

        <h1 className="mt-10 font-display text-headline uppercase">
          <RevealText text={t("title")} delay={0.9} />
        </h1>
        <p className="mt-3 text-sm font-bold tracking-[0.3em] text-sun-400 uppercase">
          <RevealText text={t("since")} delay={1.3} />
        </p>
      </div>
    </section>
  );
}
