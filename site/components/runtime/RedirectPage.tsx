import Head from "next/head";
import type { ReactNode } from "react";

import { SiteLink } from "@/site/components/links/SiteLink";

export function RedirectPage({
  url,
  children,
}: {
  url: string;
  children: ReactNode;
}) {
  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content={`0; URL='${url}'`} />
        <title>Redirecting ...</title>
      </Head>
      <p>
        <SiteLink href={url}>{children}</SiteLink>
      </p>
    </>
  );
}
