import { Label } from "react-fomantic-ui";

import { SiteLink } from "@/site/components/links/SiteLink";
import { href } from "@/site/rendering";

export function TranslateEn({ path }: { path?: string }) {
  return (
    <>
      <Label
        tag
        color="red"
        as={SiteLink}
        href={href(
          `https://github.com/arcatdmz/arcatdmz.github.io/blob/main/components/${path.replace(
            /\.pug$/,
            ".tsx",
          )}`,
        )}
        data-content="I would really appreciate if you could translate this content and send a pull request"
        className="with-popup"
      >
        Translation required
      </Label>
    </>
  );
}
