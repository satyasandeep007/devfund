"use client";

import { useAccount } from "wagmi";
import Hero from "@/components/Hero";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

import Header from "@/components/header";

const Home: React.FC = () => {
  const { isConnected } = useAccount();

  const router = useRouter();
  const { data: session }: any = useSession();

  useEffect(() => {
    if (isConnected) {
      // router.push(`/${session.user.username}/dashboard`);
      router.push(`/satyasandeep007/dashboard`);
    }
  }, [isConnected, router, session.user.username]);

  return (
    <main className="h-screen bg-[#f0f0f0] dark:bg-[#1a1a1a]">
      <Header isConnected={isConnected} />
      <Hero />
    </main>
  );
};

export default Home;
