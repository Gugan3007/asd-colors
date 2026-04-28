"use client";

import { useEffect, useActionState, useRef } from "react";
import { useFormStatus } from "react-dom";
import toast, { Toaster } from "react-hot-toast";
import { submitContact, type ContactFormState } from "@/app/actions/submitContact";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Phone, Mail, MapPin } from "lucide-react";

/* ── Floating Label Input ── */
function FloatingInput({
    id,
    name,
    type = "text",
    label,
    error,
    required,
}: {
    id: string;
    name: string;
    type?: string;
    label: string;
    error?: string[];
    required?: boolean;
}) {
    return (
        <div className="relative w-full">
            <input
                id={id}
                name={name}
                type={type}
                required={required}
                placeholder=" "
                className="peer w-full px-4 pt-6 pb-2 rounded-xl text-white text-sm outline-none transition-all duration-300 placeholder-transparent"
                style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${error ? "#EF4444" : "rgba(255,255,255,0.1)"}`,
                }}
                onFocus={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = "#00A3DF"; (e.currentTarget as HTMLInputElement).style.background = "rgba(0,163,223,0.05)"; }}
                onBlur={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = error ? "#EF4444" : "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLInputElement).style.background = "rgba(255,255,255,0.04)"; }}
            />
            <label
                htmlFor={id}
                className="absolute left-4 top-4 text-sm pointer-events-none transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-xs"
                style={{ color: error ? "#EF4444" : "#71717A" }}
            >
                {label}{required && " *"}
            </label>
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="mt-1 text-xs" style={{ color: "#EF4444" }}
                    >
                        {error[0]}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ── Floating Label Textarea ── */
function FloatingTextarea({ id, name, label, error, required }: {
    id: string; name: string; label: string; error?: string[]; required?: boolean;
}) {
    return (
        <div className="relative w-full">
            <textarea
                id={id}
                name={name}
                required={required}
                placeholder=" "
                rows={5}
                className="peer w-full px-4 pt-6 pb-2 rounded-xl text-white text-sm outline-none transition-all duration-300 placeholder-transparent resize-none"
                style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${error ? "#EF4444" : "rgba(255,255,255,0.1)"}`,
                }}
                onFocus={(e) => { (e.currentTarget as HTMLTextAreaElement).style.borderColor = "#00A3DF"; (e.currentTarget as HTMLTextAreaElement).style.background = "rgba(0,163,223,0.05)"; }}
                onBlur={(e) => { (e.currentTarget as HTMLTextAreaElement).style.borderColor = error ? "#EF4444" : "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLTextAreaElement).style.background = "rgba(255,255,255,0.04)"; }}
            />
            <label
                htmlFor={id}
                className="absolute left-4 top-4 text-sm pointer-events-none transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-xs"
                style={{ color: error ? "#EF4444" : "#71717A" }}
            >
                {label}{required && " *"}
            </label>
            <AnimatePresence>
                {error && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="mt-1 text-xs" style={{ color: "#EF4444" }}>
                        {error[0]}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ── Submit Button ── */
function SubmitBtn() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm text-white transition-all duration-300 disabled:opacity-70"
            style={{
                background: pending ? "#1a1a2e" : "linear-gradient(135deg, #00A3DF, #0077A3)",
                boxShadow: pending ? "none" : "0 0 24px rgba(0,163,223,0.3)",
            }}
        >
            {pending ? <Loader2 size={18} className="animate-spin" /> : <Send size={16} />}
            {pending ? "Sending..." : "Send Message"}
        </button>
    );
}

const contactInfo = [
    { icon: Phone, label: "Call Us", value: "+91 44 - 66440666" },
    { icon: Mail, label: "Email Us", value: "info@inetcsc.com" },
    { icon: MapPin, label: "Location", value: "Chennai, Tamil Nadu, India" },
];

const initialState: ContactFormState = { success: false };

export default function ContactSection() {
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction] = useActionState(submitContact, initialState);

    useEffect(() => {
        if (state.success) {
            toast.success("Message sent! We'll respond within 24 hours.", {
                duration: 5000,
                style: { background: "#111118", color: "#fff", border: "1px solid rgba(16,185,129,0.3)" },
                iconTheme: { primary: "#10B981", secondary: "#111118" },
            });
            formRef.current?.reset();
        } else if (state.error) {
            toast.error(state.error, {
                style: { background: "#111118", color: "#fff", border: "1px solid rgba(239,68,68,0.3)" },
            });
        }
    }, [state]);

    return (
        <section
            id="contact"
            className="relative section-spacing overflow-hidden"
            style={{ background: "linear-gradient(180deg, #080818 0%, #04040C 100%)" }}
        >
            {/* Toaster */}
            <Toaster position="top-right" />

            {/* Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full opacity-[0.04] pointer-events-none"
                style={{ background: "radial-gradient(circle, #00A3DF, transparent 70%)" }} />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full opacity-[0.04] pointer-events-none"
                style={{ background: "radial-gradient(circle, #EE6C4D, transparent 70%)" }} />

            <div className="relative z-10 container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7 }}
                    className="mb-12 sm:mb-16 text-center"
                >
                    <p className="section-label">Get In Touch</p>
                    <h2 className="section-title">
                        Start Your{" "}
                        <span className="grad-blue">
                            Digital Journey
                        </span>
                    </h2>
                    <p className="section-body mt-4 max-w-xl mx-auto">
                        Talk to our experts about your e-Governance, surveillance, or IT integration needs.
                    </p>
                </motion.div>

                <div 
                    className="lg:grid lg:grid-cols-[1fr_1.4fr]" 
                    style={{ gap: "3rem", display: "grid" }}
                >
                    {/* Left: Contact info */}
                    <motion.div
                        initial={{ opacity: 0, x: -32 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="flex flex-col"
                        style={{ gap: "1.25rem" }}
                    >
                        {contactInfo.map((info) => (
                            <div
                                key={info.label}
                                className="flex items-center gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl"
                                style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.07)" }}
                            >
                                <div
                                    className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ background: "rgba(0,163,223,0.12)" }}
                                >
                                    <info.icon size={20} style={{ color: "#00A3DF" }} />
                                </div>
                                <div>
                                    <div className="text-[11px] sm:text-xs uppercase tracking-widest mb-1" style={{ color: "#71717A" }}>{info.label}</div>
                                    <div className="text-sm sm:text-base font-bold text-white">{info.value}</div>
                                </div>
                            </div>
                        ))}

                        {/* Map embed placeholder */}
                        <div
                            className="rounded-2xl overflow-hidden mt-2"
                            style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.07)", height: "220px", display: "block" }}
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.7!2d80.2707!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA0JzU3LjciTiA4MMKwMTYnMTQuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="I-Net Location"
                            />
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 32 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        <form
                            ref={formRef}
                            action={formAction}
                            className="p-6 sm:p-8 rounded-2xl"
                            style={{ 
                                background: "#111118", 
                                border: "1px solid rgba(255,255,255,0.07)",
                                display: "flex",
                                flexDirection: "column",
                                gap: "1.25rem"
                            }}
                        >
                            <div className="sm:grid sm:grid-cols-2" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                                <FloatingInput id="name" name="name" label="Full Name" required error={state.fieldErrors?.name} />
                                <FloatingInput id="email" name="email" type="email" label="Email Address" required error={state.fieldErrors?.email} />
                            </div>
                            <div className="sm:grid sm:grid-cols-2" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                                <FloatingInput id="phone" name="phone" type="tel" label="Phone (optional)" />
                                <FloatingInput id="subject" name="subject" label="Subject" required error={state.fieldErrors?.subject} />
                            </div>
                            <FloatingTextarea id="message" name="message" label="Your Message" required error={state.fieldErrors?.message} />
                            
                            <div style={{ marginTop: "0.5rem" }}>
                                <SubmitBtn />
                            </div>
                            
                            <p className="text-center text-[11px] sm:text-xs line-clamp-1 mt-1" style={{ color: "#71717A" }}>
                                🔒 Your information is encrypted and never shared.
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
