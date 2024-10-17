"use client";

import React, { useState, useEffect } from "react";
import {
  IconArrowsUpDown,
  IconPlus,
  IconChevronDown,
  IconArrowDown,
  IconArrowUp,
  IconChevronRight,
  IconCornerUpRight,
} from "@tabler/icons-react";

import { useAccount } from "wagmi";
import { useDevFund } from "@/context/DevFundContext";
import Image from "next/image";

const CryptoWalletDashboard: React.FC = () => {
  const {
    tokenBalances,
    nftBalances,
    ethMarketPrice,
    usdcMarketPrice,
    recentTxns,
  } = useDevFund();
  const { address } = useAccount();

  const [usdcBalance, setUSDCBalance] = useState("0");
  const [ethBalance, setETHBalance] = useState("0");

  console.log(tokenBalances, "tokenBalances");
  console.log(nftBalances, "nftBalances");
  console.log(recentTxns, "recentTxns");

  useEffect(() => {
    if (tokenBalances && tokenBalances.length > 0) {
      const _usdcBal = tokenBalances?.find((i) => i.symbol === "TRNSK")?.amount;

      setUSDCBalance(_usdcBal);
    }
  }, [tokenBalances]);

  return (
    <div className="bg-white p-6">
      <div className="grid grid-cols-3 gap-6">
        {/* My Wallet Section */}
        <div className="bg-gradient-to-tr from-blue-700 to-purple-500 rounded-xl p-6 flex flex-col items-center text-center">
          <p className="text-lg font-bold m-2 text-white">My Wallet</p>
          <h2 className="text-6xl font-bold mt-4 text-white">
            {parseFloat(usdcBalance)} USDC
          </h2>

          <p className="text-sm mb-4 mt-4 text-white">
            USD {(parseFloat(usdcBalance) * usdcMarketPrice).toFixed(2)}
          </p>
          <div className="flex space-x-4 mb-4">
            <div className="bg-black text-white rounded-full flex border-t border-b border-blue-700">
              <button className="p-2 border rounded-full border-blue-700">
                <IconArrowDown className="h-6 w-6" />
              </button>
              <button className="p-2 rounded-full border-r border-blue-700">
                <IconArrowUp className="h-6 w-6" />
              </button>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-full">
              <IconPlus className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        {/* Cryptocurrency Prices Live */}
        <div className="col-span-1 bg-blue-100/20 rounded-xl p-6 border border-blue-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Tokens</h2>
          </div>
          {tokenBalances && tokenBalances.length > 0 ? (
            tokenBalances.map((token) => (
              <div
                key={token.contractAddress}
                className="flex justify-between items-center mb-4"
              >
                <div className="flex items-center">
                  <Image
                    src={
                      "https://via.placeholder.com/150/0000FF/FFFFFF?text=" +
                      token.symbol
                    }
                    alt={token.contractAddress}
                    className="w-8 h-8 rounded-full mr-3"
                    width={20}
                    height={20}
                  />
                  <div>
                    <p className="font-semibold">
                      {token.symbol.toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {token.contractAddress}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-normal text-lg">
                    {token.amount} {/* Adjust decimals as needed */}
                  </p>
                  <p className="text-xs text-gray-500">
                    {token.symbol === "TRNSK"
                      ? (token.amount * usdcMarketPrice).toFixed(2)
                      : token.symbol === "ETH"
                      ? (token.amount * ethMarketPrice).toFixed(2)
                      : "0.00"}
                    USD
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No Tokens owned.</p>
          )}
        </div>

        {/* NFT Section */}
        <div className="col-span-1 bg-blue-100/20 rounded-xl p-6 border border-blue-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">NFTs</h2>
          </div>
          {nftBalances && nftBalances.length > 0 ? (
            nftBalances.map((nft) => (
              <div
                key={nft.tokenId}
                className="flex justify-between items-center mb-4"
              >
                <div className="flex items-center">
                  <Image
                    src={
                      "https://via.placeholder.com/150/0000FF/FFFFFF?text=" +
                      nft.symbol
                    } // Updated to goof placeholder image
                    alt={nft.symbol || "Unnamed NFT"}
                    className="w-12 h-12 rounded-lg mr-3 object-cover"
                    width={20}
                    height={20}
                  />
                  <div>
                    <p className="font-semibold">
                      {nft.symbol || "Unnamed NFT"}
                    </p>
                    <p className="text-xs text-gray-500 italic">{nft.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-normal text-lg">{nft.balance} NFT</p>
                  <p className="text-xs text-gray-500">
                    Token ID: {nft.tokenId}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No NFTs owned.</p>
          )}
        </div>

        {/* Wallet Transactions Section */}
        <div className="col-span-2 bg-blue-100/20 rounded-xl p-6 border border-blue-100">
          <h2 className="text-lg font-semibold mb-6">Recent Transactions</h2>

          {recentTxns && recentTxns.length > 0 ? (
            recentTxns.map((transaction) => (
              <div
                key={transaction.uniqueId}
                className="flex justify-between items-center mb-4 p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center">
                  {/* Sent/Received Icon */}
                  {transaction.from === address ? (
                    <IconArrowUp className="h-5 w-5 text-green-500 mr-2" />
                  ) : (
                    <IconArrowDown className="h-5 w-5 text-red-500 mr-2" />
                  )}
                  <div>
                    <p className="font-semibold">
                      {transaction.from === address ? "Sent" : "Received"}{" "}
                      {transaction.value}{" "}
                      {transaction.category !== "erc721"
                        ? transaction.asset
                        : "NFT"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Transaction Hash: {transaction.hash}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-xs text-gray-500">
                    {transaction.category}
                  </p>
                  <a
                    href={`https://sepolia.basescan.org/tx/${transaction.hash}`} // Link to view transaction
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 text-blue-500 hover:underline"
                  >
                    <IconCornerUpRight className="h-5 w-5" />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No recent transactions.</p>
          )}
        </div>

        {/* Swap Currencies Section */}
        <div className="bg-gradient-to-br from-purple-200 to-blue-300 rounded-xl p-8 flex flex-col">
          <h2 className="text-xl font-semibold mb-6">Swap Currencies</h2>
          {/* Swap UI can be added here */}
        </div>
      </div>
    </div>
  );
};

export default CryptoWalletDashboard;
