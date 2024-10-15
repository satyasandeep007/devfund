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
            <NavSection title="MY DASHBOARD" className="pt-4">
              <NavLink
                href={`/${session?.user?.username}/dashboard`}
                icon={<IconLayoutDashboard size={18} />}
              >
                Overview
              </NavLink>
            </NavSection>

            <NavSection title="CAMPAIGNS">
              <NavLink
                href={`/${session?.user?.username}/campaigns/discover`}
                icon={<IconSpeakerphone size={18} />}
              >
                Discover
              </NavLink>
              <NavLink
                href={`/${session?.user?.username}/campaigns/me`}
                icon={<IconSpeakerphone size={18} />}
              >
                My Campaigns
              </NavLink>
            </NavSection>

            <NavSection title="USER PROFILE">
              <NavLink
                href={`/${session?.user?.username}/profile/github`}
                icon={<IconBrandGithub size={18} />}
              >
                Github
              </NavLink>
              <NavLink
                href={`/${session?.user?.username}/profile/wallet`}
                icon={<IconWallet size={18} />}
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

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center px-4 py-2 text-sm ${
        isActive ? "text-blue-600 bg-blue-50 font-medium" : "text-gray-700"
      } hover:bg-gray-100 transition-colors`}
    >
      <span className="mr-3 text-gray-500">{icon}</span>
      {children}
    </Link>
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

export default Sidebar;
