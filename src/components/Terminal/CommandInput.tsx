import { useState, useRef, useEffect } from "react";
import { Terminal } from "lucide-react";

interface CommandInputProps {
  onCommand: (command: string) => void;
}

export const CommandInput = ({ onCommand }: CommandInputProps) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input);
      setHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div className="border border-primary/30 rounded bg-card/50 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Terminal className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-bold uppercase tracking-wider text-glow">
          Command Interface
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <span className="text-accent text-sm">root@lumos:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-primary font-mono text-sm placeholder:text-muted-foreground"
          placeholder="Type 'help' for available commands"
        />
        <span className="animate-blink text-primary">█</span>
      </form>
    </div>
  );
};
