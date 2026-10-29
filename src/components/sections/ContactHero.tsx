"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { LuArrowUpRight, LuPhone } from "react-icons/lu";
import { IceBackdrop } from "@/components/effects/IceBackdrop";
import { Button } from "@/components/ui/Button";
import { RevealText } from "@/components/ui/RevealText";
import { SITE, whatsappUrl } from "@/config/site";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { useSiteReady } from "@/lib/site-ready";

const field =
  "text-navy-900 mt-2 w-full rounded-xl border border-navy-900/20 bg-white px-4 py-3 placeholder:text-navy-900/40";

export function ContactHero() {
  const t = useTranslations("Contact");
  const ready = useSiteReady();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const channels = [
    {
      key: "whatsapp",
      Icon: FaWhatsapp,
      href: whatsappUrl(),
      detail: t("channels.whatsappDetail"),
    },
    { key: "sac", Icon: LuPhone, href: SITE.sac.href, detail: SITE.sac.label },
    {
      key: "instagram",
      Icon: FaInstagram,
      href: SITE.social.instagram,
      detail: "@contizerograu",
    },
    {
      key: "facebook",
      Icon: FaFacebookF,
      href: SITE.social.facebook,
      detail: t("channels.facebookDetail"),
    },
  ];

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const text = t("form.template", { name: name.trim(), message: message.trim() });
    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
  };

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 32 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, ease: EASE_OUT_EXPO, delay },
  });

  return (
    <section className="relative overflow-hidden bg-navy-950">
      <IceBackdrop
        imageClassName="opacity-60"
        overlayClassName="bg-[linear-gradient(180deg,rgba(6,18,61,.7),rgba(6,18,61,.92))]"
      />

      <div className="relative mx-auto grid min-h-svh max-w-7xl items-center gap-12 px-5 pt-32 pb-20 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="font-display text-headline uppercase">
            <RevealText text={t("title")} delay={0.4} />
          </h1>
          <p className="mt-5 max-w-md text-lg text-ice-100">{t("body")}</p>

          <ul className="mt-10 divide-y divide-white/15 border-y border-white/15">
            {channels.map(({ key, Icon, href, detail }, i) => (
              <motion.li key={key} {...enter(0.9 + i * 0.08)}>
                <a
                  href={href}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-center gap-4 py-5 transition-colors hover:bg-white/5 sm:px-2"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/40 transition-colors group-hover:border-sun-400 group-hover:text-sun-400">
                    <Icon size={20} aria-hidden />
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-2xl uppercase">
                      {t(`channels.${key}`)}
                    </span>
                    <span className="text-ice-100">{detail}</span>
                  </span>
                  <LuArrowUpRight
                    size={22}
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.form
          {...enter(1.1)}
          onSubmit={onSubmit}
          className="rounded-3xl bg-white p-6 text-navy-900 shadow-2xl sm:p-8"
        >
          <h2 className="font-display text-title uppercase">{t("form.title")}</h2>

          <label
            htmlFor="contact-name"
            className="mt-6 block text-sm font-bold tracking-wider uppercase"
          >
            {t("form.name")}
          </label>
          <input
            id="contact-name"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={field}
          />

          <label
            htmlFor="contact-message"
            className="mt-5 block text-sm font-bold tracking-wider uppercase"
          >
            {t("form.message")}
          </label>
          <textarea
            id="contact-message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={field}
          />

          <div className="mt-6">
            <Button type="submit" variant="dark" arrow>
              {t("form.submit")}
            </Button>
          </div>
          <p className="mt-4 text-sm text-navy-900/60">{t("form.hint")}</p>
        </motion.form>
      </div>
    </section>
  );
}
