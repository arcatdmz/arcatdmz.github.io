import { Icon, Label } from "react-fomantic-ui";

import { HtmlContent } from "@/site/components/content/HtmlContent";
import { SiteLink } from "@/site/components/links/SiteLink";
import { useSiteContext } from "@/site/hooks/useSiteContext";
import { href } from "@/site/rendering";
import type { Project } from "@/site/types";

export function ProjectLabel({ p }: { p: Project }) {
  const { lang, basePath } = useSiteContext();

  return (
    <>
      <Label
        basic
        size="tiny"
        color="red"
        as={SiteLink}
        href={href(p.getLink(lang, basePath))}
      >
        <Icon name="lab" />
        <HtmlContent html={p.getTitle(lang)} />
      </Label>
    </>
  );
}
