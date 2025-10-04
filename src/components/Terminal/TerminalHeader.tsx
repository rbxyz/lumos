import { useEffect, useState } from "react";

export const TerminalHeader = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="border-b border-primary/30 p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive shadow-glow-sm"></div>
          <div className="w-3 h-3 rounded-full bg-accent shadow-glow-sm"></div>
          <div className="w-3 h-3 rounded-full bg-primary shadow-glow"></div>
        </div>
        <h1 className="text-xl font-bold text-glow uppercase tracking-wider">
          LUMOS TERMINAL
        </h1>
      </div>
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">SYS:</span>
          <span className="text-primary">ONLINE</span>
          <span className="w-2 h-2 rounded-full bg-primary shadow-glow animate-pulse"></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">TIME:</span>
          <span className="text-primary font-mono">
            {time.toLocaleTimeString("en-US", { hour12: false })}
          </span>
        </div>
      </div>
    </div>
  );
};
