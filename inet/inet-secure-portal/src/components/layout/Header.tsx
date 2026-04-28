"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    Phone, Mail, ExternalLink, ChevronDown, Menu, X,
    Building2, Map, Users, Handshake, Video, Camera, Radio,
    BarChart3, Vote, ClipboardList, Bus, Cctv, ScanFace,
    Fingerprint, ShieldCheck, ArrowRight,
} from "lucide-react";
import Logo from "./Logo";

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const portals = [
    { label: "Cschub", href: "https://cschub.com" },
    { label: "Inetcsc", href: "https://inetcsc.com" },
];

const NAV = [
    { label: "Home", href: "/" },
    {
        label: "About Us",
        key: "about",
        children: [
            { label: "Company", icon: Building2, href: "/about/company" },
            { label: "Road Map", icon: Map,       href: "/about/roadmap" },
            { label: "Team",    icon: Users,      href: "/about/team"    },
            { label: "Partners",icon: Handshake,  href: "/about/partners"},
        ],
    },
    {
        label: "Technology Services",
        key: "tech",
        columns: [
            {
                title: "Elections",
                items: [
                    { label: "VMS Web Streaming",  icon: Video,        href: "/services/vms" },
                    { label: "HRP Camera",          icon: Camera,       href: "/services/hrp" },
                    { label: "Tracker Stream",       icon: Radio,        href: "/services/tracker" },
                    { label: "QMS",                 icon: BarChart3,    href: "/services/qms" },
                    { label: "Vote Counting",        icon: Vote,         href: "/services/vote-counting" },
                    { label: "EMS",                 icon: ClipboardList,href: "/services/ems" },
                    { label: "VTS",                 icon: Bus,          href: "/services/vts" },
                ],
            },
            {
                title: "Examinations",
                items: [
                    { label: "CCTV",               icon: Cctv,        href: "/services/cctv" },
                    { label: "FRS Facial Recog.",   icon: ScanFace,    href: "/services/frs" },
                    { label: "Biometric",           icon: Fingerprint, href: "/services/biometric" },
                    { label: "Body Worn Cameras",   icon: ShieldCheck, href: "/services/bwc" },
                ],
            },
        ],
    },
    { label: "E-Governance", href: "/e-governance" },
    { label: "Projects",     href: "/projects" },
];

/* ─────────────────────────────────────────
   Dropdown Panel
───────────────────────────────────────── */
const dropdownVariants = {
    hidden: { opacity: 0, y: -8, scaleY: 0.94 },
    show:   { opacity: 1, y: 0,  scaleY: 1,    transition: { duration: 0.25, ease: [0.16,1,0.3,1] as const }},
    exit:   { opacity: 0, y: -6, scaleY: 0.94, transition: { duration: 0.18 }},
};

function DropdownSimple({ items }: { items: { label:string; icon: React.ElementType; href:string }[] }) {
    return (
        <motion.div variants={dropdownVariants} initial="hidden" animate="show" exit="exit"
            className="absolute top-[calc(100%+6px)] left-0 min-w-[220px] z-50 overflow-hidden rounded-2xl"
            style={{ background:"#0D0D1E", border:"1px solid rgba(255,255,255,0.08)", boxShadow:"0 20px 60px rgba(0,0,0,0.7)" }}>
            <div className="p-2 flex flex-col gap-0.5">
                {items.map((it) => {
                    const Icon = it.icon;
                    return (
                        <a key={it.label} href={it.href}
                            className="group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200"
                            style={{ color:"#9898B0" }}
                            onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.background="rgba(0,163,223,0.08)";(e.currentTarget as HTMLElement).style.color="#fff"; }}
                            onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.background="transparent";(e.currentTarget as HTMLElement).style.color="#9898B0"; }}>
                            <span className="flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0"
                                style={{ background:"rgba(0,163,223,0.08)" }}>
                                <Icon size={14} style={{ color:"#00A3DF" }} />
                            </span>
                            <span className="text-sm font-medium">{it.label}</span>
                        </a>
                    );
                })}
            </div>
        </motion.div>
    );
}

