import { Fragment } from "react";
import { Form, Header, Icon, Label, List } from "react-fomantic-ui";

import { HtmlContent } from "@/site/components/content/HtmlContent";
import { CopyButton } from "@/site/components/links/CopyButton";
import { SiteLink } from "@/site/components/links/SiteLink";
import { PublicationAwards } from "@/site/components/publications/PublicationAwards";
import { PublicationEntry } from "@/site/components/publications/types";
import { useSiteContext } from "@/site/hooks/useSiteContext";
import { href } from "@/site/rendering";

export function MajorPublication({ entry }: { entry: PublicationEntry }) {
  const { en } = useSiteContext();

  const additions = entry.entryTags.addition?.split(/;\s*/g) || [];
  return (
    <>
      <span className="labels">
        <Label as="span">
          <Icon name="calendar" />
          {entry.entryTags.year}
        </Label>

        {entry.entryTags.series ? (
          <>
            <Label color="green" as="span">
              <Icon name="student" />
              {entry.entryTags.series}
            </Label>
          </>
        ) : null}
      </span>
      <Header as="h4">{entry.entryTags.title}</Header>
      <List className="meta">
        <List.Item className="authors">
          <Icon name="users" />
          <List.Content>
            <HtmlContent html={entry.getAuthorsTags().join(", ")} />

            {entry.entryTags.editor ? (
              <>
                {" "}
                (Eds. <HtmlContent html={entry.getEditorsTags().join(", ")} />)
              </>
            ) : null}
          </List.Content>
        </List.Item>

        <List.Item className="book">
          <Icon name="book" />
          <List.Content>{entry.getBookWithPages()}</List.Content>
        </List.Item>
        <PublicationAwards entry={entry} />
        {entry.entryTags.addition ? (
          <>
            {additions.map((a, itemIndex) => {
              return (
                <Fragment key={itemIndex}>
                  <List.Item className="award">
                    {a.indexOf("Invited") < 0 ? (
                      <>
                        <Icon name="trophy" />
                      </>
                    ) : null}

                    <List.Content>
                      <strong>{a}</strong>
                    </List.Content>
                  </List.Item>
                </Fragment>
              );
            })}
          </>
        ) : null}
      </List>
      <List divided horizontal className="extra">
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
            <List.Item role="link" as={SiteLink} href={href(entry.getDOIUrl())}>
              <Icon name="barcode" />
              {en ? "Resolve DOI" : "DOIを照会"}
            </List.Item>
          </>
        ) : null}
      </List>
      <Form as="div">
        <Form.Field className="bibtex">
          <label>BibTeX:</label>
          <textarea readOnly defaultValue={entry.getBibTeX()} />
          <CopyButton
            lang={en ? "en" : "ja"}
            attached="bottom"
            size="tiny"
            className="bibtex"
            data-clipboard-text={entry.getBibTeX()}
          >
            <Icon name="copy" />
            {en ? "Copy to the clipboard" : "クリップボードにコピー"}
          </CopyButton>
        </Form.Field>
      </Form>
    </>
  );
}
