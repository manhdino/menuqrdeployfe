import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        pathname: "/**",
      },
      {
        hostname: "api-bigboy.duthanhduoc.com",
        pathname: "/**",
      },
      {
        hostname: "via.placeholder.com",
        pathname: "/**",
      },
      {
        hostname:"menuqrdeploy-production.up.railway.app",
        pathname:"/**"
      }
    ],
  },
};

export default nextConfig;
