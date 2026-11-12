import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { SiteRuntime } from "@/site/components/SiteRuntime";
import { SiteImagesContext } from "@/site/components/SiteImage";
import "nprogress/nprogress.css";
import "@/site/styles/nprogress.css";
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pageKey = /^\/(?:ja\/)?projects\/?$/.test(router.pathname)
    ? router.pathname
    : router.asPath.split("#")[0];
  return (
    <>
      <SiteImagesContext.Provider value={pageProps.pageData?.images || {}}>
        <Component key={pageKey} {...pageProps} />
      </SiteImagesContext.Provider>
      <SiteRuntime />
    </>
  );
}
