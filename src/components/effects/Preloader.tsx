"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/brand/Logo";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { EASE_IN_OUT, EASE_OUT_EXPO } from "@/lib/motion";

const SESSION_KEY = "zero-grau:preloaded";
const MIN_DURATION = 1900;

const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);

function whenReady() {
  const loaded =
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise<void>((resolve) =>
          window.addEventListener("load", () => resolve(), { once: true }),
        );
  return Promise.all([loaded, document.fonts.ready]);
}

export function Preloader() {
  const t = useTranslations("Preloader");
  const { setLocked } = useSmoothScroll();
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const skip =
      sessionStorage.getItem(SESSION_KEY) === "1" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = skip ? 0 : MIN_DURATION;

    let ready = false;
    let cancelled = false;
    let raf = 0;
    const start = performance.now();

    setLocked(true);
    whenReady().then(() => {
      ready = true;
    });

    const tick = (now: number) => {
      if (cancelled) return;
      const p = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
      const value = Math.round(easeOutCubic(p) * 100);

      if (p >= 1 && (ready || skip)) {
        sessionStorage.setItem(SESSION_KEY, "1");
        setProgress(100);
        setVisible(false);
        setLocked(false);
        return;
      }

      setProgress(Math.min(value, 99));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      setLocked(false);
    };
  }, [setLocked]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          role="status"
          aria-label="Carregando página"
          className="fixed inset-0 z-[100]"
        >
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-navy-950"
            exit={{
              y: "-100%",
              transition: { duration: 1, ease: EASE_IN_OUT, delay: 0.35 },
            }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-navy-950"
            exit={{
              y: "100%",
              transition: { duration: 1, ease: EASE_IN_OUT, delay: 0.35 },
            }}
          />
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-8"
            exit={{
              opacity: 0,
              scale: 1.08,
              transition: { duration: 0.45, ease: EASE_OUT_EXPO },
            }}
          >
            <Logo className="text-6xl sm:text-8xl" />
            <div className="w-48 sm:w-72">
              <div className="h-px w-full bg-white/20">
                <div
                  className="h-full origin-left bg-sun-400"
                  style={{ transform: `scaleX(${progress / 100})` }}
                />
              </div>
              <p className="mt-3 text-center text-sm tracking-[0.3em] text-ice-200 tabular-nums">
                {String(progress).padStart(3, "0")}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
