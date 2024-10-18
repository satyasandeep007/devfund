import React from "react";
import Image from 'next/image';

interface MemberData {
  id: number;
  name: string;
  avatar: string;
  contributions: number;
  commits: number;
  hours: number;
  workRate: number;
  project: string;
}

const MemberStatus: React.FC = () => {
  const members: MemberData[] = [
    {
      id: 1,
      name: "Jordan A.A",
      avatar: "https://i.pravatar.cc/40?img=1",
      contributions: 76,
      commits: 42,
      hours: 90,
      workRate: 69.3,
      project: "Vektora / prime-marketplace",
    },
    {
      id: 2,
      name: "Bagas A.S",
      avatar: "https://i.pravatar.cc/40?img=2",
      contributions: 89,
      commits: 35,
      hours: 31,
      workRate: 51.6,
      project: "Vektora / wesign-organizer",
    },
    {
      id: 3,
      name: "Devrizal M",
      avatar: "https://i.pravatar.cc/40?img=3",
      contributions: 43,
      commits: 29,
      hours: 21,
      workRate: 31.9,
      project: "Vektora / prime-marketplace",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Member
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contribute
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Commit
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hours
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              WR
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Project
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {members.map((member) => (
            <tr key={member.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <Image
                      className="h-10 w-10 rounded-full"
                      src={member.avatar}
                      alt={`Avatar of ${member.name}`}
                      width={10}
                      height={10}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {member.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {member.contributions} Contribute
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {member.commits} Commit
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {member.hours} Hrs (Work in Repo)
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {member.workRate}% WR
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {member.project}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberStatus;
