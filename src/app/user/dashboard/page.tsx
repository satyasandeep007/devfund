"use client";

import { useAccount } from "wagmi";

const Dashboard = () => {
  const { isConnected }: any = useAccount();

  return (
    <div className="p-6 space-y-8   dark:bg-gray-900 dark:text-white max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-left">Dashboard</h1>
      {isConnected ? <p>Connected</p> : <p>Not Connected</p>}
    </div>
  );
};

export default Dashboard;
