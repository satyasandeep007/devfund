"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDevFund } from "@/context/DevFundContext";
import { useGitHubRepos } from "@/context/GithubContext";
import { toast } from "react-toastify";

export default function CreateCampaignPage() {
  const router = useRouter();
  const { data: session }: any = useSession();
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
      const chain = 1; // Replace with actual chain ID
      const result = await createCampaign(
        formData.title,
        formData.gitUrl,
        formData.description,
        Number(formData.fundingGoal),
        chain
      );
      console.log("Project created:", result);
      await refreshCampaigns();
      toast("🦄 Project created!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // TODO: Handle successful project creation
      router.push(`/${session?.user?.username}/campaigns/me`); // Redirect to dashboard after creation
    } catch (error) {
      console.error("Error creating project:", error);
      // TODO: Handle error
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-purple-600 to-indigo-600">
          <h2 className="text-4xl font-extrabold text-white">
            Create Your Campaign
          </h2>
          <p className="mt-2 text-xl text-purple-200">
            Launch your project and start fundraising today
          </p>
        </div>
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Campaign Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="gitUrl"
                className="block text-sm font-medium text-gray-700"
              >
                GitHub Repository
              </label>
              <select
                name="gitUrl"
                id="gitUrl"
                value={formData.gitUrl}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
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
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Campaign Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={6}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Describe your campaign. Markdown is supported!"
              required
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="fundingGoal"
                className="block text-sm font-medium text-gray-700"
              >
                Funding Goal
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="fundingGoal"
                  id="fundingGoal"
                  value={formData.fundingGoal}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-7 pr-12 border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700"
              >
                Duration
              </label>
              <select
                name="duration"
                id="duration"
                value={formData.duration}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
              >
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
              </select>
            </div>
          </div>
          <div className="pt-5">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Create Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
