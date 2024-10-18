"use client";
import DiscoverCampaignPage from "@/pages/DiscoverCampaignPage";
import { useGlobalContext } from "@/app/GlobalContext";

export default function DiscoverCampaigns() {
  const { campaigns, isLoading } = useGlobalContext();

  if (isLoading) return <div>Loading...</div>;

  return <DiscoverCampaignPage campaigns={campaigns || []} />;
}
