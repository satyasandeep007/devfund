"use client";
import { useState } from "react";
import { CampaignCard } from "@/components/CampaignCard";
import { sampleCampaigns } from "@/lib/mockUtil/campaignData";

const CampaignPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  const filteredCampaigns = sampleCampaigns.filter((campaign) => {
    const matchesSearch = campaign.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      category === "all" || campaign.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white p-12 mb-8">
          <h1 className="text-4xl font-bold mb-4">
            GitFund: Empowering Open Source
          </h1>
          <p className="text-xl mb-6">
            Support and fund innovative open-source projects
          </p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-100 transition duration-300">
            Create Campaign
          </button>
        </section>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <input
            type="text"
            placeholder="Search campaigns..."
            className="flex-grow px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="web">Web Development</option>
            <option value="mobile">Mobile Apps</option>
            <option value="ai">Artificial Intelligence</option>
            <option value="blockchain">Blockchain</option>
          </select>
        </div>

        {/* Campaign Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.githubRepo.id} campaign={campaign} />
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <p className="text-center text-gray-600 mt-8">No campaigns found.</p>
        )}
      </div>
    </div>
  );
};

export default CampaignPage;
