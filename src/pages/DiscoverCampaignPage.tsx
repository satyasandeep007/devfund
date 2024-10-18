"use client";

import { useState, useEffect } from "react";
import { CampaignCard } from "@/components/CampaignCard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { useDevFund } from "@/context/DevFundContext";
import SendModal from "@/components/SendModal";

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
  const {
    fundUSDC,
    fundEth,
    refreshCampaigns,
    tokenBalances,
    ethMarketPrice,
    usdcMarketPrice,
  } = useDevFund();

  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [donationAmount, setDonationAmount] = useState("1");
  const [donationType, setDonationType] = useState("USDC");

  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

  const [usdcBalance, setUSDCBalance] = useState("0");
  const [ethBalance, setETHBalance] = useState("0");
  const [campaignId, setCampaignId]: any = useState(null);

  const tabs = [
    { id: "all", label: "All Campaigns" },
    { id: "ongoing", label: "Ongoing" },
    { id: "completed", label: "Completed" },
  ];

  useEffect(() => {
    if (tokenBalances && tokenBalances.length > 0) {
      const _usdcBal = tokenBalances?.find((i) => i.symbol === "TRNSK");
      const usdcBal = _usdcBal.amount;
      const _ethBal = tokenBalances?.find((i) => i.symbol === "ETH");
      const ethBal = _ethBal.amount;

      setUSDCBalance(usdcBal);
      setETHBalance(ethBal);
    }
  }, [tokenBalances]);

  const toggleSendModalOpen = (e: React.FormEvent, campaignId: number) => {
    e.preventDefault();
    setCampaignId(campaignId);
    setIsSendModalOpen(true);
  };

  const toggleSendModalClose = () => {
    setCampaignId(null);
    setIsSendModalOpen(false);
  };

  const handleDonate = async (e: React.FormEvent) => {
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

      await toggleSendModalClose();

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
              Innovative projects,
              <br />
              contribute to open
              <br />
              source success
            </h1>
            <div className="flex items-center text-sm text-gray-600 mb-6">
              <span className="mr-6">952 Campaigns</span>
              <span>188 Total Repos</span>
            </div>
            <button
              onClick={() => {
                router.push(`/user/campaigns/create`);
              }}
              className="bg-black text-white px-6 py-3 rounded-md text-lg font-medium"
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
              className={`px-5 py-1 mx-2 font-medium text-sm ${
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
        {campaigns && campaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                canDonate={true}
                handleDonate={(e) => toggleSendModalOpen(e, campaign.id)}
                isMyCampaign={campaign.owner === address}
                ethMarketPrice={Number(ethMarketPrice)}
                usdcMarketPrice={Number(usdcMarketPrice)}
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
      {isSendModalOpen && (
        <SendModal
          onClose={toggleSendModalClose}
          usdcBalance={usdcBalance}
          ethBalance={ethBalance}
          usdcMarketPrice={usdcMarketPrice}
          ethMarketPrice={ethMarketPrice}
          handleDonate={(e) => handleDonate(e)}
          setDonationAmount={setDonationAmount}
          setDonationType={setDonationType}
          donationAmount={donationAmount}
          donationType={donationType}
          campaign={
            (campaigns && campaigns.find((i) => i.id == campaignId)) || null
          }
        />
      )}
    </div>
  );
};

export default DiscoverCampaignPage;
