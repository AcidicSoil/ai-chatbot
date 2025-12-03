import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,

  // Do not let Turbopack bundle these Node-only deps
  serverExternalPackages: [
    "node-pty",
    "@lydell/node-pty-linux-x64",
    "tree-sitter-bash",
  ],

  turbopack: {
    // Keep only the loader you actually need (example: fix README.md errors)
    rules: {
      "*.md": {
        loaders: ["raw-loader"],
        as: "*.js",
        // optional but safer if you only care about node_modules:
        // condition: "foreign",
      },
    },
  },

  images: {
    remotePatterns: [
      { hostname: "avatar.vercel.sh" },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
