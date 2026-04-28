"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Shield, Monitor, Users, Building2, Vote, Fingerprint } from "lucide-react";

const projects = [
    {
        id: "iti-eseva",
        title: "ITI-eSeva Centres",
        location: "Andhra Pradesh, India",
        year: "2012–2018",
        category: "e-Governance",
        icon: Building2,
        accent: "#00A3DF",
        description:
            "Deployed and managed a statewide network of citizen service centres offering 100+ government services digitally. Over 2M transactions processed annually across 400+ centres.",
        tags: ["Citizen Services", "Digital India", "G2C"],
    },
    {
        id: "ucsc",
        title: "U-CSC (Urban CSC)",
        location: "Tamil Nadu, India",
        year: "2015–Present",
        category: "Digital Infrastructure",
        icon: Users,
        accent: "#EE6C4D",
        description:
            "Urban Common Service Centres providing digital literacy and e-services to underserved urban communities. 10,174+ active locations with real-time monitoring.",
        tags: ["Urban Development", "Last-Mile Delivery"],
    },
    {
        id: "sec-maha",
        title: "State Election Commission Maharashtra",
        location: "Maharashtra",
        year: "2019–2024",
        category: "Election Technology",
        icon: Vote,
        accent: "#10B981",
        description:
            "End-to-end election management system covering voter registration, polling booth management, result streaming, and post-election audit trails for 100M+ voters.",
        tags: ["Election Tech", "Transparency", "Scale"],
    },
    {
        id: "paccs",
        title: "PACCS Infrastructure",
        location: "Pan-India",
        year: "2017–Present",
        category: "Network Integration",
        icon: Shield,
        accent: "#F59E0B",
        description:
            "Primary Agricultural Credit Cooperative Society network integration, digitizing loan disbursals, member management, and compliance reporting for rural cooperatives.",
        tags: ["FinTech", "Rural Finance", "Integration"],
    },
    {
        id: "vvip-cctv",
        title: "Mamallapuram VVIP CCTV",
        location: "Tamil Nadu",
        year: "2019",
        category: "Surveillance",
        icon: Monitor,
        accent: "#8B5CF6",
        description:
            "Mission-critical CCTV surveillance deployment for the historic Modi-Xi summit. 500+ cameras with AI-based threat detection, facial recognition, and command-centre integration.",
        tags: ["VVIP Security", "AI Surveillance", "Command Centre"],
    },
    {
        id: "aadhaar",
        title: "Aadhaar Enrollment Centers",
        location: "South India",
        year: "2011–2016",
        category: "Biometric",
        icon: Fingerprint,
        accent: "#06B6D4",
        description:
            "Partnered with UIDAI to operate biometric enrollment centres across South India. Enrolled 15M+ citizens with iris, fingerprint, and demographic data capture.",
        tags: ["Biometrics", "UIDAI", "Identity"],
    },
    {
        id: "tn-elections",
        title: "Tamil Nadu Local Body Elections",
        location: "Tamil Nadu",
        year: "2022",
        category: "Election Technology",
        icon: Vote,
        accent: "#EE6C4D",
        description:
            "Comprehensive technology support for TN local body elections covering 12,500+ polling booths. Real-time result streaming and secure vote-counting software for transparent outcomes.",
        tags: ["Election Tech", "Local Body", "Real-Time"],
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
};

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
    const Icon = project.icon;

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="group flex items-start"
            style={{ gap: "2rem" }}
        >
            {/* Timeline dot */}
            <div className="hidden lg:flex flex-col items-center flex-shrink-0 w-6 relative mt-6">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                    className="w-6 h-6 rounded-full border-2 flex items-center justify-center relative z-10"
                    style={{ borderColor: project.accent, background: project.accent + "20" }}
                >
                    <div className="w-2 h-2 rounded-full" style={{ background: project.accent }} />
                </motion.div>
                {/* Absolute connecting line */}
                {index < projects.length - 1 && (
                    <div 
                        className="absolute top-6 left-1/2 -translate-x-1/2" 
                        style={{ 
                            background: "rgba(255,255,255,0.06)", 
                            width: "1px", 
                            height: "calc(100% + 2rem)" 
                        }} 
                    />
                )}
            </div>

            {/* Card */}
            <div
                className="flex-1 rounded-2xl p-6 lg:p-7 transition-all duration-300 relative z-[2]"
                style={{
                    background: "#111118",
                    border: "1px solid rgba(255,255,255,0.07)",
                }}
                onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = project.accent + "40";
                    el.style.boxShadow = `0 0 30px ${project.accent}14`;
                }}
                onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "rgba(255,255,255,0.07)";
                    el.style.boxShadow = "none";
                }}
            >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: project.accent + "18" }}>
                            <Icon size={22} style={{ color: project.accent }} />
                        </div>
                        <div>
                            <h3 className="text-lg lg:text-xl font-bold text-white leading-tight">{project.title}</h3>
                            <p className="text-xs mt-0.5" style={{ color: "#71717A" }}>
                                {project.category}
                            </p>
                        </div>
                    </div>
                    <div className="flex sm:flex-col items-start sm:items-end gap-1 ml-16 sm:ml-0">
                        <div className="flex items-center gap-1.5 text-xs" style={{ color: "#A1A1AA" }}>
                            <Calendar size={12} /> {project.year}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs" style={{ color: "#71717A" }}>
                            <MapPin size={12} /> {project.location}
                        </div>
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed mb-5" style={{ color: "#A1A1AA" }}>{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs px-3 py-1 rounded-full font-medium"
                            style={{ background: project.accent + "14", color: project.accent, border: `1px solid ${project.accent}30` }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function ProjectsShowcase() {
    return (
        <section
            id="projects"
            className="relative section-spacing overflow-hidden"
            style={{ background: "linear-gradient(180deg, #0A0A18 0%, #05050A 100%)" }}
        >
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.04]"
                    style={{ background: "radial-gradient(circle, #EE6C4D, transparent 70%)" }} />
            </div>

            <div className="relative z-10 container">
                <div className="lg:grid lg:grid-cols-[320px_1fr]" style={{ gap: "4rem" }}>

                    {/* Sticky left column */}
                    <div className="mb-12 lg:mb-0">
                        <div className="lg:sticky lg:top-32">
                            <motion.div
                                initial={{ opacity: 0, x: -32 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <p className="text-xs font-black uppercase tracking-[0.2em] mb-4" style={{ color: "#EE6C4D" }}>
                                    Project Showcase
                                </p>
                                <blockquote className="text-2xl lg:text-3xl font-black text-white leading-tight mb-6">
                                    &ldquo;A good plan today is better than a perfect plan tomorrow.&rdquo;
                                </blockquote>
                                <p className="text-sm mb-8 leading-relaxed" style={{ color: "#71717A" }}>
                                    Across 15+ years, I-Net Secure Labs has delivered mission-critical projects that have reshaped how India governs, secures, and serves its citizens.
                                </p>
                                <div className="flex flex-col gap-3">
                                    {[
                                        { label: "Projects Delivered", value: "500+" },
                                        { label: "States Covered", value: "12+" },
                                        { label: "Citizens Served", value: "50M+" },
                                    ].map((s) => (
                                        <div
                                            key={s.label}
                                            className="flex items-center justify-between px-4 py-3 rounded-xl"
                                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                                        >
                                            <span className="text-sm" style={{ color: "#71717A" }}>{s.label}</span>
                                            <span className="font-black text-white">{s.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Scroll-linked cards */}
                    <div className="flex flex-col w-full" style={{ gap: "2rem" }}>
                        {projects.map((project, idx) => (
                            <ProjectCard key={project.id} project={project} index={idx} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
