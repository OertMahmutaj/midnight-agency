import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.46'],
  images: {
    qualities: [75, 80, 95],
  },
};

export default nextConfig;
