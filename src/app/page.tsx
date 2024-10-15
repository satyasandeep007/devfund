"use client";

import { useAccount } from "wagmi";
import Hero from "@/components/Hero";

import Header from "@/components/header";

const Home: React.FC = () => {
  const { isConnected } = useAccount();

  return (
    <main className="h-screen bg-[#f0f0f0] dark:bg-[#1a1a1a]">
      <Header isConnected={isConnected} />
      <Hero />
    </main>
  );
};

export default Home;
