import React from "react";
import { IconChartBar, IconCurrencyDollar, IconCode, IconStar } from "@tabler/icons-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faBuilding } from '@fortawesome/free-solid-svg-icons';

// StatCard Component
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, unit, color, icon: Icon }) => {
  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; text: string } } = {
      pink: { bg: "bg-pink-100", text: "text-pink-500" },
      yellow: { bg: "bg-yellow-100", text: "text-yellow-500" },
      green: { bg: "bg-green-100", text: "text-green-500" },
      purple: { bg: "bg-purple-100", text: "text-purple-500" },
    };
    return colorMap[color] || { bg: "bg-gray-100", text: "text-gray-500" };
  };

  const { bg, text } = getColorClasses(color);

  return (
    <div className={`${bg} rounded-lg p-4 flex flex-col w-48`}>
      <div className="flex items-center mb-2">
        <div className={`${text} rounded-full w-10 h-10 flex items-center justify-center mr-3`}>
          <Icon size={20} stroke={1.5} />
        </div>
        <span className="text-sm text-gray-600">{title}</span>
      </div>
      <div className="flex items-baseline">
        <span className="text-2xl font-bold">{value}</span>
        {unit && <span className="text-lg ml-1">{unit}</span>}
      </div>
    </div>
  );
};

// GraphCard Component
const GraphCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-gray-600 mb-2">Trending Campaigns</h3>
      <div className="h-32 bg-gray-100 rounded-lg flex justify-center items-center">
        {/* Simulate Graph */}
        <div className="w-full h-full flex justify-between items-end">
          <div className="bg-blue-500 h-20 w-4"></div>
          <div className="bg-black h-12 w-4"></div>
          <div className="bg-blue-500 h-10 w-4"></div>
          <div className="bg-black h-24 w-4"></div>
          <div className="bg-blue-500 h-16 w-4"></div>
        </div>
      </div>
    </div>
  );
};

// TopContributors Component
const TopContributors: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-gray-600 mb-4">Top Contributors</h3>
      <div className="flex space-x-4">
        <img src="/avatar1.png" alt="Avatar" className="w-10 h-10 rounded-full" />
        <img src="/avatar2.png" alt="Avatar" className="w-10 h-10 rounded-full" />
        <img src="/avatar3.png" alt="Avatar" className="w-10 h-10 rounded-full" />
        <img src="/avatar4.png" alt="Avatar" className="w-10 h-10 rounded-full" />
      </div>
    </div>
  );
};

// FundHistory Component
const FundHistory: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-gray-600 mb-4">Fund History</h3>
      <ul className="space-y-2">
        <li className="flex justify-between text-sm">
          <span>Avalanche Staking</span>
          <span>+8,082847</span>
        </li>
        <li className="flex justify-between text-sm">
          <span>Atom Staking</span>
          <span>Producing</span>
        </li>
        <li className="flex justify-between text-sm">
          <span>Cardano Staking</span>
          <span>Delegated</span>
        </li>
      </ul>
    </div>
  );
};

// BaseValueChart Component
const BaseValueChart: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-gray-600 mb-2">Base Value</h3>
      <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
        {/* Simulated Chart */}
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <polyline
            fill="none"
            stroke="#FF6347"
            strokeWidth="2"
            points="0,40 10,30 20,35 30,20 40,25 50,15 60,10 70,15 80,5 90,10"
          />
        </svg>
      </div>
    </div>
  );
};

// Main Overview Component
const ProjectOverview: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-8">
      <h1 className="text-2xl font-semibold text-black">Overview</h1>
      <div className="grid grid-cols-4 gap-6">
        {/* Stat Cards Section */}
        {[
          { title: "Active Campaigns", value: "20k", color: "pink", icon: IconChartBar },
          { title: "Amount Raised", value: "125", unit: "Base", color: "green", icon: IconCurrencyDollar },
          { title: "Total Repos", value: "35", color: "purple", icon: IconCode },
          { title: "Stars", value: "08", color: "yellow", icon: IconStar },
        ].map((card, idx) => (
          <StatCard key={idx} {...card} />
        ))}

        {/* Top Contributors */}
        <div className="col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Top Contributors</h2>
            <a href="#" className="text-sm text-gray-400">See all</a>
          </div>
          <div className="space-y-6">
            {[
              { type: 'Send Funds', amount: '-11.320000', date: '23/09/2022, 11:48', positive: false },
              { type: 'Received Funds', amount: '+30.000000', date: '23/09/2022, 11:48', positive: true },
              { type: 'Send Funds', amount: '-11.320000', date: '23/09/2022, 11:48', positive: false },
            ].map((transaction, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-2 rounded-full ${
                      transaction.positive ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={transaction.positive ? faArrowUp : faArrowDown}
                      size="sm"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{transaction.type}</p>
                    <p className="text-sm text-gray-400">{transaction.date}</p>
                  </div>
                </div>
                <p
                  className={`font-semibold ${
                    transaction.positive ? 'text-red-500' : 'text-gray-800'
                  }`}
                >
                  {transaction.amount}
                </p>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full bg-gray-100 py-2 rounded-lg text-sm text-gray-500">
            Address book
          </button>
        </div>

        {/* Trending Campaigns */}
        <GraphCard />

        {/* Base Value */}
        <BaseValueChart />

        {/* Top Repos */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Top Repos</h2>
            <a href="#" className="text-sm text-gray-400">See all</a>
          </div>
          <ul className="space-y-4">
            {['Cardano', 'Atom', 'Avalanche'].map((repo, idx) => (
              <li key={idx} className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img
                    src={`https://placehold.co/40x40?text=${repo[0]}`}
                    alt={repo}
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="text-gray-700">{repo} Staking (1/2)</p>
                </div>
                <p className="text-gray-500">{(Math.random() * 100).toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Fund History */}
        <FundHistory />
      </div>
    </div>
  );
};

export default ProjectOverview;
