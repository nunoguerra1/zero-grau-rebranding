"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  type PanInfo,
  type Variants,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { IceBackdrop } from "@/components/effects/IceBackdrop";
import { Button } from "@/components/ui/Button";
import { PRODUCTS, photoSrc } from "@/config/products";
import { EASE_IN_OUT, EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

const PRODUCT_SIZES = "(min-width: 1024px) 36vw, 80vw";
const PHOTO_SIZES = "(min-width: 1024px) 46vw, 100vw";

type SwapCustom = { dir: number; delay: number };

const productMotion: Variants = {
  enter: (dir: number) => ({ y: "55%", rotate: dir * 24, opacity: 0, scale: 0.9 }),
  center: {
    y: 0,
    rotate: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease: EASE_OUT_EXPO },
  },
  exit: (dir: number) => ({
    y: "60%",
    rotate: dir * -14,
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.6, ease: EASE_IN_OUT },
  }),
};

const ghostMotion: Variants = {
  enter: (dir: number) => ({ x: dir * 80, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 1, ease: EASE_OUT_EXPO } },
  exit: (dir: number) => ({
    x: dir * -80,
    opacity: 0,
    transition: { duration: 0.4, ease: EASE_IN_OUT },
  }),
};

const swapMotion: Variants = {
  enter: ({ dir }: SwapCustom) => ({ y: dir > 0 ? "108%" : "-108%" }),
  center: ({ delay }: SwapCustom) => ({
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO, delay },
  }),
  exit: ({ dir }: SwapCustom) => ({
    y: dir > 0 ? "-108%" : "108%",
    transition: { duration: 0.35, ease: EASE_IN_OUT },
  }),
};

const fadeMotion: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

