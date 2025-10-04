import { publicProcedure, t } from "@/server/api/trpc";

export const healthRouter = t.router({
    ping: publicProcedure.query(() => ({ ok: true, ts: new Date().toISOString() })),
});


