import React from "react";
import Image from "next/image";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 h-[90vh]">
      <main className="flex flex-row justify-between  h-full">
        <div className="h-full flex flex-col justify-between">
          <h2 className="text-7xl font-bold leading-tight">
            Support the{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-700">
              software
            </span>
            <br />
            that powers the
            <span className="bg-clip-text text-transparent ml-2 bg-gradient-to-r from-blue-600 to-blue-700">
              world
            </span>
          </h2>
          <div className="p-4">
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
              Create Campaign
            </Link>
            <Link
              href="/user/campaigns/discover"
              className="text-black-500 p-3 flex items-center justify-center hover:font-semibold"
            >
              <span>Discover Campaigns</span> <IconChevronRight size={20} />
            </Link>
          </div>
        </div>

        <div className="md:w-1/3 py-6">
          <div className="h-full flex flex-col justify-between items-center">
            <p className="text-lg font-thin ">
              Devfund is an easy-to-use platform <br /> to crowdfund open source
              projects <br /> on GitHub.
            </p>

            <div className="flex flex-col items-center">
              <h3 className="mx-auto font-semibold text-lg">Only on Base</h3>
              <Image src="/hero_base.png" width={250} height={250} alt="Base" />
            </div>
            <div>
              {" "}
              <p className="text-lg font-thin">
                Combines the power of crypto with the simplicity of web2.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hero;
