import { type DefaultSession, type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/server/db";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
        } & DefaultSession["user"];
    }
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: { strategy: "database" },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
            },
            async authorize(credentials) {
                if (!credentials?.email) return null;
                const user = await prisma.user.upsert({
                    where: { email: credentials.email },
                    update: {},
                    create: { email: credentials.email },
                });
                return user;
            },
        }),
    ],
    callbacks: {
        session: async ({ session, user }) => {
            if (session.user) session.user.id = user.id;
            return session;
        },
    },
};


