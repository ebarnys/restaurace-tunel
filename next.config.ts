import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/o-nas", destination: "/#o-nas", permanent: true },
      { source: "/kontakt", destination: "/#kontakt", permanent: true },
      { source: "/poledni-menu", destination: "/#poledni-menu", permanent: true },
      { source: "/jidelni-listek", destination: "/#jidelni-listek", permanent: true },
      { source: "/galerie", destination: "/#galerie", permanent: true },
      { source: "/akce", destination: "/#akce", permanent: true },
      { source: "/sport", destination: "/", permanent: true },
      { source: "/:path+", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
