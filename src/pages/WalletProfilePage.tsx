import React from 'react';
import { IconArrowsUpDown, IconPlus, IconStar, IconDotsVertical, IconChevronDown } from '@tabler/icons-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '06:00', value: 0.86 },
  { time: '08:00', value: 0.88 },
  { time: '10:00', value: 0.89 },
  { time: '12:00', value: 0.90 },
  { time: '14:00', value: 0.91 },
  { time: '16:00', value: 0.92 },
  { time: '18:00', value: 0.92 },
];

const CryptoWalletDashboard: React.FC = () => {
  return (
    <div className="bg-gray-100 p-6 font-sans">
      <div className="grid grid-cols-3 gap-6">
        {/* My Wallet Section */}
        <div className="bg-gray-200 rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-2">My Wallet</h2>
          <p className="text-4xl font-bold mb-1">$128,921</p>
          <p className="text-sm text-gray-600 mb-4">+ $15,121 last week</p>
          <div className="flex space-x-4">
            <button className="bg-black text-white p-2 rounded-full">
              <IconArrowsUpDown className="h-6 w-6" />
            </button>
            <button className="bg-yellow-300 p-2 rounded-full">
              <IconPlus className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Watchlist Section */}
        <div className="col-span-1 bg-white rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Watchlist</h2>
            <button className="text-gray-500">
              <IconDotsVertical className="h-6 w-6" />
            </button>
          </div>
          {['Bitcoin', 'Litecoin', 'Solana', 'Tether'].map((coin, index) => (
            <div key={coin} className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full mr-3 ${index % 2 === 0 ? 'bg-yellow-400' : 'bg-blue-400'}`}></div>
                <div>
                  <p className="font-semibold">{coin}</p>
                  <p className="text-xs text-gray-500">{coin.slice(0, 3).toUpperCase()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">${(Math.random() * 5000 + 2000).toFixed(2)}</p>
                <p className={`text-xs ${index % 2 === 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {index % 2 === 0 ? '▲' : '▼'} {(Math.random() * 2).toFixed(2)}%
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Wallet Transactions Section */}
        <div className="col-span-2 bg-white rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          {[
            { icon: 'deposit', label: 'Deposited Funds', date: 'Sep 6 2023 13:06', amount: '+$8 000', type: 'fiat' },
            { icon: 'withdraw', label: 'Withdrawal Funds', date: 'Sep 6 2023 13:06', amount: '-$8 000', type: 'fiat' },
            { icon: 'bitcoin', label: 'Received Bitcoin', date: 'Sep 6 2023 13:06', amount: '+2.1', type: 'crypto', symbol: 'BTC' },
            { icon: 'ethereum', label: 'Received Ethereum', date: 'Sep 6 2023 13:06', amount: '+0.23', type: 'crypto', symbol: 'ETH' },
            { icon: 'solana', label: 'Received Solana', date: 'Sep 6 2023 13:06', amount: '+203.1', type: 'crypto', symbol: 'SOL' },
          ].map((transaction, index) => (
            <div key={index} className="flex justify-between items-center py-3 border-b last:border-b-0">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full mr-3 flex items-center justify-center ${
                  transaction.icon === 'deposit' || transaction.icon === 'withdraw' ? 'bg-gray-200' :
                  transaction.icon === 'bitcoin' ? 'bg-orange-500' :
                  transaction.icon === 'ethereum' ? 'bg-blue-400' :
                  'bg-purple-500'
                }`}>
                  {transaction.icon === 'deposit' && <IconArrowsUpDown className="h-5 w-5 text-gray-600" />}
                  {transaction.icon === 'withdraw' && <IconArrowsUpDown className="h-5 w-5 text-gray-600" />}
                  {transaction.icon === 'bitcoin' && <span className="text-white font-bold">₿</span>}
                  {transaction.icon === 'ethereum' && <span className="text-white font-bold">Ξ</span>}
                  {transaction.icon === 'solana' && <span className="text-white font-bold">◎</span>}
                </div>
                <div>
                  <p className="font-semibold">{transaction.label}</p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <div className={`text-right ${transaction.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                <p className="font-semibold">{transaction.amount}</p>
                {transaction.type === 'crypto' && <p className="text-xs text-gray-500">{transaction.symbol}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Swap Currencies Section */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Swap Currencies</h2>
          <div className="bg-yellow-100 rounded-xl p-4 mb-4">
            <p className="text-sm mb-1">You send</p>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold">5,134</p>
              <button className="bg-white px-3 py-1 rounded-full text-sm flex items-center">
                Tether <IconChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
            <p className="text-sm text-right mt-1">Balance: $2,356.11</p>
          </div>
          <div className="bg-green-100 rounded-xl p-4 mb-4">
            <p className="text-sm mb-1">You get</p>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold">66.65</p>
              <button className="bg-white px-3 py-1 rounded-full text-sm flex items-center">
                Litecoin <IconChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
            <p className="text-sm text-right mt-1">Balance: $5,131.00</p>
          </div>
          <div className="text-sm mb-4">
            <div className="flex justify-between mb-1">
              <span>Rate</span>
              <span>1 USDT = 0.0130 LTC</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Service fee</span>
              <span>0.0121574415 USDT ($0.12)</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>$5,254</span>
            </div>
          </div>
          <button className="w-full bg-black text-white py-3 rounded-xl font-semibold">
            Buy 66.65 LTC
          </button>
        </div>
      </div>
    </div>
  );
};

export default CryptoWalletDashboard;
