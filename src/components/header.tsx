import React from 'react';

const Header: React.FC = () => {
  return (
    <header className=" flex flex-col md:flex-row justify-between items-center mb-12 p-5 max-w-7xl mx-auto">
      <div className="flex items-center mb-4 md:mb-0">
        <h1 className="text-2xl font-bold mr-8">
          <a href="/" className="text-black hover:text-gray-700">RefineCode®</a>
        </h1>
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap space-x-4 md:space-x-6">
            <li><a href="/about" className="text-gray-600 hover:text-black">About</a></li>
            <li><a href="/download" className="text-gray-600 hover:text-black">Download</a></li>
            <li><a href="/help" className="text-gray-600 hover:text-black">Help</a></li>
            <li><a href="/contact" className="text-gray-600 hover:text-black">Contact</a></li>
            <li><a href="/get-involved" className="text-gray-600 hover:text-black">Get involved</a></li>
          </ul>
        </nav>
      </div>
      <div className="flex flex-col md:flex-row items-center">
        <form className="mb-4 md:mb-0 md:mr-4" role="search">
          <input 
            type="search" 
            placeholder="Search" 
            aria-label="Search" 
            className="px-2 py-1 border border-gray-300 rounded" 
          />
        </form>
        <span className="mb-4 md:mb-0 md:mr-4">Latest version: 3.2.4</span>
        <a 
          href="/download" 
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Download Audacity
        </a>
      </div>
    </header>
  );
};

export default Header;
