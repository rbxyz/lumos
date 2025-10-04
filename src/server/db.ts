import { PrismaClient } from "@prisma/client";

declare global {
    // eslint-disable-next-line no-var
    var prismaGlobal: PrismaClient | undefined;
}

export const prisma: PrismaClient = globalThis.prismaGlobal ?? new PrismaClient({
    log: ["error", "warn"],
});

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;


