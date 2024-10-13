"use client";

import { useState } from "react";
import { CampaignCard } from "@/components/CampaignCard";
import { sampleCampaigns } from "@/lib/mockUtil/campaignData";

const CampaignPage = () => {
  const [activeTab, setActiveTab] = useState("featured");

  const tabs = [
    { id: "featured", label: "Featured" },
    { id: "trending", label: "Trending" },
    { id: "recent", label: "Recent" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">OpenSource Campaigns</h1>
          <p className="text-xl text-gray-600 mb-8">
            Empowering Open Source Projects
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
            Create Campaign
          </button>
        </section>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-6 py-2 mx-2 font-semibold ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Campaign Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleCampaigns.map((campaign) => (
            <CampaignCard key={campaign.githubRepo.id} campaign={campaign} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignPage;
