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
  const [activeTab, setActiveTab] = useState("work");
  const [donationAmount, setDonationAmount] = useState("1");
  const [donationType, setDonationType] = useState("USDC"); // or 'USDC'

  const tabs = [
    { id: "work", label: "Work" },
    { id: "collections", label: "Collections" },
    { id: "liked", label: "Liked Shots" },
    { id: "members", label: "Members" },
    { id: "about", label: "About" },
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
      <div className="mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="flex items-start mb-8">
          <div className="flex-1">
            <div className="bg-green-400 w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
              V
            </div>
            <h1 className="text-4xl font-bold mb-2">Open Source</h1>
            <p className="text-xl text-gray-600 mb-4">
              A Creative Studio; Crafting UX/UI, Branding, and Development
            </p>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span className="mr-4">9,507 followers</span>
              <span className="mr-4">147 following</span>
              <span>2,270 likes</span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  router.push(`/${session?.user?.username}/campaigns/create`);
                }}
                className="bg-gray-900 text-white px-4 py-2 rounded-md"
              >
                Create Campaign
              </button>
            </div>
          </div>
          <div className="w-1/2">
            <Image
              src="https://cdn.dribbble.com/users/6567474/profile/masthead/1fa860e1-8afe-49be-b766-6cc3c01c53b7/1111.png"
              alt="Hero"
              className="w-full h-auto rounded-lg"
              width={100}
              height={100}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 mr-4 font-medium ${
                activeTab === tab.id
                  ? "text-black border-b-2 border-black"
                  : "text-gray-500 hover:text-black"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
          <div className="flex-grow"></div>
          <select className="border-none bg-transparent text-gray-700">
            <option>Featured Shots</option>
            {/* Add more options as needed */}
          </select>
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
