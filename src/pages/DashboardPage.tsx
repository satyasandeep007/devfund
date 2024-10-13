import React from "react";
import ProjectOverview from "@/components/dashboard/ProjectOverview";
import ProjectContributors from "@/components/dashboard/ProjectContributors";
import MemberStatus from "@/components/dashboard/MemberStatus";

const DashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <ProjectOverview />

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Project Contributors</h2>
        {/* ProjectContributors component will go here */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          {/* Placeholder for project contributors chart */}
          <ProjectContributors />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Member Status</h2>
        {/* MemberStatus component will go here */}
        <MemberStatus />
      </section>
    </div>
  );
};

export default DashboardPage;
