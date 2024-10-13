"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useAccount } from "wagmi";

const ProfilePage: React.FC = () => {
  const { status, data: session }: any = useSession();
  const { address } = useAccount();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <h1>User Profile</h1>
      <div className="github-info">
        <h2>GitHub Information</h2>
        <p>Username: {session?.user?.username}</p>
        <p>
          Profile URL:{" "}
          <a
            href={session?.user?.username}
            target="_blank"
            rel="noopener noreferrer"
          >
            {session?.user?.username}
          </a>
        </p>
      </div>
      <div className="wallet-info">
        <h2>Wallet Information</h2>
        <p>Address: {address}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
