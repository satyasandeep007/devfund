"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";

interface NavLinkProps {
  href: string;
  activeIcon: string;
  inactiveIcon: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  activeIcon,
  inactiveIcon,
  children,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <div className="mx-2">
      <Link
        href={href}
        className={`flex items-center px-4 py-3 text-sm rounded-md ${
          isActive
            ? "text-white bg-black font-medium"
            : "text-gray-600 hover:bg-gray-200"
        } transition-colors`}
      >
        <Image
          src={isActive ? activeIcon : inactiveIcon}
          alt=""
          width={16}
          height={16}
          className="mr-3"
        />
        <span
          className={`text-xs font-semibold ${
            isActive ? "text-white" : "text-gray-400"
          }`}
        >
          {children}
        </span>
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
          <h1 className="text-2xl font-bold mr-8 flex items-center">
            <Image
              src="/logo.svg"
              width={40}
              height={40}
              className="mr-2"
              alt="logo"
            />
            <a href="/" className="text-black hover:text-gray-700">
              DevFund
            </a>
          </h1>
        </div>

        <div className="flex flex-col flex-grow justify-between py-4">
          <div className="space-y-4">
            <NavSection title="MY DASHBOARD" className="mb-4 text-sm">
              <NavLink
                href={`/user/dashboard`}
                activeIcon="/ic_dashbaord_active.svg"
                inactiveIcon="/ic_dashbaord.svg"
              >
                Overview
              </NavLink>
            </NavSection>
            <div className="my-4 border-t border-gray-200"></div>

            <NavSection title="CAMPAIGNS" className="text-sm mt-4">
              <NavLink
                href={`/user/campaigns/discover`}
                activeIcon="/ic_discover_active.svg"
                inactiveIcon="/ic_discover.svg"
              >
                Discover
              </NavLink>
              <NavLink
                href={`/user/campaigns/me`}
                activeIcon="/ic_camp_active.svg"
                inactiveIcon="/ic_camp.svg"
              >
                My Campaigns
              </NavLink>
            </NavSection>
            <div className="my-4 border-t border-gray-200"></div>

            <NavSection title="USER PROFILE" className="text-sm mt-4">
              <NavLink
                href={`/user/profile/github`}
                activeIcon="/ic_profile_active.svg"
                inactiveIcon="/ic_profile.svg"
              >
                Github
              </NavLink>
              <NavLink
                href={`/user/profile/wallet`}
                activeIcon="/ic_wallet_active.svg"
                inactiveIcon="/ic_wallet.svg"
              >
                Wallet
              </NavLink>
            </NavSection>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
