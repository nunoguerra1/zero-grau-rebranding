"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    type ReactNode,
} from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type SmoothScrollContextValue = { setLocked: (locked: boolean) => void };

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
    setLocked: () => { },
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);
    const lockedRef = useRef(false);
    const pathname = usePathname();
    const previousPathname = useRef(pathname);

    const setLocked = useCallback((locked: boolean) => {
        lockedRef.current = locked;
        if (locked) lenisRef.current?.stop();
        else lenisRef.current?.start();
        document.documentElement.style.overflow = locked ? "hidden" : "";
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
        lenisRef.current = lenis;
        if (lockedRef.current) lenis.stop();

        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        document.fonts.ready.then(() => ScrollTrigger.refresh());

        return () => {
            gsap.ticker.remove(tick);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (previousPathname.current === pathname) return;
        previousPathname.current = pathname;
        lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    }, [pathname]);

    const value = useMemo(() => ({ setLocked }), [setLocked]);

    return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
}