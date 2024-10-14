"use client";

import { useState } from "react";
import { CampaignCard } from "@/components/CampaignCard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { useDevFund } from "@/context/DevFundContext";
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

interface DiscoverCampaignPageProps {
  campaigns: Campaign[];
}

const DiscoverCampaignPage: React.FC<DiscoverCampaignPageProps> = ({
  campaigns,
}) => {
  const { address } = useAccount();
  const { data: session }: any = useSession();
  const { fundUSDC, fundEth, refreshCampaigns } = useDevFund();

  const router = useRouter();
<<<<<<< HEAD
  const [activeTab, setActiveTab] = useState("all");
=======
  const [activeTab, setActiveTab] = useState("work");
  const [donationAmount, setDonationAmount] = useState("1");
  const [donationType, setDonationType] = useState("USDC"); // or 'USDC'
>>>>>>> a731a12a542b23b1f0f347a1d64b9e8cc8bdc683

  const tabs = [
    { id: "all", label: "All Campaigns" },
    { id: "ongoing", label: "Ongoing" },
    { id: "completed", label: "Completed" },
  ];

  const handleDonate = async (e: React.FormEvent, campaignId: number) => {
    e.preventDefault();
    try {
      const chain = 1;
      const amount = Number(donationAmount);
      const projectNo = Number(campaignId);

      let result;
      if (donationType === "USDC") {
        result = await fundUSDC(amount, projectNo, chain);
      } else {
        result = await fundEth(amount, projectNo, chain);
      }

      console.log("Donation made:", result);
      await refreshCampaigns();

      toast(`🦄 ${donationType} Donation successful!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Redirect to campaign page after donation
      router.push(`/${session?.user?.username}/campaigns/discover`);
    } catch (error) {
      console.error("Error making donation:", error);
      toast.error("Error making donation. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="flex flex-row items-start mb-12">
          <div className="flex-1 pr-8">
            <h1 className="text-5xl font-bold mb-8">
              Innovative projects,<br />
              contribute to open<br />
              source success
            </h1>
            <div className="flex items-center text-sm text-gray-600 mb-6">
              <span className="mr-6">952 Campaigns</span>
              <span>188 Total Repo's</span>
            </div>
            <button
              onClick={() => {
                router.push(`/${session?.user?.username}/campaigns/create`);
              }}
              className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-medium"
            >
              Create Campaign
            </button>
          </div>
          <div className="flex-1">
            <Image
              src="/discover_img.png"
              alt="Open Source Collaboration"
              width={500}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-5 py-1 mx-2 mb-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "text-black border-b-2 border-black"
                  : "text-gray-400 hover:text-black"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Campaign Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              canDonate={true}
              handleDonate={(e) => handleDonate(e, campaign.id)}
              isMyCampaign={campaign.owner === address}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverCampaignPage;
