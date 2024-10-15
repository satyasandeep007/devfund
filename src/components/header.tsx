import React from "react";

const Header = ({ isConnected }: any) => {
  return (
    <header className="bg-[#f0f0f0] p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center w-full">
          <h1 className="text-2xl font-bold mr-8">
            <a href="/" className="text-black hover:text-gray-700">
              DevFund®
            </a>
          </h1>
        </div>
        <div className="w-full">
          {" "}
          <nav aria-label="Main navigation w-full">
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
          </nav>
        </div>
        <div className="w-full flex justify-end">
          <div className="flex justify-center items-center">
            {!isConnected ? (
              <w3m-connect-button size="sm" />
            ) : (
              <>
                <w3m-network-button />
                <w3m-account-button balance={"show"} />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
