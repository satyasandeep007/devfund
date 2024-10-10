"use client";

import React, { ReactNode } from "react";
import { config, projectId, metadata } from "@/lib/wagmiConfig";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

createWeb3Modal({
  metadata,
  allWallets: "HIDE",
  featuredWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
    "225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f",
  ],
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableSwaps: true,
  enableOnramp: true,
  themeMode: "light",
  themeVariables: {
    "--w3m-font-family": "Epilogue",
    "--w3m-accent": "#222",
    "--w3m-border-radius-master": "0px",
  },
});

export default function AppKitProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: any;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
