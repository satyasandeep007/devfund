import React from "react";
import Image from "next/image";

const Header = ({ isConnected }: any) => {
  return (
    <header className="bg-[#f0f0f0] p-4 h-[10vh]">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center w-full">
          <h1 className="text-2xl font-bold mr-8 flex items-center">
            <Image
              src="/logo.svg"
              width={40}
              height={40}
              className="mr-2"
              alt="logo"
            />
            <a href="/" className="text-black hover:text-gray-700">
              DevFund
            </a>
          </h1>
        </div>
        <div className="w-full flex justify-end">
          <div className="flex justify-center items-center">
            {!isConnected ? (
              <w3m-connect-button size="sm" />
            ) : (
              <div className="flex items-center gap-2">
                <w3m-network-button />
                <w3m-account-button balance={"show"} />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
