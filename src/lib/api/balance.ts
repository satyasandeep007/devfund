import axios from "axios";

import { Alchemy, Network } from "alchemy-sdk";

const alchemyClient = new Alchemy({
  network: Network.BASE_SEPOLIA,
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
});

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

export const getWalletBalancesNftApi = async (address: string) => {
  const response = await axios.get(
    `https://api.covalenthq.com/v1/84532/address/${address}/balances_nft/`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`,
      },
    }
  );

  console.log(response, "response");

  return response.data.data.items;
};

export const getNftsAlchemyApi = async (address: string) => {
  const baseUrl = "https://base-sepolia.g.alchemy.com/v2";
  const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
  const response = await axios.get(
    `${baseUrl}/${apiKey}/getNFTsForOwner?owner=${address}&withMetadata=true&pageSize=100`
  );

  console.log(response.data, "response");

  return response.data;
};

export const getTokensAlchemyApi = async (address: string) => {
  const baseUrl = "https://base-sepolia.g.alchemy.com/v2";
  const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
  const url = `${baseUrl}/${apiKey}`;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const body = JSON.stringify({
    id: 1,
    jsonrpc: "2.0",
    method: "alchemy_getTokenBalances",
    params: [
      address, // Use the dynamic address parameter
      "erc20",
    ],
  });

  const response = await axios.post(url, body, { headers }); // Corrected syntax

  console.log(response.data, "response"); // Log the response data

  return response.data?.result?.tokenBalances || []; // Return only the data
};

const getTokenMetaData = async (tokenAddress: string) => {
  const tokenMetaData = await alchemyClient?.core?.getTokenMetadata(
    tokenAddress
  );
  return tokenMetaData;
};

export const getWalletBalancesCore = async (address: string) => {
  const _tokenBalance = await alchemyClient?.core?.getBalance(address);
  const _tokenBalances = await alchemyClient?.core?.getTokenBalances(address);

  const promises = await _tokenBalances?.tokenBalances.map(
    async (item: any) => {
      const metaData: any = await getTokenMetaData(item.contractAddress);
      if (metaData) {
        const amount = item.tokenBalance / Math.pow(10, metaData.decimals);
        item.amount = amount.toFixed(2);
        delete item.tokenBalance;
        // delete metaData.logo;
      }
      return { ...item, ...metaData };
    }
  );

  const tokenBalancesNew = await Promise.all(promises);

  const nativeTokenBalance = {
    contractAddress: "0x00000000000000000000000000",
    amount: (
      parseInt(BigInt(_tokenBalance?._hex).toString()) / Math.pow(10, 18)
    ).toFixed(2),
    decimals: 18,
    name: "Native Token",
    symbol: "ETH",
  };
  const newTokenBalances = [...tokenBalancesNew, nativeTokenBalance];
  return newTokenBalances;
};

export const getWalletNftsCore = async (address: string) => {
  const _nftBalances = await alchemyClient?.nft.getNftsForOwner(address);
  const formattedNftBalances = _nftBalances?.ownedNfts.map((i: any) => {
    const balance = i?.balance;
    const name = i?.contract?.name;
    const symbol = i?.contract?.symbol;
    const hash = i?.mint?.transactionHash;
    const address = i?.contract?.address;
    const mintAddress = i?.mint?.mintAddress;
    const tokenType = i?.tokenType;
    const tokenId = i?.tokenId;
    const timeLastUpdated = i?.timeLastUpdated;
    const _raw = i;
    return {
      name,
      address,
      mintAddress,
      tokenType,
      balance,
      tokenId,
      _raw,
      symbol,
      hash,
      timeLastUpdated,
    };
  });
  return formattedNftBalances;
};
