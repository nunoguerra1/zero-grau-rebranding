"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { LuMenu, LuX } from "react-icons/lu";
import { Logo } from "@/components/brand/Logo";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { NAV_ITEMS } from "@/config/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { EASE_IN_OUT, EASE_OUT_EXPO, STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const { setLocked } = useSmoothScroll();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    setLocked(true, "menu");
    return () => setLocked(false, "menu");
  }, [open, setLocked]);

  return (
    <>
      <a
        href="#content"
        className="fixed top-3 left-3 z-[110] -translate-y-20 rounded-md bg-sun-400 px-4 py-2 font-semibold text-navy-950 focus:translate-y-0"
      >
        {t("skip")}
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[background-color,padding] duration-500",
          scrolled || open ? "bg-navy-950/85 py-3 backdrop-blur-md" : "py-5",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" aria-label={t("homeAria")} onClick={() => setOpen(false)}>
            <Logo className="text-3xl sm:text-4xl" />
          </Link>

          <nav aria-label={t("label")} className="hidden items-center gap-8 xl:flex">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative py-1 text-sm font-semibold tracking-wider uppercase transition-colors",
                    active ? "text-white" : "text-white/80 hover:text-white",
                  )}
                >
                  {t(item.key)}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-1 h-0.5 bg-sun-400"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <LocaleSwitcher />
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t("close") : t("menu")}
              onClick={() => setOpen((v) => !v)}
              className="grid size-11 place-items-center rounded-full border border-white/25 xl:hidden"
            >
              {open ? <LuX size={22} /> : <LuMenu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-30 flex flex-col justify-center bg-ice-dark px-8 xl:hidden"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: EASE_IN_OUT }}
          >
            <nav aria-label={t("label")}>
              <ul className="flex flex-col gap-2">
                {NAV_ITEMS.map((item, i) => (
                  <li key={item.key} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{
                        y: 0,
                        transition: {
                          duration: 0.6,
                          ease: EASE_OUT_EXPO,
                          delay: 0.2 + i * STAGGER.base,
                        },
                      }}
                      exit={{ y: "110%", transition: { duration: 0.25 } }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block font-display text-5xl leading-[1.15] uppercase sm:text-6xl",
                          pathname === item.href ? "text-sun-400" : "text-white",
                        )}
                      >
                        {t(item.key)}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
