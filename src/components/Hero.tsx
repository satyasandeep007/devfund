import React from 'react';

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">  
      <main className="flex flex-col md:flex-row justify-between items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-6xl font-bold leading-tight mb-6">
            Open source,<br />
            cross-platform<br />
            To Refine Your Code
          </h2>
          <div className="bg-gray-200 p-4 rounded-lg mb-6">
            <div className="flex justify-between mb-2">
              {['0', '15', '30', '45', '1:00', '1:15', '1:30', '1:45', '2:00'].map((time, index) => (
                <span key={index} className="text-xs">{time}</span>
              ))}
            </div>
            <div className="h-8 bg-white rounded relative">
              <div className="absolute inset-y-0 left-1/2 w-8 bg-blue-500"></div>
            </div>
            <div className="flex items-center mt-2">
              <button className="border border-gray-400 text-xs px-2 py-1 mr-2">AUDIO TRACK</button>
              <button className="border border-gray-400 text-xs px-2 py-1 mr-2">MUTE</button>
              <button className="border border-gray-400 text-xs px-2 py-1">SOLO</button>
            </div>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-blue-500 underline">View release notes</a>
            <a href="#" className="text-blue-500 underline">Documentation</a>
          </div>
        </div>

        <div className="md:w-1/2 md:ml-14">
          <p className="text-lg mb-6">
            Audacity is an easy-to-use, multi-track audio editor and recorder. Audacity is free, open source, and cross-platform software.
          </p>
          <div className="mb-6">
            {/* Placeholder for the oval shape */}
            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto"></div>
          </div>
          <h3 className="text-2xl font-bold mb-4">Get Involved</h3>
          <p className="mb-4">
            Contribute to Audacity by helping us with code, documentation, translations, user support and by testing our latest code.
          </p>
          <a href="#" className="text-blue-500 underline">How to contribute?</a>
        </div>
      </main>
    </div>
  );
};

export default Hero;
