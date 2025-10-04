import { useEffect, useState } from "react";

const bootMessages = [
  "INITIALIZING LUMOS TERMINAL v1.0.0...",
  "LOADING MARKET DATA MODULES...",
  "CONNECTING TO FINANCIAL NETWORKS...",
  "ESTABLISHING SECURE CONNECTION...",
  "LOADING PORTFOLIO MANAGER...",
  "INITIALIZING REAL-TIME FEEDS...",
  "SYSTEM READY.",
];

export const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < bootMessages.length) {
      const timer = setTimeout(() => {
        setMessages((prev) => [...prev, bootMessages[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      const completeTimer = setTimeout(onComplete, 500);
      return () => clearTimeout(completeTimer);
    }
  }, [currentIndex, onComplete]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-2xl space-y-2">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-glow-lg mb-2 text-glitch">
            LUMOS
          </h1>
          <p className="text-muted-foreground text-sm">
            Financial Intelligence Terminal
          </p>
        </div>
        {messages.map((message, index) => (
          <div
            key={index}
            className="text-sm text-primary animate-terminal-boot"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="text-accent">{">"}</span> {message}
            {index === messages.length - 1 && (
              <span className="animate-blink ml-1">█</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
