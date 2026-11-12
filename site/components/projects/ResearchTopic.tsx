import { Grid, Header } from "react-fomantic-ui";

import { HtmlContent } from "@/site/components/content/HtmlContent";
import { SiteLink } from "@/site/components/links/SiteLink";
import { LinkedImage } from "@/site/components/media/LinkedImage";
import { SiteImage } from "@/site/components/media/SiteImage";
import { useSiteContext } from "@/site/hooks/useSiteContext";
import { attribute, href } from "@/site/rendering";
import type { Project } from "@/site/types";

/** Shared topic overview used on the homepage and above filtered project lists. */
export function ResearchTopic({ p }: { p: Project }) {
  const { lang, basePath, rootPath } = useSiteContext();
  const link = p.getLink(lang, basePath);
  if (p.isPrivateProject(lang) || !link) return null;
  return (
    <Grid stackable columns={2} id={attribute(`topics-${p.project}`)}>
      <Grid.Column width={5}>
        <LinkedImage bordered fluid href={href(link)}>
          <SiteImage
            sizes="(max-width: 767px) calc(100vw - 2rem), 340px"
            src={`${rootPath}images/panels/${p.getThumbnail(lang)}`}
          />
        </LinkedImage>
      </Grid.Column>
      <Grid.Column width={11}>
        <Header as={SiteLink} href={href(link)}>
          <HtmlContent html={p.getTitle(lang)} />
        </Header>
        <div className="description">
          <HtmlContent html={p.getDescription(lang)} />
        </div>
      </Grid.Column>
    </Grid>
  );
}
