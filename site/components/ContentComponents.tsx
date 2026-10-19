import { SiteImage } from "./SiteImage";
import { CopyButton } from "@/site/components/InteractiveLinks";
import { Embed, Popup } from "@/site/components/SiteWidgets";
import { Fragment } from "react";
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
      <Embed className="ui embed">
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
      <SiteLink
        className="ui red tag with-popup label"
        href={href(
          `https://github.com/arcatdmz/arcatdmz.github.io/blob/main/components/${path.replace(
            /\.pug$/,
            ".tsx",
          )}`,
        )}
        data-content={
          "翻訳した内容をリンク先のファイルに反映してPull requestを送っていただけると大変助かります"
        }
      >
        {"翻訳が必要"}
      </SiteLink>
    </>
  );
}

export function TranslateEn({ path }: { path?: string }) {
  return (
    <>
      <SiteLink
        className="ui red tag with-popup label"
        href={href(
          `https://github.com/arcatdmz/arcatdmz.github.io/blob/main/components/${path.replace(
            /\.pug$/,
            ".tsx",
          )}`,
        )}
        data-content={
          "I would really appreciate if you could translate this content and send a pull request"
        }
      >
        {"Translation required"}
      </SiteLink>
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
  additionalLabels?: string | string[];
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
        <div className="ui container">
          <ProjectHeader
            project={project}
            additionalLabels={additionalLabels}
          />
        </div>
      </div>
    </>
  );
}

