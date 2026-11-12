import { Icon, Item, Label } from "react-fomantic-ui";

import { buildYear } from "@/site/clock";
import { HtmlContent } from "@/site/components/content/HtmlContent";
import { SiteLink } from "@/site/components/links/SiteLink";
import { LinkedImage } from "@/site/components/media/LinkedImage";
import { SiteImage } from "@/site/components/media/SiteImage";
import { ProjectPublicationLabel } from "@/site/components/projects/ProjectPublicationLabel";
import { useSiteContext } from "@/site/hooks/useSiteContext";
import { href } from "@/site/rendering";
import type { Project } from "@/site/types";

export function ProjectItem({ p }: { p: Project }) {
  const { rootPath, lang, en, basePath } = useSiteContext();
  const link = p.getLink(lang, basePath);
  const description = p.getDescription(lang);
  const thumbnail = (
    <SiteImage
      sizes="175px"
      src={`${rootPath}images/thumbnails/${p.getThumbnail(lang)}`}
    />
  );
  const heading = (
    <>
      {p.icon ? (
        <SiteImage
          ui
          avatar
          src={`${rootPath}images/icons/${p.icon}`}
          className="mobile only"
        />
      ) : null}
      <HtmlContent html={p.getTitle(lang)} />
    </>
  );
  return (
    <Item
      id={p.project ? `projects-${p.project}` : undefined}
      data-project={p.project}
    >
      {link === false ? (
        <Item.Image bordered className="mobile hidden">
          {thumbnail}
        </Item.Image>
      ) : (
        <LinkedImage
          ui={false}
          href={href(link)}
          bordered
          className="mobile hidden"
        >
          {thumbnail}
        </LinkedImage>
      )}
      <Item.Content>
        {link === false ? (
          <Item.Header>{heading}</Item.Header>
        ) : (
          <Item.Header
            as={SiteLink}
            href={href(link)}
            title={p.subtitle ? p.getLongTitle(lang) : undefined}
          >
            {heading}
          </Item.Header>
        )}
        {description.startsWith("<p>") ? (
          <Item.Description>
            <HtmlContent html={description} />
          </Item.Description>
        ) : (
          <Item.Description as="p">
            <HtmlContent html={description} />
          </Item.Description>
        )}
        {p.category !== "concept" ? (
          <Item.Extra>
            <span className="right floated">
              <Icon name="calendar" />
              {p.getYearString(lang, buildYear)}
            </span>
            {p.category !== "private" && p.category !== "committee" ? (
              <ProjectPublicationLabel p={p} />
            ) : null}
            {p.category === "collaboration" ? (
              <Label basic size="tiny" as="span">
                <Icon name="handshake" />
                {en ? "Co-authored" : "共著"}
              </Label>
            ) : null}
            <Item.Meta as="span">
              <HtmlContent html={p.getTags(lang).join(" ")} />
            </Item.Meta>
          </Item.Extra>
        ) : null}
      </Item.Content>
    </Item>
  );
}
