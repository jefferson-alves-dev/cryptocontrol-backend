export type TypeCoinQuoteCMC = {
  name: string;
  price: number;
  percentChange1h: number;
  percentChange24h: number;
  percentChange7d: number;
  percentChange30d: number;
  percentChange60d: number;
  percentChange90d: number;
  lastUpdatedTime: string;
};

type TypeCoinStatusCMC = {
  timestamp: Date;
  error_code: string;
  error_message: string;
  elapsed: string;
  credit_count: number;
};

export type TypeCoinCMC = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  lastUpdatedTime: string;
  quotes: CoinQuoteCMC[];
  status: TypeCoinStatusCMC;
};
