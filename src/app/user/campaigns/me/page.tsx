"use client";

import MyCampaignsPage from "@/pages/MyCampaignsPage";
import { useGlobalContext } from "@/app/GlobalContext";
import { useAccount } from "wagmi";

export default function MyCampaigns() {
  const { campaigns, isLoading, ethMarketPrice, usdcMarketPrice } =
    useGlobalContext();
  const { address } = useAccount();

  const myCampaigns = campaigns?.filter(
    (campaign: any) => campaign.owner === address
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <MyCampaignsPage
      campaigns={myCampaigns || []}
      usdcMarketPrice={usdcMarketPrice}
      ethMarketPrice={ethMarketPrice}
    />
  );
}
