"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { fetchGitHubRepos } from "@/lib/githubUtil";
import { parseLinkHeader } from "@/lib/helper";

interface GitHubRepoContextType {
  repos: any[];
  loading: boolean;
  nextPage: string | null;
  prevPage: string | null;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const GitHubRepoContext = createContext<GitHubRepoContextType | undefined>(
  undefined
);

export const useGitHubRepos = () => {
  const context = useContext(GitHubRepoContext);
  if (context === undefined) {
    throw new Error("useGitHubRepos must be used within a GitHubRepoProvider");
  }
  return context;
};

export const GitHubRepoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session }: any = useSession();
  const [repos, setRepos] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRepos = async () => {
      if (session) {
        try {
          setLoading(true);
          const data = await fetchGitHubRepos(session.user.username);
          setRepos(data);

          const links = parseLinkHeader(data.headers.get("Link"));
          setNextPage(links.next || null);
          setPrevPage(links.prev || null);
        } catch (error: any) {
          console.error("Error fetching GitHub repos:", error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    getRepos();
  }, [session, currentPage]);

  return (
    <GitHubRepoContext.Provider
      value={{
        repos,
        loading,
        nextPage,
        prevPage,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </GitHubRepoContext.Provider>
  );
};
