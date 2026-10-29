"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa6";
import { LuPhone } from "react-icons/lu";
import { IceBackdrop } from "@/components/effects/IceBackdrop";
import { Button } from "@/components/ui/Button";
import { RevealText } from "@/components/ui/RevealText";
import { PHOTOS } from "@/config/media";
import { SITE, whatsappUrl } from "@/config/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { useSiteReady } from "@/lib/site-ready";

export function WhereHero() {
  const t = useTranslations("Where");
  const ready = useSiteReady();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".where-photo",
          { y: 40 },
          {
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  const card = (i: number) => ({
    initial: { opacity: 0, y: 32 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, ease: EASE_OUT_EXPO, delay: 1 + i * 0.12 },
  });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-navy-950">
      <IceBackdrop
        imageClassName="opacity-60"
        overlayClassName="bg-[linear-gradient(90deg,rgba(6,18,61,.92),rgba(6,18,61,.55))]"
      />

      <div className="relative mx-auto grid min-h-svh max-w-7xl items-center gap-12 px-5 pt-32 pb-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h1 className="font-display text-headline uppercase">
            <RevealText text={t("title")} delay={0.4} />
          </h1>
          <p className="mt-5 max-w-lg text-lg text-ice-100">{t("body")}</p>

          <ul className="mt-10 space-y-4">
            <motion.li
              {...card(0)}
              className="rounded-3xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm sm:p-6"
            >
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-sun-400 text-navy-950">
                  <FaWhatsapp size={22} aria-hidden />
                </span>
                <div>
                  <h2 className="font-display text-3xl uppercase">
                    {t("whatsapp.title")}
                  </h2>
                  <p className="mt-1 text-ice-100">{t("whatsapp.body")}</p>
                  <div className="mt-4">
                    <Button externalHref={whatsappUrl()} arrow>
                      {t("whatsapp.cta")}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.li>

            <motion.li
              {...card(1)}
              className="rounded-3xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm sm:p-6"
            >
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/40">
                  <LuPhone size={22} aria-hidden />
                </span>
                <div>
                  <h2 className="font-display text-3xl uppercase">{t("sac.title")}</h2>
                  <p className="mt-1 text-ice-100">{t("sac.body")}</p>
                  <div className="mt-4">
                    <Button externalHref={SITE.sac.href} variant="ghost">
                      {SITE.sac.label}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.li>
          </ul>
        </div>

        <div className="where-photo mx-auto w-full max-w-md">
          <motion.div
            className="relative aspect-[4/5] overflow-hidden rounded-3xl ring-1 ring-white/20"
            initial={{ opacity: 0, clipPath: "inset(10% 8% 10% 8% round 24px)" }}
            animate={
              ready
                ? { opacity: 1, clipPath: "inset(0% 0% 0% 0% round 24px)" }
                : undefined
            }
            transition={{ duration: 1.3, ease: EASE_OUT_EXPO, delay: 0.6 }}
          >
            <Image
              src={PHOTOS.shelf.src}
              alt={t("photoAlt")}
              fill
              priority
              sizes="(min-width: 1024px) 36vw, 90vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
