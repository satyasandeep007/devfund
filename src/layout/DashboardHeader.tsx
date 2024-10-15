"use client";

import { useAccount } from "wagmi";
// import ThemeToggle from "@/components/ThemeToggle";

const DashboardHeader: React.FC = () => {
  const { isConnected } = useAccount();

  return (
    <header className="w-full py-4 px-8 dark:bg-gray-900 flex justify-between items-center ">
      <div className="flex items-center"></div>
      <div className="flex items-center gap-x-4">
        {/* <ThemeToggle /> */}
        <div className="flex items-center gap-x-3">
          {!isConnected ? (
            <w3m-connect-button />
          ) : (
            <>
            <div className="flex items-center gap-x-3">
              <w3m-network-button />
              <w3m-account-button balance={"show"} />
            </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
