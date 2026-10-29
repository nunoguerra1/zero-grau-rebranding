"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { IceBackdrop } from "@/components/effects/IceBackdrop";
import { Button } from "@/components/ui/Button";
import { RevealText } from "@/components/ui/RevealText";
import { gsap, useGSAP } from "@/lib/gsap";

const CANS = [
  {
    src: "/products/zero-grau-269ml.png",
    position: "left-[4%] w-[27%]",
    rotate: -12,
    height: "78%",
  },
  {
    src: "/products/zero-grau-473ml.png",
    position: "left-[32%] w-[36%]",
    rotate: 0,
    height: "100%",
  },
  {
    src: "/products/zero-grau-350ml.png",
    position: "right-[4%] w-[27%]",
    rotate: 12,
    height: "84%",
  },
];

export function ClosingCta() {
  const t = useTranslations("Closing");
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".closing-can").forEach((can, i) => {
          gsap.fromTo(
            can,
            { yPercent: 45 + i * 8, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                end: "center 55%",
                scrub: 0.6,
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
      aria-labelledby="closing-title"
      className="relative overflow-hidden bg-navy-950 pt-28 text-center lg:pt-40"
    >
      <IceBackdrop
        imageClassName="opacity-50"
        overlayClassName="bg-[radial-gradient(70%_60%_at_50%_60%,rgba(11,34,112,0.5),rgba(6,18,61,0.95))]"
      />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <h2 id="closing-title" className="font-display text-display uppercase">
          <RevealText text={t("line1")} trigger="view" />
          <RevealText
            text={t("line2")}
            trigger="view"
            delay={0.25}
            className="!text-title text-sun-400"
          />
        </h2>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/donde-comprar" arrow>
            {t("buy")}
          </Button>
          <Button href="/contacto" variant="ghost">
            {t("talk")}
          </Button>
        </div>
      </div>

      <div aria-hidden className="relative mx-auto mt-14 h-[38svh] w-full max-w-3xl">
        <div className="absolute inset-0 m-auto size-[110%] bg-[radial-gradient(closest-side,rgba(24,197,232,0.3),transparent)]" />
        {CANS.map((can) => (
          <div
            key={can.src}
            className={`closing-can absolute bottom-0 ${can.position}`}
            style={{ height: can.height }}
          >
            <div
              className="relative size-full"
              style={{
                transform: `rotate(${can.rotate}deg)`,
                transformOrigin: "50% 100%",
              }}
            >
              <Image
                src={can.src}
                alt=""
                fill
                sizes="(min-width: 768px) 280px, 30vw"
                className="object-contain object-bottom drop-shadow-[0_24px_36px_rgba(0,0,0,0.45)]"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
