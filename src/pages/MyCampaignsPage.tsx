"use client";

import { CampaignCard } from "@/components/CampaignCard";
import router from "next/router";
import Image from "next/image";

interface Campaign {
  id: number;
  title: string;
  usdcBalance: string;
  ethBalance: string;
  owner: string;
  gitUrl: string;
  description: string;
  fundingGoal: string;
  donationCount: string;
  endDate: string;
  status: string;
}

const MyCampaignsPage = ({
  campaigns,
  usdcMarketPrice,
  ethMarketPrice,
}: {
  campaigns: Campaign[];
  usdcMarketPrice: any;
  ethMarketPrice: any;
}) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Campaigns</h1>
        {campaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {campaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                usdcMarketPrice={usdcMarketPrice}
                ethMarketPrice={ethMarketPrice}
                canDonate={false}
                handleDonate={() => {}}
                isMyCampaign={true}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <Image
              src="/no-data.svg"
              alt="No campaigns found"
              width={200}
              height={200}
              className="mb-8"
            />
            <h2 className="text-2xl font-semibold mb-4">No Campaigns Found</h2>
            <p className="text-gray-600 mb-8 text-center max-w-md">
              There are currently no campaigns available. Be the first to create
              a campaign and start your open-source journey!
            </p>
            <button
              onClick={() => router.push(`/user/campaigns/create`)}
              className="bg-black text-white px-6 py-3 rounded-md text-lg font-medium"
            >
              Create Campaign
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCampaignsPage;
