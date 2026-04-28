"use client";

import { TrendingUp, Globe, Smartphone, Cpu, Lock, Shield } from "lucide-react";

const stats = [
    { icon: Smartphone,  text: "3.9 Billion mobile users worldwide" },
    { icon: Globe,       text: "Internet penetration grew to 52.08%" },
    { icon: TrendingUp,  text: "1.37 Billion Indians with digital access" },
    { icon: Cpu,         text: "I-Net powering 10,174+ service locations" },
    { icon: Lock,        text: "ISO 9001:2015 information security certified" },
    { icon: Shield,      text: "500+ mission-critical projects delivered" },
];

export default function StatsTicker() {
    // Triple the array for seamless infinite loop
    const items = [...stats, ...stats, ...stats];

    return (
        <div id="stats-ticker" className="relative w-full overflow-hidden"
            style={{
                background: "#07071A",
                borderTop: "1px solid rgba(0,163,223,0.10)",
                borderBottom: "1px solid rgba(0,163,223,0.10)",
            }}>
            {/* Edge fades */}
            <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-24 z-10 pointer-events-none"
                style={{ background:"linear-gradient(to right, #07071A, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-24 z-10 pointer-events-none"
                style={{ background:"linear-gradient(to left, #07071A, transparent)" }} />

            <div className="ticker-track py-3 sm:py-3.5">
                {items.map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <div key={`${s.text}-${i}`} className="flex items-center gap-2.5 sm:gap-3 px-6 sm:px-8 whitespace-nowrap">
                            <Icon size={14} style={{ color:"#00A3DF", flexShrink:0 }} strokeWidth={2} />
                            <span className="text-xs sm:text-sm font-medium" style={{ color:"#9898B0", letterSpacing:"0.01em" }}>
                                {s.text}
                            </span>
                            <span style={{ color:"#1F1F3A", margin:"0 4px sm:0 8px" }}>◆</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
