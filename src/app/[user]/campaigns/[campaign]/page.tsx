import React from "react";
import { IconBrandGithub, IconStar, IconGitFork } from "@tabler/icons-react";

interface CampaignDetailProps {
  params: {
    user: string;
    campaign: string;
  };
}

const CampaignDetail: React.FC<CampaignDetailProps> = async ({ params }) => {
  // Fetch campaign details here (replace with actual data fetching logic)
  const campaignData = {
    title: "Open Source Funding Campaign",
    description: "Support our open source project and help us reach our goals!",
    githubRepo: "https://github.com/username/project",
    stars: 1234,
    forks: 567,
    amountRaised: 75000,
    goal: 100000,
    backers: 523,
  };

  const progress = (campaignData.amountRaised / campaignData.goal) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{campaignData.title}</h1>
      <p className="text-gray-600 mb-6">{campaignData.description}</p>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">GitHub Repository</h2>
        <div className="flex items-center space-x-4">
          <IconBrandGithub className="text-2xl" />
          <a
            href={campaignData.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {campaignData.githubRepo}
          </a>
        </div>
        <div className="flex items-center space-x-6 mt-4">
          <div className="flex items-center">
            <IconStar className="text-yellow-400 mr-2" />
            <span>{campaignData.stars} stars</span>
          </div>
          <div className="flex items-center">
            <IconGitFork className="text-gray-600 mr-2" />
            <span>{campaignData.forks} forks</span>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Funding Progress</h2>
        <div className="mb-2">
          <span className="text-2xl font-bold">
            ${campaignData.amountRaised.toLocaleString()}
          </span>
          <span className="text-gray-600">
            {" "}
            raised of ${campaignData.goal.toLocaleString()} goal
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-gray-600">{campaignData.backers} backers</p>
      </div>

      <div className="text-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Support This Campaign
        </button>
      </div>
    </div>
  );
};

export default CampaignDetail;
