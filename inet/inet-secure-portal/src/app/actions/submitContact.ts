"use server";

import { z } from "zod";

const ContactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().optional(),
    subject: z.string().min(3, "Subject must be at least 3 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormState = {
    success: boolean;
    error?: string;
    fieldErrors?: Partial<Record<keyof z.infer<typeof ContactSchema>, string[]>>;
};

export async function submitContact(
    _prev: ContactFormState,
    formData: FormData
): Promise<ContactFormState> {
    const raw = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: (formData.get("phone") as string) || undefined,
        subject: formData.get("subject") as string,
        message: formData.get("message") as string,
    };

    // ── Server-side Zod validation ──
    const parsed = ContactSchema.safeParse(raw);
    if (!parsed.success) {
        return { success: false, fieldErrors: parsed.error.flatten().fieldErrors };
    }

    // ── Prisma write (lazy import — gracefully degrades without a live DB) ──
    try {
        const { prisma } = await import("@/lib/prisma");
        // ContactMessage model: fullName field per schema.prisma
        await (prisma as any).contactMessage.create({
            data: {
                fullName: parsed.data.name,
                email: parsed.data.email,
                phone: parsed.data.phone ?? null,
                subject: parsed.data.subject,
                message: parsed.data.message,
                status: "UNREAD",
            },
        });
    } catch (err) {
        // DB not connected → log & succeed for UX (dev mode safety)
        console.info("[Contact] DB unavailable, message not persisted:", raw, err);
    }

    return { success: true };
}
