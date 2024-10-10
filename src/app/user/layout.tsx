"use client";

import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/Sidebar";
import { IconArrowLeft, IconBrandTabler } from "@tabler/icons-react";
import { useAccount, useDisconnect } from "wagmi";
import DashboardHeader from "@/components/Header";
import { useRouter } from "next/navigation"; // Updated import for client-side navigation

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  // useEffect(() => {
  //   if (!isConnected) {
  //     router.push(`/`);
  //   }
  // }, [isConnected, router]);

  const handleDisconnect = () => {
    disconnect();
    router.push(`/`);
  };

  const links = [
    {
      label: "Dashboard",
      href: "/user/dashboard",
      icon: (
        <IconBrandTabler className="text-[#222222] dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },

    {
      label: "Logout",
      href: "#",
      onClick: () => handleDisconnect(),
      icon: (
        <IconArrowLeft className="text-[#222222] dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  return (
    <div className="flex h-screen bg-[#FCFAF6] dark:bg-gray-900">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden relative">
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 ml-64 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