function DropdownMega({ columns }: { columns: { title:string; items:{label:string;icon:React.ElementType;href:string}[] }[] }) {
    return (
        <motion.div variants={dropdownVariants} initial="hidden" animate="show" exit="exit"
            className="absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 z-50 rounded-2xl overflow-hidden"
            style={{ background:"#0D0D1E", border:"1px solid rgba(255,255,255,0.08)", boxShadow:"0 20px 60px rgba(0,0,0,0.7)", minWidth:"560px" }}>
            <div className="p-5 grid grid-cols-2 gap-6">
                {columns.map((col) => (
                    <div key={col.title}>
                        <p className="text-[0.65rem] font-black uppercase tracking-[0.16em] mb-3 pb-2"
                            style={{ color:"#EE6C4D", borderBottom:"1px solid rgba(238,108,77,0.15)" }}>
                            {col.title}
                        </p>
                        <div className="flex flex-col gap-0.5">
                            {col.items.map((it) => {
                                const Icon = it.icon;
                                return (
                                    <a key={it.label} href={it.href}
                                        className="flex items-center gap-3 px-2.5 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                                        style={{ color:"#9898B0" }}
                                        onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.background="rgba(0,163,223,0.07)";(e.currentTarget as HTMLElement).style.color="#fff"; }}
                                        onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.background="transparent";(e.currentTarget as HTMLElement).style.color="#9898B0"; }}>
                                        <Icon size={14} style={{ color:"#00A3DF" }} strokeWidth={1.8} />
                                        {it.label}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────
   Mobile Nav
───────────────────────────────────────── */
function MobileNav({ open, onClose }: { open:boolean; onClose:()=>void }) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                        className="fixed inset-0 z-[90]" style={{ background:"rgba(0,0,0,0.7)", backdropFilter:"blur(4px)" }}
                        onClick={onClose} />
                    <motion.aside
                        initial={{ x:"100%" }} animate={{ x:0 }} exit={{ x:"100%" }}
                        transition={{ duration:0.35, ease:[0.16,1,0.3,1] }}
                        className="fixed top-0 right-0 bottom-0 z-[95] w-80 flex flex-col overflow-y-auto"
                        style={{ background:"#080814", borderLeft:"1px solid rgba(255,255,255,0.08)" }}>
                        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
                            <Logo />
                            <button onClick={onClose} className="p-2 rounded-lg" style={{ color:"#9898B0", background:"rgba(255,255,255,0.05)" }}>
                                <X size={18} />
                            </button>
                        </div>
                        <nav className="flex flex-col gap-1 p-4 flex-1">
                            {NAV.map((item) => (
                                <div key={item.label}>
                                    <a href={item.href ?? "#"}
                                        className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                                        style={{ color:"#9898B0" }}
                                        onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.05)";(e.currentTarget as HTMLElement).style.color="#fff"; }}
                                        onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.background="transparent";(e.currentTarget as HTMLElement).style.color="#9898B0"; }}
                                        onClick={onClose}>
                                        {item.label}
                                        {(item.children || item.columns) && <ChevronDown size={14} />}
                                    </a>
                                    {item.children && (
                                        <div className="ml-4 mt-1 flex flex-col gap-0.5">
                                            {item.children.map((c) => {
                                                const Icon = c.icon;
                                                return (
                                                    <a key={c.label} href={c.href}
                                                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm"
                                                        style={{ color:"#505068" }}
                                                        onClick={onClose}>
                                                        <Icon size={13} style={{ color:"#00A3DF" }} />
                                                        {c.label}
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    )}
                                    {item.columns && (
                                        <div className="ml-4 mt-1 flex flex-col gap-0.5">
                                            {item.columns.flatMap(col => col.items).map((c) => {
                                                const Icon = c.icon;
                                                return (
                                                    <a key={c.label} href={c.href}
                                                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm"
                                                        style={{ color:"#505068" }}
                                                        onClick={onClose}>
                                                        <Icon size={13} style={{ color:"#00A3DF" }} />
                                                        {c.label}
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>
                        <div className="p-6" style={{ borderTop:"1px solid rgba(255,255,255,0.06)" }}>
                            <a href="/contact"
                                className="btn-primary w-full justify-center"
                                style={{ display:"flex" }}>
                                Get in Touch <ArrowRight size={15} />
                            </a>
                            <div className="flex gap-3 mt-4">
                                {portals.map(p => (
                                    <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium"
                                        style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", color:"#505068" }}>
                                        <ExternalLink size={10} />{p.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}

/* ─────────────────────────────────────────
   Main Header
───────────────────────────────────────── */
export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [openKey, setOpenKey]   = useState<string>("");
    const [mobileOpen, setMobileOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll, { passive:true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
                setOpenKey("");
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <>
            <header ref={headerRef} id="global-header"
                className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500"
                style={{
                    background: scrolled ? "rgba(4,4,12,0.92)" : "transparent",
                    backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
                    WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
                    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
                    boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.5)" : "none",
                }}>

                {/* ── Topbar (fades on scroll) ── */}
                <div className="transition-all duration-400 overflow-hidden"
                    style={{ maxHeight: scrolled ? 0 : "40px", opacity: scrolled ? 0 : 1 }}>
                    <div className="container flex items-center justify-between py-2"
                        style={{ borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                        <div className="flex items-center gap-5">
                            <a href="tel:+914466440666"
                                className="flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
                                style={{ color:"#505068" }}
                                onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color="#9898B0"}
                                onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color="#505068"}>
                                <Phone size={11} strokeWidth={2} />
                                +91 44 - 66440666
                            </a>
                            <a href="mailto:info@inetcsc.com"
                                className="hidden sm:flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
                                style={{ color:"#505068" }}
                                onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color="#9898B0"}
                                onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color="#505068"}>
                                <Mail size={11} strokeWidth={2} />
                                info@inetcsc.com
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            {portals.map(p => (
                                <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-[10px] font-semibold px-3 py-1 rounded-full border transition-all duration-200"
                                    style={{ color:"#505068", borderColor:"rgba(255,255,255,0.08)" }}
                                    onMouseEnter={e=>{ (e.currentTarget as HTMLElement).style.color="#00A3DF";(e.currentTarget as HTMLElement).style.borderColor="rgba(0,163,223,0.3)"; }}
                                    onMouseLeave={e=>{ (e.currentTarget as HTMLElement).style.color="#505068";(e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.08)"; }}>
                                    <ExternalLink size={9} />{p.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Main Nav ── */}
                <nav className="container flex items-center justify-between h-16">
                    <Logo />

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-1 relative">
                        {NAV.map((item) => {
                            const hasChildren = !!(item.children || item.columns);
                            const isOpen = openKey === item.key;
                            return (
                                <div key={item.label} className="relative">
                                    {hasChildren ? (
                                        <button
                                            className="nav-link"
                                            onClick={() => setOpenKey(isOpen ? "" : item.key!)}
                                            data-state={isOpen ? "open" : "closed"}>
                                            {item.label}
                                            <ChevronDown size={13} className="transition-transform duration-200"
                                                style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                                        </button>
                                    ) : (
                                        <a href={item.href} className="nav-link">{item.label}</a>
                                    )}
                                    <AnimatePresence>
                                        {isOpen && item.children && (
                                            <DropdownSimple items={item.children} />
                                        )}
                                        {isOpen && item.columns && (
                                            <DropdownMega columns={item.columns} />
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right CTA */}
                    <div className="flex items-center gap-3">
                        <a href="/contact" className="hidden lg:inline-flex btn-primary" id="header-cta">
                            Get in Touch <ArrowRight size={15} />
                        </a>
                        <button
                            id="mobile-menu-toggle"
                            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl transition-all"
                            style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.08)", color:"#9898B0" }}
                            onClick={() => setMobileOpen(true)}
                            aria-label="Open menu">
                            <Menu size={20} />
                        </button>
                    </div>
                </nav>
            </header>

            <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
        </>
    );
}
