import Head from "next/head";
import type { ReactNode } from "react";
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
        <a href={url}>{children}</a>
      </p>
    </>
  );
}
