"use client";

import React from "react";
import {
  IconArrowsUpDown,
  IconPlus,
  IconStar,
  IconDotsVertical,
  IconChevronDown,
  IconArrowDown,
  IconArrowUp,
} from "@tabler/icons-react";

const CryptoWalletDashboard: React.FC = () => {
  // Dummy data for Trending Crypto
  const cryptoData = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      image: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
      current_price: 30000,
      price_change_percentage_24h: 2.5,
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      image: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
      current_price: 2000,
      price_change_percentage_24h: -1.2,
    },
    {
      id: "tether",
      name: "Tether",
      symbol: "USDT",
      image: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
      current_price: 1,
      price_change_percentage_24h: 0.1,
    },
  ];

  // Dummy data for NFTs
  const nftData = [
    {
      id: 1,
      name: "Bored Ape #1234",
      collection: "Bored Ape Yacht Club",
      image:
        "https://assets.coingecko.com/nft_contracts/images/20/standard/bored-ape-yacht-club.png",
      price: 100,
      floorPrice: 90,
    },
    {
      id: 2,
      name: "CryptoPunk #5678",
      collection: "CryptoPunks",
      image:
        "https://assets.coingecko.com/nft_contracts/images/270/standard/cryptopunks.png",
      price: 80,
      floorPrice: 75,
    },
    {
      id: 3,
      name: "Doodle #9101",
      collection: "Pudgy Penguins",
      image:
        "https://assets.coingecko.com/nft_contracts/images/38/standard/da64989d9762c8a61b3c65917edfdf97.png",
      price: 20,
      floorPrice: 18,
    },
  ];

  return (
    <div className="bg-white p-6 font-sans">
      <div className="grid grid-cols-3 gap-6">
        {/* My Wallet Section */}
        <div className=" bg-gradient-to-tr from-blue-500  to-purple-300 rounded-xl p-6 flex flex-col items-center text-center">
          <p className="text-lg font-bold m-2">My Wallet</p>
          <h2 className="text-6xl font-bold mt-4">
            0.13<>ETH</>
          </h2>
          <p className="text-sm text-gray-600 mb-4 mt-4">USD 15,121</p>
          <div className="flex space-x-4 mb-4">
            <div className="bg-black text-white rounded-full flex">
              <button className="p-2 border-r rounded-full ">
                <IconArrowDown className="h-6 w-6" />
              </button>
              <button className="p-2 rounded-full">
                <IconArrowUp className="h-6 w-6  " />
              </button>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-full">
              <IconPlus className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        {/* Cryptocurrency Prices Live */}
        <div className="col-span-1 bg-blue-100/20 rounded-xl p-6 border border-blue-100/50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Trending Crypto</h2>
          </div>
          {cryptoData.map((coin) => (
            <div
              key={coin.id}
              className="flex justify-between items-center mb-4"
            >
              <div className="flex items-center">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-8 h-8 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold">{coin.name}</p>
                  <p className="text-xs text-gray-500">
                    {coin.symbol.toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  ${coin.current_price.toFixed(2)}
                </p>
                <p
                  className={`text-xs ${
                    coin.price_change_percentage_24h >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_24h >= 0 ? "▲" : "▼"}{" "}
                  {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* NFT */}
        <div className="col-span-1 bg-blue-100/20 rounded-xl p-6 border border-blue-100/50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">NFT</h2>
          </div>
          {nftData.map((nft) => (
            <div
              key={nft.id}
              className="flex justify-between items-center mb-4"
            >
              <div className="flex items-center">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-12 h-12 rounded-lg mr-3 object-cover"
                />
                <div>
                  <p className="font-semibold">{nft.name}</p>
                  <p className="text-xs text-gray-500">{nft.collection}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{nft.price} ETH</p>
                <p className="text-xs text-gray-500">
                  Floor: {nft.floorPrice} ETH
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Wallet Transactions Section */}
        <div className="col-span-2 bg-blue-100/20 rounded-xl p-6 border border-blue-100/50">
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          {[
            {
              icon: "deposit",
              label: "Deposited Funds",
              date: "Sep 6 2023 13:06",
              amount: "+$8 000",
              type: "fiat",
            },
            {
              icon: "withdraw",
              label: "Withdrawal Funds",
              date: "Sep 6 2023 13:06",
              amount: "-$8 000",
              type: "fiat",
            },
            {
              icon: "bitcoin",
              label: "Received Bitcoin",
              date: "Sep 6 2023 13:06",
              amount: "+2.1",
              type: "crypto",
              symbol: "BTC",
            },
            {
              icon: "ethereum",
              label: "Received Ethereum",
              date: "Sep 6 2023 13:06",
              amount: "+0.23",
              type: "crypto",
              symbol: "ETH",
            },
            {
              icon: "solana",
              label: "Received Solana",
              date: "Sep 6 2023 13:06",
              amount: "+203.1",
              type: "crypto",
              symbol: "SOL",
            },
          ].map((transaction, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-3 border-b last:border-b-0"
            >
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full mr-3 flex items-center justify-center ${
                    transaction.icon === "deposit" ||
                    transaction.icon === "withdraw"
                      ? "bg-gray-200"
                      : transaction.icon === "bitcoin"
                      ? "bg-orange-500"
                      : transaction.icon === "ethereum"
                      ? "bg-blue-400"
                      : "bg-purple-500"
                  }`}
                >
                  {transaction.icon === "deposit" && (
                    <IconArrowsUpDown className="h-5 w-5 text-gray-600" />
                  )}
                  {transaction.icon === "withdraw" && (
                    <IconArrowsUpDown className="h-5 w-5 text-gray-600" />
                  )}
                  {transaction.icon === "bitcoin" && (
                    <span className="text-white font-bold">₿</span>
                  )}
                  {transaction.icon === "ethereum" && (
                    <span className="text-white font-bold">Ξ</span>
                  )}
                  {transaction.icon === "solana" && (
                    <span className="text-white font-bold">◎</span>
                  )}
                </div>
                <div>
                  <p className="font-semibold">{transaction.label}</p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <div
                className={`text-right ${
                  transaction.amount.startsWith("+")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                <p className="font-semibold">{transaction.amount}</p>
                {transaction.type === "crypto" && (
                  <p className="text-xs text-gray-500">{transaction.symbol}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Swap Currencies Section */}
        <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl p-8 min-h-[600px] flex flex-col">
          <h2 className="text-xl font-semibold mb-6">Swap Currencies</h2>
          <div className="bg-yellow-50 border rounded-xl p-6 mb-6">
            <p className="text-sm mb-2">You send</p>
            <div className="flex justify-between items-center">
              <p className="text-3xl font-bold">5,134</p>
              <button className="bg-gray-200 px-4 py-2 rounded-full text-sm flex items-center">
                Base <IconChevronDown className="h-4 w-4 ml-2" />
              </button>
            </div>
            <p className="text-sm text-right mt-2">Balance: $2,356.11</p>
          </div>
          <div className="bg-green-50 border rounded-xl p-6 mb-6">
            <p className="text-sm mb-2">You get</p>
            <div className="flex justify-between items-center">
              <p className="text-3xl font-bold">66.65</p>
              <button className="bg-white px-4 py-2 rounded-full text-sm flex items-center">
                USD <IconChevronDown className="h-4 w-4 ml-2" />
              </button>
            </div>
            <p className="text-sm text-right mt-2">Balance: $5,131.00</p>
          </div>
          <div className="text-sm mb-6 flex-grow">
            <div className="flex justify-between mb-2">
              <span>Rate</span>
              <span>1 USDT = 0.0130 LTC</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Service fee</span>
              <span>0.0121574415 USDT ($0.12)</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>$5,254</span>
            </div>
          </div>
          <button className="w-full bg-black text-white py-4 rounded-xl font-semibold text-lg">
            Buy 66.65 LTC
          </button>
        </div>
      </div>
    </div>
  );
};

export default CryptoWalletDashboard;
