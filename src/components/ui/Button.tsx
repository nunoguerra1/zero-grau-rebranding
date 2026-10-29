"use client";

import type { ComponentProps, ReactNode } from "react";
import { LuArrowRight } from "react-icons/lu";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "dark";

const base =
  "group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full px-7 py-3 text-sm font-bold tracking-[0.14em] uppercase transition-colors duration-300";

const variants: Record<Variant, { root: string; fill: string; content: string }> = {
  primary: { root: "bg-sun-400 text-navy-950", fill: "bg-white", content: "" },
  ghost: {
    root: "border border-white/40 text-white",
    fill: "bg-white",
    content: "group-hover:text-navy-950",
  },
  dark: {
    root: "bg-navy-900 text-white",
    fill: "bg-white",
    content: "group-hover:text-navy-950",
  },
};

type AsLink = {
  href: ComponentProps<typeof Link>["href"];
  externalHref?: never;
  onClick?: never;
  type?: never;
};
type AsAnchor = { externalHref: string; href?: never; onClick?: never; type?: never };
type AsButton = {
  href?: never;
  externalHref?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

type Props = {
  variant?: Variant;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
} & (AsLink | AsAnchor | AsButton);

export function Button({
  variant = "primary",
  arrow = false,
  children,
  className,
  href,
  externalHref,
  onClick,
  type = "button",
}: Props) {
  const v = variants[variant];
  const classes = cn(base, v.root, className);

  const inner = (
    <>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0",
          v.fill,
        )}
      />
      <span
        className={cn(
          "relative z-10 inline-flex items-center gap-3 transition-colors duration-300",
          v.content,
        )}
      >
        {children}
        {arrow && (
          <LuArrowRight
            aria-hidden
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        )}
      </span>
    </>
  );

  if (externalHref) {
    const isWeb = externalHref.startsWith("http");
    return (
      <a
        href={externalHref}
        {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={classes}
      >
        {inner}
      </a>
    );
  }

  if (href !== undefined) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}
