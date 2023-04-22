import axios from 'axios';
import { TypeCoinQuoteCMC } from '../../types/CoinMarketCap';

type TypeCurrencyPrice = {
  [key: string]: number;
};

export const coinmarketcapLatestQuoteResponse = async (
  contributionSymbolIdInCoinMarketCap: number
): Promise<TypeCurrencyPrice | false> => {
  try {
    const response = await axios.get(
      `https://api.coinmarketcap.com/data-api/v3/cryptocurrency/quote/latest?id=${contributionSymbolIdInCoinMarketCap}&convertId=2781,2782,2783,2784,2785,2786,2787,2788,2789,2790,2791,2792,2793,2794,2795,2796,2797,2798,2799,2800,2801,2802,2803,2804,2805,2806,2807,2808,2809,2810,2811,2812,2823,3554,3544,2821,2817,2824,2819,2813,2820,3538,3566,3530,3540,2814,3573,1,1027,2010,1839,6636,52,1975,2,512,1831,7083,74,9023,9022,5824,6783,11841,11840`,
      {
        timeout: Number(process.env.AXIOS_REQUEST_TIMEOUT),
      }
    );
    const { quotes } = response.data.data[0];
    const currentPrices = quotes.reduce(
      (obj: Record<string, number>, quote: TypeCoinQuoteCMC) => {
        obj[quote.name] = quote.price;
        return obj;
      },
      {} as TypeCurrencyPrice
    );
    return currentPrices;
  } catch (error) {
    return false;
  }
};
