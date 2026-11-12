import { Header, Icon, List, Segment } from "react-fomantic-ui";

import { MediaItem } from "@/site/components/media/MediaItem";
import { useSiteContext } from "@/site/hooks/useSiteContext";

export function ProjectMedia({ project }: { project: string }) {
  const { mediaList, en } = useSiteContext();
  const entries = mediaList.filter(
    (entry) =>
      !entry.private &&
      !entry.draft &&
      (!en || entry.media.en) &&
      (entry.projects || []).includes(project),
  );
  return (
    <section id="media">
      <Header as="h2">
        <Icon className="broadcast tower" />
        <Header.Content>
          {en ? "Media Coverage" : "メディア掲載"}
        </Header.Content>
      </Header>
      <Segment>
        <List divided className="media">
          {entries.map((entry, index) => (
            <MediaItem
              key={`${entry.archive || entry.permalink || project}-${index}`}
              m={entry}
              withLabel={false}
            />
          ))}
          {!entries.length ? (
            <List.Item>No media coverage found for this project.</List.Item>
          ) : null}
        </List>
      </Segment>
    </section>
  );
}
