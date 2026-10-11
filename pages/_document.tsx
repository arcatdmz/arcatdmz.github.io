import Document, {
  Html,
  Head,
  Main,
  NextScript,
  type DocumentContext,
} from "next/document";

interface SiteDocumentProps {
  language: string;
  bodyClass?: string;
  standardLayout: boolean;
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
    const legacyEnglishRedirect =
      pathname === "/ja/talks/as-a-code" ||
      pathname === "/ja/talks/people-are-programmers";
    const section = pathname.replace(/^\/ja(?=\/|$)/, "").split("/")[1];
    const bodyClass = ["projects", "publications", "timeline"].includes(section)
      ? "with-rail"
      : section === "design"
        ? "without-header-menu design"
        : undefined;
    return {
      ...initial,
      language:
        !legacyEnglishRedirect &&
        (pathname.startsWith("/ja/") || pathname === "/ja")
          ? "ja"
          : "en",
      bodyClass,
      standardLayout: pathname !== "/resume" && !pathname.includes("redirect"),
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
