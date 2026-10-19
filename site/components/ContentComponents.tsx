import {
  Button,
  Card,
  Container,
  Embed,
  Form,
  Header,
  Icon,
  Item,
  Label,
  List,
  Segment,
} from "react-fomantic-ui";

import { LinkedImage } from "@/site/components/LinkedImage";
import { SiteImage } from "./SiteImage";
import { CopyButton } from "@/site/components/InteractiveLinks";
import { SitePopup } from "@/site/components/SiteWidgets";
import { Fragment, type ReactNode } from "react";
import { SiteLink } from "@/site/components/SiteLink";
import { buildYear } from "@/site/clock";
import { DeferredScript } from "@/site/components/DeferredScript";

import { HtmlContent } from "@/site/components/RichText";
import { classNames, href, attribute } from "@/site/rendering";
import type { SiteData } from "@/site/page-data";
import type { Project } from "@/site/types";
import { useSiteContext } from "./SiteContext";
type PublicationEntry = SiteData["publications"][number];
type MediaEntry = SiteData["mediaList"][number];

export function EmbedYoutube({ src }: { src?: string }) {
  return (
    <>
      <Embed active icon={false}>
        <iframe
          src={src}
          frameBorder={"0"}
          allow={"autoplay; encrypted-media"}
          allowFullScreen={Boolean(true)}
        ></iframe>
      </Embed>
    </>
  );
}

export function Translate({ path }: { path?: string }) {
  return (
    <>
      <Label
        tag
        color="red"
        as={SiteLink}
        href={href(
          `https://github.com/arcatdmz/arcatdmz.github.io/blob/main/components/${path.replace(
            /\.pug$/,
            ".tsx",
          )}`,
        )}
        data-content={
          "翻訳した内容をリンク先のファイルに反映してPull requestを送っていただけると大変助かります"
        }
        className="with-popup"
      >
        {"翻訳が必要"}
      </Label>
    </>
  );
}

export function TranslateEn({ path }: { path?: string }) {
  return (
    <>
      <Label
        tag
        color="red"
        as={SiteLink}
        href={href(
          `https://github.com/arcatdmz/arcatdmz.github.io/blob/main/components/${path.replace(
            /\.pug$/,
            ".tsx",
          )}`,
        )}
        data-content={
          "I would really appreciate if you could translate this content and send a pull request"
        }
        className="with-popup"
      >
        {"Translation required"}
      </Label>
    </>
  );
}

export function Share() {
  const { rootPath, protocol, domain, en, basePath, me, title } =
    useSiteContext();

  const URI = `${protocol}://${domain}${basePath}${me}`;
  const encodedURI = encodeURIComponent(URI);
  const hashtag = undefined;
  return (
    <>
      <div className="share">
        <SiteLink
          className="hatena-bookmark-button"
          href={href(
            `https://b.hatena.ne.jp/entry/${
              protocol === "https" ? "s/" : ""
            }${domain}${rootPath}${me}`,
          )}
          data-hatena-bookmark-url={URI}
          data-hatena-bookmark-layout={"standard-balloon"}
          data-hatena-bookmark-lang={"ja"}
          title={"このエントリーをはてなブックマークに追加"}
        >
          <SiteImage
            src={
              "https://b.st-hatena.com/images/entry-button/button-only@2x.png"
            }
            alt={"このエントリーをはてなブックマークに追加"}
            width={"20"}
            height={"20"}
            style={{ border: "none" }}
          />
        </SiteLink>

        <DeferredScript
          type={"text/javascript"}
          src={"https://b.st-hatena.com/js/bookmark_button.js"}
          charSet={"utf-8"}
          async={Boolean("async")}
          dangerouslySetInnerHTML={{ __html: "" }}
        />

        <SiteLink
          className="twitter-share-button"
          href={href(`https://twitter.com/intent/tweet?url=${encodedURI}`)}
          data-text={title}
          data-count={"horizontal"}
          data-hashtag={hashtag}
          data-counturl={URI}
        >
          {en ? "" : "ツイート"}
        </SiteLink>

        <DeferredScript
          dangerouslySetInnerHTML={{
            __html:
              'window.twttr = (function(d, s, id) {\n  var js, fjs = d.getElementsByTagName(s)[0], t = window.twttr || {};\n  if (d.getElementById(id)) return t;\n  js = d.createElement(s);\n  js.id = id;\n  js.src = "https://platform.twitter.com/widgets.js";\n  fjs.parentNode.insertBefore(js, fjs);\n  t._e = [];\n  t.ready = function(f) {\n    t._e.push(f);\n  };\n  return t;\n}(document, "script", "twitter-wjs"));',
          }}
        />

        <div
          className="fb-share-button"
          style={{ verticalAlign: "top" }}
          data-href={URI}
          data-layout={"button_count"}
        ></div>

        <div id={"fb-root"}></div>

        <DeferredScript
          dangerouslySetInnerHTML={{
            __html:
              "(function(d, s, id) {\n  var js, fjs = d.getElementsByTagName(s)[0];\n  if (d.getElementById(id)) return;\n  js = d.createElement(s); js.id = id;\n  js.src = \"//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=488785607828009\";\n  fjs.parentNode.insertBefore(js, fjs);\n}(document, 'script', 'facebook-jssdk'));\n",
          }}
        />
      </div>
    </>
  );
}

