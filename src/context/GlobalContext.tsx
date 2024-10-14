"use client";

import React from "react";
import { DevFundProvider, useDevFund } from "./DevFundContext";
import { GitHubRepoProvider, useGitHubRepos } from "./GithubContext";

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <DevFundProvider>
      <GitHubRepoProvider>{children}</GitHubRepoProvider>
    </DevFundProvider>
  );
};

export const useGlobalContext = () => {
  const devFund = useDevFund();
  const githubRepos = useGitHubRepos();

  return { devFund, githubRepos };
};
