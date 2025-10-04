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
  help       - Display this help message
  status     - Show system status
  portfolio  - Display portfolio summary
  clear      - Clear command history
  about      - About Lumos Terminal`;
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
        output = `Portfolio loaded. Check the Portfolio panel above for details.`;
        break;
      case "clear":
        setCommands([]);
        return;
      case "about":
        output = `LUMOS Terminal v3.14.159
Financial Intelligence Platform
Built for traders and investors
Type 'help' for available commands`;
        break;
      default:
        output = `Command not found: ${input}
Type 'help' for available commands`;
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
