export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90] opacity-[0.06] mix-blend-overlay"
    >
      <svg width="100%" height="100%">
        <filter id="zg-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#zg-grain)" />
      </svg>
    </div>
  );
}
