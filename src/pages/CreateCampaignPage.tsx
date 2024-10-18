"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDevFund } from "@/context/DevFundContext";
import { useGitHubRepos } from "@/context/GithubContext";
import { toast } from "react-toastify";
import { addDays } from "date-fns";
import { IconChevronDown, IconChevronLeft } from "@tabler/icons-react";

export default function CreateCampaignPage() {
  const router = useRouter();
  const { createCampaign, refreshCampaigns } = useDevFund();
  const { repos, loading } = useGitHubRepos();

  const [formData, setFormData] = useState({
    title: "",
    gitUrl: "",
    description: "",
    fundingGoal: "",
    duration: "30",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const chain = 1;
      const currentDate = new Date();
      const endDate = addDays(currentDate, Number(formData.duration));
      const endDateTimestamp = Math.floor(endDate.getTime() / 1000);

      await createCampaign(
        formData.title,
        formData.gitUrl,
        formData.description,
        Number(formData.fundingGoal),
        endDateTimestamp,
        chain
      );
      await refreshCampaigns();
      toast.success("🦄 Project created!");
      router.push(`/user/campaigns/me`);
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project. Please try again.");
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="px-8 mb-6 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Create Campaign</h2>
      </div>
      <div className="max-w-6xl mx-auto bg-white rounded-2xl">
        <div className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-1/3">
                  <h3 className="text-lg font-Bold text-gray-900">
                    Campaign Details
                  </h3>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-1/3">
                  <label
                    htmlFor="title"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Campaign Title
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Describe your campaign Name !
                  </p>
                </div>
                <div className="w-2/3">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="Campaign 209175"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    You can`&apos;t change the campaign name.
                  </p>
                </div>
              </div>
              <div className="w-3/3 border-t border-white"></div>

              <div className="flex items-start">
                <div className="w-1/3">
                  <label
                    htmlFor="gitUrl"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    GitHub Repository
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Select the repository for your campaign.
                  </p>
                </div>
                <div className="w-2/3">
                  <div className="relative">
                    <select
                      name="gitUrl"
                      id="gitUrl"
                      value={formData.gitUrl}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-black"
                      required
                    >
                      <option value="">Select a repository</option>
                      {loading ? (
                        <option value="" disabled>
                          Loading repositories...
                        </option>
                      ) : (
                        repos.map((repo: any) => (
                          <option key={repo.id} value={repo.html_url}>
                            {repo.full_name}
                          </option>
                        ))
                      )}
                    </select>
                    <IconChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    You can`&apos;t change the repository once selected.
                  </p>
                </div>
              </div>
              <div className="w-3/3 border-t border-white"></div>

              <div className="flex items-start">
                <div className="w-1/3">
                  <label
                    htmlFor="description"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Campaign Description
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Describe your campaign.
                  </p>
                </div>
                <div className="w-2/3">
                  <textarea
                    name="description"
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    placeholder="Describe your campaign..."
                    required
                  />
                </div>
              </div>
              <div className="w-3/3 border-t border-white"></div>

              <div className="flex items-start">
                <div className="w-1/3">
                  <label className="block text-sm font-semibold text-gray-700 ">
                    Funding Goal & Duration
                    <p className="text-xs text-gray-500 mt-1">
                      Describe Fund and Duration of campaign.
                    </p>
                  </label>
                </div>
                <div className="w-2/3 flex space-x-4">
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      name="fundingGoal"
                      value={formData.fundingGoal}
                      onChange={handleChange}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                      placeholder="Enter Amount"
                      required
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      USD
                    </span>
                  </div>
                  <div className="flex-1 relative">
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-black"
                    >
                      <option value="30">30 days</option>
                      <option value="60">60 days</option>
                      <option value="90">90 days</option>
                    </select>
                    <IconChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleGoBack}
                className="flex items-center text-gray-600 hover:text-gray-800 border border-black rounded-md px-4 py-2 mr-4"
              >
                <IconChevronLeft className="w-5 h-5 mr-1" />
                Back
              </button>

              <button
                type="submit"
                className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Create Campaign
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
