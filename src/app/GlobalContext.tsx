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

// Define the initial state for the context
const initialState: GlobalContextType = {
  createCampaign: () => Promise.resolve(), // Placeholder function
  fundUSDC: () => Promise.resolve(), // Placeholder function
  fundEth: () => Promise.resolve(), // Placeholder function
  withdrawUSDC: () => Promise.resolve(), // Placeholder function
  withdrawEth: () => Promise.resolve(), // Placeholder function
  getProjectFundInUSD: async (projectNo: number = 0, chain: number = 0) =>
    Promise.resolve({ ethBalance: "0.00", usdcBalance: "0.00" }), // Default return value
  CONFIG,
  getContractConfig,
  getChainConfig,
  refreshCampaigns: () => Promise.resolve(),
  getCampaignById: async (
    campaignId: number = 0,
    chain: number = 0
  ): Promise<{
    title: any;
    usdcBalance: any;
    ethBalance: any;
    owner: any;
    gitUrl: any;
    description: any;
    fundingGoal: any;
    donationCount: any;
    endDate: any;
    status: any;
  }> =>
    Promise.resolve({
      title: "",
      usdcBalance: "0",
      ethBalance: "0",
      owner: "",
      gitUrl: "",
      description: "",
      fundingGoal: "0",
      donationCount: "0",
      endDate: "0",
      status: "",
    }),
  tokenBalances: [], // Initial state as an empty array
  nftBalances: [], // Initial state as an empty array
  recentTxns: [], // Initial state as an empty array
  fetchWalletBalances: async (address: string) => {}, // Placeholder function
  campaigns: [], // Initial state as an empty array
  isLoading: false, // Initial loading state
  walletBalancesLoading: false, // Initial loading state
  ethMarketPrice: 0, // Initial price as 0
  usdcMarketPrice: 0, // Initial price as 0
  repos: [], // Initial state as an empty array
  loading: false, // Initial loading state
  nextPage: null, // Initial next page as null
  prevPage: null, // Initial previous page as null
  currentPage: 1, // Initial page number
  setCurrentPage: () => {}, // Placeholder function
};

// Create the context with the initial state
const GlobalContext = createContext<GlobalContextType>(initialState);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { address }: any = useAccount();
  const { data: session }: any = useSession();

  // DevFund state
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tokenBalances, setTokenBalances] = useState<any[]>([]);
  const [nftBalances, setNftBalances] = useState<any[]>([]);
  const [recentTxns, setRecentTxns] = useState<any[]>([]);
  const [walletBalancesLoading, setWalletBalancesLoading] =
    useState<boolean>(false);
  const [ethMarketPrice, setETHMarketPrice] = useState<number>(0); // Initial price as 0
  const [usdcMarketPrice, setUSDCMarketPrice] = useState<number>(0); // Initial price as 0

  // GitHub state
  const [repos, setRepos] = useState<any[]>([]); // Initial state as an empty array
  const [currentPage, setCurrentPage] = useState<number>(1); // Initial page number
  const [nextPage, setNextPage] = useState<string | null>(null); // Initial next page as null
  const [prevPage, setPrevPage] = useState<string | null>(null); // Initial previous page as null
  const [loading, setLoading] = useState<boolean>(true); // Initial loading state

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
