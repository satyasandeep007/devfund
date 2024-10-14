import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-[#f0f0f0] p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mr-8">
            <a href="/" className="text-black hover:text-gray-700">DevFund®</a>
          </h1>
          <nav aria-label="Main navigation">
            <ul className="flex space-x-6">
              <li>
                <a href="/about" className="text-gray-600 hover:text-black">
                  Discover
                </a>
              </li>
              <li>
                <a href="/download" className="text-gray-600 hover:text-black">
                  Submit A project
                </a>
              </li>
              <li>
                <a href="/help" className="text-gray-600 hover:text-black">
                  My Profile
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <a 
            href="/download" 
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Connect Wallet
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
