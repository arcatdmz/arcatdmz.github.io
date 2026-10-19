import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const config: NextConfig = {
  output: "export",
  pageExtensions: ["localized.tsx", "tsx", "ts", "jsx", "js"],
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
      async redirects() {
        return [
          {
            source: "/textalive/embed/:path*",
            destination: "https://developer.textalive.jp/",
            permanent: true,
          },
        ];
      },
      // Serve historical aliases and standalone HTML like the static host.
      async rewrites() {
        return [
          { source: "/resume.html", destination: "/resume/" },
          {
            source: "/user-generated-variables/",
            destination: "/user-generated-variables/index.html",
          },
          {
            source: "/user-generated-variables.old",
            destination: "/user-generated-variables.old/index.html",
          },
          ...["as-a-code", "people-are-programmers"].map((slug) => ({
            source: `/ja/talks/${slug}/index.html`,
            destination: `/ja/talks/${slug}/`,
          })),
        ];
      },
    };
  }
  return config;
}
