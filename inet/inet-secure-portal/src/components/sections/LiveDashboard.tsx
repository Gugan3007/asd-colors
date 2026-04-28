"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

const METRICS = [
    { value: "10,174+", label: "Active Service Locations" },
    { value: "50M+",    label: "Citizens Served" },
    { value: "100+",    label: "Government Services" },
    { value: "99.9%",   label: "Platform Uptime" },
];

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren:0.1, delayChildren:0.2 }},
};
const item = {
    hidden: { opacity:0, y:24 },
    show:   { opacity:1, y:0, transition:{ duration:0.6, ease:[0.16,1,0.3,1] as const }},
};

export default function LiveDashboard() {
    return (
        <section id="ebusiness" className="relative section-spacing overflow-hidden"
            style={{ background:"#04040C" }}>

            {/* Glow */}
            <div className="absolute bottom-0 inset-x-0 h-1/2 pointer-events-none"
                style={{ background:"radial-gradient(ellipse at 50% 100%, rgba(0,163,223,0.06), transparent 70%)" }} />
            <div className="section-top-line absolute top-0 inset-x-0" />

            <div className="relative z-10 container">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 xl:gap-20 items-center">

                    {/* Left text */}
                    <motion.div
                        initial={{ opacity:0, x:-32 }} whileInView={{ opacity:1, x:0 }}
                        viewport={{ once:true }} transition={{ duration:0.8 }}>
                        <span className="tag-orange mb-5 sm:mb-6 inline-flex">
                            <span className="relative flex w-2 h-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EE6C4D] opacity-75" />
                                <span className="relative inline-flex rounded-full w-2 h-2 bg-[#EE6C4D]" />
                            </span>
                            Live Platform
                        </span>
                        <h2 className="section-title mb-4">
                            Creating e-Business
                            <br />
                            <span className="grad-orange">Entrepreneurs</span>
                        </h2>
                        <p className="text-xl sm:text-2xl font-black grad-blue mb-5 sm:mb-6">
                            One Portal. One Wallet. Many Services.
                        </p>
                        <p className="section-body max-w-lg mb-6 sm:mb-8">
                            Facilitating e-Commerce for 100% of urban and rural citizens across India.
                            Our real-time infrastructure powers millions of daily digital transactions,
                            securely and at scale.
                        </p>
                        <a href="/e-governance" className="btn-primary inline-flex">
                            Explore Platform <ArrowRight size={15} />
                        </a>
                    </motion.div>

                    {/* Right metrics */}
                    <motion.div variants={stagger} initial="hidden" whileInView="show"
                        viewport={{ once:true }} className="mt-10 lg:mt-0">
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            {METRICS.map((m) => (
                                <motion.div key={m.label} variants={item}
                                    className="glass-card p-5 sm:p-6 flex flex-col gap-2">
                                    <div className="flex items-center justify-between mb-1">
                                        <Zap size={14} style={{ color:"#00A3DF" }} />
                                        <span className="text-[10px] font-bold uppercase tracking-[0.1em]"
                                            style={{ color:"#505068" }}>Live</span>
                                    </div>
                                    <div className="text-2xl sm:text-3xl font-black" style={{ color:"#F0F0FF" }}>{m.value}</div>
                                    <div className="text-[11px] sm:text-xs font-medium" style={{ color:"#505068" }}>{m.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
