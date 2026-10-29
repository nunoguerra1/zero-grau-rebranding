"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { LuPlay } from "react-icons/lu";
import { Button } from "@/components/ui/Button";
import { RevealText } from "@/components/ui/RevealText";
import { VideoDialog } from "@/components/ui/VideoDialog";
import { HERO_VIDEO } from "@/config/media";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { useSiteReady } from "@/lib/site-ready";

export function Hero() {
  const t = useTranslations("Hero");
  const ready = useSiteReady();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const scrollTrigger = {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        };
        gsap.to(productRef.current, {
          yPercent: 12,
          rotate: 5,
          ease: "none",
          scrollTrigger,
        });
        gsap.to(".hero-copy", {
          yPercent: -10,
          opacity: 0.25,
          ease: "none",
          scrollTrigger,
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative min-h-svh overflow-hidden bg-ice-dark">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-1/4 -left-1/4 h-3/4 w-[150%] animate-mist bg-[radial-gradient(ellipse_at_center,rgba(169,230,250,0.35),transparent_65%)] blur-3xl" />
        <div className="absolute -top-1/4 -right-1/4 h-2/3 w-[120%] animate-mist bg-[radial-gradient(ellipse_at_center,rgba(30,154,224,0.4),transparent_65%)] blur-3xl [animation-delay:-9s]" />
      </div>

      <div className="relative mx-auto grid min-h-svh max-w-7xl items-center gap-6 px-5 pt-28 pb-12 sm:px-8 lg:grid-cols-2 lg:gap-10">
        <div className="hero-copy relative z-10 text-center lg:text-left">
          <h1 className="font-display text-display uppercase">
            <RevealText text={t("title")} delay={0.5} />
          </h1>
          <p className="mt-2 font-display text-title text-sun-400 uppercase">
            <RevealText text={t("tagline")} delay={0.9} />
          </p>

          <motion.p
            className="mx-auto mt-6 max-w-lg text-ice-100 lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 1.3, duration: 0.8, ease: EASE_OUT_EXPO }}
          >
            {t("body")}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 1.5, duration: 0.8, ease: EASE_OUT_EXPO }}
          >
            <Button href="/productos" arrow>
              {t("ctaProducts")}
            </Button>
            {HERO_VIDEO && (
              <Button variant="ghost" onClick={() => setVideoOpen(true)}>
                <LuPlay aria-hidden size={18} />
                {t("ctaVideo")}
              </Button>
            )}
          </motion.div>
        </div>

        <div
          ref={productRef}
          className="relative mx-auto h-[52svh] w-full max-w-md lg:h-[78svh]"
        >
          <div className="absolute inset-0 m-auto size-[110%] bg-[radial-gradient(closest-side,rgba(24,197,232,0.4),transparent)]" />
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, y: 90, scale: 0.9 }}
            animate={ready ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={{ delay: 0.7, duration: 1.4, ease: EASE_OUT_EXPO }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ rotate: -10 }}
              animate={reduceMotion ? undefined : { y: [0, -14, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/products/zero-grau-600ml.png"
                alt={t("productAlt")}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 80vw"
                className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {HERO_VIDEO && (
        <VideoDialog
          open={videoOpen}
          onClose={() => setVideoOpen(false)}
          src={HERO_VIDEO.src}
          poster={HERO_VIDEO.poster}
          title={t("videoTitle")}
          closeLabel={t("closeVideo")}
        />
      )}
    </section>
  );
}
