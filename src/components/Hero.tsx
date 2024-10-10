"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = ({ isConnected }: any) => {
  return (
    <div className="max-w-7xl mx-auto w-full h-[80vh]">
      <section className="h-full">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4 h-full"
        >
          <div className="container items-center max-w-7xl px-8 mx-auto xl:px-5 flex h-full flex-col justify-center">
            <div className="flex flex-wrap items-center sm:-mx-3">
              <div className="w-full md:w-1/2 md:px-3">
                <div className="w-full min-w-[600px] pb-6 space-y-6 font sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                  <p className="text-6xl font-semibold text-left text-gray-900 dark:text-white leading-snug">
                    Lorem Ipsum is simply dummy text of the printing.
                  </p>
                  <p className="mx-auto text-base text-gray-500 dark:text-gray-300 sm:max-w-md font-light lg:text-xl md:max-w-3xl">
                    Lorem Ipsum is simply dummy text of the printing and
                  </p>

                  <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                    {!isConnected ? (
                      <w3m-connect-button />
                    ) : (
                      <Link
                        href="/user/dashboard"
                        className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-black rounded-lg hover:bg-orange-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 sm:mb-0 sm:w-auto transition duration-300"
                      >
                        Get Started
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 ml-1"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="w-full px-10">
                  <Image
                    src="/hero.png"
                    alt="nothing"
                    width={500}
                    height={500}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Hero;
