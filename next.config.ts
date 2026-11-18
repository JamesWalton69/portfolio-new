import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Off on purpose: this site uses the classic ISR model (revalidate on the
  // page) instead of Cache Components. See src/app/page.tsx.
  cacheComponents: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
