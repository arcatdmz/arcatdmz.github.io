import { type ReactNode } from "react";
import { Header, Icon, Label, List } from "react-fomantic-ui";

import { buildYear } from "@/site/clock";
import { HtmlContent } from "@/site/components/content/HtmlContent";
import { popupTags } from "@/site/components/links/popupTags";
import { Share } from "@/site/components/links/Share";
import { ProjectAwards } from "@/site/components/projects/ProjectAwards";
import { ProjectPublicationLabel } from "@/site/components/projects/ProjectPublicationLabel";
import { useSiteContext } from "@/site/hooks/useSiteContext";

export function ProjectHeader({
  project,
  additionalLabels,
}: {
  project: string;
  additionalLabels?: ReactNode | ReactNode[];
}) {
  const { projectsTable, publications, lang, en, title } = useSiteContext();
  const p = projectsTable[project];
  const labels = Array.isArray(additionalLabels)
    ? additionalLabels
    : additionalLabels == null
      ? []
      : [additionalLabels];
  const annotations = publications
    .filter(
      (e) =>
        e.entryTags &&
        (e.entryTags.project?.includes(project) ||
          p.getPublications(lang).includes(e.citationKey)) &&
        (!en || e.entryTags.language !== "japanese"),
    )
    .flatMap((e) => e.entryTags.addition?.split(/;\s*/g) || []);
  const tags = popupTags(p.getTags(lang));
  return (
    <section>
      <Header as="h1">
        <HtmlContent html={title} />
        <Header.Subheader>
          <HtmlContent html={p.getSubtitle(lang)} />
        </Header.Subheader>
      </Header>
      <List divided horizontal className="project-meta-list">
        {p.hasMembers(lang)
          ? p.getMembers(lang).map((member, index) => (
              <List.Item key={`${member}-${index}`} className="author">
                {member}
              </List.Item>
            ))
          : null}
        <List.Item>
          <Label basic size="tiny" as="span">
            <Icon name="calendar" />
            {p.getYearString(lang, buildYear)}
          </Label>
        </List.Item>
        {p.hasPublication(lang) ? (
          <List.Item>
            <ProjectPublicationLabel p={p} />
          </List.Item>
        ) : null}
        <ProjectAwards project={project} />
        {[...new Set(annotations)].map((note) => (
          <List.Item key={note}>
            <Label basic size="tiny" as="span">
              {note}
            </Label>
          </List.Item>
        ))}
        {labels.map((label, index) => (
          <List.Item key={index}>
            {typeof label === "string" ? <HtmlContent html={label} /> : label}
          </List.Item>
        ))}
        {tags.length ? (
          <List.Item className="tags">
            {en ? "Keywords" : "関連キーワード"}:{" "}
            <HtmlContent html={tags.join(", ")} />
          </List.Item>
        ) : null}
      </List>
      <Share />
    </section>
  );
}
