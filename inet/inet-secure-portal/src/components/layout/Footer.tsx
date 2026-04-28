"use client";

import Link from "next/link";
import Logo from "@/components/layout/Logo";
import { Phone, Mail, MapPin, ExternalLink, Globe, MessageCircle, Play } from "lucide-react";


const navLinks = {
    Services: [
        "System / Network Integration",
        "CCTV / Cloud Surveillance",
        "e-Governance & Digital",
        "Software & Mobile App Dev",
        "Professional Outsourcing",
        "Citizen Service Centers",
    ],
    Company: ["About Us", "Our Team", "Road Map", "Partners", "Careers"],
    Technology: ["Elections", "Examinations", "Biometrics", "Surveillance"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

const socialLinks = [
    { icon: Globe,         label: "LinkedIn",    href: "#" },
    { icon: MessageCircle, label: "Twitter / X", href: "#" },
    { icon: Play,          label: "YouTube",     href: "#" },
];

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer id="footer" style={{ background:"#020208", borderTop:"1px solid rgba(255,255,255,0.06)", position:"relative", zIndex:10 }}>

            {/* Top line accent */}
            <div style={{ height:"2px", background:"linear-gradient(90deg, transparent, #00A3DF, #EE6C4D, transparent)" }} />

            <div className="container py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">

                    {/* Brand */}
                    <div className="lg:col-span-2 flex flex-col gap-5">
                        <Logo />
                        <p className="text-sm leading-relaxed max-w-xs" style={{ color:"#505068" }}>
                            India's trusted partner in e-Governance, enterprise surveillance, and digital citizen services since 2008.
                        </p>
                        {/* Contacts */}
                        <div className="flex flex-col gap-3">
                            {[
                                { icon: Phone,  text: "+91 44 - 66440666" },
                                { icon: Mail,   text: "info@inetcsc.com" },
                                { icon: MapPin, text: "Chennai, Tamil Nadu, India" },
                            ].map((c) => (
                                <div key={c.text} className="flex items-center gap-3">
                                    <c.icon size={13} style={{ color:"#00A3DF", flexShrink:0 }} />
                                    <span className="text-sm" style={{ color:"#505068" }}>{c.text}</span>
                                </div>
                            ))}
                        </div>
                        {/* Social */}
                        <div className="flex gap-2 mt-1">
                            {socialLinks.map((s) => (
                                <a key={s.label} href={s.href} aria-label={s.label}
                                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                                    style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)" }}
                                    onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.borderColor="#00A3DF40";(e.currentTarget as HTMLElement).style.background="rgba(0,163,223,0.08)"; }}
                                    onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.07)";(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.04)"; }}>
                                    <s.icon size={15} style={{ color:"#505068" }} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Nav columns */}
                    {Object.entries(navLinks).map(([section, links]) => (
                        <div key={section} className="flex flex-col gap-4">
                            <h4 className="text-[11px] font-black uppercase tracking-[0.15em]" style={{ color:"#EE6C4D" }}>
                                {section}
                            </h4>
                            <ul className="flex flex-col gap-2.5">
                                {links.map((link) => (
                                    <li key={link}>
                                        <Link href="#" className="text-sm transition-colors duration-150"
                                            style={{ color:"#505068" }}
                                            onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.color="#9898B0"; }}
                                            onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.color="#505068"; }}>
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom bar */}
            <div className="container py-5 flex flex-wrap items-center justify-between gap-4"
                style={{ borderTop:"1px solid rgba(255,255,255,0.05)" }}>
                <p className="text-xs" style={{ color:"#2A2A3A" }}>
                    © {year} I-Net Secure Labs Pvt. Ltd. All rights reserved.
                </p>
                <div className="flex items-center gap-5">
                    {["Cschub Portal", "Inetcsc Portal"].map((p) => (
                        <a key={p} href="#"
                            className="text-xs flex items-center gap-1.5 transition-colors duration-150"
                            style={{ color:"#2A2A3A" }}
                            onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.color="#9898B0"; }}
                            onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.color="#2A2A3A"; }}>
                            <ExternalLink size={10} />{p}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
