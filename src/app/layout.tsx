import "@/global.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TRPCReactProvider } from "@/app/providers";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        {/* ThemeProvider fornece useTheme() no cliente (ex.: Toaster Sonner) */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


