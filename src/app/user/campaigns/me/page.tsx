"use client";

import MyCampaignsPage from "@/pages/MyCampaignsPage";
import { useDevFund } from "@/context/DevFundContext";
import { useAccount } from "wagmi";

export default function MyCampaigns() {
  const { campaigns, isLoading, ethMarketPrice, usdcMarketPrice } =
    useDevFund();
  const { address } = useAccount();

  const myCampaigns = campaigns?.filter(
    (campaign) => campaign.owner === address
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
