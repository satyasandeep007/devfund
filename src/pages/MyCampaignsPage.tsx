"use client";

import { CampaignCard } from "@/components/CampaignCard";

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
        {/* Campaign Cards */}
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
      </div>
    </div>
  );
};

export default MyCampaignsPage;
