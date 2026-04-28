"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight, Play, Shield, Network, Globe, Monitor,
    ShieldCheck, Award, Users, ChevronDown,
} from "lucide-react";

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const SERVICES = [
    {
        icon: Network,
        label: "System Integration",
        desc: "End-to-end IT infrastructure for the enterprise",
        color: "#00A3DF",
        glow: "rgba(0,163,223,0.18)",
    },
    {
        icon: Monitor,
        label: "Election Web Streaming",
        desc: "Live monitoring keeping democracy transparent",
        color: "#EE6C4D",
        glow: "rgba(238,108,77,0.18)",
    },
    {
        icon: Globe,
        label: "e-Governance",
        desc: "Digital transformation for 1.4B citizens",
        color: "#10B981",
        glow: "rgba(16,185,129,0.18)",
    },
    {
        icon: Shield,
        label: "Biometric Verification",
        desc: "Forensics-grade facial recognition & biometrics",
        color: "#8B5CF6",
        glow: "rgba(139,92,246,0.18)",
    },
];

const STATS = [
    { icon: ShieldCheck, value: "500+",  label: "Projects Delivered", color: "#10B981" },
    { icon: Users,       value: "15+",   label: "Years of Experience", color: "#00A3DF" },
    { icon: Award,       value: "ISO",   label: "9001:2015 Certified",  color: "#EE6C4D" },
];

