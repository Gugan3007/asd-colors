/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Singleton Prisma Client — prevents hot-reload from spawning
 * multiple connections in development.
 * Wraps instantiation in try/catch so the module resolves even
 * when `prisma generate` hasn't been run yet (no DATABASE_URL).
 */

type AnyPrisma = any;

const globalForPrisma = globalThis as unknown as { prisma: AnyPrisma | undefined };

function makePrisma(): AnyPrisma {
    try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { PrismaClient } = require("@prisma/client");
        return new PrismaClient();
    } catch {
        console.warn("[Prisma] Client not available — DB features disabled.");
        return null;
    }
}

export const prisma: AnyPrisma = globalForPrisma.prisma ?? makePrisma();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
