import { Fragment } from "react";
import { Icon, Label } from "react-fomantic-ui";

import { HtmlContent } from "@/site/components/content/HtmlContent";
import { SiteLink } from "@/site/components/links/SiteLink";
import { useSiteContext } from "@/site/hooks/useSiteContext";
import type { Project } from "@/site/types";

export function ProjectPublicationLabel({
  p,
  compact = false,
}: {
  p: Project;
  compact?: boolean;
}) {
  const { publicationsTable, lang, en } = useSiteContext();
  if (!p.hasPublication(lang))
    return <span>{en ? "(Work in progress)" : "(文献未発表)"}</span>;
  const series = [
    ...new Map(
      p.getPublications(lang).flatMap((key) => {
        const tag = publicationsTable[key]?.getSeriesTag();
        if (!tag) return [];
        const link = p.publicationLinks[key];
        return [[`${tag}:${link?.href || ""}`, { tag, link }] as const];
      }),
    ).values(),
  ];
  if (compact)
    return (
      <span className="project-publication-series">
        <Icon name="student" />
        {series.map(({ tag, link }, index) => (
          <Fragment key={`${tag}:${link?.href || ""}`}>
            {index > 0 ? "/" : null}
            {link ? (
              <SiteLink
                href={link.href}
                title={link.title}
                aria-label={`${tag}: ${link.title}`}
              >
                <HtmlContent html={tag} />
              </SiteLink>
            ) : (
              <HtmlContent html={tag} />
            )}
          </Fragment>
        ))}
      </span>
    );
  return (
    <span className="project-publication-labels">
      {series.map(({ tag, link }) => (
        <Label
          key={`${tag}:${link?.href || ""}`}
          basic
          size="tiny"
          color="green"
          as={link ? SiteLink : "span"}
          {...(link
            ? {
                href: link.href,
                title: link.title,
                "aria-label": `${tag}: ${link.title}`,
              }
            : {})}
        >
          <Icon name="student" />
          <HtmlContent html={tag} />
        </Label>
      ))}
    </span>
  );
}
