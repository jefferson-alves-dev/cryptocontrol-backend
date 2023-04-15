const coinConversionUrl = (
  idCoinToConvert: Array<number>,
  idBaseCoin: number
) => {
  return `https://api.coinmarketcap.com/data-api/v3/cryptocurrency/quote/latest?id=${idCoinToConvert.join(
    ','
  )}&convertId=${idBaseCoin}`;
};

export default coinConversionUrl;
