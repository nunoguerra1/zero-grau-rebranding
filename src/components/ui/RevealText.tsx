"use client";

import { motion } from "framer-motion";
import { DURATION, EASE_OUT_EXPO, STAGGER } from "@/lib/motion";
import { useSiteReady } from "@/lib/site-ready";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  trigger?: "ready" | "view";
};

const container = (delay: number) => ({
  hidden: {},
  show: { transition: { staggerChildren: STAGGER.base, delayChildren: delay } },
});

const word = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO } },
};

export function RevealText({ text, className, delay = 0, trigger = "ready" }: Props) {
  const ready = useSiteReady();

  const motionProps =
    trigger === "ready"
      ? { initial: "hidden", animate: ready ? "show" : "hidden" }
      : { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.6 } };

  return (
    <motion.span
      className={cn("block", className)}
      variants={container(delay)}
      {...motionProps}
    >
      <span className="sr-only">{text}</span>
      {text.split(" ").map((w, i) => (
        <span
          key={i}
          aria-hidden
          className="mr-[0.25em] -mb-[0.1em] inline-block overflow-hidden py-[0.1em] align-bottom last:mr-0"
        >
          <motion.span className="inline-block" variants={word}>
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
