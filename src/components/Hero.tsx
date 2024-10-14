import React from "react";
import Image from "next/image";
import { IconChevronRight } from "@tabler/icons-react";

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <main className="flex flex-col md:flex-row justify-between items-center">
        <div className=" mb-8 md:mb-0">
          <h2 className="text-7xl font-semibold leading-tight mb-6">
            Open source,
            <br />
            cross-platform
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-700">
              To Refine Code
            </span>
          </h2>
          <div className="p-4  mb-6 ">
            <Image
              src="/hero_graph-top.svg"
              width={768}
              height={20}
              alt="github"
            />
            <Image src="/github.svg" width={768} height={108} alt="github" />
            <Image
              src="/hero_graph-bottom.svg"
              width={768}
              height={20}
              alt="github"
            />
          </div>

          <div className="flex space-x-4">
          <a href="#" className="text-black-500 border p-3 border-black">
          Submit a campaign
            </a>
            <a href="#" className="text-black-500 p-3 flex items-center justify-center">
              <span>Discover more</span> <IconChevronRight size={20} />
            </a>
            
          </div>
        </div>

        <div className="md:w-1/3 md:ml-20">
          <p className="text-lg mb-6">
            Audacity is an easy-to-use, multi-track audio <br /> editor and
            recorder. Audacity is free, open <br /> source, and cross-platform
            software.
          </p>
          <div className="mb-6">
            <Image src="/base.svg" width={256} height={256} alt="Base" />
          </div>
          <h3 className=" font-semibold mb-4 text-lg">Get Involved</h3>
          <p className="mb-4 text-lg">
            Contribute to Audacity by helping us with code,
            <br /> documentation, translations, user support and <br /> by
            testing our latest code.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Hero;
