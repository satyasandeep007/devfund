import { CampaignCard } from "@/components/CampaignCard";
import { sampleCampaigns } from "@/lib/mockUtil/campaignData";
const CampaignPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Git Campaigns</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sampleCampaigns.map((campaign) => (
            <CampaignCard key={campaign.githubRepo.id} campaign={campaign} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignPage;
