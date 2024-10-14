import axios from "axios";

export const getMarketPricesApi = async () => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=usd-coin,ethereum&vs_currencies=usd"
  );

  const ethPriceInUSD = response.data.ethereum.usd;
  const usdcPriceInUSD = response.data["usd-coin"].usd;

  return {
    ethPriceInUSD,
    usdcPriceInUSD,
  };
};
