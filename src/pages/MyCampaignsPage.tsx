"use client";

import { CampaignCard } from "@/components/CampaignCard";
import { sampleCampaigns } from "@/lib/mockUtil/campaignData";
import Image from "next/image";

const MyCampaignsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto px-4 py-8">
        {/* Campaign Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sampleCampaigns.map((campaign) => (
            <CampaignCard key={campaign.githubRepo.id} campaign={campaign} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCampaignsPage;
