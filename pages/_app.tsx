import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { SiteRuntime } from "@/site/components/SiteRuntime";
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <Component key={router.asPath.split("#")[0]} {...pageProps} />
      <SiteRuntime />
    </>
  );
}
