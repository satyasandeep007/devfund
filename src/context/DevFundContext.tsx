import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import {
  CONFIG,
  getContractConfig,
  getChainConfig,
} from "@/lib/contractUtil/constants";
import * as contractFunctions from "@/lib/contractUtil/contractFunctions";

// Define the shape of the context
interface DevFundContextType {
  createProject: typeof contractFunctions.createProject;
  fundUSDC: typeof contractFunctions.fundUSDC;
  fundEth: typeof contractFunctions.fundEth;
  withdrawUSDC: typeof contractFunctions.withdrawUSDC;
  withdrawEth: typeof contractFunctions.withdrawEth;
  getProjectFundInUSD: typeof contractFunctions.getProjectFundInUSD;
  CONFIG: typeof CONFIG;
  getContractConfig: typeof getContractConfig;
  getChainConfig: typeof getChainConfig;
  getCampaignById: typeof contractFunctions.getCampaignById;
  refreshCampaigns: () => Promise<void>;

  campaigns: Campaign[] | null;
  isLoading: boolean;
}

type Campaign = {
  description: string;
  donationCount: string;
  endDate: string;
  ethBalance: string;
  fundingGoal: string;
  gitUrl: string;
  id: number;
  owner: string;
  status: string;
  title: string;
  usdcBalance: string;
};

// Create the context
const DevFundContext = createContext<DevFundContextType | undefined>(undefined);

// Create a provider component
export const DevFundProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [campaigns, setCampaigns] = useState<Campaign[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setIsLoading(true);
      const campaignData = await contractFunctions.getAllCampaigns(); // Assuming this function exists in your context
      console.log(campaignData);
      setCampaigns(campaignData);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const value: DevFundContextType = {
    createProject: contractFunctions.createProject,
    fundUSDC: contractFunctions.fundUSDC,
    fundEth: contractFunctions.fundEth,
    withdrawUSDC: contractFunctions.withdrawUSDC,
    withdrawEth: contractFunctions.withdrawEth,
    getProjectFundInUSD: contractFunctions.getProjectFundInUSD,
    CONFIG,
    getContractConfig,
    getChainConfig,
    getCampaignById: contractFunctions.getCampaignById,
    refreshCampaigns: fetchCampaigns,
    campaigns,
    isLoading,
  };

  return (
    <DevFundContext.Provider value={value}>{children}</DevFundContext.Provider>
  );
};

// Create a custom hook to use the context
export const useDevFund = () => {
  const context = useContext(DevFundContext);
  if (context === undefined) {
    throw new Error("useDevFund must be used within a DevFundProvider");
  }
  return context;
};
