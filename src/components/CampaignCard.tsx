"use client";

import React, { useState } from "react";

import Image from "next/image";
import { format } from "date-fns";
import { IconEye, IconHeart, IconBrandGithub } from "@tabler/icons-react";

import ReceiveModal from "@/components/ReceiveModal";
import { useAccount } from "wagmi";
import { useDevFund } from "@/context/DevFundContext";
import { toast } from "react-toastify";

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

export function CampaignCard({
  campaign,
  canDonate,
  handleDonate,
  isMyCampaign,
  ethMarketPrice,
  usdcMarketPrice,
}: {
  campaign: Campaign;
  canDonate: boolean;
  handleDonate: (e: React.FormEvent) => any;
  isMyCampaign?: boolean;
  ethMarketPrice: number;
  usdcMarketPrice: number;
}) {
  const { address }: any = useAccount();

  const { withdrawEth, withdrawUSDC, refreshCampaigns, tokenBalances } =
    useDevFund();

  const repoFullName = campaign.gitUrl.split("/").slice(-2).join("/");
  const repoOwner = repoFullName.split("/")[0];

  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);

  const formattedEndDate = campaign?.endDate
    ? format(new Date(parseInt(campaign.endDate) * 1000), "PPP")
    : "N/A";
  const toggleReceiveModal = () => {
    setIsReceiveModalOpen(!isReceiveModalOpen);
  };
  const progress =
    (parseFloat(campaign.usdcBalance) / parseFloat(campaign.fundingGoal)) * 100;

  // Calculate total amount raised in USD
  const totalRaisedUSD =
    parseFloat(campaign.ethBalance) * ethMarketPrice +
    parseFloat(campaign.usdcBalance) * usdcMarketPrice;

  const handleWithdraw = async (withdrawalType: string) => {
    try {
      const projectNo = Number(campaign.id);
      console.log(campaign.id, withdrawalType);

      let result;
      if (withdrawalType === "USDC") {
        result = await withdrawUSDC(projectNo);
      } else {
        result = await withdrawEth(projectNo);
      }

      console.log("Withdrawal made:", result);
      await refreshCampaigns();

      toggleReceiveModal();

      toast(`🎉 Withdrawal successful!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error making withdrawal:", error);
      toast.error("Error making withdrawal. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      <div className="h-48 bg-white relative">
        <Image
          src={`https://opengraph.githubassets.com/1/${repoFullName}`}
          alt={campaign.title}
          layout="fill"
          objectFit="contain"
          className="group-hover:scale-105 transform object-contain transition duration-200"
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h2 className="font-bold text-xl mb-2 text-gray-800 line-clamp-1">
          {campaign.title}
        </h2>
        <p className="text-gray-600 mb-4 flex-grow line-clamp-3 text-sm">
          {campaign.description}
        </p>

        {/* Funding Progress */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Funding Progress</h3>
          <div className="mb-2">
            <span className="text-xl font-bold">
              $
              {totalRaisedUSD.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </span>
            <span className="text-gray-600">
              {" "}
              raised of ${parseInt(campaign.fundingGoal).toLocaleString()} goal
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-gray-600">{campaign.donationCount} backers</p>
        </div>

        {/* GitHub Repository Info */}
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold mb-2">GitHub Repository</h3>
          <div className="flex items-center space-x-4">
            <IconBrandGithub className="text-xl" />
            <a
              href={campaign.gitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {repoFullName}
            </a>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <IconHeart className="w-5 h-5 text-red-500" />
            <span className="text-sm text-gray-600">
              {campaign.donationCount} donations
            </span>
            <span>{isMyCampaign ? "Yours" : ""}</span>
          </div>
          <div className="flex items-center space-x-2">
            <IconEye className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600">{campaign.status}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-500">
            Goal: ${parseInt(campaign.fundingGoal).toLocaleString()}
          </span>
          <span className="text-sm font-semibold text-gray-500">
            End Date: {formattedEndDate}
          </span>
          {canDonate && (
            <div className="space-x-2">
              <button
                onClick={handleDonate}
                className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors"
              >
                Donate
              </button>
            </div>
          )}
          {isMyCampaign && (
            <button
              onClick={toggleReceiveModal}
              className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition-colors"
            >
              Withdraw
            </button>
          )}
        </div>
      </div>

      {isReceiveModalOpen && (
        <ReceiveModal
          onClose={toggleReceiveModal}
          address={address}
          campaign={campaign}
          ethMarketPrice={ethMarketPrice}
          usdcMarketPrice={usdcMarketPrice}
          handleWithdraw={handleWithdraw}
        />
      )}
    </div>
  );
}
