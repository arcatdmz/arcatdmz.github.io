import { Fragment } from "react";
import { Button, Header, Icon, Label, List } from "react-fomantic-ui";

import { HtmlContent } from "@/site/components/content/HtmlContent";
import { CopyButton } from "@/site/components/links/CopyButton";
import { SiteLink } from "@/site/components/links/SiteLink";
import { ProjectLabel } from "@/site/components/projects/ProjectLabel";
import { PublicationAwards } from "@/site/components/publications/PublicationAwards";
import { PublicationEntry } from "@/site/components/publications/types";
import { SitePopup } from "@/site/components/widgets/SitePopup";
import { useSiteContext } from "@/site/hooks/useSiteContext";
import { attribute, classNames, href } from "@/site/rendering";

export function Publication({
  entry,
  withIcon = false,
  withProjectLabel = true,
}: {
  entry: PublicationEntry;
  withIcon?: boolean;
  withProjectLabel?: boolean;
}) {
  const { projectsTable, en } = useSiteContext();

  if (!entry.entryTags) return null;
  const additions = entry.entryTags.addition?.split(/;\s*/g) || [];
  return (
    <>
      <List.Item
        className={classNames("publication", entry.entryType)}
        id={attribute(entry.citationKey)}
      >
        <List.Content floated="right">
          <SitePopup
            position="top right"
            trigger={
              <Button
                circular
                icon
                size="tiny"
                as="div"
                className="with-popup-menu"
              >
                <Icon name="sidebar" />
              </Button>
            }
          >
            <List divided>
              {entry.entryTags.pdf ? (
                <>
                  <List.Item
                    role="link"
                    as={SiteLink}
                    href={href(entry.entryTags.pdf)}
                  >
                    <Icon name="file text" />
                    {en ? "Paper PDF" : "論文PDF"}
                  </List.Item>
                </>
              ) : null}
              {entry.entryTags.poster ? (
                <>
                  <List.Item
                    role="link"
                    as={SiteLink}
                    href={href(entry.entryTags.poster)}
                  >
                    <Icon name="file image" />
                    {en ? "Poster PDF" : "ポスターPDF"}
                  </List.Item>
                </>
              ) : null}
              {entry.entryTags.slides ? (
                <>
                  <List.Item
                    role="link"
                    as={SiteLink}
                    href={href(entry.entryTags.slides)}
                  >
                    <Icon name="file powerpoint outline" />
                    {en ? "Slides PDF" : "スライドPDF"}
                  </List.Item>
                </>
              ) : null}
              {entry.hasDOIUrl() ? (
                <>
                  <List.Item
                    role="link"
                    as={SiteLink}
                    href={href(entry.getDOIUrl())}
                  >
                    <Icon name="barcode" />
                    {en ? "Resolve DOI" : "DOIを照会"}
                  </List.Item>
                </>
              ) : null}
              {!entry.hasDOIUrl() &&
              (entry.entryTags.projectsite || entry.entryTags.url) ? (
                <>
                  <List.Item
                    role="link"
                    as={SiteLink}
                    href={href(
                      entry.entryTags.projectsite || entry.entryTags.url,
                    )}
                  >
                    <Icon name="barcode" />
                    {en ? "Related link" : "関連リンク"}
                  </List.Item>
                </>
              ) : null}

              <CopyButton
                lang={en ? "en" : "ja"}
                as={List.Item}
                className="bibtex"
                data-clipboard-text={entry.getBibTeX()}
              >
                <Icon name="book" />
                {en ? "Copy BibTeX" : "BibTeXをコピー"}
              </CopyButton>
            </List>
          </SitePopup>
        </List.Content>

        {withIcon ? (
          <>
            <Icon className={entry.getIconClass()}></Icon>
          </>
        ) : null}

        <List.Content>
          <Header as="h4">{entry.entryTags.title}</Header>
          <List.Description>
            <List>
              <List.Item className="labels">
                <Icon name="triangle right" />
                <List.Content>
                  <Label size="tiny" as="span">
                    <Icon name="calendar" />
                    {entry.entryTags.year}
                  </Label>
                  {entry.entryTags.series ? (
                    <>
                      <Label size="tiny" color="green" as="span">
                        <Icon name="student" />
                        {entry.entryTags.series}
                      </Label>
                    </>
                  ) : null}
                  <PublicationAwards entry={entry} />
                  {entry.entryTags.addition ? (
                    <>
                      {additions.map((a, itemIndex) => {
                        return (
                          <Fragment key={itemIndex}>
                            <Label size="tiny" color="red" as="span">
                              {a.indexOf("Invited") < 0 ? (
                                <>
                                  <Icon name="trophy" />
                                </>
                              ) : null}
                              {a}
                            </Label>
                          </Fragment>
                        );
                      })}
                    </>
                  ) : null}
                  {entry.entryTags.group ? (
                    <>
                      <Label size="tiny" color="teal" as="span">
                        {entry.entryTags.group}
                      </Label>
                    </>
                  ) : null}
                  {withProjectLabel ? (
                    <>
                      {entry.entryTags.project &&
                      projectsTable[entry.entryTags.project] ? (
                        <ProjectLabel
                          p={projectsTable[entry.entryTags.project]}
                        />
                      ) : null}
                    </>
                  ) : null}
                </List.Content>
              </List.Item>

              <List.Item className="authors">
                <Icon name="users" />
                <List.Content>
                  <HtmlContent html={entry.getAuthorsTags().join(", ")} />

                  {entry.entryTags.editor ? (
                    <>
                      {" "}
                      (Eds.{" "}
                      <HtmlContent html={entry.getEditorsTags().join(", ")} />)
                    </>
                  ) : null}
                </List.Content>
              </List.Item>

              {entry.getBook().length > 0 ? (
                <>
                  <List.Item className="book">
                    <Icon name="book" />
                    <List.Content>{entry.getBookWithPages()}</List.Content>
                  </List.Item>
                </>
              ) : null}
            </List>
          </List.Description>
        </List.Content>
      </List.Item>
    </>
  );
}
