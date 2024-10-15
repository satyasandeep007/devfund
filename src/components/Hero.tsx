import React from "react";
import Image from "next/image";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <main className="flex flex-row justify-between  h-full">
        <div className="h-full flex flex-col justify-between gap-14">
          <h2 className="text-7xl font-bold leading-tight mb-6 mt-10">
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
            <Image
              src="/github_animation_m.svg"
              width={768}
              height={108}
              alt="github"
            />
            <Image
              src="/hero_graph-bottom.svg"
              width={768}
              height={20}
              alt="github"
            />
          </div>

          <div className="flex space-x-4">
            <Link
              href="/user/campaigns/create"
              className="text-black-500 border p-3 border-black hover:bg-gray-100 transition-colors"
            >
              Submit a campaign
            </Link>
            <Link
              href="/user/campaigns/discover"
              className="text-black-500 p-3 flex items-center justify-center hover:underline"
            >
              <span>Discover more</span> <IconChevronRight size={20} />
            </Link>
          </div>
        </div>

        <div className="md:w-1/3 py-6">
          <div className="h-full flex flex-col justify-between items-center gap-16">
            <p className="text-lg font-thin ">
              Audacity is an easy-to-use, multi-track audio <br /> editor and
              recorder. Audacity is free, open <br /> source, and cross-platform
              software.
            </p>

            <div className="flex flex-col items-center">
              <h3 className="mx-auto font-semibold mb-4 text-lg">
                Only on Base
              </h3>
              <Image src="/base.svg" width={200} height={200} alt="Base" />
            </div>
            <div>
              {" "}
              <p className="text-lg font-thin">
                Contribute to Audacity by helping us with code, documentation,
                translations, user support and by testing our latest code.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hero;
