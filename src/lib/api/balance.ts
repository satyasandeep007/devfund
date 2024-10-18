import { Alchemy, Network } from "alchemy-sdk";

const alchemyClient: any = new Alchemy({
  network: Network.BASE_SEPOLIA,
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
});

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
  return newTokenBalances.filter((i) => i.symbol !== "USDC");
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

  // Sort by timeLastUpdated and limit to top 3 records
  return formattedNftBalances
    .sort((a: any, b: any) => b.timeLastUpdated - a.timeLastUpdated) // Sort in descending order
    .slice(0, 3); // Limit to top 3 records
};
export const getLatestTransactionsApiFrom = async (address: string) => {
  const responseFrom = await alchemyClient?.core?.getAssetTransfers({
    fromBlock: "0x0",
    toBlock: "latest",
    fromAddress: address,
    category: ["erc20", "erc721", "erc1155", "external"],
    maxCount: 3,
    order: "desc",
  });

  const responseTo = await alchemyClient?.core?.getAssetTransfers({
    fromBlock: "0x0",
    toBlock: "latest",
    toAddress: address,
    category: ["erc20", "erc721", "erc1155", "external", "specialnft"],
    maxCount: 3,
    order: "desc",
  });

  return [...responseFrom.transfers, ...responseTo.transfers];
};
