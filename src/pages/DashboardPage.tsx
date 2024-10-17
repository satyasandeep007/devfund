import React from "react";
import ProjectOverview from "@/components/dashboard/ProjectOverview";

const DashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ProjectOverview />
    </div>
  );
};

export default DashboardPage;
