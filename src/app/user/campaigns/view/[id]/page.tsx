"use client";

import React from "react";
import { IconBrandGithub, IconStar, IconGitFork } from "@tabler/icons-react";
import { useDevFund } from "@/context/DevFundContext";

interface CampaignDetailProps {
  params: {
    id: string;
  };
}

const CampaignDetail: React.FC<CampaignDetailProps> = ({ params }) => {
  const { campaigns, ethMarketPrice, usdcMarketPrice, refreshCampaigns } =
    useDevFund();

  React.useEffect(() => {
    if (campaigns.length === 0) {
      refreshCampaigns();
    }
  }, [campaigns, refreshCampaigns]);

  const campaign: any =
    campaigns && campaigns.find((c: any) => c.id == params.id);

  if (!campaign) {
    return <div>Loading campaign...</div>;
  }

  const progress = (campaign.usdcBalance / campaign.goal) * 100;

  // Calculate total amount raised in USD
  const totalRaisedUSD =
    campaign.ethBalance * ethMarketPrice +
    campaign.usdcBalance * usdcMarketPrice;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>
      <p className="text-gray-600 mb-6">{campaign.description}</p>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">GitHub Repository</h2>
        <div className="flex items-center space-x-4">
          <IconBrandGithub className="text-2xl" />
          <a
            href={campaign.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {campaign.githubRepo}
          </a>
        </div>
        <div className="flex items-center space-x-6 mt-4">
          <div className="flex items-center">
            <IconStar className="text-yellow-400 mr-2" />
            <span>{campaign.stars} stars</span>
          </div>
          <div className="flex items-center">
            <IconGitFork className="text-gray-600 mr-2" />
            <span>{campaign.forks} forks</span>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Funding Progress</h2>
        <div className="mb-2">
          <span className="text-2xl font-bold">
            $
            {totalRaisedUSD.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </span>
          <span className="text-gray-600">
            {" "}
            raised of ${campaign.fundingGoal} goal
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-gray-600">{campaign.donationCount} backers</p>
      </div>

      <div className="text-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Support This Campaign
        </button>
      </div>
    </div>
  );
};

export default CampaignDetail;
