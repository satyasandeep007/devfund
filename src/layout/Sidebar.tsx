"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";
import {
  IconLogout,
  IconUser,
  IconBrandGithub,
  IconFiles,
  IconSpeakerphone,
  IconDashboard,
} from "@tabler/icons-react";

function Sidebar() {
  const pathname = usePathname();
  const { data: session }: any = useSession();

  return (
    <div className="w-60 shrink-0 md:block h-screen sticky top-0 overflow-hidden border-r border-gray-900">
      <div className="w-full h-full bg-white flex flex-col">
        <div className="p-6 flex items-center gap-2">
          <IconBrandGithub size={24} />
          <div>
            <h1 className="text-sm font-medium text-gray-800">Git Campaigns</h1>
            <p className="text-xs text-gray-500">Base India 2024</p>
          </div>
        </div>

        <hr className="border-gray-200" />

        <div className="flex flex-col flex-grow justify-between">
          {/* top */}
          <div className="pt-6 text-gray-500 font-medium space-y-2 md:px-2 text-xs">
            <NavLink
              href={`/${session?.user?.username}/dashboard`}
              icon={<IconDashboard size={18} />}
            >
              Dashboard
            </NavLink>
            <NavLink
              href={`/${session?.user?.username}/repositories`}
              icon={<IconFiles size={18} />}
            >
              Repositories
            </NavLink>
            <NavLink
              href={`/${session?.user?.username}/campaigns`}
              icon={<IconSpeakerphone size={18} />}
            >
              Campaigns
            </NavLink>
            <NavLink
              href={`/${session?.user?.username}/profile`}
              icon={<IconUser size={18} />}
            >
              Profile
            </NavLink>
          </div>

          {/* bottom */}
          <div className="mt-auto">
            <div className="text-gray-500 text-sm font-medium">
              <button
                className="flex w-full px-4 py-2 items-center gap-2 hover:bg-gray-100 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  // Add logout logic here
                }}
              >
                <IconLogout size={18} />
                <span>Logout</span>
              </button>
            </div>

            <hr className="border-gray-200 my-2" />

            <div className="flex px-4 py-3 items-center cursor-pointer hover:bg-gray-100 transition-colors">
              <Image
                src={"https://avatars.githubusercontent.com/u/52450973?v=4"}
                alt={"user"}
                width={32}
                height={32}
                className="rounded-full"
              />
              <div className="ml-3">
                <p className="text-sm font-semibold text-gray-800">John Doe</p>
                <p className="text-xs font-medium text-gray-500">@johndoe</p>
              </div>
            </div>
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
  console.log(pathname, href, isActive);

  return (
    <Link
      href={href}
      className={`flex items-center px-4 py-2 ${
        isActive ? "text-orange-700 bg-orange-50" : "text-gray-600"
      } hover:bg-gray-100 transition-colors`}
    >
      <span className="mr-3">{icon}</span>
      {children}
    </Link>
  );
};

export default Sidebar;
