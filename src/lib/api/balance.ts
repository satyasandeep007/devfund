import axios from "axios";

export const getWalletBalancesApi = async (address: string) => {
  const response = await axios.get(
    `https://api.covalenthq.com/v1/84532/address/${address}/balances_v2/`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`,
      },
    }
  );

  const tokens = response.data.data.items.filter((item: any) => !item.nft_data);
  const nfts = response.data.data.items.filter((item: any) => item.nft_data);

  return {
    tokens,
    nfts,
  };
};
