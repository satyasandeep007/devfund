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
      className="h-screen"
    >
      {/* backdrop */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-black/60 absolute top-0 left-0 md:hidden w-full h-screen z-20"
        />
      </AnimatePresence>

      <div className="grid md:grid-cols-[240px_1fr] w-screen overflow-x-hidden">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="w-full overflow-x-auto max-w-[1440px] mx-auto">
          <DashboardHeader />
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default AppLayout;
