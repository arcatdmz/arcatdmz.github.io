import { Card, Icon } from "react-fomantic-ui";

import { buildYear } from "@/site/clock";
import { HtmlContent } from "@/site/components/content/HtmlContent";
import { SiteLink } from "@/site/components/links/SiteLink";
import { LinkedImage } from "@/site/components/media/LinkedImage";
import { SiteImage } from "@/site/components/media/SiteImage";
import { ProjectPublicationLabel } from "@/site/components/projects/ProjectPublicationLabel";
import { useSiteContext } from "@/site/hooks/useSiteContext";
import { href } from "@/site/rendering";
import type { Project } from "@/site/types";

export function ProjectCard({ p }: { p: Project }) {
  const { publicationsTable, rootPath, lang, en, basePath } = useSiteContext();
  const description = p.getDescription(lang);
  return (
    <Card
      id={p.project ? `projects-${p.project}` : undefined}
      data-project={p.project}
    >
      <LinkedImage ui={false} href={href(p.getLink(lang, basePath))}>
        <SiteImage
          sizes="(max-width:767px) calc(100vw - 2rem), (max-width:991px) 340px, (max-width:1199px) 450px, 540px"
          src={`${rootPath}images/thumbnails/${p.getThumbnail(lang)}`}
        />
      </LinkedImage>
      <Card.Content>
        <Card.Header as={SiteLink} href={href(p.getLink(lang, basePath))}>
          {p.icon ? (
            <SiteImage
              ui
              avatar
              sizes="40px"
              src={`${rootPath}images/icons/${p.icon}`}
            />
          ) : null}
          <HtmlContent html={p.getTitle(lang)} />
        </Card.Header>
        <Card.Meta>
          <HtmlContent html={p.getTags(lang).join("")} />
        </Card.Meta>
        {description.startsWith("<p>") ? (
          <Card.Description>
            <HtmlContent html={description} />
          </Card.Description>
        ) : (
          <Card.Description as="p">
            <HtmlContent html={description} />
          </Card.Description>
        )}
      </Card.Content>
      <Card.Content extra>
        <span className="right floated">
          <Icon name="calendar" />
          {p.getYearString(lang, buildYear)}
        </span>
        {p.category !== "private" && p.category !== "committee" ? (
          p.hasPublication(lang) ? (
            <ProjectPublicationLabel p={p} compact />
          ) : (
            <span>{en ? "(Work in progress)" : "(文献未発表)"}</span>
          )
        ) : null}
      </Card.Content>
    </Card>
  );
}
