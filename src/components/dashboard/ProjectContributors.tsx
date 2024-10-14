import React from "react";

const ProjectContributors: React.FC = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  const contributors = [
    { id: 1, contributions: [3, 2, 4, 1, 5, 3, 2, 4] },
    { id: 2, contributions: [2, 4, 1, 3, 2, 5, 4, 3] },
    { id: 3, contributions: [1, 3, 5, 2, 4, 1, 3, 5] },
    { id: 4, contributions: [4, 2, 3, 5, 1, 4, 2, 1] },
    { id: 5, contributions: [5, 1, 2, 4, 3, 2, 5, 2] },
  ];

  const getContributionColor = (value: number) => {
    const colors = [
      "bg-green-100",
      "bg-green-200",
      "bg-green-300",
      "bg-green-400",
      "bg-green-500",
    ];
    return colors[value - 1] || "bg-gray-100";
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="grid grid-cols-8 gap-1 mb-2">
        {months.map((month) => (
          <div key={month} className="text-xs text-gray-500">
            {month}
          </div>
        ))}
      </div>
      {contributors.map((contributor) => (
        <div key={contributor.id} className="grid grid-cols-8 gap-1 mb-1">
          {contributor.contributions.map((value, index) => (
            <div
              key={index}
              className={`w-6 h-6 rounded-sm ${getContributionColor(value)}`}
            />
          ))}
        </div>
      ))}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>How to Read Contribute</span>
        <div className="flex items-center">
          <span className="mr-2">More</span>
          <div className="flex">
            {[100, 200, 300, 400, 500].map((shade) => (
              <div key={shade} className={`w-4 h-4 bg-green-${shade} mr-1`} />
            ))}
          </div>
          <span className="ml-2">Less</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectContributors;