export function ProjectHeader({
  project,
  additionalLabels,
}: {
  project: string;
  additionalLabels?: string | string[];
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
  const labels =
    typeof additionalLabels === "string"
      ? [additionalLabels]
      : additionalLabels || [];
  const tags = popupTags(p.getTags(lang));
  return (
    <section>
      <h1 className="ui header">
        <HtmlContent html={title} />
        <div className="sub header">
          <HtmlContent html={p.getSubtitle(lang)} />
        </div>
      </h1>
      <div className="ui horizontal divided list project-meta-list">
        {p.hasMembers(lang)
          ? p.getMembers(lang).map((member, index) => (
              <div key={`${member}-${index}`} className="item author">
                {member}
              </div>
            ))
          : null}
        <div className="item">
          <span className="ui tiny basic label">
            <i className="calendar icon" />
            {p.getYearString(lang, buildYear)}
          </span>
        </div>
        {p.hasPublication(lang) ? (
          <div className="item">
            <ProjectPublicationLabel p={p} />
          </div>
        ) : null}
        {projectAwards.map((award, index) => (
          <div key={`${award}-${index}`} className="item">
            <span className="ui red tiny basic label">
              {!award.includes("Invited") ? (
                <i className="trophy icon" />
              ) : null}
              {award}
            </span>
          </div>
        ))}
        {labels.map((label, index) => (
          <div key={`${label}-${index}`} className="item">
            <HtmlContent html={label} />
          </div>
        ))}
        {tags.length ? (
          <div className="tags item">
            {en ? "Keywords" : "関連キーワード"}
            {": "}
            <HtmlContent html={tags.join(", ")} />
          </div>
        ) : null}
      </div>
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
      <h2 className="ui header">
        <i className="book icon" />
        <div className="content">{en ? "Publications" : "発表文献"}</div>
      </h2>
      {majorPublication ? (
        <ProjectPublicationsWithMajor
          project={project}
          majorPublication={majorPublication}
        />
      ) : (
        <div className="ui segment">
          <div className="ui divided list">
            {entries.map((entry) => (
              <Publication
                key={entry.citationKey}
                entry={entry}
                withIcon={false}
                withProjectLabel={false}
              />
            ))}
            {!entries.length ? (
              <div className="item">
                No publication record found for this project.
              </div>
            ) : null}
          </div>
        </div>
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
    <div className="ui basic segment">
      <div className="ui raised segment major-publication">
        <span className="ui red ribbon label">
          {en ? "Cite this!" : "引用するならコレ！"}
        </span>
        <MajorPublication entry={publicationsTable[majorPublication]} />
      </div>
      {entries.length ? (
        <div className="ui secondary segment">
          <div className="ui divided list">
            {entries.map((entry) => (
              <Publication
                key={entry.citationKey}
                entry={entry}
                withIcon={false}
                withProjectLabel={false}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
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
      <div
        className={classNames("item", "publication", entry.entryType)}
        id={attribute(entry.citationKey)}
      >
        <div className="right floated content">
          <Popup
            className="ui popup"
            position="top right"
            trigger={
              <div className="ui circular icon tiny with-popup-menu button">
                <i className="sidebar icon"></i>
              </div>
            }
          >
            <div className="ui divided list">
              {entry.entryTags.pdf ? (
                <>
                  <SiteLink className="item" href={href(entry.entryTags.pdf)}>
                    <i className="text file icon"></i>
                    {en ? "Paper PDF" : "論文PDF"}
                  </SiteLink>
                </>
              ) : null}
              {entry.entryTags.poster ? (
                <>
                  <SiteLink
                    className="item"
                    href={href(entry.entryTags.poster)}
                  >
                    <i className="image file icon"></i>
                    {en ? "Poster PDF" : "ポスターPDF"}
                  </SiteLink>
                </>
              ) : null}
              {entry.entryTags.slides ? (
                <>
                  <SiteLink
                    className="item"
                    href={href(entry.entryTags.slides)}
                  >
                    <i className="powerpoint file outline icon"></i>
                    {en ? "Slides PDF" : "スライドPDF"}
                  </SiteLink>
                </>
              ) : null}
              {entry.hasDOIUrl() ? (
                <>
                  <SiteLink className="item" href={href(entry.getDOIUrl())}>
                    <i className="barcode icon"></i>
                    {en ? "Resolve DOI" : "DOIを照会"}
                  </SiteLink>
                </>
              ) : null}
              {!entry.hasDOIUrl() &&
              (entry.entryTags.projectsite || entry.entryTags.url) ? (
                <>
                  <SiteLink
                    className="item"
                    href={href(
                      entry.entryTags.projectsite || entry.entryTags.url,
                    )}
                  >
                    <i className="barcode icon"></i>
                    {en ? "Related link" : "関連リンク"}
                  </SiteLink>
                </>
              ) : null}

              <CopyButton
                lang={en ? "en" : "ja"}
                className="bibtex item"
                data-clipboard-text={entry.getBibTeX()}
              >
                <i className="book icon"></i>
                {en ? "Copy BibTeX" : "BibTeXをコピー"}
              </CopyButton>
            </div>
          </Popup>
        </div>

        {withIcon ? (
          <>
            <i className={classNames("icon", entry.getIconClass())}></i>
          </>
        ) : null}

        <div className="content">
          <h4 className="ui header">{entry.entryTags.title}</h4>
          <div className="description">
            <div className="ui list">
              <div className="item labels">
                <i className="right triangle icon"></i>
                <div className="content">
                  {" "}
                  <span className="ui tiny label">
                    <i className="calendar icon"></i>
                    {entry.entryTags.year}
                  </span>
                  {entry.entryTags.series ? (
                    <>
                      <span className="ui tiny green label">
                        <i className="student icon"></i>
                        {entry.entryTags.series}
                      </span>
                    </>
                  ) : null}
                  {entry.entryTags.addition ? (
                    <>
                      {additions.map((a, itemIndex) => {
                        return (
                          <Fragment key={itemIndex}>
                            <span className="ui tiny red label">
                              {a.indexOf("Invited") < 0 ? (
                                <>
                                  <i className="trophy icon"></i>
                                </>
                              ) : null}
                              {a}
                            </span>
                          </Fragment>
                        );
                      })}
                    </>
                  ) : null}
                  {entry.entryTags.group ? (
                    <>
                      <span className="ui tiny teal label">
                        {entry.entryTags.group}
                      </span>
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
                </div>
              </div>

              <div className="item authors">
                <i className="users icon"></i>
                <div className="content">
                  <HtmlContent html={entry.getAuthorsTags().join(", ")} />

                  {entry.entryTags.editor ? (
                    <>
                      {" (Eds. "}

                      <HtmlContent html={entry.getEditorsTags().join(", ")} />

                      {")"}
                    </>
                  ) : null}
                </div>
              </div>

              {entry.getBook().length > 0 ? (
                <>
                  <div className="item book">
                    <i className="book icon"></i>
                    <div className="content">{entry.getBookWithPages()}</div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function MajorPublication({ entry }: { entry: PublicationEntry }) {
  const { en } = useSiteContext();

  const additions = entry.entryTags.addition?.split(/;\s*/g) || [];
  return (
    <>
      <span className="labels">
        <span className="ui label">
          <i className="calendar icon"></i>
          {entry.entryTags.year}
        </span>

        {entry.entryTags.series ? (
          <>
            <span className="ui green label">
              <i className="student icon"></i>
              {entry.entryTags.series}
            </span>
          </>
        ) : null}
      </span>
      <h4 className="ui header">{entry.entryTags.title}</h4>
      <div className="ui list meta">
        <div className="item authors">
          <i className="users icon"></i>
          <div className="content">
            <HtmlContent html={entry.getAuthorsTags().join(", ")} />

            {entry.entryTags.editor ? (
              <>
                {" (Eds. "}

                <HtmlContent html={entry.getEditorsTags().join(", ")} />

                {")"}
              </>
            ) : null}
          </div>
        </div>

        <div className="item book">
          <i className="book icon"></i>
          <div className="content">{entry.getBookWithPages()}</div>
        </div>
        {entry.entryTags.addition ? (
          <>
            {additions.map((a, itemIndex) => {
              return (
                <Fragment key={itemIndex}>
                  <div className="item award">
                    {a.indexOf("Invited") < 0 ? (
                      <>
                        <i className="trophy icon"></i>
                      </>
                    ) : null}

                    <div className="content">
                      <strong>{a}</strong>
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </>
        ) : null}
      </div>
      <div className="ui horizontal divided list extra">
        {entry.entryTags.pdf ? (
          <>
            <SiteLink className="item" href={href(entry.entryTags.pdf)}>
              <i className="text file icon"></i>
              {en ? "Paper PDF" : "論文PDF"}
            </SiteLink>
          </>
        ) : null}
        {entry.entryTags.poster ? (
          <>
            <SiteLink className="item" href={href(entry.entryTags.poster)}>
              <i className="image file icon"></i>
              {en ? "Poster PDF" : "ポスターPDF"}
            </SiteLink>
          </>
        ) : null}
        {entry.entryTags.slides ? (
          <>
            <SiteLink className="item" href={href(entry.entryTags.slides)}>
              <i className="powerpoint file outline icon"></i>
              {en ? "Slides PDF" : "スライドPDF"}
            </SiteLink>
          </>
        ) : null}
        {entry.hasDOIUrl() ? (
          <>
            <SiteLink className="item" href={href(entry.getDOIUrl())}>
              <i className="barcode icon"></i>
              {en ? "Resolve DOI" : "DOIを照会"}
            </SiteLink>
          </>
        ) : null}
      </div>
      <div className="ui form">
        <div className="field bibtex">
          <label>{"BibTeX:"}</label>
          <textarea readOnly defaultValue={entry.getBibTeX()} />
          <CopyButton
            lang={en ? "en" : "ja"}
            className="ui bottom attached tiny bibtex button"
            data-clipboard-text={entry.getBibTeX()}
          >
            <i className="copy icon"></i>
            {en ? "Copy to the clipboard" : "クリップボードにコピー"}
          </CopyButton>
        </div>
      </div>
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
    <div
      className="card"
      id={p.project ? `projects-${p.project}` : undefined}
      data-project={p.project}
    >
      <SiteLink className="image" href={href(p.getLink(lang, basePath))}>
        <SiteImage
          sizes="(max-width:767px) calc(100vw - 2rem), (max-width:991px) 340px, (max-width:1199px) 450px, 540px"
          src={`${rootPath}images/thumbnails/${p.getThumbnail(lang)}`}
        />
      </SiteLink>
      <div className="content">
        <SiteLink className="header" href={href(p.getLink(lang, basePath))}>
          {p.icon ? (
            <SiteImage
              className="ui avatar image"
              sizes="40px"
              src={`${rootPath}images/icons/${p.icon}`}
            />
          ) : null}
          <HtmlContent html={p.getTitle(lang)} />
        </SiteLink>
        <div className="meta">
          <HtmlContent html={p.getTags(lang).join("")} />
        </div>
        {description.startsWith("<p>") ? (
          <div className="description">
            <HtmlContent html={description} />
          </div>
        ) : (
          <p className="description">
            <HtmlContent html={description} />
          </p>
        )}
      </div>
      <div className="extra content">
        <span className="right floated">
          <i className="calendar icon" />
          {p.getYearString(lang, buildYear)}
        </span>
        {p.category !== "private" && p.category !== "committee" ? (
          p.hasPublication(lang) ? (
            <span>
              <i className="student icon" />
              <HtmlContent html={pub ? pub.getSeriesTag() : "undefined"} />
            </span>
          ) : (
            <span>{en ? "(Work in progress)" : "(文献未発表)"}</span>
          )
        ) : null}
      </div>
    </div>
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
          className="ui avatar image mobile only"
          src={`${rootPath}images/icons/${p.icon}`}
        />
      ) : null}
      <HtmlContent html={p.getTitle(lang)} />
    </>
  );
  return (
    <div
      className="item"
      id={p.project ? `projects-${p.project}` : undefined}
      data-project={p.project}
    >
      {link === false ? (
        <div className="mobile hidden bordered image">{thumbnail}</div>
      ) : (
        <SiteLink className="mobile hidden bordered image" href={href(link)}>
          {thumbnail}
        </SiteLink>
      )}
      <div className="content">
        {link === false ? (
          <div className="header">{heading}</div>
        ) : (
          <SiteLink
            className="header"
            href={href(link)}
            title={p.subtitle ? p.getLongTitle(lang) : undefined}
          >
            {heading}
          </SiteLink>
        )}
        {description.startsWith("<p>") ? (
          <div className="description">
            <HtmlContent html={description} />
          </div>
        ) : (
          <p className="description">
            <HtmlContent html={description} />
          </p>
        )}
        {p.category !== "concept" ? (
          <div className="extra">
            <span className="right floated">
              <i className="calendar icon" />
              {p.getYearString(lang, buildYear)}
            </span>
            {p.category !== "private" && p.category !== "committee" ? (
              <ProjectPublicationLabel p={p} />
            ) : null}
            {p.category === "collaboration" ? (
              <span className="ui tiny basic label">
                <i className="handshake icon" />
                {en ? "Co-authored" : "共著"}
              </span>
            ) : null}
            <span className="meta">
              <HtmlContent html={p.getTags(lang).join(" ")} />
            </span>
          </div>
        ) : null}
      </div>
    </div>
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
      <h2 className="ui header">
        <i className="broadcast tower icon" />
        <div className="content">{en ? "Media Coverage" : "メディア掲載"}</div>
      </h2>
      <div className="ui segment">
        <div className="ui divided list media">
          {entries.map((entry, index) => (
            <MediaItem
              key={`${entry.archive || entry.permalink || project}-${index}`}
              m={entry}
              withLabel={false}
            />
          ))}
          {!entries.length ? (
            <div className="item">
              No media coverage found for this project.
            </div>
          ) : null}
        </div>
      </div>
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
    <div className="item">
      <div className="content">
        {url ? (
          <SiteLink className="header" href={url}>
            {media}
          </SiteLink>
        ) : (
          <div className="header">{media}</div>
        )}
        {text ? <div className="description">{text}</div> : null}
        <div className="description date">
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
        </div>
      </div>
    </div>
  );
}

export function ProjectLabel({ p }: { p: Project }) {
  const { lang, basePath } = useSiteContext();

  return (
    <>
      <SiteLink
        className="ui tiny basic red label"
        href={href(p.getLink(lang, basePath))}
      >
        <i className="lab icon"></i>
        <HtmlContent html={p.getTitle(lang)} />
      </SiteLink>
    </>
  );
}

export function ProjectPublicationLabel({ p }: { p: Project }) {
  const { publicationsTable, lang, en } = useSiteContext();
  if (!p.hasPublication(lang))
    return <span>{en ? "(Work in progress)" : "(文献未発表)"}</span>;
  const pub = publicationsTable[p.getPublication(lang)];
  return pub?.getSeriesTag() ? (
    <span className="ui green tiny basic label">
      <i className="student icon" />
      <HtmlContent html={pub.getSeriesTag()} />
    </span>
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
