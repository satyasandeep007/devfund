import React from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  unit?: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, unit, color }) => {
  return (
    <div className={`bg-${color}-100 rounded-lg p-4 flex flex-col w-64`}>
      <div className={`bg-${color}-500 text-white rounded-full w-8 h-8 flex items-center justify-center mb-3`}>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
        </svg>
      </div>
      <div className="flex items-baseline mb-1">
        <span className="text-3xl font-bold">{value}</span>
        {unit && <span className="text-xl ml-1">{unit}</span>}
      </div>
      <span className="text-sm text-gray-600">{title}</span>
    </div>
  );
};

const ProjectOverview: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Today's</h2>
      <h3 className="text-gray-600 mb-4">Summary</h3>
      <div className="flex justify-between space-x-4">
        <StatCard title="Active Campaigns" value="20k" color="pink" />
        <StatCard title="Stars" value="08" color="yellow" />
        <StatCard title="Amount Raised" value="125" unit="Base" color="green" />
        <StatCard title="Total Repos" value="35" color="purple" />
      </div>
    </div>
  );
};

export default ProjectOverview;
