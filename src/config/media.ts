export type HeroVideo = { src: string; poster?: string } | null;

export const HERO_VIDEO: HeroVideo = {
  src: "/video/zero-grau-comercial.mp4",
  poster: "/video/poster.jpg", // Opcional: se não tiver poster, você pode apagar esta linha
};

export const ICE = { src: "/textures/ice.jpg", width: 1717, height: 2576 } as const;

export const PHOTOS = {
  poolTable: { src: "/photos/pool-table-1l.jpg", width: 1638, height: 2048 },
  shelf: { src: "/photos/shelf-350ml.jpg", width: 1638, height: 2048 },
  toastTable: { src: "/photos/toast-table-473ml.jpg", width: 1638, height: 2048 },
  iceCooler: { src: "/photos/ice-cooler-473ml.jpg", width: 1080, height: 1920 },
  canFrosted: { src: "/photos/can-frosted-glass-269ml.jpg", width: 1080, height: 1920 },
  toastPalms: { src: "/photos/toast-palms-269ml.jpg", width: 720, height: 1280 },
  pour: { src: "/photos/pour-1l.jpg", width: 1080, height: 1920 },
} as const;

export type PhotoKey = keyof typeof PHOTOS;
