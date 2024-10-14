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
    ],
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding", {
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
