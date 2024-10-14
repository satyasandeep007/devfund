"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useAccount } from "wagmi";
import Image from "next/image";

const GithubProfilePage: React.FC = () => {
  const { status, data: session }: any = useSession();
  const { address } = useAccount();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const popularRepositories = [
    { name: "Solut", type: "CSS", visibility: "Public" },
    { name: "Cab-Rental", type: "CSS", visibility: "Public" },
    { name: "Background-change", type: "CSS", visibility: "Public" },
    { name: "card-view-transion", type: "SCSS", visibility: "Public" },
    { name: "vertical_navbar", type: "HTML", visibility: "Public" },
    { name: "CSS-Battles", type: "HTML", visibility: "Public" },
  ];

  const otherRepositories = [
    { name: "Next-JS-UI-Kit", forks: 0, stars: 1, creator: "0x00raghu" },
    { name: "Account-Abstraction-Tool-Kit", forks: 0, stars: 1, creator: "0x00raghu" },
    { name: "Arbitrum-Dev-Tools", forks: 0, stars: 0, creator: "0x00raghu" },
    { name: "Base-Public-Goods", forks: 0, stars: 2, creator: "0x00raghu" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-end">
        <button className="bg-white text-red-500 hover:bg-red-100 hover:text-red-700 px-4 py-2 rounded-md shadow-sm transition duration-150 ease-in-out">
          Sign-out GitHub
        </button>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-start space-x-8">
          <div className="w-1/4">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <Image
                src="/api/placeholder/300/300"
                alt="Profile"
                width={300}
                height={300}
                className="w-full h-auto"
              />
              <div className="p-4">
                <h2 className="text-2xl font-bold">vinay G</h2>
                <p className="text-gray-600">vinay4656</p>
              </div>
            </div>
          </div>
          
          <div className="w-3/4">
            <h2 className="text-xl font-semibold mb-4">Popular repositories</h2>
            <div className="grid grid-cols-2 gap-4">
              {popularRepositories.map((repo) => (
                <div key={repo.name} className="bg-white rounded-lg shadow p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-blue-500 font-semibold">{repo.name}</h3>
                    <span className="text-gray-500 text-sm">{repo.visibility}</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`w-3 h-3 rounded-full mr-2 ${repo.type === 'CSS' ? 'bg-purple-500' : repo.type === 'SCSS' ? 'bg-pink-500' : 'bg-orange-500'}`}></span>
                    <span className="text-sm text-gray-600">{repo.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="flex items-center space-x-4 mb-4">
            <Image
              src="/api/placeholder/40/40"
              alt="0x00raghu"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-semibold">0x00raghu</span>
          </div>
          
          {otherRepositories.map((repo) => (
            <div key={repo.name} className="bg-white rounded-lg shadow p-4 mb-4 flex justify-between items-center">
              <div>
                <h3 className="text-blue-500 font-semibold">{repo.name}</h3>
                <p className="text-sm text-gray-600">
                  Forks {repo.forks} · Stars {repo.stars} · Created by {repo.creator}
                </p>
              </div>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Create Campaign
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default GithubProfilePage;
