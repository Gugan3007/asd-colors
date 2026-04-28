"use client";

import { motion } from "framer-motion";
import { Network, Camera, Globe, Users, Code, Building2, ArrowRight } from "lucide-react";

const SERVICES = [
    {
        id: "sys-net",
        Icon: Network,
        title: "System / Network Integration",
        description: "End-to-end design, deployment, and management of enterprise IT infrastructure enabling seamless connectivity and zero-downtime operations.",
        color: "#00A3DF",
    },
    {
        id: "cctv",
        Icon: Camera,
        title: "CCTV / Cloud Surveillance",
        description: "AI-powered video surveillance with cloud storage, facial recognition, and perimeter monitoring — securing your enterprise from every angle.",
        color: "#EE6C4D",
    },
    {
        id: "egov",
        Icon: Globe,
        title: "e-Governance & Digital Transformation",
        description: "Digitizing public services with scalable, citizen-centric portals bringing government initiatives directly to all 1.4 billion Indians.",
        color: "#10B981",
    },
    {
        id: "out",
        Icon: Users,
        title: "Professional Outsourcing",
        description: "Top-tier IT talent and specialized workforce solutions to accelerate project delivery and maintain critical operational continuity.",
        color: "#F59E0B",
    },
    {
        id: "dev",
        Icon: Code,
        title: "Software & Mobile App Dev",
        description: "Mission-critical, bespoke applications and sleek mobile experiences engineered for high conversion, performance, and cyber-resilience.",
        color: "#8B5CF6",
    },
    {
        id: "csc",
        Icon: Building2,
        title: "Citizen Service Centers",
        description: "Establishing and enabling physical and digital hubs that empower citizens with unified access to public utilities and financial services.",
        color: "#06B6D4",
    },
];

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
};
const card = {
    hidden: { opacity: 0, y: 30 },
    show:   { opacity: 1, y: 0,  transition: { duration: 0.65, ease: [0.16,1,0.3,1] as const }},
};

export default function BentoServices() {
    return (
        <section id="services" className="relative section-spacing overflow-hidden"
            style={{ background: "linear-gradient(180deg, #04040C 0%, #080818 100%)" }}>

            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
                style={{ background:"radial-gradient(ellipse, #00A3DF08, transparent 70%)", filter:"blur(40px)" }} />

            <div className="relative z-10 container">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
                    viewport={{ once:true, margin:"-80px" }} transition={{ duration:0.7 }}
                    className="mb-14 lg:mb-20 max-w-2xl mx-auto text-center">
                    <p className="section-label">Core Service Matrix</p>
                    <h2 className="section-title">
                        Engineering the{" "}
                        <span className="grad-blue">Future</span>
                    </h2>
                    <p className="section-body mt-4 mx-auto">
                        A full spectrum of enterprise-grade technology solutions built for India&apos;s digital journey.
                    </p>
                </motion.div>

                {/* Cards */}
                <motion.div variants={stagger} initial="hidden" whileInView="show"
                    viewport={{ once:true, margin:"-80px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                    {SERVICES.map((svc) => (
                        <motion.article key={svc.id} variants={card}
                            className="group relative overflow-hidden rounded-2xl flex flex-col p-6 lg:p-8 cursor-pointer transition-all duration-300"
                            style={{
                                background:"#0E0E20",
                                border:"1px solid rgba(255,255,255,0.06)",
                            }}
                            onMouseEnter={e => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.borderColor = svc.color + "45";
                                el.style.boxShadow = `0 0 32px ${svc.color}10`;
                                el.style.transform = "translateY(-5px)";
                            }}
                            onMouseLeave={e => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.borderColor = "rgba(255,255,255,0.06)";
                                el.style.boxShadow = "none";
                                el.style.transform = "translateY(0)";
                            }}>

                            {/* Hover glow overlay */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{ background:`radial-gradient(circle at 25% 20%, ${svc.color}0E, transparent 60%)` }} />

                            {/* Top line accent */}
                            <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                                style={{ background:`linear-gradient(90deg, transparent, ${svc.color}, transparent)` }} />

                            {/* Icon */}
                            <div className="relative w-12 lg:w-14 h-12 lg:h-14 rounded-2xl flex items-center justify-center mb-5 lg:mb-6 flex-shrink-0"
                                style={{ background:svc.color+"15" }}>
                                <svc.Icon size={24} style={{ color:svc.color }} strokeWidth={1.5} />
                            </div>

                            {/* Content */}
                            <h3 className="relative text-base lg:text-lg font-bold text-white leading-tight mb-2 lg:mb-3">{svc.title}</h3>
                            <p className="relative text-sm leading-relaxed flex-1" style={{ color:"#9898B0" }}>
                                {svc.description}
                            </p>

                            {/* Footer link */}
                            <div className="relative mt-5 lg:mt-6 flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ color:svc.color }}>
                                Explore solution
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
