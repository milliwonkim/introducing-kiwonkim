import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias["@radix-ui/react-dialog"] = path.join(
      __dirname,
      "components/ui/radix-dialog"
    );
    return config;
  },
};

export default nextConfig;
