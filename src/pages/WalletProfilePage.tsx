"use client";

import React, { useState, useEffect } from "react";
import {
  IconPlus,
  IconChevronDown,
  IconArrowDown,
  IconArrowUp,
} from "@tabler/icons-react";

import { useAccount } from "wagmi";
import { useDevFund } from "@/context/DevFundContext";
import Image from "next/image";
import { openTransak } from "@/lib/onramp";
import { toast } from "react-toastify";

const CryptoWalletDashboard: React.FC = () => {
  const {
    tokenBalances,
    nftBalances,
    ethMarketPrice,
    usdcMarketPrice,
    recentTxns,
    fetchWalletBalances,
  } = useDevFund();
  const { address }: any = useAccount();

  const [usdcBalance, setUSDCBalance] = useState("0");
  const [isBuying, setIsBuying] = useState(false);

  console.log(tokenBalances, "tokenBalances");
  console.log(nftBalances, "nftBalances");
  console.log(recentTxns, "recentTxns");

  useEffect(() => {
    if (tokenBalances && tokenBalances.length > 0) {
      const _usdcBal = tokenBalances?.find((i) => i.symbol === "TRNSK")?.amount;

      setUSDCBalance(_usdcBal);
    }
  }, [tokenBalances]);

  const handleBuyCrypto = async (e: any) => {
    e.preventDefault();

    await openTransak("BUY", address, setIsBuying, handleNotif);
  };

  const handleNotif = async (isSuccess: boolean) => {
    setTimeout(async () => {
      await fetchWalletBalances(address);
    }, 1000);
    await toast(
      `${isSuccess ? "🎉 Buy Crypto successful!" : "Error making purchase:"}`,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };

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
                    alt={token.symbol}
                    className="w-8 h-8 rounded-full mr-3"
                    width={20}
                    height={20}
                  />
                  <div>
                    <p className="font-semibold">
                      {token.symbol.toUpperCase() === "TRNSK"
                        ? "USDC"
                        : token.symbol.toUpperCase()}
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
                    alt={nft.symbol || "  NFT"}
                    className="w-8 h-8 rounded-full mr-3"
                    width={20}
                    height={20}
                  />
                  <div>
                    <p className="font-semibold">{nft.symbol || "  NFT"}</p>
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
            recentTxns.map((transaction, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-3 border-b last:border-b-0"
              >
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full mr-3 flex items-center justify-center ${
                      transaction.from === address
                        ? "bg-gray-200"
                        : "bg-orange-500"
                    }`}
                  >
                    {transaction.from === address ? (
                      <IconArrowUp className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                      <IconArrowDown className="h-5 w-5 text-red-500 mr-2" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">
                      {" "}
                      {transaction.from === address ? "Sent" : "Received"}{" "}
                      {transaction.value}{" "}
                      {transaction.category !== "erc721"
                        ? transaction.asset === "TRNSK"
                          ? "USDC"
                          : transaction.asset
                        : "NFT"}
                    </p>
                    <p className="text-xs text-gray-500 italic font-thin">
                      {transaction.hash}
                    </p>
                  </div>
                </div>
                <div
                  className={`text-right ${
                    transaction.from === address
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  <p className="font-normal text-lg">{transaction.value}</p>

                  <p className="text-xs text-gray-500">
                    {transaction.asset === "TRNSK"
                      ? "USDC"
                      : transaction.asset || "NFT"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No recent transactions.</p>
          )}
        </div>

        {/* Swap Currencies Section */}
        <div className="bg-gradient-to-br from-purple-200 to-blue-300 rounded-xl p-8  flex flex-col">
          <h2 className="text-xl font-semibold mb-6">Buy Crypto</h2>
          <div className="bg-slate-100/50  rounded-xl p-6 mb-6">
            <p className="text-sm mb-2 text-gray-500">Fiat Amount</p>
            <div className="flex justify-between items-center">
              <p className="text-3xl font-normal">20</p>
              <button className="bg-white px-4 py-2 rounded-full text-sm flex items-center">
                EUR <IconChevronDown className="h-4 w-4 ml-2" />
              </button>
            </div>
            {/* <p className="text-sm text-right mt-2">Balance: $2,356.11</p> */}
          </div>
          <div className="bg-slate-100/50 rounded-xl p-6 mb-6 ">
            <p className="text-sm mb-2 text-gray-500">
              Crypto Amount (estimate)
            </p>
            <div className="flex justify-between items-center">
              <p className="text-3xl font-normal">20.43</p>
              <button className="bg-white px-4 py-2 rounded-full text-sm flex items-center">
                USDC <IconChevronDown className="h-4 w-4 ml-2" />
              </button>
            </div>
            <p className="text-sm text-right mt-2">
              0.926838 EUR = 1 USDC Rate
            </p>
          </div>

          <button
            onClick={handleBuyCrypto}
            disabled={isBuying}
            className="w-full bg-black text-white py-4 rounded-xl font-semibold text-lg"
          >
            {!isBuying ? "Buy USDC" : "Please wait ..."}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CryptoWalletDashboard;
