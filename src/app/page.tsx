"use client";
import { Globe } from "@/app/_components/Globe";
import { FramerGlobe } from "@/app/_components/FramerGlobe";
import { NewsList } from "@/app/_components/NewsList";

export default function Page() {
  return (
    <main className="min-h-screen bg-background scanlines relative">
      {/* Globo em tela cheia como camada de fundo */}
      <div className="absolute inset-0">
        {process.env.NEXT_PUBLIC_FRAMER_GLOBE_URL ? (
          <FramerGlobe src={process.env.NEXT_PUBLIC_FRAMER_GLOBE_URL} />
        ) : (
          <Globe />
        )}
      </div>

      {/* Conteúdo sobreposto */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <section>
            <h1 className="text-3xl md:text-4xl font-bold text-glow">LUMOS HOME</h1>
            <div className="mt-6 perspective-1000">
              <div className="rotate-sync-y inline-block">
                <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Notícias</h2>
                <NewsList />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}


