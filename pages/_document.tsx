import Document, {
  Html,
  Head,
  Main,
  NextScript,
  type DocumentContext,
} from "next/document";

import { getDocumentMetadata } from "@/site/navigation";
import website from "@/website.json";

const { rootPath } = website;

interface SiteDocumentProps {
  language: string;
  bodyClass?: string;
  sharedStyles: boolean;
}
export default class SiteDocument extends Document<SiteDocumentProps> {
  static async getInitialProps(context: DocumentContext) {
    const initial = await Document.getInitialProps(context);
    const pathname = context.pathname;
    const redirect =
      new Set([
        "/science",
        "/ugv",
        "/user-generated-variables",
        "/user-interface-design",
        "/ja/user-generated-variables",
      ]).has(pathname) || /^\/ja\/talks\/[^/]+\/p1\.html$/.test(pathname);
    if (redirect)
      initial.head = initial.head.filter(
        (node: any) =>
          !(
            node?.type === "meta" &&
            (node.props.charSet || node.props.name === "viewport")
          ),
      );
    return {
      ...initial,
      ...getDocumentMetadata(pathname),
      sharedStyles:
        !redirect && !["/resume", "/404", "/_error"].includes(pathname),
    };
  }
  render() {
    return (
      <Html lang={this.props.language}>
        <Head>
          {this.props.sharedStyles && (
            <>
              <link rel="stylesheet" href={`${rootPath}stylesheets/main.css`} />
              {/* Load Design styles before any client navigation can use them. */}
              <link
                rel="stylesheet"
                href={`${rootPath}stylesheets/design.css`}
              />
            </>
          )}
        </Head>
        <body className={this.props.bodyClass}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
