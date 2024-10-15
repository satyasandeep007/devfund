import React from "react";
import {
  IconMoon,
  IconStar,
  IconCurrencyDollar,
  IconCode,
} from "@tabler/icons-react";

interface StatCardProps {
  title: string;
  value: number | string;
  unit?: string;
  color: string;
  icon: any;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  color,
  icon: Icon,
}) => {
  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; text: string } } = {
      pink: { bg: "bg-pink-100", text: "text-pink-500" },
      yellow: { bg: "bg-yellow-100", text: "text-yellow-500" },
      green: { bg: "bg-green-100", text: "text-green-500" },
      purple: { bg: "bg-purple-100", text: "text-purple-500" },
    };
    return colorMap[color] || { bg: "bg-gray-100", text: "text-gray-500" };
  };

  const { bg, text } = getColorClasses(color);

  return (
    <div className={`${bg} rounded-lg p-6 flex flex-col w-64`}>
      <div
        className={`${text} rounded-full w-12 h-12 flex items-center justify-center mb-4`}
      >
        <Icon size={24} stroke={1.5} />
      </div>
      <div className="flex flex-col">
        <span className="text-3xl font-bold mb-1">
          {value}
          {unit && <span className="text-xl ml-1">{unit}</span>}
        </span>
        <span className="text-sm text-gray-600">{title}</span>
      </div>
    </div>
  );
};

const ProjectOverview: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Todays</h2>
      <h3 className="text-gray-600 mb-4">Summary</h3>
      <div className="flex justify-between space-x-4">
        <StatCard
          title="Active Campaigns"
          value="20k"
          color="pink"
          icon={IconMoon}
        />
        <StatCard title="Stars" value="08" color="yellow" icon={IconStar} />
        <StatCard
          title="Amount Raised"
          value="125"
          unit="Base"
          color="green"
          icon={IconCurrencyDollar}
        />
        <StatCard
          title="Total Repos"
          value="35"
          color="purple"
          icon={IconCode}
        />
      </div>
    </div>
  );
};

export default ProjectOverview;
