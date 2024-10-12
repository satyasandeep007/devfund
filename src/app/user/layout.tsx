"use client";

import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  IconLogout,
  IconSettings,
  IconUser,
  IconGitBranch,
  IconBrandGithub,
  IconFiles,
  IconSpeakerphone,
} from "@tabler/icons-react";

function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-60 shrink-0 md:block h-screen sticky top-0 overflow-hidden">
      <div className="w-full h-full bg-white border-r">
        <div className="p-4 md:p-6 flex group items-center gap-2">
          <div>
            <h1 className="text-sm font-medium text-gray-800">Git Campaigns</h1>
            <p className="text-xs text-gray-500 font-small">Base India 2024</p>
            <IconBrandGithub />
          </div>
        </div>

        <hr className="bg-gray-400 mx-2" />

        <div className="flex flex-col h-full justify-between">
          {/* top */}
          <div className="pt-6 text-gray-500 font-medium space-y-2 md:px-2 text-xs">
            <Link
              href={"/app/repositories"}
              className={`flex ${
                pathname === "/app/repositories" ? "text-orange-700" : ""
              } hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
            >
              <IconFiles />
              Repositories
            </Link>
            <Link
              href={"/app/pull-requests"}
              className={`flex ${
                pathname === "/app/pull-requests" ? "text-orange-700" : ""
              } hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
            >
              <IconGitBranch />
              Pull Requests
            </Link>

            <Link
              href={"/app/campaigns"}
              className={`flex ${
                pathname === "/app/campaigns" ? "text-orange-700" : ""
              } hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
            >
              <IconSpeakerphone />
              Campaigns
            </Link>
            <Link
              href={"/app/profile"}
              className={`flex ${
                pathname === "/app/profile" ? "text-orange-700" : ""
              } hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
            >
              <IconUser />
              Profile
            </Link>
            <Link
              href={"/app/settings"}
              className={`flex ${
                pathname === "/app/settings" ? "text-orange-700" : ""
              } hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
            >
              <IconSettings />
              Settings
            </Link>
          </div>
          <div>
            <div className="text-gray-500 text-xs font-medium md:px-2">
              <button
                className={`flex ${
                  pathname === "/app/settings" ? "text-primary" : ""
                } hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
              >
                <IconLogout size={16} />
                <a
                  className="text-gray-500"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Logout
                </a>
              </button>
            </div>

            <hr className="bg-gray-400 mx-2 my-4" />

            {/* bottom */}
            <div className="flex pb-32 justify-between px-4 md:px-6 items-center cursor-pointer hover:pr-5 duration-200">
              <div className="flex items-center gap-2">
                <Image
                  src={"https://avatars.githubusercontent.com/u/52450973?v=4"}
                  alt={"user"}
                  width={36}
                  height={36}
                  className="rounded-full"
                />

                <div className="">
                  <p className="text-sm font-semibold text-gray-800">
                    John Doe
                  </p>
                  <p className="text-xs font-medium text-gray-500">@johndoe</p>
                </div>
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
