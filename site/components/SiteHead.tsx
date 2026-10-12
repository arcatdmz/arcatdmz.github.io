import Head from "next/head";
import type { ReactNode } from "react";
import type { SiteContext } from "../types";
import { htmlToDOM } from "html-react-parser";

export interface SiteHeadProps {
  context: SiteContext;
  children?: ReactNode;
}

export function stripTags(value: string): string {
  return value.replace(/(<([^>]+)>)/gi, "");
}

export function decodeTitle(value: string): string {
  return htmlToDOM(stripTags(value))
    .map((node) => (node.type === "text" ? node.data : ""))
    .join("");
}

export function SiteHead({ context, children }: SiteHeadProps) {
  const {
    author,
    basePath,
    defaultDescription,
    defaultImageUrl,
    defaultJapaneseDescription,
    domain,
    en,
    lang,
    me,
    p,
    protocol,
    rootPath,
    title,
  } = context;
  const description = stripTags(
    context.description ||
      (p
        ? p.getDescription(lang)
        : en
          ? defaultDescription
          : defaultJapaneseDescription),
  );
  const imageUrl =
    context.imageUrl ||
    (p
      ? `${protocol}://${domain}${rootPath}images/thumbnails/${p.getThumbnail(
          lang,
        )}`
      : defaultImageUrl);
  const plainTitle = decodeTitle(title);

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{`${plainTitle} | junkato.jp`}</title>
      <meta name="author" content={author} />
      <meta name="description" content={description} />
      <meta itemProp="name" content={stripTags(title)} />
      <meta itemProp="description" content={description} />
      {imageUrl && <meta itemProp="image" content={imageUrl} />}
      <meta property="fb:admins" content="503220390" />
      <meta
        property="og:url"
        content={`${protocol}://${domain}${basePath}${me}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {imageUrl && <meta name="twitter:card" content="summary_large_image" />}
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <link rev="made" href="mailto:i@junkato.jp" />
      <link rel="stylesheet" href={`${rootPath}stylesheets/main.css`} />
      {/* Load the small Design sheet with every main-site document so client
          navigation never commits a destination before its CSS is available. */}
      <link rel="stylesheet" href={`${rootPath}stylesheets/design.css`} />
      {children}
    </Head>
  );
}
