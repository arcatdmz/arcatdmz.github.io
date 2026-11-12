import { Icon, Menu } from "react-fomantic-ui";

import { SiteComponentProps } from "@/site/components/layout/types";
import { SiteLink } from "@/site/components/links/SiteLink";
import { SidebarButton } from "@/site/components/widgets/SidebarButton";
import { alternateLanguageHref } from "@/site/navigation";

export function SiteRightHeaderMenu({ context }: SiteComponentProps) {
  const { en } = context;
  const languageHref = alternateLanguageHref(context);
  return (
    <>
      <Menu.Item
        as={SiteLink}
        href={`https://blog.junkato.jp/${en ? "" : "ja"}`}
      >
        <Icon name="pencil" />
        <span className="print-hidden tablet or lower hidden">{` ${
          en ? "Blog" : "ブログ"
        }`}</span>
      </Menu.Item>
      {languageHref && (
        <Menu.Item as={SiteLink} href={languageHref}>
          <Icon name="translate" />
          <span className="print-hidden">{en ? "日本語" : "English"}</span>
        </Menu.Item>
      )}
      <SidebarButton className="print-hidden sidebar-button" href="#">
        <Icon name="sidebar" />
        <span className="widescreen monitor only">
          {en ? "Menu" : "メニュー"}
        </span>
      </SidebarButton>
    </>
  );
}
