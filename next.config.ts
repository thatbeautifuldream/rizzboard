import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/request",
        destination: "https://forms.gle/YwiPUZF65GhwxuCo9",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
