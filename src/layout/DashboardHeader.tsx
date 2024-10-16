"use client";

import { useAccount } from "wagmi";

const DashboardHeader: React.FC = () => {
  const { isConnected } = useAccount();

  return (
    <header className="w-full py-4 px-8  flex justify-between items-center ">
      <div className="flex items-center"></div>
      <div className="flex items-center gap-x-4">
        <div className="w-full flex justify-end">
          <div className="flex justify-center items-center">
            {!isConnected ? (
              <w3m-connect-button size="sm" />
            ) : (
              <div className="flex items-center gap-2">
                <w3m-network-button />
                <w3m-account-button balance={"show"} />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
