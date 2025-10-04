import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

interface PortfolioItem {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
}

const mockPortfolio: PortfolioItem[] = [
  {
    symbol: "PETR4",
    name: "Petrobras PN",
    quantity: 100,
    avgPrice: 35.2,
    currentPrice: 38.42,
  },
  {
    symbol: "VALE3",
    name: "Vale ON",
    quantity: 50,
    avgPrice: 68.5,
    currentPrice: 65.33,
  },
  {
    symbol: "ITUB4",
    name: "Itaú Unibanco PN",
    quantity: 150,
    avgPrice: 27.8,
    currentPrice: 28.91,
  },
];

export const Portfolio = () => {
  const calculateReturn = (item: PortfolioItem) => {
    const cost = item.avgPrice * item.quantity;
    const current = item.currentPrice * item.quantity;
    const profit = current - cost;
    const percentage = (profit / cost) * 100;
    return { profit, percentage };
  };

  const totalInvested = mockPortfolio.reduce(
    (sum, item) => sum + item.avgPrice * item.quantity,
    0
  );
  const totalCurrent = mockPortfolio.reduce(
    (sum, item) => sum + item.currentPrice * item.quantity,
    0
  );
  const totalProfit = totalCurrent - totalInvested;
  const totalProfitPercent = (totalProfit / totalInvested) * 100;

  return (
    <div className="border border-primary/30 rounded bg-card/50 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-glow">
            Portfolio
          </h2>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Valor total</div>
          <div className="text-lg font-bold text-primary">
            R$ {totalCurrent.toFixed(2)}
          </div>
          <div
            className={`text-xs flex items-center gap-1 justify-end ${
              totalProfit >= 0 ? "text-accent" : "text-destructive"
            }`}
          >
            {totalProfit >= 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {totalProfit >= 0 ? "+" : ""}
            {totalProfitPercent.toFixed(2)}%
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {mockPortfolio.map((item) => {
          const { profit, percentage } = calculateReturn(item);
          return (
            <div
              key={item.symbol}
              className="border border-primary/20 rounded p-3 bg-background/50 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-bold text-primary">{item.symbol}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.name}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-primary">
                    R$ {item.currentPrice.toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.quantity} ações
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="text-muted-foreground">
                  Avg: R$ {item.avgPrice.toFixed(2)}
                </div>
                <div
                  className={`flex items-center gap-1 ${
                    profit >= 0 ? "text-accent" : "text-destructive"
                  }`}
                >
                  {profit >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>
                    {profit >= 0 ? "+" : ""}R$ {profit.toFixed(2)} (
                    {percentage.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
