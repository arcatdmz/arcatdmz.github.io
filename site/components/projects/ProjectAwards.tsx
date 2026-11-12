import { Icon, Label, List } from "react-fomantic-ui";

import { HtmlContent } from "@/site/components/content/HtmlContent";
import { SiteLink } from "@/site/components/links/SiteLink";
import { SitePopup } from "@/site/components/widgets/SitePopup";
import { useSiteContext } from "@/site/hooks/useSiteContext";
import {
  awardHref,
  awardsForPublications,
  awardSummary,
} from "@/site/publication-awards";

export function ProjectAwards({ project }: { project: string }) {
  const { linkedAwards, projectsTable, lang } = useSiteContext();
  const keys = projectsTable[project].awardPublicationKeys;
  const awards = awardsForPublications(linkedAwards, keys);
  if (!awards.length) return null;
  if (awards.length <= 5)
    return (
      <>
        {awards.map((a) => (
          <List.Item key={a.id}>
            <Label
              basic
              size="tiny"
              color="red"
              as={SiteLink}
              href={awardHref(a.id, lang)}
            >
              <Icon name="trophy" />
              <HtmlContent html={a.label} />
            </Label>
          </List.Item>
        ))}
      </>
    );
  return (
    <List.Item>
      <SitePopup
        className="project-awards-popup"
        position="bottom center"
        portal
        trigger={
          <Label
            as="button"
            type="button"
            basic
            color="red"
            size="tiny"
            className="project-awards-summary"
          >
            <Icon name="trophy" />
            {awardSummary(awards, lang)}
          </Label>
        }
      >
        <List divided>
          {awards.map((a) => (
            <List.Item key={a.id} as={SiteLink} href={awardHref(a.id, lang)}>
              <HtmlContent html={a.text.replace(/<[^>]*>/g, "")} />
            </List.Item>
          ))}
        </List>
      </SitePopup>
    </List.Item>
  );
}
