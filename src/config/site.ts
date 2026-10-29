export const SITE = {
  sac: { label: "0800-7079696", href: "tel:08007079696" },
  whatsapp: { phone: "5518998140770" },
  social: {
    instagram: "https://www.instagram.com/cervezazerograu_py/",
    facebook: "https://www.facebook.com/cervezazerograuparaguay/",
  },
} as const;

const WHATSAPP_MESSAGE =
  "Olá, seja bem-vindo(a)!\nSou a assistente virtual da Casa Di Conti! Envie sua mensagem. #contizerograu";

const TAG = "#contizerograu";

export function whatsappUrl(text?: string) {
  const message = text ? `${text} ${TAG}` : WHATSAPP_MESSAGE;
  return `https://api.whatsapp.com/send?phone=${SITE.whatsapp.phone}&text=${encodeURIComponent(message)}`;
}

export type Store = {
  name: string;
  city: string;
  region: string;
  address?: string;
  mapsUrl?: string;
};

export const STORES: Store[] = [];
