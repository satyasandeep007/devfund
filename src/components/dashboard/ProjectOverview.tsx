import React from 'react';
import { IconArrowsUpDown } from '@tabler/icons-react';
import Image from 'next/image';

const ProjectOverview = () => {
  return (
    <div className="bg-white min-h-screen p-8">
      {/* Header */}
      <div className="bg-purple-500 text-white rounded-lg p-8 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">
            Sharpen Your Skills with Professional Online Courses
          </h1>
          <button className="bg-black py-2 px-4 rounded-full text-white hover:bg-gray-700">
            Join Now
          </button>
        </div>
      </div>

      {/* Main Dashboard Section */}
      <div className="flex gap-6">
        {/* Left Section */}
        <div className="flex-1">
          {/* Dashboard Overview */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold text-blue-500 mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-3 gap-6">
              {/* New Subscriptions */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-medium">New Subscriptions</h3>
                <div className="text-green-500 text-2xl font-bold mt-2">22</div>
                <p className="text-sm text-gray-500">+15% compared to last week</p>
              </div>
              {/* New Orders */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-medium">New Orders</h3>
                <div className="text-orange-500 text-2xl font-bold mt-2">320</div>
                <p className="text-sm text-gray-500">-4% compared to last week</p>
              </div>
              {/* Average Order Revenue */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-medium">Avg. Order Revenue</h3>
                <div className="text-green-500 text-2xl font-bold mt-2">$1,080</div>
                <p className="text-sm text-gray-500">+8% compared to last week</p>
              </div>
            </div>
          </div>

          {/* Transactions Section (replacing Continue Watching) */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Fund History</h2>
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
        </div>

        {/* Right Section List */}
        <div className="w-1/4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-3">Top 5 Contributors</h2>
            <div className="flex flex-col">
              {[
                { name: "Padhang Satrio", amount: "Usd 30.000000" },
                { name: "Zakir Horizontal", amount: "Usd 110.320000" },
                { name: "Leonardo Samsul", amount: "Usd 250.000000" },
                { name: "Alice Johnson", amount: "Usd 357.000000" },
                { name: "Bob Smith", amount: "Usd 300.000000" },
              ].map((contributor, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <Image
                        className="w-8 h-8 rounded-full"
                        src={`https://via.placeholder.com/150?text=${contributor.name.charAt(0)}`}
                        alt={contributor.name}
                      />
                      <p className="text-sm font-medium">{contributor.name}</p>
                    </div>
                    <p className={`text-sm font-semibold ${contributor.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {contributor.amount}
                    </p>
                  </div>
                  {index < 4 && <hr className="border-gray-200" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
