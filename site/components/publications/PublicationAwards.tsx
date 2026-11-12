import { Icon, Label } from "react-fomantic-ui";

import { HtmlContent } from "@/site/components/content/HtmlContent";
import { SiteLink } from "@/site/components/links/SiteLink";
import { PublicationEntry } from "@/site/components/publications/types";
import { useSiteContext } from "@/site/hooks/useSiteContext";
import { awardHref, awardsForPublications } from "@/site/publication-awards";

export function PublicationAwards({ entry }: { entry: PublicationEntry }) {
  const { linkedAwards, lang } = useSiteContext();
  return (
    <>
      {awardsForPublications(linkedAwards, [entry.citationKey]).map((a) => (
        <Label
          key={a.id}
          size="tiny"
          color="red"
          as={SiteLink}
          href={awardHref(a.id, lang)}
        >
          <Icon name="trophy" />
          <HtmlContent html={a.label} />
        </Label>
      ))}
    </>
  );
}
