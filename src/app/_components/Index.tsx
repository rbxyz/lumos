import { useState } from "react";
import { BootSequence } from "@/components/Terminal/BootSequence";
import { TerminalHeader } from "@/components/Terminal/TerminalHeader";
import { MarketTicker } from "@/components/Terminal/MarketTicker";
import { Portfolio } from "@/components/Terminal/Portfolio";
import { CommandInput } from "@/components/Terminal/CommandInput";
import { CommandOutput } from "@/components/Terminal/CommandOutput";

const Index = () => {
  const [booted, setBooted] = useState(false);
  const [commands, setCommands] = useState<Array<{ input: string; output: string }>>([]);

  const handleCommand = (input: string) => {
    const lowerInput = input.toLowerCase().trim();
    let output = "";

    switch (lowerInput) {
      case "help":
        output = `Available commands:
  help       - Exibir esta mensagem de ajuda
  status     - Exibir status do sistema
  portfolio  - Exibir resumo do portfólio
  clear      - Limpar histórico de comandos
  about      - Sobre Lumos Terminal`;
        break;
      case "status":
        output = `System Status:
  Terminal: ONLINE
  Market Feed: ACTIVE
  Database: CONNECTED
  API Status: OPERATIONAL
  Latency: 12ms`;
        break;
      case "portfolio":
        output = `Portfolio carregado. Ver o painel de portfólio acima para detalhes.`;
        break;
      case "clear":
        setCommands([]);
        return;
      case "about":
        output = `LUMOS Terminal v1.0.0
Plataforma de Finanças
Desenvolvido para traders e investidores
Digite 'help' para ver os comandos disponíveis`;
        break;
      default:
        output = `Comando não encontrado: ${input}
Digite 'help' para ver os comandos disponíveis`;
    }

    setCommands((prev) => [...prev, { input, output }]);
  };

  if (!booted) {
    return <BootSequence onComplete={() => setBooted(true)} />;
  }

  return (
    <div className="min-h-screen bg-background scanlines">
      <div className="crt-flicker">
        <TerminalHeader />
        <div className="p-6 space-y-6 max-w-[1800px] mx-auto">
          <MarketTicker />
          <div className="grid lg:grid-cols-2 gap-6">
            <Portfolio />
            <div className="space-y-6">
              <CommandInput onCommand={handleCommand} />
              <CommandOutput commands={commands} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
