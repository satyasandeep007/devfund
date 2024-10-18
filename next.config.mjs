/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "icoholder.com",
      "assets.aceternity.com",
      "ui.aceternity.com",
      "avatars.githubusercontent.com",
      "opengraph.githubassets.com",
      "github.com",
      "cdn.dribbble.com",
      "logos.covalenthq.com",
      "www.datocms-assets.com",
      "placehold.co",
      "via.placeholder.com",
    ],
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding", {
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    // Exclude Hardhat directory from the build
    config.module.rules.push({
      test: /\.js$/, // Adjust this if you need to target other file types
      exclude: /hardhat/, // {{ edit_1 }}
    });

    return config;
  },
};

export default nextConfig;
