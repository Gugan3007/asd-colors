"use client";

import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2.5 group select-none" id="site-logo">
            {/* Spiral icon */}
            <div className="relative w-9 h-9 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path
                        d="M 15 85 L 15 15 L 85 15 L 85 85 L 25 85 L 25 25 L 75 25 L 75 75 L 35 75 L 35 35 L 65 35 L 65 65 L 45 65 L 45 45 L 55 45 L 55 55"
                        fill="none"
                        stroke="#EE6C4D"
                        strokeWidth="11"
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                    />
                </svg>
            </div>
            {/* Wordmark */}
            <span className="text-2xl font-black lowercase tracking-[-0.04em]"
                style={{ color:"#00A3DF", letterSpacing:"-0.03em" }}>
                inet
            </span>
        </Link>
    );
}
