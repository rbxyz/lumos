import "@/index.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TRPCReactProvider } from "@/app/providers";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}


