"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Network, ScanFace, Check, Terminal } from "lucide-react";

export default function SplashScreen() {
    const [booting, setBooting] = useState(true);
    const [step, setStep] = useState(0);

    useEffect(() => {
        // Prevent scroll on body during boot
        document.body.style.overflow = "hidden";
        
        // Sequence phases
        const seq1 = setTimeout(() => setStep(1), 400);  // Commencing scan
        const seq2 = setTimeout(() => setStep(2), 1000); // Decrypting modules
        const seq3 = setTimeout(() => setStep(3), 1600); // Access granted
        const end = setTimeout(() => {
            setBooting(false);
            document.body.style.overflow = "";
        }, 2200);

        return () => {
            clearTimeout(seq1);
            clearTimeout(seq2);
            clearTimeout(seq3);
            clearTimeout(end);
            document.body.style.overflow = "";
        };
    }, []);

    const sequenceText = [
        "INITIALIZING SECURE PROTOCOL...",
        "ESTABLISHING BIOMETRIC HANDSHAKE...",
        "DECRYPTING E-GOV MODULES...",
        "ACCESS GRANTED."
    ];

    return (
        <AnimatePresence>
            {booting && (
                <motion.div
                    key="splash-screen"
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
                    style={{ background: "#020208" }}
                >
                    {/* Dark grid background */}
                    <div className="absolute inset-0 pointer-events-none opacity-20"
                        style={{
                            backgroundImage: `linear-gradient(rgba(0, 163, 223, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 163, 223, 0.1) 1px, transparent 1px)`,
                            backgroundSize: "40px 40px"
                        }}
                    />

                    {/* Central radar scan */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="w-full h-full rounded-full border border-[rgba(0,163,223,0.05)]"
                            style={{
                                background: "conic-gradient(from 0deg, transparent 70%, rgba(0, 163, 223, 0.1) 100%)"
                            }}
                        />
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        {/* Core Shield / Logo */}
                        <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center mb-8">
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full border-t flex-shrink-0"
                                style={{ borderColor: "#EE6C4D", borderTopWidth: 2, borderRightWidth: 1, borderBottomWidth: 0, borderLeftWidth: 0, opacity: 0.6 }}
                            />
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-2 rounded-full border-b"
                                style={{ borderColor: "#00A3DF", borderTopWidth: 0, borderRightWidth: 0, borderBottomWidth: 3, borderLeftWidth: 1, opacity: 0.8 }}
                            />
                            
                            {/* Inner icon shift based on step */}
                            <AnimatePresence mode="wait">
                                {step === 0 && (
                                    <motion.div key="shield" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                                        <ShieldAlert size={40} style={{ color: "#EE6C4D" }} />
                                    </motion.div>
                                )}
                                {step === 1 && (
                                    <motion.div key="scan" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                                        <ScanFace size={40} style={{ color: "#00A3DF" }} />
                                    </motion.div>
                                )}
                                {step === 2 && (
                                    <motion.div key="network" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                                        <Network size={40} style={{ color: "#8B5CF6" }} />
                                    </motion.div>
                                )}
                                {step === 3 && (
                                    <motion.div key="check" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                                        <Check size={48} style={{ color: "#10B981" }} strokeWidth={3} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Text display */}
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase"
                                style={{ color: step === 3 ? "#10B981" : "#00A3DF" }}>
                                {sequenceText[step]}
                            </span>

                            {/* Progress Bar Container */}
                            <div className="w-56 sm:w-64 h-1 mt-4 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                                <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: step === 3 ? "100%" : `${(step + 1) * 25}%` }}
                                    transition={{ duration: 0.4 }}
                                    className="h-full rounded-full shadow-[0_0_12px_rgba(0,163,223,0.7)]"
                                    style={{ background: step === 3 ? "#10B981" : "#00A3DF" }}
                                />
                            </div>

                            {/* Hex/Bin stream */}
                            <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="mt-8 flex items-center gap-2"
                                style={{ color: "#505068" }}
                            >
                                <Terminal size={12} />
                                <span className="font-mono text-[9px] tracking-widest uppercase">
                                    SYS_INTEGRITY: [0xFFE4] SECURE LABS NET
                                </span>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
