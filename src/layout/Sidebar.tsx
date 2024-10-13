"use client";

import Image from "next/image";
import Link, { LinkProps } from "next/link";
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
    <div className="w-60 shrink-0 md:block h-screen sticky top-0 overflow-hidden">
      <div className="w-full h-full bg-white border-r flex flex-col">
        <div className="p-6 flex items-center gap-2">
          <IconBrandGithub size={24} />
          <div>
            <h1 className="text-sm font-medium text-gray-800">Git Campaigns</h1>
            <p className="text-xs text-gray-500">Base India 2024</p>
          </div>
        </div>

        <hr className="bg-gray-200 mx-2" />

        <div className="flex flex-col h-full justify-between">
          {/* top */}
          <div className="pt-6 text-gray-500 font-medium space-y-2 md:px-2 text-xs">
            <Link
              href={`/${session?.user?.username}/dashboard`}
              className={`flex ${
                pathname === `/${session?.user?.username}/dashboard`
                  ? "text-orange-700"
                  : ""
              } hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
            >
              <IconDashboard />
              Dashboard
            </Link>
            <Link
              href={`/${session?.user?.username}/repositories`}
              className={`flex ${
                pathname === `/${session?.user?.username}/repositories`
                  ? "text-orange-700"
                  : ""
              } hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
            >
              <IconFiles />
              Repositories
            </Link>

            <Link
              href={`/${session?.user?.username}/campaigns`}
              className={`flex ${
                pathname === `/${session?.user?.username}/campaigns`
                  ? "text-orange-700"
                  : ""
              } hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
            >
              <IconSpeakerphone />
              Campaigns
            </Link>
            <Link
              href={`/${session?.user?.username}/profile`}
              className={`flex ${
                pathname === `/${session?.user?.username}/profile`
                  ? "text-orange-700"
                  : ""
              } hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
            >
              <IconUser />
              Profile
            </Link>
          </div>

          {/* bottom */}
          <div>
            <div className="text-gray-500 text-xs font-medium px-2">
              <button
                className="flex hover:px-8 duration-200 px-6 py-2 items-center gap-2 w-full"
                onClick={(e) => {
                  e.preventDefault();
                  // Add logout logic here
                }}
              >
                <IconLogout size={16} />
                <span>Logout</span>
              </button>
            </div>

            <hr className="bg-gray-200 mx-2 my-4" />

            <div className="flex  pb-32 px-6 py-4 items-center cursor-pointer hover:bg-gray-100 transition-colors">
              <Image
                src={"https://avatars.githubusercontent.com/u/52450973?v=4"}
                alt={"user"}
                width={36}
                height={36}
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

const NavLink = React.forwardRef<
  LinkProps,
  React.ComponentPropsWithoutRef<"a">
>(({ className, href, ...props }) => (
  <Link
    href={href!}
    className={`flex ${
      window.location.pathname === href! ? "text-primary" : ""
    } hover:px-8 duration-200 rounded-md w-full py-2 px-6 items-center gap-2`}
    {...props}
  />
));
NavLink.displayName = "NavLink";

export default Sidebar;
