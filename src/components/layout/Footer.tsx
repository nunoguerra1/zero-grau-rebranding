import { useTranslations } from "next-intl";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { Logo } from "@/components/brand/Logo";
import { NAV_ITEMS } from "@/config/navigation";
import { SITE, whatsappUrl } from "@/config/site";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");

  const social = [
    { label: "WhatsApp", href: whatsappUrl(), Icon: FaWhatsapp },
    { label: "Instagram", href: SITE.social.instagram, Icon: FaInstagram },
    { label: "Facebook", href: SITE.social.facebook, Icon: FaFacebookF },
  ];

  return (
    <footer className="border-t border-white/10 bg-navy-950">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-5">
          <Logo className="w-32" />
          <p className="max-w-sm text-ice-100">{t("tagline")}</p>
        </div>

        <nav aria-label={t("navigation")}>
          <h2 className="mb-4 text-sm font-bold tracking-widest text-sun-400 uppercase">
            {t("navigation")}
          </h2>
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-white/80 transition-colors hover:text-white"
                >
                  {nav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-sm font-bold tracking-widest text-sun-400 uppercase">
            {t("contact")}
          </h2>
          <p className="text-white/80">
            SAC:{" "}
            <a href={SITE.sac.href} className="font-semibold text-white hover:underline">
              {SITE.sac.label}
            </a>
          </p>
          <ul className="mt-5 flex gap-3">
            {social.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-11 place-items-center rounded-full border border-white/25 transition-colors hover:bg-sun-400 hover:text-navy-950"
                >
                  <Icon size={18} aria-hidden />
                  <span className="sr-only">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-6 text-center text-sm text-white/60 sm:px-8">
        <p>{t("legal")}</p>
        <p className="mt-1">{t("credit")}</p>
      </div>
    </footer>
  );
}
