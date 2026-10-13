import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: false,
  // Keep the exact existing stylesheet URLs and static hosting behavior.
  devIndicators: false,
};
export default function nextConfig(phase: string): NextConfig {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...config,
      output: undefined,
      // Production gets this historical URL from finalize-export.ts.
      async rewrites() {
        return [{ source: "/resume.html", destination: "/resume/" }];
      },
    };
  }
  return config;
}
