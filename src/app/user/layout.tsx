"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "@/layout/Sidebar";
import DashboardHeader from "@/layout/DashboardHeader";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen flex"
    >
      {/* backdrop */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-black/60 absolute top-0 left-0 md:hidden w-full h-screen z-20"
        />
      </AnimatePresence>

      <div className="hidden md:block w-40  h-screen fixed z-10 top-0 left-0">
        <Sidebar />
      </div>

      <div className="flex-1 md:ml-60 overflow-x-hidden">
        <div className="w-full overflow-x-auto max-w-[1440px] mx-auto">
          <div className="fixed top-0 left-0 w-full bg-white">
            <DashboardHeader />
          </div>
          <div className="mt-20">{children}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default AppLayout;
