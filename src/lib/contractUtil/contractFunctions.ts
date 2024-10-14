import { encodeFunctionData, parseEther } from "viem";
import { ethers } from "ethers";
import { getContractConfig } from "./constants";

export const getCampaignById = async (campaignId: number, chain: number) => {
  const contractAddress: string = getContractConfig("MAIN_CONTRACT").ADDRESS;
  const abi = getContractConfig("MAIN_CONTRACT").ABI;

  // Ensure window.ethereum is available
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);

    try {
      const campaign = await contract.campaigns(campaignId);

      // Convert BigInt values to strings for JSON serialization
      const serializedCampaign = {
        title: campaign.title,
        usdcBalance: campaign.usdcBalance.toString(),
        ethBalance: campaign.ethBalance.toString(),
        owner: campaign.owner,
        gitUrl: campaign.gitUrl,
        description: campaign.description,
        fundingGoal: campaign.fundingGoal.toString(),
        donationCount: campaign.donationCount.toString(),
        endDate: campaign.endDate.toString(),
        status: campaign.status,
      };

      return serializedCampaign;
    } catch (error) {
      console.error("Error fetching campaign:", error);
      throw error;
    }
  } else {
    throw new Error("Ethereum provider not found");
  }
};

export const getAllCampaigns = async () => {
  const contractAddress: string = getContractConfig("MAIN_CONTRACT").ADDRESS;
  const abi = getContractConfig("MAIN_CONTRACT").ABI;

  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);

    try {
      const campaignsData = await contract.getCampaigns();

      // Process and serialize the campaign data
      const serializedCampaigns = campaignsData.map(
        (campaign: any, index: number) => ({
          id: index,
          title: campaign[0],
          usdcBalance: campaign[1].toString(),
          ethBalance: campaign[2].toString(),
          owner: campaign[3],
          gitUrl: campaign[4],
          description: campaign[5],
          fundingGoal: campaign[6].toString(),
          donationCount: campaign[7].toString(),
          endDate: campaign[8].toString(),
          status: campaign[9],
        })
      );

      return serializedCampaigns;
    } catch (error) {
      console.error("Error fetching all campaigns:", error);
      throw error;
    }
  } else {
    throw new Error("Ethereum provider not found");
  }
};

export const createCampaign = async (
  title: string,
  gitUrl: string,
  description: string,
  fundingGoal: number,
  endDate: number,
  chain: number
) => {
  // Ensure window.ethereum is available
  if (typeof window.ethereum !== "undefined") {
    try {
      // Request account access
      // await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contractAddress: string =
        getContractConfig("MAIN_CONTRACT").ADDRESS;
      const abi = getContractConfig("MAIN_CONTRACT").ABI;

      const contract = new ethers.Contract(contractAddress, abi, signer);

      // Convert fundingGoal to BigNumber if it's in ether
      //   const fundingGoalWei = ethers.parseEther(fundingGoal.toString());

      // Call the createCampaign function
      const tx = await contract.createCampaign(
        title,
        gitUrl,
        description,
        fundingGoal,
        endDate
      );

      // Wait for the transaction to be mined
      const receipt = await tx.wait();

      console.log("Campaign created successfully:", receipt);
      return receipt;
    } catch (error) {
      console.error("Error creating campaign:", error);
      throw error;
    }
  } else {
    throw new Error("Ethereum provider not found");
  }
};

export const fundUSDC = async (
  amount: number,
  projectNo: number,
  chain: number
) => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contractAddress: string =
        getContractConfig("MAIN_CONTRACT").ADDRESS;
      const abi = getContractConfig("MAIN_CONTRACT").ABI;
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const usdcContractAddress: string =
        getContractConfig("USDC_CONTRACT").ADDRESS;
      const usdcAbi = getContractConfig("USDC_CONTRACT").ABI;
      const usdcContract = new ethers.Contract(
        usdcContractAddress,
        usdcAbi,
        signer
      );

      // Convert amount to Wei
      const amountWei = ethers.parseUnits(amount.toString(), 6); // USDC has 6 decimal places

      // Approve USDC transfer
      const approveTx = await usdcContract.approve(contractAddress, amountWei);
      await approveTx.wait();

      // Fund USDC
      const fundTx = await contract.fundUSDC(amountWei, projectNo);
      const receipt = await fundTx.wait();

      console.log("USDC funding successful:", receipt);
      return receipt;
    } catch (error) {
      console.error("Error funding USDC:", error);
      throw error;
    }
  } else {
    throw new Error("Ethereum provider not found");
  }
};

export const fundEth = async (
  amount: number,
  projectNo: number,
  chain: number
) => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contractAddress: string =
        getContractConfig("MAIN_CONTRACT").ADDRESS;
      const abi = getContractConfig("MAIN_CONTRACT").ABI;
      const contract = new ethers.Contract(contractAddress, abi, signer);

      // Convert amount to Wei
      const amountWei = ethers.parseEther(amount.toString());

      // Fund ETH
      const fundTx = await contract.fundEth(projectNo, { value: amountWei });
      const receipt = await fundTx.wait();

      console.log("ETH funding successful:", receipt);
      return receipt;
    } catch (error) {
      console.error("Error funding ETH:", error);
      throw error;
    }
  } else {
    throw new Error("Ethereum provider not found");
  }
};

export const withdrawUSDC = (
  amount: number,
  projectNo: number,
  chain: number
) => {
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

export const withdrawEth = (projectNo: number, chain: number) => {
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

export const getProjectFundInUSD = async (projectNo: number, chain: number) => {
  const contractAddress: string = getContractConfig("MAIN_CONTRACT").ADDRESS;
  const abi = getContractConfig("MAIN_CONTRACT").ABI;
  const contract_one: any = new ethers.Contract(
    contractAddress,
    abi,
    new ethers.BrowserProvider(window.ethereum)
  );
  const result = await contract_one.getProjectFundInUSD(projectNo);
  const _ethBal: any = ethers.formatUnits(result[0], "ether");
  const _usdcBal: any = ethers.formatUnits(result[1], "ether");
  const ethBalance = (_ethBal / Math.pow(10, 8)).toFixed(2);
  const usdcBalance = (_usdcBal / Math.pow(10, 8)).toFixed(2);
  return { ethBalance, usdcBalance };
};
