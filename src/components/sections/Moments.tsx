"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { RevealText } from "@/components/ui/RevealText";
import { PHOTOS, type PhotoKey } from "@/config/media";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Column = { speed: number; className?: string; photos: PhotoKey[] };

// Order matters: on mobile the columns collapse into a 2-column masonry
// that follows this same sequence.
const COLUMNS: Column[] = [
  { speed: 40, photos: ["poolTable", "shelf", "toastTable"] },
  { speed: 100, className: "lg:mt-24", photos: ["iceCooler", "canFrosted"] },
  { speed: 70, className: "lg:mt-10", photos: ["toastPalms", "pour"] },
];

export function Moments() {
  const t = useTranslations("Moments");
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".moments-col").forEach((col) => {
          const speed = Number(col.dataset.speed ?? 0);
          gsap.fromTo(
            col,
            { y: speed },
            {
              y: -speed,
              ease: "none",
              scrollTrigger: {
                trigger: gridRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="moments-title"
      className="relative overflow-hidden bg-ice-light py-24 text-navy-900 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <h2 id="moments-title" className="font-display text-headline uppercase">
            <RevealText text={t("title")} trigger="view" />
          </h2>
          <p className="max-w-md text-lg text-navy-900/80">{t("body")}</p>
        </div>

        <div
          ref={gridRef}
          className="mt-14 columns-2 gap-4 sm:gap-6 lg:mt-20 lg:flex lg:columns-auto lg:items-start lg:gap-8 lg:pb-28"
        >
          {COLUMNS.map((col, ci) => (
            <div
              key={ci}
              data-speed={col.speed}
              className={cn(
                "moments-col contents lg:flex lg:flex-1 lg:flex-col lg:gap-8",
                col.className,
              )}
            >
              {col.photos.map((key, i) => {
                const photo = PHOTOS[key];
                return (
                  <motion.figure
                    key={key}
                    className="mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-navy-900/10 sm:mb-6 lg:mb-0"
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, y: 40, clipPath: "inset(8% 6% 8% 6% round 16px)" }
                    }
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      clipPath: "inset(0% 0% 0% 0% round 16px)",
                    }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 1.1,
                      ease: EASE_OUT_EXPO,
                      delay: (i % 2) * 0.1,
                    }}
                  >
                    <Image
                      src={photo.src}
                      width={photo.width}
                      height={photo.height}
                      alt={t(`photos.${key}`)}
                      sizes="(min-width: 1024px) 30vw, 50vw"
                      className="h-auto w-full transition-transform duration-700 ease-out hover:scale-[1.03]"
                    />
                  </motion.figure>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