export function ProjectHero({
  project,
  additionalLabels,
  heroImage,
}: {
  project: string;
  additionalLabels?: ReactNode | ReactNode[];
  heroImage?: string;
}) {
  const { projectsTable, rootPath } = useSiteContext();

  const p = projectsTable[project];
  const backgroundImageUrl = heroImage || `${rootPath}images/heros/${p.hero}`;
  return (
    <>
      <div className="hero-unit">
        <div className="background-wrapper">
          <div
            className="background"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          ></div>
        </div>
        <Container>
          <ProjectHeader
            project={project}
            additionalLabels={additionalLabels}
          />
        </Container>
      </div>
    </>
  );
}

export function ProjectHeader({
  project,
  additionalLabels,
}: {
  project: string;
  additionalLabels?: ReactNode | ReactNode[];
}) {
  const { projectsTable, publications, lang, en, title } = useSiteContext();
  const p = projectsTable[project];
  const projectAwards = publications.flatMap(({ entryTags: tags }) =>
    tags?.project?.includes(project) &&
    tags.addition &&
    (!tags.language || (!en && tags.language === "japanese"))
      ? tags.addition.split(/;\s*/g)
      : [],
  );
  const labels = Array.isArray(additionalLabels)
    ? additionalLabels
    : additionalLabels == null
      ? []
      : [additionalLabels];
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
        {projectAwards.map((award, index) => (
          <List.Item key={`${award}-${index}`}>
            <Label basic size="tiny" color="red" as="span">
              {!award.includes("Invited") ? <Icon name="trophy" /> : null}
              {award}
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
            {en ? "Keywords" : "関連キーワード"}
            {": "}
            <HtmlContent html={tags.join(", ")} />
          </List.Item>
        ) : null}
      </List>
      <Share />
    </section>
  );
}

export function ProjectPublications({
  project,
  majorPublication,
}: {
  project: string;
  majorPublication?: string;
}) {
  const { publications, en } = useSiteContext();
  const entries = projectPublications(publications, project, en);
  return (
    <section id="publications">
      <Header as="h2">
        <Icon name="book" />
        <Header.Content>{en ? "Publications" : "発表文献"}</Header.Content>
      </Header>
      {majorPublication ? (
        <ProjectPublicationsWithMajor
          project={project}
          majorPublication={majorPublication}
        />
      ) : (
        <Segment>
          <List divided>
            {entries.map((entry) => (
              <Publication
                key={entry.citationKey}
                entry={entry}
                withIcon={false}
                withProjectLabel={false}
              />
            ))}
            {!entries.length ? (
              <List.Item>
                No publication record found for this project.
              </List.Item>
            ) : null}
          </List>
        </Segment>
      )}
    </section>
  );
}

export function ProjectPublicationsWithMajor({
  project,
  majorPublication,
}: {
  project: string;
  majorPublication: string;
}) {
  const { publications, publicationsTable, en } = useSiteContext();
  const entries = projectPublications(publications, project, en).filter(
    (entry) => entry.citationKey !== majorPublication,
  );
  return (
    <Segment basic>
      <Segment raised className="major-publication">
        <Label color="red" ribbon as="span">
          {en ? "Cite this!" : "引用するならコレ！"}
        </Label>
        <MajorPublication entry={publicationsTable[majorPublication]} />
      </Segment>
      {entries.length ? (
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
      ) : null}
    </Segment>
  );
}

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
                  {" "}
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
                      {" (Eds. "}

                      <HtmlContent html={entry.getEditorsTags().join(", ")} />

                      {")"}
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
                {" (Eds. "}

                <HtmlContent html={entry.getEditorsTags().join(", ")} />

                {")"}
              </>
            ) : null}
          </List.Content>
        </List.Item>

        <List.Item className="book">
          <Icon name="book" />
          <List.Content>{entry.getBookWithPages()}</List.Content>
        </List.Item>
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
          <label>{"BibTeX:"}</label>
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

