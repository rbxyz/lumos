interface CommandOutputProps {
  commands: Array<{ input: string; output: string }>;
}

export const CommandOutput = ({ commands }: CommandOutputProps) => {
  if (commands.length === 0) return null;

  return (
    <div className="border border-primary/30 rounded bg-card/50 p-4 space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-primary shadow-glow"></div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-glow">
          Output
        </h2>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {commands.map((cmd, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-start gap-2 text-sm">
              <span className="text-accent">{">"}</span>
              <span className="text-primary">{cmd.input}</span>
            </div>
            <div className="pl-4 text-sm text-muted-foreground whitespace-pre-wrap">
              {cmd.output}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
