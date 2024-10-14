"use client";

import React from "react";
import { useAccount } from "wagmi";
import Image from "next/image";
import { useDevFund } from "@/context/DevFundContext";

const fallbackImageUrl = (text: string) =>
  `https://placehold.co/40x40?text=?${text}`; // Fallback image URL

const WalletProfilePage: React.FC = () => {
  const { address }: any = useAccount();
  const {
    fetchWalletBalances,
    tokenBalances,
    nftBalances,
    walletBalancesLoading,
  } = useDevFund();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Wallet Information</h2>
        <p className="text-gray-600">Address: {address}</p>
        <button
          onClick={() => fetchWalletBalances(address)}
          className={`w-40 flex-1 bg-[#323F49] text-white py-4 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={walletBalancesLoading}
        >
          {walletBalancesLoading ? "Loading..." : "Refresh"}
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Token Balances</h2>
        {walletBalancesLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : tokenBalances && tokenBalances.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tokenBalances.map((token, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 flex items-center space-x-4"
              >
                <Image
                  src={
                    token.logo_url ||
                    fallbackImageUrl(token.contract_ticker_symbol)
                  }
                  alt={token.contract_name}
                  className="w-10 h-10 rounded-full"
                  width={100}
                  height={100}
                />
                <div>
                  <h3 className="font-semibold">{token.contract_name}</h3>
                  <p className="text-sm text-gray-600">
                    {token.contract_ticker_symbol}
                  </p>
                  <p className="text-sm">
                    Balance:{" "}
                    {(
                      parseFloat(token.balance) /
                      10 ** token.contract_decimals
                    ).toFixed(4)}
                  </p>
                  {token.quote > 0 && (
                    <p className="text-sm text-gray-600">
                      Value: ${token.quote.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No token balances found.</p>
        )}
      </div>

      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">NFT Balances</h2>
        {walletBalancesLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : nftBalances && nftBalances.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nftBalances.map((nft, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 flex items-center space-x-4"
              >
                <Image
                  src={nft.token_url || fallbackImageUrl(nft.name)}
                  alt={nft.name}
                  className="w-10 h-10 rounded-full"
                  width={100}
                  height={100}
                />
                <div>
                  <h3 className="font-semibold">{nft.name}</h3>
                  <p className="text-sm text-gray-600">
                    Collection: {nft.contract_name}
                  </p>
                  <p className="text-sm">Token ID: {nft.token_id}</p>
                  {nft.amount && (
                    <p className="text-sm text-gray-600">
                      Amount: {nft.amount}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            No NFTs found for this address on the Base Sepolia testnet.
          </p>
        )}
      </div>
    </div>
  );
};

export default WalletProfilePage;
