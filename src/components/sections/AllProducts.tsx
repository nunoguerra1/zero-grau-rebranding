"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { LuArrowRight } from "react-icons/lu";
import { RevealText } from "@/components/ui/RevealText";
import { LINE } from "@/config/products";
import { Link } from "@/i18n/navigation";
import { DURATION, EASE_OUT_EXPO } from "@/lib/motion";

const volumeLabel = (ml: number) => (ml >= 1000 ? `${ml / 1000} L` : `${ml} ml`);

export function AllProducts() {
  const t = useTranslations("Line");
  const tp = useTranslations("Products");
  const reduceMotion = useReducedMotion();

  const entrance = (i: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 48 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: {
            duration: DURATION.slow,
            ease: EASE_OUT_EXPO,
            delay: (i % 4) * 0.08,
          },
        };

  return (
    <section
      aria-labelledby="line-title"
      className="bg-ice-light py-24 text-navy-900 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <h2 id="line-title" className="font-display text-headline uppercase">
            <RevealText text={t("title")} trigger="view" />
          </h2>
          <p className="max-w-md text-lg text-navy-900/80">{t("body")}</p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:mt-16 lg:grid-cols-4">
          {LINE.map((p, i) => (
            <motion.li
              key={p.id}
              {...entrance(i)}
              className="group relative flex aspect-[3/4] flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-navy-900/10"
            >
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(closest-side_at_50%_62%,rgba(24,197,232,0.28),transparent)] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
              />

              <div className="relative flex-1">
                <div
                  className="absolute inset-x-[10%] bottom-0 transition-transform duration-500 ease-out group-hover:-translate-y-3 group-hover:-rotate-2"
                  style={{ height: `${p.scale * 100}%` }}
                >
                  <Image
                    src={p.src}
                    alt={t("alt", {
                      format: tp(`formats.${p.format}`),
                      volume: volumeLabel(p.volume),
                    })}
                    fill
                    sizes="(min-width: 1024px) 14vw, 40vw"
                    className="object-contain object-bottom drop-shadow-[0_18px_24px_rgba(6,18,61,0.3)]"
                  />
                </div>
              </div>

              <div className="relative px-4 pt-2 pb-4 sm:px-5 sm:pb-5">
                <p className="font-display text-3xl uppercase sm:text-4xl">
                  {volumeLabel(p.volume)}
                </p>
                <p className="text-sm text-navy-900/70">
                  {tp(`formats.${p.format}`)}
                  {p.returnable ? ` · ${tp("returnable")}` : ""}
                </p>
              </div>
            </motion.li>
          ))}

          <motion.li {...entrance(LINE.length)}>
            <Link
              href="/donde-comprar"
              className="group flex aspect-[3/4] h-full w-full flex-col justify-between rounded-3xl bg-navy-900 p-5 text-white transition-colors duration-300 hover:bg-sun-400 hover:text-navy-950 sm:p-6"
            >
              <span className="font-display text-title uppercase">{t("ctaTitle")}</span>
              <span className="flex items-center justify-between text-sm font-bold tracking-[0.14em] uppercase">
                {t("cta")}
                <span className="grid size-11 place-items-center rounded-full border border-current transition-transform duration-300 group-hover:translate-x-1">
                  <LuArrowRight size={20} aria-hidden />
                </span>
              </span>
            </Link>
          </motion.li>
        </ul>
      </div>
    </section>
  );
}
