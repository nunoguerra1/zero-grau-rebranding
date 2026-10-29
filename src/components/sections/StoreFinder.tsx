"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { LuMapPin } from "react-icons/lu";
import { STORES } from "@/config/site";

export function StoreFinder() {
  const t = useTranslations("Where.stores");
  const [region, setRegion] = useState("all");
  const regions = useMemo(() => [...new Set(STORES.map((s) => s.region))], []);

  if (STORES.length === 0) return null;

  const list = region === "all" ? STORES : STORES.filter((s) => s.region === region);

  return (
    <section aria-labelledby="stores-title" className="bg-navy-950 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 id="stores-title" className="font-display text-headline uppercase">
          {t("title")}
        </h2>

        <label className="mt-8 block max-w-xs">
          <span className="text-sm font-bold tracking-widest text-ice-200 uppercase">
            {t("region")}
          </span>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="mt-2 w-full rounded-xl bg-white px-4 py-3 text-navy-900"
          >
            <option value="all">{t("all")}</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <li
              key={`${s.name}-${s.city}`}
              className="rounded-3xl border border-white/15 bg-white/5 p-6"
            >
              <p className="font-display text-3xl uppercase">{s.name}</p>
              <p className="mt-1 text-ice-100">
                {s.city} · {s.region}
              </p>
              {s.address && <p className="mt-1 text-white/70">{s.address}</p>}
              {s.mapsUrl && (
                <a
                  href={s.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 font-semibold text-sun-400 hover:underline"
                >
                  <LuMapPin aria-hidden /> {t("map")}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
