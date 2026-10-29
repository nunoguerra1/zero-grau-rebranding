import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "pt"],
  defaultLocale: "es",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/productos": { es: "/productos", pt: "/produtos" },
    "/retornables": { es: "/retornables", pt: "/retornaveis" },
    "/casa-di-conti": "/casa-di-conti",
    "/donde-comprar": { es: "/donde-comprar", pt: "/onde-comprar" },
    "/contacto": { es: "/contacto", pt: "/contato" },
  },
});
