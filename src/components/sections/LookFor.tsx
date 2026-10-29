"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { RevealText } from "@/components/ui/RevealText";
import { LINE } from "@/config/products";
import { Link } from "@/i18n/navigation";
import { DURATION, EASE_OUT_EXPO } from "@/lib/motion";

const PICKS = [
  { id: "p350", key: "can" },
  { id: "p300", key: "bottle" },
  { id: "p600", key: "returnable" },
] as const;

export function LookFor() {
  const t = useTranslations("Where.look");
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="look-title"
      className="bg-ice-light py-24 text-navy-900 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 id="look-title" className="font-display text-headline uppercase">
          <RevealText text={t("title")} trigger="view" />
        </h2>
        <p className="mt-4 max-w-lg text-lg text-navy-900/80">{t("body")}</p>

        <ul className="mt-12 grid grid-cols-3 gap-3 sm:gap-6">
          {PICKS.map(({ id, key }, i) => {
            const product = LINE.find((p) => p.id === id)!;
            return (
              <motion.li
                key={id}
                initial={reduceMotion ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: DURATION.slow,
                  ease: EASE_OUT_EXPO,
                  delay: i * 0.1,
                }}
              >
                <Link
                  href="/productos"
                  className="group relative flex aspect-[3/4] flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-navy-900/10 sm:rounded-3xl"
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(closest-side_at_50%_62%,rgba(24,197,232,0.28),transparent)]"
                  />
                  <div className="relative flex-1">
                    <div
                      className="absolute inset-x-[8%] bottom-0 transition-transform duration-500 ease-out group-hover:-translate-y-2"
                      style={{ height: `${Math.min(product.scale * 120, 100)}%` }}
                    >
                      <Image
                        src={product.src}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 20vw, 30vw"
                        className="object-contain object-bottom drop-shadow-[0_14px_18px_rgba(6,18,61,0.3)]"
                      />
                    </div>
                  </div>
                  <p className="relative px-3 pt-1 pb-3 font-display text-lg uppercase sm:px-5 sm:pb-5 sm:text-3xl">
                    {t(`items.${key}`)}
                  </p>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