function Swap({
  id,
  dir,
  delay = 0,
  variants,
  className,
  children,
}: {
  id: string;
  dir: number;
  delay?: number;
  variants: Variants;
  className?: string;
  children: ReactNode;
}) {
  const custom: SwapCustom = { dir, delay };

  return (
    <span className="-my-[0.06em] block overflow-hidden py-[0.06em]">
      <AnimatePresence mode="wait" initial={false} custom={custom}>
        <motion.span
          key={id}
          custom={custom}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className={cn("block", className)}
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function ProductSwitcher({ asPage = false }: { asPage?: boolean }) {
  const t = useTranslations("Products");
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });
  const nearView = useInView(sectionRef, { margin: "800px 0px", once: true });

  const [[index, direction], setPage] = useState<[number, number]>([0, 1]);
  const [swaps, setSwaps] = useState(0);
  const lastChange = useRef(-Infinity);

  const total = PRODUCTS.length;
  const product = PRODUCTS[index];
  const Heading = asPage ? "h1" : "h2";

  const productVariants = reduce ? fadeMotion : productMotion;
  const ghostVariants = reduce ? fadeMotion : ghostMotion;
  const textVariants = reduce ? fadeMotion : swapMotion;

  const canChange = useCallback(() => {
    const now = performance.now();
    if (now - lastChange.current < 700) return false;
    lastChange.current = now;
    return true;
  }, []);

  const paginate = useCallback(
    (dir: number) => {
      if (!canChange()) return;
      setPage(([i]) => [(i + dir + total) % total, dir]);
      setSwaps((n) => n + 1);
    },
    [canChange, total],
  );

  const jumpTo = (i: number) => {
    if (i === index || !canChange()) return;
    setPage([i, i > index ? 1 : -1]);
    setSwaps((n) => n + 1);
  };

  useEffect(() => {
    if (!inView) return;

    const onKey = (event: KeyboardEvent) => {
      const el = event.target as HTMLElement | null;
      if (
        el &&
        (el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName))
      ) {
        return;
      }
      if (event.key === "ArrowRight") paginate(1);
      if (event.key === "ArrowLeft") paginate(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inView, paginate]);

  const onPanEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { x, y } = info.offset;
    if (Math.abs(x) < 60 || Math.abs(x) < Math.abs(y) * 1.2) return;
    paginate(x < 0 ? 1 : -1);
  };

  const meta = [
    t(`formats.${product.format}`),
    t("category"),
    t("abv"),
    ...(product.returnable ? [t("returnable")] : []),
  ].join(" · ");

  return (
    <motion.section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label={t("label")}
      onPanEnd={onPanEnd}
      style={{ touchAction: "pan-y" }}
      className="relative min-h-svh overflow-hidden bg-navy-950 text-white"
    >
      <IceBackdrop imageClassName="opacity-80" />
      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-90"
        initial={false}
        animate={{ backgroundColor: product.tone }}
        transition={{ duration: reduce ? 0.3 : 1.1, ease: EASE_IN_OUT }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(70%_60%_at_60%_45%,rgba(24,197,232,0.22),transparent_70%)]"
      />

      <div
        aria-hidden
        className="absolute top-0 right-0 z-[2] h-[58svh] w-full [mask-image:linear-gradient(to_bottom,black_60%,transparent)] lg:inset-y-0 lg:h-auto lg:w-[46%] lg:[mask-image:linear-gradient(to_right,transparent,black_32%)]"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={photoSrc(product.photo)}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: reduce ? 1 : 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.3 : 1.2, ease: EASE_OUT_EXPO }}
          >
            <Image
              src={photoSrc(product.photo)}
              alt=""
              fill
              sizes={PHOTO_SIZES}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-[9svh] z-[4] h-[48svh] lg:inset-y-0 lg:right-auto lg:left-[34%] lg:h-auto lg:w-[40%]">
        <div className="absolute inset-0 flex items-center justify-center lg:inset-y-[12svh]">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.span
              key={product.id}
              custom={direction}
              variants={ghostVariants}
              initial="enter"
              animate="center"
              exit="exit"
              aria-hidden
              className="font-display text-[44vw] leading-none text-white/[0.09] select-none lg:text-[24vw]"
            >
              {product.volume}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="absolute inset-x-0 top-0 bottom-0 lg:top-[13svh] lg:bottom-[9svh]">
          <div
            aria-hidden
            className="absolute inset-x-[18%] bottom-0 h-5 translate-y-1/2 rounded-[50%] bg-black/45 blur-xl"
          />
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={product.id}
              custom={direction}
              variants={productVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <div
                className="absolute inset-x-0 bottom-0"
                style={{ height: `${product.scale * 100}%` }}
              >
                <Image
                  src={product.src}
                  alt={t("alt", {
                    format: t(`formats.${product.format}`),
                    volume: product.volume,
                  })}
                  fill
                  sizes={PRODUCT_SIZES}
                  className="object-contain object-bottom drop-shadow-[0_30px_50px_rgba(0,0,0,0.45)]"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {swaps > 0 && !reduce && (
        <motion.div
          key={swaps}
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-[6] w-[70%] bg-[linear-gradient(90deg,transparent,rgba(214,243,253,0.5),transparent)] blur-2xl"
          initial={{ x: direction > 0 ? "-100%" : "200%" }}
          animate={{ x: direction > 0 ? "200%" : "-100%" }}
          transition={{ duration: 1.2, ease: EASE_IN_OUT }}
        />
      )}

      <div className="relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col justify-end px-5 pt-[58svh] pb-12 sm:px-8 lg:justify-center lg:pt-28 lg:pb-16">
        <div className="max-w-xl lg:max-w-md">
          <p className="sr-only" aria-live="polite">
            {t("announce", { volume: product.volume, current: index + 1, total })}
          </p>

          <Heading className="text-sm font-bold tracking-[0.25em] text-ice-200 uppercase">
            {t("title")}
          </Heading>

          <p className="mt-4 text-sm font-semibold tracking-widest text-sun-400 uppercase">
            <Swap id={`${product.id}-meta`} dir={direction} variants={textVariants}>
              {meta}
            </Swap>
          </p>

          <p className="mt-1 font-display text-headline uppercase">
            <Swap
              id={`${product.id}-vol`}
              dir={direction}
              delay={0.08}
              variants={textVariants}
            >
              {product.volume} <span className="text-sun-400">ml</span>
            </Swap>
          </p>

          <div className="mt-4 min-h-[5.5rem] sm:min-h-[4.5rem]">
            <Swap
              id={`${product.id}-desc`}
              dir={direction}
              delay={0.16}
              variants={textVariants}
            >
              <span className="text-ice-100">{t(`items.${product.id}.description`)}</span>
            </Swap>
          </div>

          <div className="mt-8">
            <Button href="/donde-comprar" arrow>
              {t("cta")}
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label={t("prev")}
              className="grid size-12 place-items-center rounded-full border border-white/40 transition-colors hover:bg-white hover:text-navy-950"
            >
              <LuArrowLeft size={20} aria-hidden />
            </button>

            <div className="flex items-center">
              {PRODUCTS.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => jumpTo(i)}
                  aria-label={t("goTo", { n: i + 1 })}
                  aria-current={i === index}
                  className="flex h-11 items-center px-1"
                >
                  <motion.span
                    className={cn(
                      "block h-1 rounded-full transition-colors",
                      i === index ? "bg-sun-400" : "bg-white/35",
                    )}
                    initial={false}
                    animate={{ width: i === index ? 40 : 18 }}
                    transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label={t("next")}
              className="grid size-12 place-items-center rounded-full border border-white/40 transition-colors hover:bg-white hover:text-navy-950"
            >
              <LuArrowRight size={20} aria-hidden />
            </button>

            <span className="ml-1 text-sm tracking-widest text-white/70 tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {nearView && (
        <div
          aria-hidden
          className="pointer-events-none absolute size-0 overflow-hidden opacity-0"
        >
          {PRODUCTS.map((p) => (
            <Image
              key={p.id}
              src={p.src}
              alt=""
              fill
              sizes={PRODUCT_SIZES}
              loading="eager"
            />
          ))}
          {[...new Set(PRODUCTS.map((p) => photoSrc(p.photo)))].map((src) => (
            <Image key={src} src={src} alt="" fill sizes={PHOTO_SIZES} loading="eager" />
          ))}
        </div>
      )}
    </motion.section>
  );
}
