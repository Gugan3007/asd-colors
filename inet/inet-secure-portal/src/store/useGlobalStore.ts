import { create } from "zustand";

interface GlobalState {
    // ── Navigation ──
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
    closeMobileMenu: () => void;

    // ── Modal ──
    activeModal: string | null;
    openModal: (id: string) => void;
    closeModal: () => void;

    // ── Scroll ──
    scrollY: number;
    setScrollY: (y: number) => void;
    isScrolled: boolean;

    // ── Loading ──
    isPageLoading: boolean;
    setPageLoading: (loading: boolean) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
    // Navigation
    isMobileMenuOpen: false,
    toggleMobileMenu: () =>
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
    closeMobileMenu: () => set({ isMobileMenuOpen: false }),

    // Modal
    activeModal: null,
    openModal: (id: string) => set({ activeModal: id }),
    closeModal: () => set({ activeModal: null }),

    // Scroll
    scrollY: 0,
    setScrollY: (y: number) => set({ scrollY: y, isScrolled: y > 50 }),
    isScrolled: false,

    // Loading
    isPageLoading: false,
    setPageLoading: (loading: boolean) => set({ isPageLoading: loading }),
}));
