import { useSyncExternalStore } from "react";

type Flag = "preloader" | "age";

const state: Record<Flag, boolean> = { preloader: false, age: false };
const listeners = new Set<() => void>();
let snapshot = false;

export function markReady(flag: Flag) {
  state[flag] = true;
  const next = state.preloader && state.age;
  if (next === snapshot) return;
  snapshot = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useSiteReady() {
  return useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => false,
  );
}
