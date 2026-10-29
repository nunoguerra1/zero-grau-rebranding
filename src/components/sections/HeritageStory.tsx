"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { LuFactory, LuGrape, LuHardHat, LuWheat } from "react-icons/lu";
import { RevealText } from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";
import { DURATION, EASE_OUT_EXPO } from "@/lib/motion";

const FOUNDED = 1947;
const YEARS = new Date().getFullYear() - FOUNDED;

const EMBLEM = [
  { key: "vine", Icon: LuGrape },
  { key: "grain", Icon: LuWheat },
  { key: "work", Icon: LuHardHat },
  { key: "industry", Icon: LuFactory },
] as const;

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!reduceMotion && ref.current) ref.current.textContent = "0";
  }, [reduceMotion]);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, to, {
      duration: 2.2,
      ease: EASE_OUT_EXPO,
      onUpdate: (value) => {
        if (ref.current) ref.current.textContent = String(Math.round(value));
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, to]);

  return <span ref={ref}>{to}</span>;
}

export function HeritageStory() {
  const t = useTranslations("Heritage");
  const reduceMotion = useReducedMotion();

  return (
    <>
      <section
        aria-labelledby="heritage-years"
        className="bg-ice-light py-24 text-navy-900 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-end gap-8 lg:grid-cols-[auto_1fr] lg:gap-20">
            <p
              id="heritage-years"
              className="font-display text-[clamp(8rem,28vw,20rem)] leading-[0.85] tabular-nums"
            >
              <CountUp to={YEARS} />
            </p>
            <div className="pb-2 lg:pb-6">
              <p className="font-display text-title uppercase">{t("yearsLabel")}</p>
              <p className="mt-4 max-w-md text-lg text-navy-900/80">{t("yearsBody")}</p>
            </div>
          </div>

          <h2 className="mt-20 font-display text-headline uppercase lg:mt-28">
            <RevealText text={t("emblemTitle")} trigger="view" />
          </h2>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {EMBLEM.map(({ key, Icon }, i) => (
              <motion.li
                key={key}
                className="rounded-3xl bg-white p-6 ring-1 ring-navy-900/10"
                initial={reduceMotion ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: DURATION.slow,
                  ease: EASE_OUT_EXPO,
                  delay: i * 0.08,
                }}
              >
                <span className="grid size-14 place-items-center rounded-full bg-navy-900 text-sun-400">
                  <Icon size={26} aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-3xl uppercase">
                  {t(`emblem.${key}.title`)}
                </h3>
                <p className="mt-2 text-navy-900/75">{t(`emblem.${key}.body`)}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ice-dark py-24 text-center lg:py-32">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <h2 className="font-display text-headline uppercase">
            <RevealText text={t("ctaTitle")} trigger="view" />
          </h2>
          <div className="mt-10">
            <Button href="/productos" arrow>
              {t("cta")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
