"use client";
import DiscoverCampaignPage from "@/pages/DiscoverCampaignPage";
import { useDevFund } from "@/context/DevFundContext";

export default function DiscoverCampaigns() {
  const { campaigns, isLoading } = useDevFund();

  if (isLoading) return <div>Loading...</div>;

  return <DiscoverCampaignPage campaigns={campaigns || []} />;
}
