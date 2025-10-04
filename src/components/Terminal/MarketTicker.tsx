import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TickerData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

const mockData: TickerData[] = [
  { symbol: "PETR4", price: 38.42, change: 0.85, changePercent: 2.26 },
  { symbol: "VALE3", price: 65.33, change: -1.22, changePercent: -1.83 },
  { symbol: "ITUB4", price: 28.91, change: 0.34, changePercent: 1.19 },
  { symbol: "BBDC4", price: 18.45, change: -0.12, changePercent: -0.65 },
  { symbol: "WEGE3", price: 42.18, change: 1.05, changePercent: 2.55 },
  { symbol: "ABEV3", price: 12.67, change: 0.21, changePercent: 1.68 },
];

export const MarketTicker = () => {
  const [data, setData] = useState(mockData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) =>
        prevData.map((item) => {
          const change = (Math.random() - 0.5) * 0.5;
          const newPrice = item.price + change;
          const newChange = item.change + change;
          const newChangePercent = (newChange / (newPrice - newChange)) * 100;
          return {
            ...item,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-primary/30 rounded bg-card/50 p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-primary shadow-glow animate-pulse"></div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-glow">
          Feed de mercado em tempo real
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {data.map((item) => (
          <div
            key={item.symbol}
            className="border border-primary/20 rounded p-3 bg-background/50 hover:border-primary/50 transition-colors"
          >
            <div className="text-xs text-muted-foreground mb-1">
              {item.symbol}
            </div>
            <div className="text-lg font-bold text-primary mb-1">
              {item.price.toFixed(2)}
            </div>
            <div
              className={`flex items-center gap-1 text-xs ${
                item.change >= 0 ? "text-accent" : "text-destructive"
              }`}
            >
              {item.change >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>
                {item.change >= 0 ? "+" : ""}
                {item.changePercent.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
