import { DeferredScript } from "@/site/components/DeferredScript";
import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import { classNames, style, text as plainText, keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import type { SiteContext } from "@/site/types";
export function createContentComponents(context: ReturnType<typeof getSiteData> & SiteContext) {
  const {
    histories,
    awards,
    talks,
    lectures,
    projects,
    projectsTable,
    products,
    selectedProjects,
    publications,
    publicationsTable,
    selectedPublications,
    media,
    mediaList,
    misc,
    moment,
    rootPath,
    protocol,
    domain,
    defaultImageUrl,
    defaultDescription,
    defaultJapaneseDescription,
    stripTags,
    lang,
    en,
    basePath,
    author,
    me,
    p,
    title,
    description,
    imageUrl,
    bodyClass,
  } = context;
  function renderEmbedYoutube(src: any = undefined): ReactNode {
    return (
      <>
        <div className="ui embed">
          <iframe
            src={src}
            frameBorder={"0"}
            allow={"autoplay; encrypted-media"}
            allowFullScreen={Boolean(true)}
          ></iframe>
        </div>
      </>
    );
  }
  function renderTranslate(path: any = undefined): ReactNode {
    return (
      <>
        <a
          className="ui red tag with-popup label"
          href={href(`https://github.com/arcatdmz/arcatdmz.github.io/blob/main/src/${path}`)}
          data-content={
            "翻訳した内容をリンク先のファイルに反映してPull requestを送っていただけると大変助かります"
          }
        >
          {richText("翻訳が必要")}
        </a>
      </>
    );
  }
  function renderTranslateEn(path: any = undefined): ReactNode {
    return (
      <>
        <a
          className="ui red tag with-popup label"
          href={href(`https://github.com/arcatdmz/arcatdmz.github.io/blob/main/src/${path}`)}
          data-content={
            "I would really appreciate if you could translate this content and send a pull request"
          }
        >
          {richText("Translation required")}
        </a>
      </>
    );
  }
  function renderShare(): ReactNode {
    return (
      <>
        <div className="share">
          {(() => {
            const children1: ReactNode[] = [];
            const URI = `${protocol}://${domain}${basePath}${me}`;
            const encodedURI = encodeURIComponent(URI);
            const hashtag = undefined;
            children1.push(
              <>
                <a
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
                  <img
                    src={"https://b.st-hatena.com/images/entry-button/button-only@2x.png"}
                    alt={"このエントリーをはてなブックマークに追加"}
                    width={"20"}
                    height={"20"}
                    style={style("border: none;")}
                  />
                </a>
              </>,
            );
            children1.push(
              <>
                <DeferredScript
                  type={"text/javascript"}
                  src={"https://b.st-hatena.com/js/bookmark_button.js"}
                  charSet={"utf-8"}
                  async={Boolean("async")}
                  dangerouslySetInnerHTML={{ __html: "" }}
                />
              </>,
            );
            children1.push(
              <>
                <a
                  className="twitter-share-button"
                  href={href(`https://twitter.com/intent/tweet?url=${encodedURI}`)}
                  data-text={title}
                  data-count={"horizontal"}
                  data-hashtag={hashtag}
                  data-counturl={URI}
                >
                  {plainText(en ? "" : "ツイート")}
                </a>
              </>,
            );
            children1.push(
              <>
                <DeferredScript
                  dangerouslySetInnerHTML={{
                    __html:
                      'window.twttr = (function(d, s, id) {\n  var js, fjs = d.getElementsByTagName(s)[0], t = window.twttr || {};\n  if (d.getElementById(id)) return t;\n  js = d.createElement(s);\n  js.id = id;\n  js.src = "https://platform.twitter.com/widgets.js";\n  fjs.parentNode.insertBefore(js, fjs);\n  t._e = [];\n  t.ready = function(f) {\n    t._e.push(f);\n  };\n  return t;\n}(document, "script", "twitter-wjs"));',
                  }}
                />
              </>,
            );
            children1.push(
              <>
                <div
                  className="fb-share-button"
                  style={style("vertical-align: top;")}
                  data-href={URI}
                  data-layout={"button_count"}
                ></div>
              </>,
            );
            children1.push(
              <>
                <div id={attribute("fb-root")}></div>
              </>,
            );
            children1.push(
              <>
                <DeferredScript
                  dangerouslySetInnerHTML={{
                    __html:
                      "(function(d, s, id) {\n  var js, fjs = d.getElementsByTagName(s)[0];\n  if (d.getElementById(id)) return;\n  js = d.createElement(s); js.id = id;\n  js.src = \"//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=488785607828009\";\n  fjs.parentNode.insertBefore(js, fjs);\n}(document, 'script', 'facebook-jssdk'));\n",
                  }}
                />
              </>,
            );
            return keyed(children1);
          })()}
        </div>
      </>
    );
  }
  function renderProjectHero(
    project: any = undefined,
    additionalLabels: any = undefined,
    heroImage: any = undefined,
  ): ReactNode {
    return (
      <>
        {(() => {
          const children2: ReactNode[] = [];
          const p = projectsTable[project];
          const backgroundImageUrl = heroImage || `${rootPath}images/heros/${p.hero}`;
          children2.push(
            <>
              <div className="hero-unit">
                <div className="background-wrapper">
                  <div
                    className="background"
                    style={style(`background-image:url(${backgroundImageUrl})`)}
                  ></div>
                </div>
                <div className="ui container">{renderProjectHeader(project, additionalLabels)}</div>
              </div>
            </>,
          );
          return keyed(children2);
        })()}
      </>
    );
  }
  function renderProjectHeader(
    project: any = undefined,
    additionalLabels: any = undefined,
  ): ReactNode {
    let member: any, additionalLabel: any;
    return (
      <>
        {(() => {
          const children3: ReactNode[] = [];
          const p = projectsTable[project];
          const projectAwards = [];
          for (const pub of publications) {
            if (
              pub.entryTags &&
              pub.entryTags.project &&
              pub.entryTags.project.indexOf(project) >= 0 &&
              pub.entryTags.addition &&
              (!pub.entryTags.language || (!en && pub.entryTags.language === "japanese"))
            ) {
              const { addition } = pub.entryTags;
              const additions = addition.split(/;\s*/g);
              projectAwards.push(...additions);
            }
          }
          children3.push(
            <>
              <section>
                <h1 className="ui header">
                  {richText(title)}
                  <div className="sub header">{richText(p.getSubtitle(lang))}</div>
                </h1>
                <div className="ui horizontal divided list project-meta-list">
                  {(() => {
                    const children4: ReactNode[] = [];
                    if (p.hasMembers(lang))
                      for (member of p.getMembers(lang)) {
                        children4.push(
                          <>
                            <div className="item author">{plainText(member)}</div>
                          </>,
                        );
                      }
                    children4.push(
                      <>
                        <div className="item">
                          <span className="ui tiny basic label">
                            <i className="calendar icon"></i>
                            {plainText(p.getYearString(lang))}
                          </span>
                        </div>
                      </>,
                    );
                    if (p.hasPublication(lang)) {
                      children4.push(
                        <>
                          <div className="item">{renderProjectPublicationLabel(p)}</div>
                        </>,
                      );
                    }
                    for (const award of projectAwards) {
                      children4.push(
                        <>
                          <div className="item">
                            <span className="ui red tiny basic label">
                              {(() => {
                                const children5: ReactNode[] = [];
                                if (award.indexOf("Invited") < 0) {
                                  children5.push(
                                    <>
                                      <i className="trophy icon"></i>
                                    </>,
                                  );
                                }
                                children5.push(<>{plainText(award)}</>);
                                return keyed(children5);
                              })()}
                            </span>
                          </div>
                        </>,
                      );
                    }
                    if (typeof additionalLabels === "string") {
                      additionalLabels = [additionalLabels];
                    }
                    if (Array.isArray(additionalLabels))
                      for (additionalLabel of additionalLabels) {
                        children4.push(
                          <>
                            <div className="item">{richText(additionalLabel)}</div>
                          </>,
                        );
                      }
                    const tags = p.getTags(lang);
                    for (var i = 0; i < tags.length; i++)
                      tags[i] = tags[i].replace(
                        /<a class="(.+)" data-tag="(.+)">/,
                        '<a class="$1" data-tag="$2" data-position="bottom center">',
                      );
                    if (tags.length > 0) {
                      children4.push(
                        <>
                          <div className="tags item">
                            {plainText(en ? "Keywords" : "関連キーワード")}
                            {richText(": ")}
                            {richText(tags.join(", "))}
                          </div>
                        </>,
                      );
                    }
                    return keyed(children4);
                  })()}
                </div>
                {renderShare()}
              </section>
            </>,
          );
          return keyed(children3);
        })()}
      </>
    );
  }
  function renderProjectPublications(
    project: any = undefined,
    majorPublication: any = undefined,
  ): ReactNode {
    return (
      <>
        <section id={attribute("publications")}>
          {(() => {
            const children6: ReactNode[] = [];
            children6.push(
              <>
                <h2 className="ui header">
                  <i className="book icon"></i>
                  <div className="content">{plainText(en ? "Publications" : "発表文献")}</div>
                </h2>
              </>,
            );
            if (majorPublication) {
              children6.push(<>{renderProjectPublicationsWithMajor(project, majorPublication)}</>);
            } else {
              children6.push(
                <>
                  <div className="ui segment">
                    <div className="ui divided list">
                      {(() => {
                        const children7: ReactNode[] = [];
                        var pub = 0;
                        for (const entry of publications) {
                          if (en && entry.entryTags && entry.entryTags.language === "japanese")
                            continue; // skip Japanese publications
                          if (
                            !entry.entryTags ||
                            !entry.entryTags.project ||
                            entry.entryTags.project.indexOf(project) < 0
                          )
                            continue;
                          pub++;
                          children7.push(<>{renderPublication(entry, false, false)}</>);
                        }
                        if (pub <= 0) {
                          children7.push(
                            <>
                              <div className="item">
                                {richText("No publication record found for this project.")}
                              </div>
                            </>,
                          );
                        }
                        return keyed(children7);
                      })()}
                    </div>
                  </div>
                </>,
              );
            }
            return keyed(children6);
          })()}
        </section>
      </>
    );
  }
  function renderProjectPublicationsWithMajor(
    project: any = undefined,
    majorPublication: any = undefined,
  ): ReactNode {
    return (
      <>
        {(() => {
          const children8: ReactNode[] = [];
          const projectPublications = [];
          for (const entry of publications) {
            if (entry.citationKey === majorPublication) continue;
            if (en && entry.entryTags && entry.entryTags.language === "japanese") continue; // skip Japanese publications
            if (
              !entry.entryTags ||
              !entry.entryTags.project ||
              entry.entryTags.project.indexOf(project) < 0
            )
              continue;
            projectPublications.push(entry);
          }
          children8.push(
            <>
              <div className="ui basic segment">
                {(() => {
                  const children9: ReactNode[] = [];
                  children9.push(
                    <>
                      <div className="ui raised segment major-publication">
                        <span className="ui red ribbon label">
                          {plainText(en ? "Cite this!" : "引用するならコレ！")}
                        </span>
                        {renderMajorPublication(publicationsTable[majorPublication], false, false)}
                      </div>
                    </>,
                  );
                  if (projectPublications.length > 0) {
                    children9.push(
                      <>
                        <div className="ui secondary segment">
                          <div className="ui divided list">
                            {(() => {
                              const children10: ReactNode[] = [];
                              for (const entry of projectPublications) {
                                children10.push(<>{renderPublication(entry, false, false)}</>);
                              }
                              return keyed(children10);
                            })()}
                          </div>
                        </div>
                      </>,
                    );
                  }
                  return keyed(children9);
                })()}
              </div>
            </>,
          );
          return keyed(children8);
        })()}
      </>
    );
  }
  function renderPublication(
    entry: any = undefined,
    withIcon: any = false,
    withProjectLabel: any = true,
  ): ReactNode {
    return (
      <>
        {(() => {
          const children11: ReactNode[] = [];
          if (!entry.entryTags) return;
          children11.push(
            <>
              <div
                className={classNames("item", "publication", entry.entryType)}
                id={attribute(entry.citationKey)}
              >
                {(() => {
                  const children12: ReactNode[] = [];
                  children12.push(
                    <>
                      <div className="right floated content">
                        <div className="ui circular icon tiny with-popup-menu button">
                          <i className="sidebar icon"></i>
                        </div>
                        <div className="ui popup">
                          <div className="ui divided list">
                            {(() => {
                              const children13: ReactNode[] = [];
                              if (entry.entryTags.pdf) {
                                children13.push(
                                  <>
                                    <a className="item" href={href(entry.entryTags.pdf)}>
                                      <i className="text file icon"></i>
                                      {plainText(en ? "Paper PDF" : "論文PDF")}
                                    </a>
                                  </>,
                                );
                              }
                              if (entry.entryTags.poster) {
                                children13.push(
                                  <>
                                    <a className="item" href={href(entry.entryTags.poster)}>
                                      <i className="image file icon"></i>
                                      {plainText(en ? "Poster PDF" : "ポスターPDF")}
                                    </a>
                                  </>,
                                );
                              }
                              if (entry.entryTags.slides) {
                                children13.push(
                                  <>
                                    <a className="item" href={href(entry.entryTags.slides)}>
                                      <i className="powerpoint file outline icon"></i>
                                      {plainText(en ? "Slides PDF" : "スライドPDF")}
                                    </a>
                                  </>,
                                );
                              }
                              if (entry.hasDOIUrl()) {
                                children13.push(
                                  <>
                                    <a className="item" href={href(entry.getDOIUrl())}>
                                      <i className="barcode icon"></i>
                                      {plainText(en ? "Resolve DOI" : "DOIを照会")}
                                    </a>
                                  </>,
                                );
                              }
                              if (
                                !entry.hasDOIUrl() &&
                                (entry.entryTags.projectsite || entry.entryTags.url)
                              ) {
                                children13.push(
                                  <>
                                    <a
                                      className="item"
                                      href={href(
                                        entry.entryTags.projectsite || entry.entryTags.url,
                                      )}
                                    >
                                      <i className="barcode icon"></i>
                                      {plainText(en ? "Related link" : "関連リンク")}
                                    </a>
                                  </>,
                                );
                              }
                              children13.push(
                                <>
                                  <a
                                    className="bibtex item"
                                    data-clipboard-text={entry.getBibTeX()}
                                  >
                                    <i className="book icon"></i>
                                    {plainText(en ? "Copy BibTeX" : "BibTeXをコピー")}
                                  </a>
                                </>,
                              );
                              return keyed(children13);
                            })()}
                          </div>
                        </div>
                      </div>
                    </>,
                  );
                  if (withIcon) {
                    children12.push(
                      <>
                        <i className={classNames("icon", entry.getIconClass())}></i>
                      </>,
                    );
                  }
                  children12.push(
                    <>
                      <div className="content">
                        <h4 className="ui header">{plainText(entry.entryTags.title)}</h4>
                        <div className="description">
                          <div className="ui list">
                            {(() => {
                              const children14: ReactNode[] = [];
                              children14.push(
                                <>
                                  <div className="item labels">
                                    <i className="right triangle icon"></i>
                                    <div className="content">
                                      {(() => {
                                        const children15: ReactNode[] = [];
                                        children15.push(<>{richText(" ")}</>);
                                        children15.push(
                                          <>
                                            <span className="ui tiny label">
                                              <i className="calendar icon"></i>
                                              {plainText(entry.entryTags.year)}
                                            </span>
                                          </>,
                                        );
                                        if (entry.entryTags.series) {
                                          children15.push(
                                            <>
                                              <span className="ui tiny green label">
                                                <i className="student icon"></i>
                                                {plainText(entry.entryTags.series)}
                                              </span>
                                            </>,
                                          );
                                        }
                                        if (entry.entryTags.addition) {
                                          const { addition } = entry.entryTags;
                                          const additions = addition.split(/;\s*/g);
                                          for (const a of additions) {
                                            children15.push(
                                              <>
                                                <span className="ui tiny red label">
                                                  {(() => {
                                                    const children16: ReactNode[] = [];
                                                    if (a.indexOf("Invited") < 0) {
                                                      children16.push(
                                                        <>
                                                          <i className="trophy icon"></i>
                                                        </>,
                                                      );
                                                    }
                                                    children16.push(<>{plainText(a)}</>);
                                                    return keyed(children16);
                                                  })()}
                                                </span>
                                              </>,
                                            );
                                          }
                                        }
                                        if (entry.entryTags.group) {
                                          children15.push(
                                            <>
                                              <span className="ui tiny teal label">
                                                {plainText(entry.entryTags.group)}
                                              </span>
                                            </>,
                                          );
                                        }
                                        if (withProjectLabel) {
                                          if (
                                            entry.entryTags.project &&
                                            projectsTable[entry.entryTags.project]
                                          ) {
                                            const p = projectsTable[entry.entryTags.project];
                                            children15.push(<>{renderProjectLabel(p)}</>);
                                          }
                                        }
                                        return keyed(children15);
                                      })()}
                                    </div>
                                  </div>
                                </>,
                              );
                              children14.push(
                                <>
                                  <div className="item authors">
                                    <i className="users icon"></i>
                                    <div className="content">
                                      {(() => {
                                        const children17: ReactNode[] = [];
                                        children17.push(
                                          <>{richText(entry.getAuthorsTags().join(", "))}</>,
                                        );
                                        if (entry.entryTags.editor) {
                                          children17.push(<>{richText(" (Eds. ")}</>);
                                          children17.push(
                                            <>{richText(entry.getEditorsTags().join(", "))}</>,
                                          );
                                          children17.push(<>{richText(")")}</>);
                                        }
                                        return keyed(children17);
                                      })()}
                                    </div>
                                  </div>
                                </>,
                              );
                              if (entry.getBook().length > 0) {
                                children14.push(
                                  <>
                                    <div className="item book">
                                      <i className="book icon"></i>
                                      <div className="content">
                                        {plainText(entry.getBookWithPages())}
                                      </div>
                                    </div>
                                  </>,
                                );
                              }
                              return keyed(children14);
                            })()}
                          </div>
                        </div>
                      </div>
                    </>,
                  );
                  return keyed(children12);
                })()}
              </div>
            </>,
          );
          return keyed(children11);
        })()}
      </>
    );
  }
  function renderMajorPublication(entry: any = undefined, ..._unused: unknown[]): ReactNode {
    return (
      <>
        <span className="labels">
          {(() => {
            const children18: ReactNode[] = [];
            children18.push(
              <>
                <span className="ui label">
                  <i className="calendar icon"></i>
                  {plainText(entry.entryTags.year)}
                </span>
              </>,
            );
            if (entry.entryTags.series) {
              children18.push(
                <>
                  <span className="ui green label">
                    <i className="student icon"></i>
                    {plainText(entry.entryTags.series)}
                  </span>
                </>,
              );
            }
            return keyed(children18);
          })()}
        </span>
        <h4 className="ui header">{plainText(entry.entryTags.title)}</h4>
        <div className="ui list meta">
          {(() => {
            const children19: ReactNode[] = [];
            children19.push(
              <>
                <div className="item authors">
                  <i className="users icon"></i>
                  <div className="content">
                    {(() => {
                      const children20: ReactNode[] = [];
                      children20.push(<>{richText(entry.getAuthorsTags().join(", "))}</>);
                      if (entry.entryTags.editor) {
                        children20.push(<>{richText(" (Eds. ")}</>);
                        children20.push(<>{richText(entry.getEditorsTags().join(", "))}</>);
                        children20.push(<>{richText(")")}</>);
                      }
                      return keyed(children20);
                    })()}
                  </div>
                </div>
              </>,
            );
            children19.push(
              <>
                <div className="item book">
                  <i className="book icon"></i>
                  <div className="content">{plainText(entry.getBookWithPages())}</div>
                </div>
              </>,
            );
            if (entry.entryTags.addition) {
              const { addition } = entry.entryTags;
              const additions = addition.split(/;\s*/g);
              for (const a of additions) {
                children19.push(
                  <>
                    <div className="item award">
                      {(() => {
                        const children21: ReactNode[] = [];
                        if (a.indexOf("Invited") < 0) {
                          children21.push(
                            <>
                              <i className="trophy icon"></i>
                            </>,
                          );
                        }
                        children21.push(
                          <>
                            <div className="content">
                              <strong>{plainText(a)}</strong>
                            </div>
                          </>,
                        );
                        return keyed(children21);
                      })()}
                    </div>
                  </>,
                );
              }
            }
            return keyed(children19);
          })()}
        </div>
        <div className="ui horizontal divided list extra">
          {(() => {
            const children22: ReactNode[] = [];
            if (entry.entryTags.pdf) {
              children22.push(
                <>
                  <a className="item" href={href(entry.entryTags.pdf)}>
                    <i className="text file icon"></i>
                    {plainText(en ? "Paper PDF" : "論文PDF")}
                  </a>
                </>,
              );
            }
            if (entry.entryTags.poster) {
              children22.push(
                <>
                  <a className="item" href={href(entry.entryTags.poster)}>
                    <i className="image file icon"></i>
                    {plainText(en ? "Poster PDF" : "ポスターPDF")}
                  </a>
                </>,
              );
            }
            if (entry.entryTags.slides) {
              children22.push(
                <>
                  <a className="item" href={href(entry.entryTags.slides)}>
                    <i className="powerpoint file outline icon"></i>
                    {plainText(en ? "Slides PDF" : "スライドPDF")}
                  </a>
                </>,
              );
            }
            if (entry.hasDOIUrl()) {
              children22.push(
                <>
                  <a className="item" href={href(entry.getDOIUrl())}>
                    <i className="barcode icon"></i>
                    {plainText(en ? "Resolve DOI" : "DOIを照会")}
                  </a>
                </>,
              );
            }
            return keyed(children22);
          })()}
        </div>
        <div className="ui form">
          <div className="field bibtex">
            <label>{richText("BibTeX:")}</label>
            <textarea readOnly={Boolean(true)}>{plainText(entry.getBibTeX())}</textarea>
            <a
              className="ui bottom attached tiny bibtex button"
              data-clipboard-text={entry.getBibTeX()}
            >
              <i className="copy icon"></i>
              {plainText(en ? "Copy to the clipboard" : "クリップボードにコピー")}
            </a>
          </div>
        </div>
      </>
    );
  }
  function renderProjectCard(p: any = undefined): ReactNode {
    return (
      <>
        <div
          className="card"
          id={attribute(p.project ? `projects-${p.project}` : undefined)}
          data-project={p.project}
        >
          <a className="image" href={href(p.getLink(lang, basePath))}>
            <img src={`${rootPath}images/thumbnails/${p.getThumbnail(lang)}`} />
          </a>
          <div className="content">
            {(() => {
              const children23: ReactNode[] = [];
              children23.push(
                <>
                  <a className="header" href={href(p.getLink(lang, basePath))}>
                    {(() => {
                      const children24: ReactNode[] = [];
                      if (p.icon) {
                        children24.push(
                          <>
                            <img
                              className="ui avatar image"
                              src={`${rootPath}images/icons/${p.icon}`}
                            />
                          </>,
                        );
                      }
                      children24.push(<>{richText(p.getTitle(lang))}</>);
                      return keyed(children24);
                    })()}
                  </a>
                </>,
              );
              children23.push(
                <>
                  <div className="meta">{richText(p.getTags(lang).join(""))}</div>
                </>,
              );
              let desc = p.getDescription(lang);
              if (desc.length > 3 && desc.substring(0, 3) === "<p>") {
                children23.push(
                  <>
                    <div className="description">{richText(p.getDescription(lang))}</div>
                  </>,
                );
              } else {
                children23.push(
                  <>
                    <p className="description">{richText(p.getDescription(lang))}</p>
                  </>,
                );
              }
              return keyed(children23);
            })()}
          </div>
          <div className="extra content">
            {(() => {
              const children25: ReactNode[] = [];
              children25.push(
                <>
                  <span className="right floated">
                    <i className="calendar icon"></i>
                    {plainText(p.getYearString(lang))}
                  </span>
                </>,
              );
              if (p.category !== "private" && p.category !== "committee") {
                if (p.hasPublication(lang)) {
                  const pub = publicationsTable[p.getPublication(lang)];
                  children25.push(
                    <>
                      <span>
                        <i className="student icon"></i>
                        {richText(pub ? pub.getSeriesTag() : "undefined")}
                      </span>
                    </>,
                  );
                } else {
                  children25.push(
                    <>
                      <span>{plainText(en ? "(Work in progress)" : "(文献未発表)")}</span>
                    </>,
                  );
                }
              }
              return keyed(children25);
            })()}
          </div>
        </div>
      </>
    );
  }
  function renderProjectItem(p: any = undefined): ReactNode {
    return (
      <>
        {(() => {
          const children26: ReactNode[] = [];
          const link = p.getLink(lang, basePath);
          children26.push(
            <>
              <div
                className="item"
                id={attribute(p.project ? `projects-${p.project}` : undefined)}
                data-project={p.project}
              >
                {(() => {
                  const children27: ReactNode[] = [];
                  if (link === false) {
                    children27.push(
                      <>
                        <div className="mobile hidden bordered image">
                          <img src={`${rootPath}images/thumbnails/${p.getThumbnail(lang)}`} />
                        </div>
                      </>,
                    );
                  } else {
                    children27.push(
                      <>
                        <a className="mobile hidden bordered image" href={href(link)}>
                          <img src={`${rootPath}images/thumbnails/${p.getThumbnail(lang)}`} />
                        </a>
                      </>,
                    );
                  }
                  children27.push(
                    <>
                      <div className="content">
                        {(() => {
                          const children28: ReactNode[] = [];
                          if (link === false) {
                            children28.push(
                              <>
                                <div className="header">
                                  {(() => {
                                    const children29: ReactNode[] = [];
                                    if (p.icon) {
                                      children29.push(
                                        <>
                                          <img
                                            className="ui avatar image mobile only"
                                            src={`${rootPath}images/icons/${p.icon}`}
                                          />
                                        </>,
                                      );
                                    }
                                    children29.push(<>{richText(p.getTitle(lang))}</>);
                                    return keyed(children29);
                                  })()}
                                </div>
                              </>,
                            );
                          } else {
                            children28.push(
                              <>
                                <a
                                  className="header"
                                  href={href(link)}
                                  title={p.subtitle ? p.getLongTitle(lang) : undefined}
                                >
                                  {(() => {
                                    const children30: ReactNode[] = [];
                                    if (p.icon) {
                                      children30.push(
                                        <>
                                          <img
                                            className="ui avatar image mobile only"
                                            src={`${rootPath}images/icons/${p.icon}`}
                                          />
                                        </>,
                                      );
                                    }
                                    children30.push(<>{richText(p.getTitle(lang))}</>);
                                    return keyed(children30);
                                  })()}
                                </a>
                              </>,
                            );
                          }
                          let desc = p.getDescription(lang);
                          if (desc.length > 3 && desc.substring(0, 3) === "<p>") {
                            children28.push(
                              <>
                                <div className="description">
                                  {richText(p.getDescription(lang))}
                                </div>
                              </>,
                            );
                          } else {
                            children28.push(
                              <>
                                <p className="description">{richText(p.getDescription(lang))}</p>
                              </>,
                            );
                          }
                          if (p.category !== "concept") {
                            children28.push(
                              <>
                                <div className="extra">
                                  {(() => {
                                    const children31: ReactNode[] = [];
                                    children31.push(
                                      <>
                                        <span className="right floated">
                                          <i className="calendar icon"></i>
                                          {plainText(p.getYearString(lang))}
                                        </span>
                                      </>,
                                    );
                                    if (p.category !== "private" && p.category !== "committee") {
                                      children31.push(<>{renderProjectPublicationLabel(p)}</>);
                                    }
                                    if (p.category === "collaboration") {
                                      children31.push(
                                        <>
                                          <span className="ui tiny basic label">
                                            <i className="handshake icon"></i>
                                            {plainText(en ? "Co-authored" : "共著")}
                                          </span>
                                        </>,
                                      );
                                    }
                                    children31.push(
                                      <>
                                        <span className="meta">
                                          {richText(p.getTags(lang).join(" "))}
                                        </span>
                                      </>,
                                    );
                                    return keyed(children31);
                                  })()}
                                </div>
                              </>,
                            );
                          }
                          return keyed(children28);
                        })()}
                      </div>
                    </>,
                  );
                  return keyed(children27);
                })()}
              </div>
            </>,
          );
          return keyed(children26);
        })()}
      </>
    );
  }
  function renderProjectMedia(project: any = undefined): ReactNode {
    return (
      <>
        <section id={attribute("media")}>
          <h2 className="ui header">
            <i className="broadcast tower icon"></i>
            <div className="content">{plainText(en ? "Media Coverage" : "メディア掲載")}</div>
          </h2>
          <div className="ui segment">
            <div className="ui divided list media">
              {(() => {
                const children32: ReactNode[] = [];
                var med = 0;
                for (const entry of mediaList) {
                  if (entry.private || entry.draft) continue;
                  if (en && !entry.media.en) continue;
                  if ((entry.projects || []).indexOf(project) < 0) continue;
                  med++;
                  children32.push(<>{renderMediaItem(entry, false)}</>);
                }
                if (med <= 0) {
                  children32.push(
                    <>
                      <div className="item">
                        {richText("No media coverage found for this project.")}
                      </div>
                    </>,
                  );
                }
                return keyed(children32);
              })()}
            </div>
          </div>
        </section>
      </>
    );
  }
  function renderMediaItem(m: any = undefined, withLabel: any = true): ReactNode {
    return (
      <>
        {(() => {
          const children33: ReactNode[] = [];
          const text = m.getText(lang);
          const media = m.getMedia(lang);
          const url = m.archive || m.permalink;
          const projects = (m.projects || []).map((p) => projectsTable[p]).filter((p) => !!p);
          const tags = m.getTags(lang) || [];
          for (var i = 0; i < tags.length; i++)
            tags[i] = tags[i].replace(
              /<a class="(.+)" data-tag="(.+)">/,
              '<a class="$1" data-tag="$2" data-position="bottom center">',
            );
          children33.push(
            <>
              <div className="item">
                <div className="content">
                  {(() => {
                    const children34: ReactNode[] = [];
                    if (url) {
                      children34.push(
                        <>
                          <a className="header" href={href(url)}>
                            {plainText(media)}
                          </a>
                        </>,
                      );
                    } else {
                      children34.push(
                        <>
                          <div className="header">{plainText(media)}</div>
                        </>,
                      );
                    }
                    if (text) {
                      children34.push(
                        <>
                          <div className="description">{plainText(text)}</div>
                        </>,
                      );
                    }
                    children34.push(
                      <>
                        <div className="description date">
                          {(() => {
                            const children35: ReactNode[] = [];
                            children35.push(<>{plainText(m.getDateString(lang, true))}</>);
                            if (withLabel) {
                              if (tags.length > 0) {
                                children35.push(<>{richText(" (")}</>);
                                children35.push(<>{plainText(en ? "Keywords" : "関連キーワード")}</>);
                                children35.push(<>{richText(": ")}</>);
                                children35.push(<>{richText(tags.join(", "))}</>);
                                children35.push(<>{richText(") ")}</>);
                              }
                              if (projects.length > 0)
                                for (const p of projects) {
                                  children35.push(<>{renderProjectLabel(p)}</>);
                                }
                            }
                            return keyed(children35);
                          })()}
                        </div>
                      </>,
                    );
                    return keyed(children34);
                  })()}
                </div>
              </div>
            </>,
          );
          return keyed(children33);
        })()}
      </>
    );
  }
  function renderProjectLabel(p: any = undefined): ReactNode {
    return (
      <>
        <a className="ui tiny basic red label" href={href(p.getLink(lang, basePath))}>
          <i className="lab icon"></i>
          {richText(p.getTitle(lang))}
        </a>
      </>
    );
  }
  function renderProjectPublicationLabel(p: any = undefined): ReactNode {
    return (
      <>
        {(() => {
          const children36: ReactNode[] = [];
          if (p.hasPublication(lang)) {
            const pubKey = p.getPublication(lang);
            const pub = publicationsTable[pubKey];
            if (pub && pub.getSeriesTag()) {
              children36.push(
                <>
                  <span className="ui green tiny basic label">
                    <i className="student icon"></i>
                    {richText(pub.getSeriesTag())}
                  </span>
                </>,
              );
            }
          } else {
            children36.push(
              <>
                <span>{plainText(en ? "(Work in progress)" : "(文献未発表)")}</span>
              </>,
            );
          }
          return keyed(children36);
        })()}
      </>
    );
  }
  return {
    renderEmbedYoutube,
    renderTranslate,
    renderTranslateEn,
    renderShare,
    renderProjectHero,
    renderProjectHeader,
    renderProjectPublications,
    renderProjectPublicationsWithMajor,
    renderPublication,
    renderMajorPublication,
    renderProjectCard,
    renderProjectItem,
    renderProjectMedia,
    renderMediaItem,
    renderProjectLabel,
    renderProjectPublicationLabel,
  };
}
