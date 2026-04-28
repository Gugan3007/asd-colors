"use client";

import { Phone, Mail, ExternalLink } from "lucide-react";

const portals = [
    { label: "Cschub", href: "https://cschub.com" },
    { label: "Inetcsc", href: "https://inetcsc.com" },
];

export default function TopBar() {
    return (
        <div
            id="topbar"
            className="w-full"
            style={{ backgroundColor: "#0F172A" }}
        >
            <div className="section-container flex items-center justify-between py-2 text-xs">
                {/* Left – Contact Info */}
                <div className="flex items-center gap-5 text-slate-300">
                    <a
                        href="tel:+914466440666"
                        className="flex items-center gap-1.5 transition-colors hover:text-white"
                    >
                        <Phone size={12} strokeWidth={2} />
                        <span>+9144 - 66440666</span>
                    </a>
                    <span className="hidden sm:inline text-slate-600">|</span>
                    <a
                        href="mailto:info@inetcsc.com"
                        className="hidden sm:flex items-center gap-1.5 transition-colors hover:text-white"
                    >
                        <Mail size={12} strokeWidth={2} />
                        <span>info@inetcsc.com</span>
                    </a>
                </div>

                {/* Right – Portal Buttons */}
                <div className="flex items-center gap-3">
                    {portals.map((p) => (
                        <a
                            key={p.label}
                            href={p.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-1.5 rounded-full border border-slate-700 px-3 py-1 text-slate-400 transition-all hover:border-cyan-500/50 hover:text-cyan-300 hover:shadow-[0_0_12px_rgba(0,209,255,0.2)]"
                        >
                            <ExternalLink size={10} />
                            <span className="font-medium">{p.label}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
