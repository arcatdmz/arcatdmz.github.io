import Document, {
  Html,
  Head,
  Main,
  NextScript,
  type DocumentContext,
} from "next/document";

import { getDocumentMetadata } from "@/site/navigation";

interface SiteDocumentProps {
  language: string;
  bodyClass?: string;
}
export default class SiteDocument extends Document<SiteDocumentProps> {
  static async getInitialProps(context: DocumentContext) {
    const initial = await Document.getInitialProps(context);
    const pathname = context.pathname;
    const redirect = new Set([
      "/science",
      "/ugv",
      "/user-generated-variables",
      "/user-interface-design",
      "/ja/user-generated-variables",
      "/ja/talks/as-a-code",
      "/ja/talks/people-are-programmers",
    ]).has(pathname);
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
    };
  }
  render() {
    return (
      <Html lang={this.props.language}>
        <Head />
        <body className={this.props.bodyClass}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
