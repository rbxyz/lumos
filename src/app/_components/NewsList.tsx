"use client";
import useSWR from "swr";

type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  source: string;
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function NewsList() {
  // SWR para cache e revalidação automática
  const { data, error, isLoading } = useSWR<{ items: NewsItem[] }>("/api/news", fetcher, {
    refreshInterval: 60_000, // 1 min
    revalidateOnFocus: false,
  });

  if (isLoading) return <div className="text-sm text-muted-foreground">Carregando notícias…</div>;
  if (error) return <div className="text-sm text-destructive">Falha ao carregar notícias.</div>;

  const items = data?.items ?? [];
  if (!items.length) return <div className="text-sm text-muted-foreground">Sem notícias no momento.</div>;

  return (
    <ul className="space-y-3">
      {items.map((n) => (
        <li key={n.id} className="border border-border rounded-md p-3 bg-card/40">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-glow">{n.title}</h3>
            <span className="text-xs text-muted-foreground">{n.source}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{n.excerpt}</p>
        </li>
      ))}
    </ul>
  );
}


