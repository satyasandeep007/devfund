"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useAccount } from "wagmi";

const WalletProfilePage: React.FC = () => {
  const { status, data: session }: any = useSession();
  const { address } = useAccount();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <h1>User Profile</h1>

      <div className="wallet-info">
        <h2>Wallet Information</h2>
        <p>Address: {address}</p>
      </div>
    </div>
  );
};

export default WalletProfilePage;
