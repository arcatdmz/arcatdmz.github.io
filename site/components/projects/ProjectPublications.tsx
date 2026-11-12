import { Header, Icon, Label, List, Segment } from "react-fomantic-ui";

import { projectPublications } from "@/site/components/projects/projectPublications";
import { MajorPublication } from "@/site/components/publications/MajorPublication";
import { Publication } from "@/site/components/publications/Publication";
import { useSiteContext } from "@/site/hooks/useSiteContext";

export function ProjectPublications({
  project,
  majorPublication,
}: {
  project: string;
  majorPublication?: string | string[];
}) {
  const { projectsTable, publicationsTable, publications, en, lang } =
    useSiteContext();
  const majorKeys = [
    ...new Set(
      majorPublication === undefined
        ? projectsTable[project].getPublications(lang)
        : Array.isArray(majorPublication)
          ? majorPublication
          : [majorPublication],
    ),
  ];
  for (const key of majorKeys) {
    if (!publicationsTable[key])
      throw new Error(
        `Unknown highlighted publication ${key} in project ${project}`,
      );
  }
  // Citation order is independent of the authored order used by project labels.
  majorKeys.sort(
    (a, b) =>
      Number(publicationsTable[b].entryTags.year || 0) -
      Number(publicationsTable[a].entryTags.year || 0),
  );
  const entries = projectPublications(publications, project, en).filter(
    (e) => !majorKeys.includes(e.citationKey),
  );
  return (
    <section id="publications">
      <Header as="h2">
        <Icon name="book" />
        <Header.Content>{en ? "Publications" : "発表文献"}</Header.Content>
      </Header>
      <Segment basic>
        {majorKeys.map((key) => (
          <Segment raised className="major-publication" key={key} id={key}>
            <Label color="red" ribbon as="span">
              {en ? "Cite this!" : "引用するならコレ！"}
            </Label>
            <MajorPublication entry={publicationsTable[key]} />
          </Segment>
        ))}
        {entries.length > 0 && (
          <Segment secondary>
            <List divided>
              {entries.map((entry) => (
                <Publication
                  key={entry.citationKey}
                  entry={entry}
                  withIcon={false}
                  withProjectLabel={false}
                />
              ))}
            </List>
          </Segment>
        )}
      </Segment>
    </section>
  );
}
