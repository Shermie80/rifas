import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "fjlyghwiyorbzvekpxge.supabase.co",
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
