import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useAccount } from "wagmi";
import { useSession } from "next-auth/react";
import {
  CONFIG,
  getContractConfig,
  getChainConfig,
} from "@/lib/contractUtil/constants";
import * as contractFunctions from "@/lib/contractUtil/contractFunctions";
import {
  getLatestTransactionsApiFrom,
  getWalletBalancesCore,
  getWalletNftsCore,
} from "@/lib/api/balance";
import { getMarketPricesApi } from "@/lib/api/marketPrice";
import { fetchGitHubRepos } from "@/lib/githubUtil";
import { parseLinkHeader } from "@/lib/helper";

// Define the shape of the context
interface GlobalContextType {
  createCampaign: typeof contractFunctions.createCampaign;
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
  tokenBalances: any[] | null;
  nftBalances: any[] | null;
  recentTxns: any[] | null;
  fetchWalletBalances: (address: string) => Promise<void>;
  campaigns: Campaign[];
  isLoading: boolean;
  walletBalancesLoading: boolean;
  ethMarketPrice: number;
  usdcMarketPrice: number;
  repos: any[];
  loading: boolean;
  nextPage: string | null;
  prevPage: string | null;
  currentPage: number;
  setCurrentPage: (page: number) => void;
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
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Create a provider component
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { address }: any = useAccount();
  const { data: session }: any = useSession();

  // DevFund state
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tokenBalances, setTokenBalances] = useState<any[] | null>(null);
  const [nftBalances, setNftBalances] = useState<any[] | null>(null);
  const [recentTxns, setRecentTxns] = useState<any[] | null>(null);
  const [walletBalancesLoading, setWalletBalancesLoading] =
    useState<boolean>(false);
  const [ethMarketPrice, setETHMarketPrice] = useState(0);
  const [usdcMarketPrice, setUSDCMarketPrice] = useState(0);

  // GitHub state
  const [repos, setRepos] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaigns();
    fetchMarketPrices();
  }, []);

  useEffect(() => {
    if (!address) return;
    fetchWalletBalances(address);
  }, [address]);

  useEffect(() => {
    const getRepos = async () => {
      if (session) {
        try {
          setLoading(true);
          const data = await fetchGitHubRepos(session.user.username);
          setRepos(data);

          const links = parseLinkHeader(data.headers.get("Link"));
          setNextPage(links.next || null);
          setPrevPage(links.prev || null);
        } catch (error: any) {
          console.error("Error fetching GitHub repos:", error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    getRepos();
  }, [session, currentPage]);

  const fetchMarketPrices = async () => {
    try {
      const { usdcPriceInUSD, ethPriceInUSD } = await getMarketPricesApi();
      setETHMarketPrice(ethPriceInUSD);
      setUSDCMarketPrice(usdcPriceInUSD);
    } catch (error) {
      console.error("Error fetching market prices:", error);
    }
  };

  const fetchCampaigns = async () => {
    try {
      setIsLoading(true);
      const campaignData = await contractFunctions.getAllCampaigns();
      setCampaigns(campaignData);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWalletBalances = async (address: string) => {
    if (address) {
      try {
        setWalletBalancesLoading(true);
        const apiData = await getWalletBalancesCore(address);
        const nftData = await getWalletNftsCore(address);
        const tx = await getLatestTransactionsApiFrom(address);
        setTokenBalances(apiData);
        setNftBalances(nftData);
        setRecentTxns(tx);
        setWalletBalancesLoading(false);
      } catch (error) {
        console.error("Error fetching balances:", error);
      }
    }
  };

  const value: GlobalContextType = {
    createCampaign: contractFunctions.createCampaign,
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
    tokenBalances,
    nftBalances,
    recentTxns,
    fetchWalletBalances,
    walletBalancesLoading,
    ethMarketPrice,
    usdcMarketPrice,
    repos,
    loading,
    nextPage,
    prevPage,
    currentPage,
    setCurrentPage,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

// Create a custom hook to use the context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
