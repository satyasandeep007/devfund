import React, { createContext, useContext, ReactNode } from "react";
import { encodeFunctionData, parseEther } from "viem";
import { ethers } from "ethers";
import {
  CONFIG,
  getContractConfig,
  getChainConfig,
} from "@/lib/contractUtil/constants";

// Define the shape of the context
interface DevFundContextType {
  createProject: (name: string, gitUrl: string, chain: number) => { uo: any[] };
  fundUSDC: (amount: number, projectNo: number, chain: number) => { uo: any[] };
  fundEth: (amount: number, projectNo: number, chain: number) => { uo: any[] };
  withdrawUSDC: (
    amount: number,
    projectNo: number,
    chain: number
  ) => { uo: any[] };
  withdrawEth: (projectNo: number, chain: number) => { uo: any[] };
  getProjectFundInUSD: (
    projectNo: number,
    chain: number
  ) => Promise<{ ethBalance: string; usdcBalance: string }>;
  CONFIG: typeof CONFIG;
  getContractConfig: typeof getContractConfig;
  getChainConfig: typeof getChainConfig;
}

// Create the context
const DevFundContext = createContext<DevFundContextType | undefined>(undefined);

// Create a provider component
export const DevFundProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const createProject = (name: string, gitUrl: string, chain: number) => {
    const contractAddress: string = getContractConfig("MAIN_CONTRACT").ADDRESS;
    const abi = getContractConfig("MAIN_CONTRACT").ABI;
    const uoCallData = encodeFunctionData({
      abi,
      functionName: "createProject",
      args: [name, gitUrl],
    });
    const uo = [{ target: contractAddress, data: uoCallData, value: "0" }];
    return { uo };
  };

  const fundUSDC = (amount: number, projectNo: number, chain: number) => {
    const contractAddress: string = getContractConfig("MAIN_CONTRACT").ADDRESS;
    const abi = getContractConfig("MAIN_CONTRACT").ABI;
    const approveCallData = encodeFunctionData({
      abi: getContractConfig("USDC_CONTRACT").ABI,
      functionName: "approve",
      args: [contractAddress, parseEther(`${amount}`)],
    });

    const uoCallData = encodeFunctionData({
      abi,
      functionName: "fundUSDC",
      args: [parseEther(`${amount}`), projectNo],
    });

    const uo = [
      {
        target: getContractConfig("USDC_CONTRACT").ADDRESS,
        data: approveCallData,
        value: "0",
      },
      { target: contractAddress, data: uoCallData, value: "0" },
    ];

    return { uo };
  };

  const fundEth = (amount: number, projectNo: number, chain: number) => {
    const contractAddress: string = getContractConfig("MAIN_CONTRACT").ADDRESS;
    const abi = getContractConfig("MAIN_CONTRACT").ABI;
    const uoCallData = encodeFunctionData({
      abi,
      functionName: "fundEth",
      args: [projectNo],
    });
    const uo = [{ target: contractAddress, data: uoCallData, value: amount }];
    return { uo };
  };

  const withdrawUSDC = (amount: number, projectNo: number, chain: number) => {
    const contractAddress: string = getContractConfig("MAIN_CONTRACT").ADDRESS;
    const abi = getContractConfig("MAIN_CONTRACT").ABI;
    const uoCallData = encodeFunctionData({
      abi,
      functionName: "withdrawUSDC",
      args: [BigInt(amount), projectNo],
    });
    const uo = [{ target: contractAddress, data: uoCallData, value: "0" }];
    return { uo };
  };

  const withdrawEth = (projectNo: number, chain: number) => {
    const contractAddress: string = getContractConfig("MAIN_CONTRACT").ADDRESS;
    const abi = getContractConfig("MAIN_CONTRACT").ABI;
    const uoCallData = encodeFunctionData({
      abi,
      functionName: "withdrawEth",
      args: [projectNo],
    });
    const uo = [{ target: contractAddress, data: uoCallData, value: "0" }];
    return { uo };
  };

  const getProjectFundInUSD = async (projectNo: number, chain: number) => {
    const contractAddress: string = getContractConfig("MAIN_CONTRACT").ADDRESS;
    const abi = getContractConfig("MAIN_CONTRACT").ABI;
    const contract_one: any = new ethers.Contract(
      contractAddress,
      abi,
      new ethers.BrowserProvider(window.ethereum as any)
    );
    const result = await contract_one.getProjectFundInUSD(projectNo);
    const _ethBal: any = ethers.formatUnits(result[0], "ether");
    const _usdcBal: any = ethers.formatUnits(result[1], "ether");
    const ethBalance = (_ethBal / Math.pow(10, 8)).toFixed(2);
    const usdcBalance = (_usdcBal / Math.pow(10, 8)).toFixed(2);
    return { ethBalance, usdcBalance };
  };

  const value: DevFundContextType = {
    createProject,
    fundUSDC,
    fundEth,
    withdrawUSDC,
    withdrawEth,
    getProjectFundInUSD,
    CONFIG,
    getContractConfig,
    getChainConfig,
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