export function ProjectCard({ p }: { p: Project }) {
  const { publicationsTable, rootPath, lang, en, basePath } = useSiteContext();
  const description = p.getDescription(lang);
  const pub = p.hasPublication(lang)
    ? publicationsTable[p.getPublication(lang)]
    : undefined;
  return (
    <Card
      id={p.project ? `projects-${p.project}` : undefined}
      data-project={p.project}
    >
      <LinkedImage ui={false} href={href(p.getLink(lang, basePath))}>
        <SiteImage
          sizes="(max-width:767px) calc(100vw - 2rem), (max-width:991px) 340px, (max-width:1199px) 450px, 540px"
          src={`${rootPath}images/thumbnails/${p.getThumbnail(lang)}`}
        />
      </LinkedImage>
      <Card.Content>
        <Card.Header as={SiteLink} href={href(p.getLink(lang, basePath))}>
          {p.icon ? (
            <SiteImage
              ui
              avatar
              sizes="40px"
              src={`${rootPath}images/icons/${p.icon}`}
            />
          ) : null}
          <HtmlContent html={p.getTitle(lang)} />
        </Card.Header>
        <Card.Meta>
          <HtmlContent html={p.getTags(lang).join("")} />
        </Card.Meta>
        {description.startsWith("<p>") ? (
          <Card.Description>
            <HtmlContent html={description} />
          </Card.Description>
        ) : (
          <Card.Description as="p">
            <HtmlContent html={description} />
          </Card.Description>
        )}
      </Card.Content>
      <Card.Content extra>
        <span className="right floated">
          <Icon name="calendar" />
          {p.getYearString(lang, buildYear)}
        </span>
        {p.category !== "private" && p.category !== "committee" ? (
          p.hasPublication(lang) ? (
            <span>
              <Icon name="student" />
              <HtmlContent html={pub ? pub.getSeriesTag() : "undefined"} />
            </span>
          ) : (
            <span>{en ? "(Work in progress)" : "(文献未発表)"}</span>
          )
        ) : null}
      </Card.Content>
    </Card>
  );
}

export function ProjectItem({ p }: { p: Project }) {
  const { rootPath, lang, en, basePath } = useSiteContext();
  const link = p.getLink(lang, basePath);
  const description = p.getDescription(lang);
  const thumbnail = (
    <SiteImage
      sizes="175px"
      src={`${rootPath}images/thumbnails/${p.getThumbnail(lang)}`}
    />
  );
  const heading = (
    <>
      {p.icon ? (
        <SiteImage
          ui
          avatar
          src={`${rootPath}images/icons/${p.icon}`}
          className="mobile only"
        />
      ) : null}
      <HtmlContent html={p.getTitle(lang)} />
    </>
  );
  return (
    <Item
      id={p.project ? `projects-${p.project}` : undefined}
      data-project={p.project}
    >
      {link === false ? (
        <Item.Image bordered className="mobile hidden">
          {thumbnail}
        </Item.Image>
      ) : (
        <LinkedImage
          ui={false}
          href={href(link)}
          bordered
          className="mobile hidden"
        >
          {thumbnail}
        </LinkedImage>
      )}
      <Item.Content>
        {link === false ? (
          <Item.Header>{heading}</Item.Header>
        ) : (
          <Item.Header
            as={SiteLink}
            href={href(link)}
            title={p.subtitle ? p.getLongTitle(lang) : undefined}
          >
            {heading}
          </Item.Header>
        )}
        {description.startsWith("<p>") ? (
          <Item.Description>
            <HtmlContent html={description} />
          </Item.Description>
        ) : (
          <Item.Description as="p">
            <HtmlContent html={description} />
          </Item.Description>
        )}
        {p.category !== "concept" ? (
          <Item.Extra>
            <span className="right floated">
              <Icon name="calendar" />
              {p.getYearString(lang, buildYear)}
            </span>
            {p.category !== "private" && p.category !== "committee" ? (
              <ProjectPublicationLabel p={p} />
            ) : null}
            {p.category === "collaboration" ? (
              <Label basic size="tiny" as="span">
                <Icon name="handshake" />
                {en ? "Co-authored" : "共著"}
              </Label>
            ) : null}
            <Item.Meta as="span">
              <HtmlContent html={p.getTags(lang).join(" ")} />
            </Item.Meta>
          </Item.Extra>
        ) : null}
      </Item.Content>
    </Item>
  );
}

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
                  {" ("}
                  {en ? "Keywords" : "関連キーワード"}
                  {": "}
                  <HtmlContent html={tags.join(", ")} />
                  {") "}
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

export function ProjectLabel({ p }: { p: Project }) {
  const { lang, basePath } = useSiteContext();

  return (
    <>
      <Label
        basic
        size="tiny"
        color="red"
        as={SiteLink}
        href={href(p.getLink(lang, basePath))}
      >
        <Icon name="lab" />
        <HtmlContent html={p.getTitle(lang)} />
      </Label>
    </>
  );
}

export function ProjectPublicationLabel({ p }: { p: Project }) {
  const { publicationsTable, lang, en } = useSiteContext();
  if (!p.hasPublication(lang))
    return <span>{en ? "(Work in progress)" : "(文献未発表)"}</span>;
  const pub = publicationsTable[p.getPublication(lang)];
  return pub?.getSeriesTag() ? (
    <Label basic size="tiny" color="green" as="span">
      <Icon name="student" />
      <HtmlContent html={pub.getSeriesTag()} />
    </Label>
  ) : null;
}

function popupTags(tags: string[]) {
  return tags.map((tag) =>
    tag.replace(
      /<a class="(.+)" data-tag="(.+)">/,
      '<a class="$1" data-tag="$2" data-position="bottom center">',
    ),
  );
}
function projectPublications(
  entries: PublicationEntry[],
  project: string,
  en: boolean,
) {
  return entries.filter(
    ({ entryTags: tags }) =>
      tags?.project?.includes(project) && (!en || tags.language !== "japanese"),
  );
}
