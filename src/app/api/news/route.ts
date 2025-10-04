import { NextResponse } from "next/server";

// Fonte: Spaceflight News API (https://api.spaceflightnewsapi.net/v4/)
// É aberta, sem chave e permite CORS.
export async function GET() {
    try {
        const res = await fetch("https://api.spaceflightnewsapi.net/v4/articles/?limit=10", {
            // Nota: no ambiente server do Next, fetch já é nativo e usa HTTP/2 quando possível
            next: { revalidate: 60 },
        });
        if (!res.ok) throw new Error(`status ${res.status}`);
        const json = await res.json();
        const items = (json?.results ?? []).map((a: any) => ({
            id: String(a.id),
            title: a.title as string,
            // recorta 30 caracteres do resumo
            excerpt: String(a.summary ?? "").slice(0, 30),
            source: a.news_site as string,
        }));
        return NextResponse.json({ items });
    } catch (err) {
        // Evita vazar erro bruto para o cliente
        return NextResponse.json({ items: [] }, { status: 200 });
    }
}