/* ─────────────────────────────────────────
   Variants
───────────────────────────────────────── */
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show:   { opacity: 1, y: 0,  transition: { duration: 0.8, ease: [0.16,1,0.3,1] as const }},
};
const fadeRight = {
    hidden: { opacity: 0, x: 48 },
    show:   { opacity: 1, x: 0,  transition: { duration: 0.9, delay: 0.3, ease: [0.16,1,0.3,1] as const }},
};

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */
export default function HeroSection() {
    const [active, setActive] = useState(0);
    const timer = useRef<ReturnType<typeof setInterval> | null>(null);

    const resetTimer = useCallback(() => {
        if (timer.current) clearInterval(timer.current);
        timer.current = setInterval(() => setActive(p => (p + 1) % SERVICES.length), 3600);
    }, []);

    useEffect(() => { resetTimer(); return () => { if (timer.current) clearInterval(timer.current); }; }, [resetTimer]);

    const svc = SERVICES[active];

    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col justify-center overflow-hidden"
            style={{ background: "linear-gradient(160deg, #04040C 0%, #080818 55%, #04040C 100%)" }}
        >
            {/* ── Background canvas ── */}
            <div className="absolute inset-0 line-grid opacity-60 pointer-events-none" aria-hidden />

            {/* ── Orbs ── */}
            <div aria-hidden className="pointer-events-none">
                <div className="hero-orb animate-float-1 w-[600px] h-[600px] -top-32 -left-32 opacity-[0.07]"
                    style={{ background: "radial-gradient(circle, #00A3DF, transparent 70%)", position: "absolute" }} />
                <div className="hero-orb animate-float-2 w-[500px] h-[500px] bottom-0 right-0 opacity-[0.06]"
                    style={{ background: "radial-gradient(circle, #EE6C4D, transparent 70%)", position: "absolute" }} />
                <div className="hero-orb animate-float-3 w-[300px] h-[300px] top-1/3 right-1/4 opacity-[0.04]"
                    style={{ background: "radial-gradient(circle, #8B5CF6, transparent 70%)", position: "absolute" }} />
            </div>

            {/* ── Main content ── */}
            <div className="relative z-10 container pt-32 sm:pt-36 pb-20 sm:pb-24">
                <div className="lg:grid lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_540px]" style={{ display: "grid", gap: "4rem", alignItems: "center" }}>

                    {/* ───── LEFT ───── */}
                    <motion.div variants={stagger} initial="hidden" animate="show" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

                        {/* Badge */}
                        <motion.div variants={fadeUp}>
                            <span className="tag-blue">
                                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:"#EE6C4D", display: "inline-block" }} />
                                Established 2008 &middot; India&apos;s e-Governance Leader
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1 variants={fadeUp}
                            className="font-black leading-[1.04] tracking-[-0.03em]"
                            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
                            Empowering{" "}
                            <span className="grad-blue">Digital</span>
                            <br />
                            <span className="grad-orange">India.</span>
                        </motion.h1>

                        {/* Sub */}
                        <motion.p variants={fadeUp} className="section-body max-w-xl">
                            I-Net Secure Labs delivers enterprise-grade surveillance, biometric verification,
                            and election management systems — transforming governance for 1.4 billion citizens.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div variants={fadeUp} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem" }}>
                            <a href="/services" id="hero-cta-primary" className="btn-primary">
                                Explore Services
                                <ArrowRight size={16} />
                            </a>
                            <button id="hero-cta-video" className="btn-ghost">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
                                    style={{ background:"#EE6C4D" }}>
                                    <Play size={12} fill="white" strokeWidth={0} />
                                </span>
                                Watch Corporate Video
                            </button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div variants={fadeUp} style={{ display: "flex", flexWrap: "wrap", gap: "1rem", paddingTop: "0.25rem" }}>
                            {STATS.map((s) => {
                                const Icon = s.icon;
                                return (
                                    <div key={s.value}
                                        className="rounded-2xl"
                                        style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1.25rem", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)" }}>
                                        <Icon size={18} style={{ color:s.color }} />
                                        <div>
                                            <div className="text-sm font-black text-white">{s.value}</div>
                                            <div className="text-[11px]" style={{ color:"#505068" }}>{s.label}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </motion.div>

                    {/* ───── RIGHT ───── */}
                    <motion.div variants={fadeRight} initial="hidden" animate="show" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", position: "relative" }}>

                        {/* Service selector cards */}
                        <div>
                            {/* Card Grid */}
                            <div className="rounded-[24px] overflow-hidden" style={{ background:"linear-gradient(135deg, rgba(0,163,223,0.2), rgba(238,108,77,0.1))", padding: "4px" }}>
                                <div className="rounded-[20px]" style={{ background:"#09091A", padding: "16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                                    {SERVICES.map((s, idx) => {
                                        const Icon = s.icon;
                                        const isActive = idx === active;
                                        return (
                                            <motion.button key={s.label}
                                                onClick={() => { setActive(idx); resetTimer(); }}
                                                animate={{
                                                    borderColor: isActive ? s.color + "55" : "rgba(255,255,255,0.06)",
                                                    backgroundColor: isActive ? s.color + "10" : "rgba(255,255,255,0.025)",
                                                }}
                                                whileHover={{ scale:1.02 }}
                                                whileTap={{ scale:0.98 }}
                                                transition={{ duration:0.25 }}
                                                className="text-left cursor-pointer"
                                                style={{ position: "relative", padding: "16px", borderRadius: "16px", border: "1px solid", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                                                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                                    style={{ background:s.color + "15", marginBottom: "12px" }}>
                                                    <Icon size={20} style={{ color:s.color }} strokeWidth={1.8} />
                                                </div>
                                                <h3 className="text-sm font-bold text-white leading-tight" style={{ marginBottom: "4px" }}>{s.label}</h3>
                                                <p className="text-xs leading-relaxed" style={{ color:"#505068", flex: "1" }}>{s.desc}</p>

                                                {/* Progress bar */}
                                                {isActive && (
                                                    <motion.div
                                                        initial={{ scaleX:0 }} animate={{ scaleX:1 }}
                                                        transition={{ duration:3.6, ease:"linear" }}
                                                        className="absolute bottom-0 left-0 w-full rounded-full"
                                                        style={{ height: "2px", background:s.color, transformOrigin: "left" }} />
                                                )}
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Active preview strip */}
                        <div style={{ position: "relative", height: "76px" }}> 
                            <AnimatePresence mode="wait">
                                <motion.div key={active}
                                    initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
                                    transition={{ duration:0.25 }}
                                    className="rounded-2xl"
                                    style={{
                                        display: "flex", alignItems: "center", gap: "1rem", 
                                        padding: "14px 20px", 
                                        background:"rgba(255,255,255,0.03)",
                                        border:`1px solid ${svc.color}28`,
                                        position: "absolute",
                                        width: "100%",
                                        top: 0
                                    }}>
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{ background:svc.color+"18" }}>
                                        <svc.icon size={18} style={{ color:svc.color }} />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div className="text-sm font-bold text-white mb-0.5">{svc.label}</div>
                                        <div className="text-xs truncate" style={{ color:"#505068" }}>{svc.desc}</div>
                                    </div>
                                    <ArrowRight size={16} style={{ color:svc.color, flexShrink:0 }} />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Trusted-by strip */}
                        <div style={{ padding: "0 4px", marginTop: "4px" }}>
                            <p className="text-[10px] uppercase font-bold" style={{ color:"#505068", letterSpacing: "0.14em", marginBottom: "12px" }}>
                                Trusted by government & enterprise
                            </p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                {["ECI", "NIC", "UIDAI", "State Govts", "SEC", "Exam Boards"].map((t) => (
                                    <span key={t} className="rounded-full text-[10px] font-semibold"
                                        style={{ padding: "6px 12px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", color:"#505068" }}>
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ── Scroll cue ── */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none" aria-hidden>
                <span className="text-[10px] uppercase tracking-[0.15em]" style={{ color:"#505068" }}>Scroll</span>
                <motion.div animate={{ y:[0,6,0] }} transition={{ duration:1.6, repeat:Infinity }}
                    style={{ color:"#505068" }}>
                    <ChevronDown size={16} />
                </motion.div>
            </div>
        </section>
    );
}
