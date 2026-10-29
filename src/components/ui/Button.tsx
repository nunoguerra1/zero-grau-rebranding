"use client";

import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "ghost";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 text-base font-bold tracking-wide transition-colors";

const variants: Record<Variant, string> = {
  primary: "bg-sun-400 text-navy-950 hover:bg-sun-300",
  ghost: "border border-white/40 text-white hover:bg-white/10",
};

type AsLink = { href: ComponentProps<typeof Link>["href"]; onClick?: never };
type AsButton = { href?: never; onClick?: () => void };

type Props = { variant?: Variant; children: ReactNode; className?: string } & (
  AsLink | AsButton
);

export function Button({
  variant = "primary",
  children,
  className,
  href,
  onClick,
}: Props) {
  const classes = cn(base, variants[variant], className);

  return (
    <Magnetic>
      {href !== undefined ? (
        <Link href={href} className={classes}>
          {children}
        </Link>
      ) : (
        <button type="button" onClick={onClick} className={classes}>
          {children}
        </button>
      )}
    </Magnetic>
  );
}
