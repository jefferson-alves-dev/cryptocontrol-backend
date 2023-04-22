import { TypeCoinCMC } from '../../types/CoinMarketCap';

export default function extractCryptoCoinPrice(
  cryptoPrices: TypeCoinCMC[],
  coinIdInCoinMarketCap: number
) {
  for (const crypto of cryptoPrices) {
    if (crypto.id === coinIdInCoinMarketCap) {
      return crypto.quotes[0].price;
    }
  }
  return 0;
}
