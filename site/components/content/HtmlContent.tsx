import parse, {
  attributesToProps,
  domToReact,
  type HTMLReactParserOptions,
} from "html-react-parser";

import { SiteLink } from "@/site/components/links/SiteLink";
import { SiteImage } from "@/site/components/media/SiteImage";

export const options: HTMLReactParserOptions = {
  replace(node) {
    if (node.type === "tag" && node.name === "img")
      return <SiteImage {...attributesToProps(node.attribs)} />;
    if (node.type === "tag" && node.name === "a") {
      return (
        <SiteLink {...attributesToProps(node.attribs)}>
          {domToReact(
            node.children as Parameters<typeof domToReact>[0],
            options,
          )}
        </SiteLink>
      );
    }
  },
};

/** HTML is confined to trusted repository data; page-authored content uses JSX. */
export function HtmlContent({
  html,
  paragraph = false,
}: {
  html: string | undefined;
  paragraph?: boolean;
}) {
  return <>{parse(paragraph ? `<p>${html || ""}</p>` : html || "", options)}</>;
}
