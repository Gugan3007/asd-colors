"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "@studio-freight/lenis";
import { useGlobalStore } from "@/store/useGlobalStore";

interface LenisProviderProps {
    children: ReactNode;
}

/**
 * Wraps the entire app in a Lenis smooth-scroll instance.
 * Syncs scroll position into Zustand for scroll-aware components.
 * 
 * Performance: Throttles Zustand updates to avoid re-renders on every frame.
 */
export default function LenisProvider({ children }: LenisProviderProps) {
    const lenisRef = useRef<Lenis | null>(null);
    const setScrollY = useGlobalStore((s) => s.setScrollY);
    const lastUpdate = useRef(0);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.0,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
        });

        lenisRef.current = lenis;

        // Throttle Zustand updates to ~30fps instead of every frame
        lenis.on("scroll", ({ scroll }: { scroll: number }) => {
            const now = performance.now();
            if (now - lastUpdate.current > 33) {
                lastUpdate.current = now;
                setScrollY(scroll);
            }
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, [setScrollY]);

    return <>{children}</>;
}
