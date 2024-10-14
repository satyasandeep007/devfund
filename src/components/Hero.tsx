import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">  
      <main className="flex flex-col md:flex-row justify-between items-center">
        <div className="md:w-2/2 mb-8 md:mb-0">
          <h2 className="text-6xl font-semibold leading-tight mb-6">
            Open source,<br />
            cross-platform<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-700">
              To Refine Code
            </span>
          </h2>
          <div className="p-4  mb-6 ">

            <Image src="/hero_graph.svg" width={128} height={128} alt="Base" />
            
          </div>
          
        </div>

        <div className="md:w-1/2 md:ml-20">
          <p className="text-sm mb-6">
            Audacity is an easy-to-use, multi-track audio <br/> editor and recorder. Audacity is free, open <br/> source, and cross-platform software.
          </p>
          <div className="mb-6">
            {/* Placeholder for the oval shape */}
            {/* <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto"></div> */}
            <Image src="/base.svg" width={128} height={128} alt="Base" />
          </div>
          <h3 className=" font-semibold mb-4 text-sm">Get Involved</h3>
          <p className="mb-4 text-sm">
            Contribute to Audacity by helping us with code,<br/> documentation, translations, user support and <br/> by testing our latest code.
          </p>
          {/* <a href="#" className="text-blue-500 underline">How to contribute?</a> */}
        </div>
      </main>
    </div>
  );
};

export default Hero;
