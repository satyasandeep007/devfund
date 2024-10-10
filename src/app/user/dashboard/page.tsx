"use client";

import { useAccount } from "wagmi";
import { FC } from "react";

const Dashboard: FC = () => {
  const { isConnected } = useAccount();

  const drives = [
      {
        date: "09 Sep 2024, IST 13:26",
        coordinates: "12.993200, 77.701580",
        imageUrl: "/path-to-image.jpg", // Replace with actual image paths
      },
      {
        date: "09 Sep 2024, IST 13:26",
        coordinates: "12.993200, 77.701580",
        imageUrl: "/path-to-image.jpg",
      },
      {
        date: "09 Sep 2024, IST 13:26",
        coordinates: "12.993200, 77.701580",
        imageUrl: "/path-to-image.jpg",
      },
    ];
  
    return (
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/4 p-6 bg-white border-r dark:bg-gray-900 dark:text-white">
          {/* Header and Download Button */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">DRIVESIGHT</h1>
            <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
              Download Data
            </button>
          </div>
  
          {/* City Selector */}
          <div className="mb-6">
            <label htmlFor="city" className="block text-sm font-medium">
              Select City
            </label>
            <select
              id="city"
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              <option>Bangalore</option>
              {/* Add more cities here */}
            </select>
          </div>
  
          {/* Drives List */}
          <div className="space-y-4 overflow-auto h-3/4">
            {drives.map((drive, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow dark:bg-gray-800"
              >
                <img
                  src={drive.imageUrl}
                  alt="Drive"
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-white">
                    {drive.date}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {drive.coordinates}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Map Section */}
        <div className="flex-1 relative bg-gray-200 dark:bg-gray-800">
          {/* Map Placeholder */}
          <div className="absolute inset-0 p-4">
            <p className="text-center text-gray-700 dark:text-gray-300">
              Map will render here...
            </p>
          </div>
  
          
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  
