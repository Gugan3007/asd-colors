"use client";

import { motion } from "framer-motion";

const isoItems = [
    { code: "ISO 9001:2015",     title: "Quality Management",           color: "#00A3DF" },
    { code: "ISO 27001:2022",    title: "Information Security",          color: "#EE6C4D" },
    { code: "ISO 20000-1:2018",  title: "IT Service Management",         color: "#10B981" },
    { code: "ISO 45001:2025",    title: "Occupational Health & Safety",  color: "#F59E0B" },
];

const strengthItems = [
    "Customer Trust", "Timely Delivery", "ISO Certified Excellence",
    "15+ Years Experience", "Pan-India Reach", "Government Approved",
    "Zero Data Breach Record", "24/7 Support",
];

function ISOBadge({ item }: { item: typeof isoItems[0] }) {
    return (
        <div
            className="flex-shrink-0 w-44 sm:w-52 h-32 sm:h-36 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer mx-3 sm:mx-4 transition-all duration-300"
            style={{ background:"#0E0E20", border:"1px solid rgba(255,255,255,0.07)", filter:"grayscale(100%)" }}
            onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.filter = "grayscale(0%)";
                el.style.borderColor = item.color + "55";
                el.style.boxShadow = `0 0 28px ${item.color}18`;
            }}
            onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.filter = "grayscale(100%)";
                el.style.borderColor = "rgba(255,255,255,0.07)";
                el.style.boxShadow = "none";
            }}>
            <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-full flex items-center justify-center font-black text-xs"
                style={{ background:item.color+"20", border:`2px solid ${item.color}`, color:item.color }}>
                ISO
            </div>
            <div className="text-center px-2">
                <div className="text-xs sm:text-sm font-black" style={{ color:item.color }}>{item.code}</div>
                <div className="text-[11px] mt-0.5" style={{ color:"#505068" }}>{item.title}</div>
            </div>
        </div>
    );
}

export default function AccreditationsCarousel() {
    const allItems  = [...strengthItems, ...strengthItems, ...strengthItems];
    const allBadges = [...isoItems, ...isoItems, ...isoItems, ...isoItems];

    return (
        <section id="accreditations" className="relative overflow-hidden section-spacing"
            style={{ background:"#04040C", borderTop:"1px solid rgba(255,255,255,0.05)" }}>

            {/* Heading */}
            <motion.div
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.6 }}
                className="container mb-10 sm:mb-14 text-center">
                <p className="section-label">Certifications &amp; Strengths</p>
                <h2 className="section-title">
                    Built on a Foundation of{" "}
                    <span className="grad-blue">Excellence</span>
                </h2>
            </motion.div>

            {/* ISO Badges */}
            <div className="relative mb-6 sm:mb-8 overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 pointer-events-none z-[2]"
                    style={{ background:"linear-gradient(to right, #04040C, transparent)" }} />
                <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 pointer-events-none z-[2]"
                    style={{ background:"linear-gradient(to left, #04040C, transparent)" }} />
                <div className="flex gpu-layer" style={{ animation:"ticker 30s linear infinite" }}>
                    {allBadges.map((item, idx) => <ISOBadge key={`${item.code}-${idx}`} item={item} />)}
                </div>
            </div>

            {/* Strengths ticker */}
            <div className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 pointer-events-none z-[2]"
                    style={{ background:"linear-gradient(to right, #04040C, transparent)" }} />
                <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 pointer-events-none z-[2]"
                    style={{ background:"linear-gradient(to left, #04040C, transparent)" }} />
                <div className="flex items-center gpu-layer" style={{ animation:"ticker 22s linear infinite reverse" }}>
                    {allItems.map((item, idx) => (
                        <div key={`${item}-${idx}`}
                            className="flex-shrink-0 flex items-center gap-2.5 sm:gap-3 px-6 sm:px-8 whitespace-nowrap py-3">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background:"#EE6C4D" }} />
                            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest" style={{ color:"#9898B0" }}>
                                {item}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
