import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-[#f0f0f0] p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center w-full">
          <h1 className="text-2xl font-bold mr-8">
            <a href="/" className="text-black hover:text-gray-700">DevFund®</a>
          </h1>
         
        </div>
       <div className="w-full"> <nav aria-label="Main navigation w-full">
            <ul className="flex items-center justify-center space-x-6">
              <li>
                {/* <a href="/about" className=" hover:text-blue-700">
                  Discover
                </a>
              </li>
              <li>
                <a href="/download" className=" hover:text-blue-700">
                  Submit A project
                </a>
              </li>
              <li>
                <a href="/help" className=" hover:text-blue-700">
                  My Profile
                </a> */}
              </li>
            </ul>
          </nav></div>
        <div className="w-full flex justify-end">
          <a 
            href="/download" 
            className="bg-black text-white px-4 py-2 hover:bg-blue-700"
          >
            Connect Wallet
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
