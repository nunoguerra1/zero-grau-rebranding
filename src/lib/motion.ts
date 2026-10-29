export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const DURATION = {
    fast: 0.35,
    base: 0.6,
    slow: 1,
    cinematic: 1.4,
} as const;

export const STAGGER = {
    tight: 0.05,
    base: 0.08,
    loose: 0.15,
} as const;