"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/brand/Logo";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { markReady } from "@/lib/site-ready";

const STORAGE_KEY = "zero-grau:age-verified";

type Status = "checking" | "required" | "denied" | "granted";

export function AgeGate() {
  const t = useTranslations("AgeGate");
  const { setLocked } = useSmoothScroll();
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    let verified = false;
    try {
      verified = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // storage can be unavailable (private mode); ask every time
    }
    setStatus(verified ? "granted" : "required");
  }, []);

  useEffect(() => {
    if (status === "granted") markReady("age");
  }, [status]);

  const blocking = status === "required" || status === "denied";

  useEffect(() => {
    if (!blocking) return;
    setLocked(true, "age-gate");
    return () => setLocked(false, "age-gate");
  }, [blocking, setLocked]);

  const confirm = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setStatus("granted");
  };

  return (
    <AnimatePresence>
      {blocking && (
        <motion.div
          key="age-gate"
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-gate-title"
          className="fixed inset-0 z-[95] flex items-center justify-center bg-ice-dark px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            transition: { duration: 0.6, ease: EASE_OUT_EXPO },
          }}
        >
          <div className="w-full max-w-lg text-center">
            <Logo className="text-6xl sm:text-7xl" />

            {status === "required" ? (
              <>
                <h2
                  id="age-gate-title"
                  className="mt-10 font-display text-title uppercase"
                >
                  {t("title")}
                </h2>
                <p className="mt-4 text-ice-100">{t("description")}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <button
                    type="button"
                    autoFocus
                    onClick={confirm}
                    className="min-h-12 rounded-full bg-sun-400 px-8 py-3 font-bold text-navy-950 transition-colors hover:bg-sun-300"
                  >
                    {t("confirm")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus("denied")}
                    className="min-h-12 rounded-full border border-white/40 px-8 py-3 font-semibold transition-colors hover:bg-white/10"
                  >
                    {t("deny")}
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2
                  id="age-gate-title"
                  className="mt-10 font-display text-title uppercase"
                >
                  {t("deniedTitle")}
                </h2>
                <p className="mt-4 text-ice-100">{t("deniedDescription")}</p>
                <button
                  type="button"
                  autoFocus
                  onClick={() => setStatus("required")}
                  className="mt-8 min-h-12 rounded-full border border-white/40 px-8 py-3 font-semibold transition-colors hover:bg-white/10"
                >
                  {t("back")}
                </button>
              </>
            )}

            <p className="mt-10 text-sm text-white/60">{t("responsible")}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
