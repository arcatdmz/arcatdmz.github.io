import { Label } from "react-fomantic-ui";

import { SiteLink } from "@/site/components/links/SiteLink";
import { href } from "@/site/rendering";

export function Translate({ path }: { path?: string }) {
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
        data-content="翻訳した内容をリンク先のファイルに反映してPull requestを送っていただけると大変助かります"
        className="with-popup"
      >
        翻訳が必要
      </Label>
    </>
  );
}
