import { Item } from "react-fomantic-ui";

import { HtmlContent } from "@/site/components/content/HtmlContent";
import { popupTags } from "@/site/components/links/popupTags";
import { SiteLink } from "@/site/components/links/SiteLink";
import { MediaEntry } from "@/site/components/media/types";
import { ProjectLabel } from "@/site/components/projects/ProjectLabel";
import { useSiteContext } from "@/site/hooks/useSiteContext";

export function MediaItem({
  m,
  withLabel = true,
}: {
  m: MediaEntry;
  withLabel?: boolean;
}) {
  const { projectsTable, lang, en } = useSiteContext();
  const text = m.getText(lang);
  const media = m.getMedia(lang);
  const url = m.archive || m.permalink;
  const projects = (m.projects || [])
    .map((key) => projectsTable[key])
    .filter(Boolean);
  const tags = popupTags(m.getTags(lang) || []);
  return (
    <Item>
      <Item.Content>
        {url ? (
          <Item.Header as={SiteLink} href={url}>
            {media}
          </Item.Header>
        ) : (
          <Item.Header>{media}</Item.Header>
        )}
        {text ? <Item.Description>{text}</Item.Description> : null}
        <Item.Description className="date">
          {m.getDateString(lang, true)}
          {withLabel ? (
            <>
              {tags.length ? (
                <>
                  {" "}
                  ({en ? "Keywords" : "関連キーワード"}:{" "}
                  <HtmlContent html={tags.join(", ")} />){" "}
                </>
              ) : null}
              {projects.map((p) => (
                <ProjectLabel key={p.project} p={p} />
              ))}
            </>
          ) : null}
        </Item.Description>
      </Item.Content>
    </Item>
  );
}
