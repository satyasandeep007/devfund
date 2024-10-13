import React from "react";

interface StatCardProps {
  title: string;
  value: number;
  change: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md flex flex-col items-start w-56">
      <span className="text-sm text-gray-600 mb-2">{title}</span>
      <span className="text-2xl font-bold mb-2">{value}</span>
      <span
        className={`text-sm font-bold ${
          change >= 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {change > 0 ? "+" : ""}
        {change}%
      </span>
    </div>
  );
};

const ProjectOverview: React.FC = () => {
  return (
    <div className="flex justify-between p-6 bg-gray-100 rounded-lg">
      <StatCard title="Contribute Rate" value={65.4} change={21.8} />
      <StatCard title="Commit Rate" value={32.6} change={0} />
      <StatCard title="Hours Rate" value={35.6} change={12.0} />
      <StatCard title="Work Rate" value={31.1} change={-9.0} />
    </div>
  );
};

export default ProjectOverview;
