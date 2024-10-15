"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";
import {
  IconLayoutDashboard,
  IconSpeakerphone,
  IconBrandGithub,
  IconWallet,
  IconLogout,
} from "@tabler/icons-react";

interface NavLinkProps {
  href: string;
  icon: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <div className="mx-2">
      <Link
        href={href}
        className={`flex items-center px-4 py-3 text-sm rounded-md ${
          isActive
            ? "text-white bg-blue-600 font-medium"
            : "text-gray-600 hover:bg-gray-200"
        } transition-colors`}
      >
        <Image
          src={icon}
          alt=""
          width={16}
          height={16}
          className={`mr-3 ${isActive ? "brightness-0 invert" : ""}`}
        />
        <span className={`text-xs font-semibold ${isActive ? "text-white" : "text-gray-400"}`}>{children}</span>
      </Link>
    </div>
  );
};

interface NavSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const NavSection: React.FC<NavSectionProps> = ({
  title,
  children,
  className = "",
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      {" "}
      {/* Add the className prop here */}
      <h2 className="px-4 mb-2 text-xs font-semibold text-gray-500">{title}</h2>
      <div>{children}</div>
    </div>
  );
};

function Sidebar() {
  const { data: session }: any = useSession();

  return (
    <div className="w-64 shrink-0 md:block h-screen fixed top-0 left-0 overflow-y-auto bg-white border-r border-gray-200">
      <div className="w-full h-full bg-white flex flex-col">
        <div className="p-4 flex items-center gap-2 border-b border-gray-200">
          <Image
            src="/logo1.svg"
            alt="DevFund Logo"
            width={180}
            height={40}
            priority
          />
        </div>

        <div className="flex flex-col flex-grow justify-between py-4">
          <div className="space-y-4">
            <NavSection title="MY DASHBOARD" className="mb-4 text-sm">
              <NavLink
                href={`/${session?.user?.username}/dashboard`}
                icon="/ic_dashboard.svg"
              >
                Overview
              </NavLink>
            </NavSection>
            <div className="my-4 border-t border-gray-200"></div>

            <NavSection title="CAMPAIGNS" className="text-sm mt-4">
              <NavLink
                href={`/${session?.user?.username}/campaigns/discover`}
                icon="/ic_camp.svg"
              >
                Discover
              </NavLink>
              <NavLink
                href={`/${session?.user?.username}/campaigns/me`}
                icon="/ic_discover.svg"
              >
                My Campaigns
              </NavLink>
            </NavSection>
            <div className="my-4 border-t border-gray-200"></div>

            <NavSection title="USER PROFILE" className="text-sm mt-4">
              <NavLink
                href={`/${session?.user?.username}/profile/github`}
                icon="/ic_profile.svg"
              >
                Github
              </NavLink>
              <NavLink
                href={`/${session?.user?.username}/profile/wallet`}
                icon="/ic_wallet.svg"
              >
                Wallet
              </NavLink>
            </NavSection>
          </div>

          {/* <div className="mt-auto border-t border-gray-200 py-2">
            <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center">
                <Image
                  src={session?.user?.image || "/default-avatar.png"}
                  alt="user"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">
                    {session?.user?.name || "User Name"}
                  </p>
                  <p className="text-xs text-gray-500">
                    @{session?.user?.username || "username"}
                  </p>
                </div>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <IconLogout size={18} />
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
