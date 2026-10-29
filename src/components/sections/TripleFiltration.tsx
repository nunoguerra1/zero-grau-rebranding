"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import { IceBackdrop } from "../effects/IceBackdrop";

const STEPS = ["one", "two", "three"] as const;
const START_TEMP = 24;

export function TripleFiltration() {
  const t = useTranslations("Triple");
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const steps = gsap.utils.toArray<HTMLElement>(".triple-step");
        const temperature = { value: START_TEMP };
        if (counterRef.current) counterRef.current.textContent = String(START_TEMP);

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 2.5}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          sectionRef.current,
          { backgroundColor: "#effaff", color: "#0b2270" },
          { backgroundColor: "#0b2270", color: "#ffffff", duration: 1 },
          0,
        )
          .to(
            temperature,
            {
              value: 0,
              duration: 1,
              onUpdate: () => {
                if (counterRef.current) {
                  counterRef.current.textContent = String(Math.round(temperature.value));
                }
              },
            },
            0,
          )
          .fromTo(
            ".triple-aura",
            { scale: 0.5, opacity: 0 },
            { scale: 1.15, opacity: 1, duration: 1 },
            0,
          )
          .fromTo(".triple-frost", { opacity: 0 }, { opacity: 0.55, duration: 0.8 }, 0.2)
          .fromTo(
            ".triple-can",
            { yPercent: 6, rotate: -6 },
            { yPercent: -4, rotate: 4, duration: 1 },
            0,
          )
          .fromTo(".triple-progress", { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0)
          .fromTo(".triple-ice", { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0.2);

        steps.forEach((step, i) => {
          if (i === 0) gsap.set(step, { autoAlpha: 1 });
          else
            tl.fromTo(
              step,
              { autoAlpha: 0, y: 24 },
              { autoAlpha: 1, y: 0, duration: 0.1 },
              i / 3,
            );

          if (i < steps.length - 1) {
            tl.to(step, { autoAlpha: 0, y: -24, duration: 0.1 }, (i + 1) / 3 - 0.1);
          }
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="triple-title"
      className="relative flex h-svh items-center overflow-hidden bg-ice-50 text-navy-900 motion-reduce:h-auto motion-reduce:bg-navy-900 motion-reduce:py-24 motion-reduce:text-white"
    >
      <IceBackdrop
        className="triple-ice inset-0 opacity-0 motion-reduce:opacity-100"
        overlayClassName="bg-navy-950/55"
      />
      <div className="over relative z-10 mx-auto grid w-full max-w-7xl items-center gap-2 px-5 pt-20 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:pt-16">
        <div className="order-2 lg:order-1">
          <h2 id="triple-title" className="font-display text-title uppercase">
            {t("title")}
          </h2>

          <p
            aria-hidden
            className="font-display text-[clamp(6rem,26vw,16rem)] leading-none tabular-nums"
          >
            <span ref={counterRef}>0</span>
            <span className="text-brand-sky">°</span>
          </p>
          <p className="-mt-1 text-sm font-semibold tracking-widest uppercase opacity-70 lg:text-base">
            {t("caption")}
          </p>

          <div className="relative mt-5 grid motion-reduce:flex motion-reduce:flex-col motion-reduce:gap-6">
            {STEPS.map((key, i) => (
              <div
                key={key}
                className="triple-step [grid-area:1/1] motion-reduce:[grid-area:auto]"
              >
                <p className="font-display text-2xl text-brand-sky">0{i + 1}</p>
                <h3 className="font-display text-title uppercase">
                  {t(`steps.${key}.title`)}
                </h3>
                <p className="mt-1 max-w-md opacity-90">{t(`steps.${key}.body`)}</p>
              </div>
            ))}
          </div>

          <div
            aria-hidden
            className="mt-6 h-1 w-full max-w-md bg-current/15 motion-reduce:hidden"
          >
            <div
              className="triple-progress h-full origin-left bg-brand-sky"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>

        <div className="relative order-1 mx-auto h-[30svh] w-full max-w-sm lg:order-2 lg:h-[64svh]">
          <div className="triple-aura absolute inset-0 m-auto size-[110%] bg-[radial-gradient(closest-side,rgba(24,197,232,0.6),transparent)]" />
          <Image
            src="/products/zero-grau-350ml.png"
            alt={t("canAlt")}
            fill
            sizes="(min-width: 1024px) 30vw, 60vw"
            className="triple-can object-contain drop-shadow-[0_25px_50px_rgba(6,18,61,0.4)]"
          />
          <div className="triple-frost pointer-events-none absolute inset-[6%] bg-[radial-gradient(closest-side_at_50%_35%,rgba(255,255,255,0.85),rgba(169,230,250,0.35)_55%,transparent)] opacity-0 mix-blend-screen blur-md motion-reduce:opacity-40" />
        </div>
      </div>
    </section>
  );
}
