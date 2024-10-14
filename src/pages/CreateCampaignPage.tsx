"use client";
import React, { useState } from "react";
import { createProject } from "../lib/contractUtil/contractFunctions";

export default function CreateCampaignPage() {
  const [title, setTitle] = useState("");
  const [gitUrl, setGitUrl] = useState("");
  const [description, setDescription] = useState("");
  const [fundingGoal, setFundingGoal] = useState("");
  const [duration, setDuration] = useState("30");
  const [projectWebsite, setProjectWebsite] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const chain = 1; // Replace with actual chain ID
      const result = await createProject(title, gitUrl, chain);
      console.log("Project created:", result);
      // TODO: Handle successful project creation
    } catch (error) {
      console.error("Error creating project:", error);
      // TODO: Handle error
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/3 bg-blue-600 p-8 flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Your Project Name
          </h1>
          <p className="text-xl text-blue-200">
            Web3 is just a family business
          </p>
        </div>
        <div className="text-blue-200">
          <p>&copy; 2023 Your Project Name. All rights reserved.</p>
        </div>
      </div>

      {/* Main content */}
      <div className="w-2/3 p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6">Create your campaign</h2>
        <p className="mb-8 text-gray-600">
          Start now by creating your first campaign on Your Project Name.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="gitUrl" className="block mb-2 font-medium">
              Select a GitHub repository*
            </label>
            <input
              type="url"
              id="gitUrl"
              value={gitUrl}
              onChange={(e) => setGitUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="title" className="block mb-2 font-medium">
              Campaign title*
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block mb-2 font-medium">
              Campaign description*
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Enter your campaign description here. We support markdown as well!"
              required
            />
          </div>

          <div>
            <label htmlFor="duration" className="block mb-2 font-medium">
              Campaign duration
            </label>
            <select
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
            </select>
          </div>

          <div>
            <label htmlFor="projectWebsite" className="block mb-2 font-medium">
              Project website URL
            </label>
            <input
              type="url"
              id="projectWebsite"
              value={projectWebsite}
              onChange={(e) => setProjectWebsite(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label htmlFor="fundingGoal" className="block mb-2 font-medium">
              Funding Goal
            </label>
            <input
              type="number"
              id="fundingGoal"
              value={fundingGoal}
              onChange={(e) => setFundingGoal(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.01"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Create campaign
          </button>
        </form>
      </div>
    </div>
  );
}
