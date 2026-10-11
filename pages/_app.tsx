import type { AppProps } from "next/app";
import { SiteRuntime } from "@/site/components/SiteRuntime";
export default function App({ Component, pageProps }: AppProps) {
  return <><Component {...pageProps} /><SiteRuntime /></>;
}
