import React from 'react';

const ProjectOverview = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      {/* Header */}
      <div className="bg-purple-500 text-white rounded-lg p-8 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">
            Sharpen Your Skills with Professional Online Courses
          </h1>
          <button className="bg-black py-2 px-4 rounded-full text-white hover:bg-gray-700">
            Join Now
          </button>
        </div>
      </div>

      {/* Main Dashboard Section */}
      <div className="flex gap-6">
        {/* Left Section */}
        <div className="flex-1">
          {/* Dashboard Overview */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold text-blue-500 mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-3 gap-6">
              {/* New Subscriptions */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-medium">New Subscriptions</h3>
                <div className="text-green-500 text-2xl font-bold mt-2">22</div>
                <p className="text-sm text-gray-500">+15% compared to last week</p>
              </div>
              {/* New Orders */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-medium">New Orders</h3>
                <div className="text-orange-500 text-2xl font-bold mt-2">320</div>
                <p className="text-sm text-gray-500">-4% compared to last week</p>
              </div>
              {/* Average Order Revenue */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-medium">Avg. Order Revenue</h3>
                <div className="text-green-500 text-2xl font-bold mt-2">$1,080</div>
                <p className="text-sm text-gray-500">+8% compared to last week</p>
              </div>
            </div>
          </div>

          {/* Continue Watching */}
          <div className="bg-white p-6 rounded-lg shadow-md h-48">
            <h2 className="text-xl font-semibold mb-4">Continue Watching</h2>
            <div className="flex items-center justify-center h-full text-gray-400">
              No content available.
            </div>
          </div>
        </div>

        {/* Right Section - Mentor List */}
        <div className="w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Your mentor</h2>
            <div className="flex flex-col gap-4">
              {/* Mentor 1 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://via.placeholder.com/150"
                    alt="Mentor 1"
                  />
                  <div>
                    <p className="font-medium">Padhang Satrio</p>
                    <p className="text-sm text-gray-500">Mentor</p>
                  </div>
                </div>
                <button className="text-blue-500 hover:underline">Follow</button>
              </div>

              {/* Mentor 2 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://via.placeholder.com/150"
                    alt="Mentor 2"
                  />
                  <div>
                    <p className="font-medium">Zakir Horizontal</p>
                    <p className="text-sm text-gray-500">Mentor</p>
                  </div>
                </div>
                <button className="text-blue-500 hover:underline">Follow</button>
              </div>

              {/* Mentor 3 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://via.placeholder.com/150"
                    alt="Mentor 3"
                  />
                  <div>
                    <p className="font-medium">Leonardo Samsul</p>
                    <p className="text-sm text-gray-500">Mentor</p>
                  </div>
                </div>
                <button className="text-blue-500 hover:underline">Follow</button>
              </div>

              <button className="mt-4 bg-purple-100 py-2 px-4 rounded-lg text-purple-600">
                See All
              </button>
            </div>
          </div>

          {/* Repeating Mentor List for demonstration */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Your mentor</h2>
            <div className="flex flex-col gap-4">
              {/* Mentor 4 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://via.placeholder.com/150"
                    alt="Mentor 4"
                  />
                  <div>
                    <p className="font-medium">Padhang Satrio</p>
                    <p className="text-sm text-gray-500">Mentor</p>
                  </div>
                </div>
                <button className="text-blue-500 hover:underline">Follow</button>
              </div>

              {/* Mentor 5 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://via.placeholder.com/150"
                    alt="Mentor 5"
                  />
                  <div>
                    <p className="font-medium">Zakir Horizontal</p>
                    <p className="text-sm text-gray-500">Mentor</p>
                  </div>
                </div>
                <button className="text-blue-500 hover:underline">Follow</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
