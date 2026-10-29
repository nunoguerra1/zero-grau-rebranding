"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("LocaleSwitcher");
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={cn(
        "flex items-center gap-1 rounded-full border border-white/25 p-1",
        className,
      )}
    >
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-pressed={l === locale}
          onClick={() => router.replace(pathname, { locale: l })}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-bold tracking-widest transition-colors",
            l === locale ? "bg-sun-400 text-navy-950" : "text-white/80 hover:text-white",
          )}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
