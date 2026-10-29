import { ICE, PHOTOS, type PhotoKey } from "./media";

export type Product = {
  /** Key used in the messages: Products.items.<id> */
  id: string;
  volume: number;
  format: "can" | "bottle";
  returnable?: boolean;
  src: string;
  /** Visual height relative to the stage (1 = tallest product). Tune if proportions look off. */
  scale: number;
  /** Background tone for this product (all dark enough for white text) */
  tone: string;
  /** Ambient photo shown beside the product */
  photo: PhotoKey | "ice";
};

export const PRODUCTS: Product[] = [
  {
    id: "p269",
    volume: 269,
    format: "can",
    src: "/products/zero-grau-269ml.png",
    scale: 0.7,
    tone: "#0b3a8f",
    photo: "canFrosted",
  },
  {
    id: "p350",
    volume: 350,
    format: "can",
    src: "/products/zero-grau-350ml.png",
    scale: 0.78,
    tone: "#0a58b5",
    photo: "shelf",
  },
  {
    id: "p473",
    volume: 473,
    format: "can",
    src: "/products/zero-grau-473ml.png",
    scale: 0.92,
    tone: "#0b2270",
    photo: "iceCooler",
  },
  {
    id: "p300",
    volume: 300,
    format: "bottle",
    src: "/products/zero-grau-300ml.png",
    scale: 0.86,
    tone: "#0a6fa8",
    photo: "ice",
  },
  {
    id: "p600",
    volume: 600,
    format: "bottle",
    returnable: true,
    src: "/products/zero-grau-600ml.png",
    scale: 1,
    tone: "#12318f",
    photo: "ice",
  },
];

export function photoSrc(photo: Product["photo"]) {
  return photo === "ice" ? ICE.src : PHOTOS[photo].src;
}
