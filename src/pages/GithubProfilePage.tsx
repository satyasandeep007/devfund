"use client";

import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { IconLogout } from "@tabler/icons-react";

interface GithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
}

interface GithubRepo {
  name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  visibility: string;
}

interface GithubStats {
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
}

interface ContributionData {
  date: string;
  count: number;
}

const StatCard: React.FC<{ title: string; value: number }> = ({
  title,
  value,
}) => (
  <div className="bg-white rounded-lg shadow p-4">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

const GithubProfilePage: React.FC = () => {
  const { status, data: session }: any = useSession();
  const [user, setUser] = useState<GithubUser | null>(null);
  const [popularRepos, setPopularRepos] = useState<GithubRepo[]>([]);
  const [otherRepos, setOtherRepos] = useState<GithubRepo[]>([]);
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [contributionData, setContributionData] = useState<ContributionData[]>(
    []
  );

  useEffect(() => {
    if (session?.user?.username) {
      fetchGithubData(session.user.username);
    }
  }, [session]);

  const handleSignIn = () => {
    signIn("github");
  };

  const handleSignOut = () => {
    signOut();
  };

  const fetchGithubData = async (username: string) => {
    try {
      const userResponse = await fetch(
        `https://api.github.com/users/${username}`
      );
      const userData = await userResponse.json();
      setUser(userData);

      const popularReposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?sort=stars&per_page=6`
      );
      const popularReposData = await popularReposResponse.json();
      setPopularRepos(popularReposData);

      const otherReposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=4`
      );
      const otherReposData = await otherReposResponse.json();
      setOtherRepos(otherReposData);

      const statsResponse = await fetch(
        `https://api.github.com/users/${username}`
      );
      const statsData = await statsResponse.json();
      setStats(statsData);

      // Fetch contribution data (last 30 days)
      const contributionResponse = await fetch(
        `https://api.github.com/users/${username}/events?per_page=100`
      );
      const contributionEvents = await contributionResponse.json();

      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

      const contributionMap = new Map<string, number>();

      for (
        let d = new Date(oneYearAgo);
        d <= new Date();
        d.setDate(d.getDate() + 1)
      ) {
        contributionMap.set(d.toISOString().split("T")[0], 0);
      }

      contributionEvents.forEach((event: any) => {
        const date = new Date(event.created_at);
        if (date >= oneYearAgo) {
          const dateString = date.toISOString().split("T")[0];
          contributionMap.set(
            dateString,
            (contributionMap.get(dateString) || 0) + 1
          );
        }
      });

      const contributionArray = Array.from(
        contributionMap,
        ([date, count]) => ({ date, count })
      );
      setContributionData(contributionArray);
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="profile-page bg-white h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {session ? (
          <div>
            <div className="flex items-start space-x-8">
              <div className="w-1/4">
                <div className="bg-white overflow-hidden">
                  <Image
                    src={user?.avatar_url || "/api/placeholder/300/300"}
                    alt="Profile"
                    width={300}
                    height={300}
                    className="w-full h-auto rounded-xl object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-2xl font-bold">
                      {session?.user?.name || "loading..."}
                    </h2>
                    <p className="text-gray-600">
                      {user?.login?.toLowerCase() || "..."}
                    </p>
                  </div>
                </div>
                <div className="mt-auto border rounded-xl border-gray-200 py-2">
                  <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <Image
                        src={session?.user?.image || "/default-avatar.png"}
                        alt="user"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-800">
                          {session?.user?.name || "User Name"}
                        </p>
                        <p className="text-xs text-gray-500">
                          @{session?.user?.username || "username"}
                        </p>
                      </div>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700">
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={handleSignOut}
                      >
                        <IconLogout size={18} />
                      </button>
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-3/4">
                <h2 className="text-xl font-semibold mb-4">
                  Good Morning, {session?.user?.name}
                </h2>
                <div className="grid grid-cols-4 gap-4 mb-8">
                {stats && (
                  <>
                    <StatCard title="Public Repos" value={stats.public_repos} />
                    <StatCard title="Followers" value={stats.followers} />
                    <StatCard title="Following" value={stats.following} />
                    <StatCard title="Public Gists" value={stats.public_gists} />
                  </>
                )}
              </div>
              </div>
            </div>

            <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Repos</h2>
              {otherRepos &&
                otherRepos.length > 0 &&
                otherRepos.map((repo) => (
                  <div
                    key={repo.name}
                    className="bg-white rounded-lg shadow p-4 mb-4 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-blue-500 font-semibold">
                        {repo.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Forks {repo.forks_count} · Stars {repo.stargazers_count}{" "}
                        · Created by {user?.login}
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                      Create Campaign
                    </button>
                  </div>
                ))}
            </div>

            <div className="w-3/4">
              
              

              
              
            </div>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center h-[80vh]">
            <div className="flex flex-col items-center justify-center ">
              <button
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-black/80"
                onClick={handleSignIn}
              >
                Sign In with GitHub
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};



export default GithubProfilePage;
