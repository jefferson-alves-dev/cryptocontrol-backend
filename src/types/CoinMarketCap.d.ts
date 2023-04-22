export type CoinQuoteCMC = {
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

export type CoinCMC = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  lastUpdatedTime: string;
  quotes: CoinQuoteCMC[];
};

export type CoinsCMC = CoinCMC[];

module.exports = {};
