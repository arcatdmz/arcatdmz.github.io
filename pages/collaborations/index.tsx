import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import { classNames, style, text as plainText, keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from collaborations/index.pug; edit this TSX source directly. */
export default function Page() {
  const data = getSiteData();
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
  } = data;
  const lang: "en" | "ja" = "en";
  const en: boolean = true;
  const basePath = en ? rootPath : rootPath + "ja/";
  const author = en ? "Jun Kato" : "加藤 淳";
  let me: any,
    p: any,
    title: any,
    description: any,
    imageUrl: any,
    bodyClass: any;

  title = en ? "Call for collaborations" : "共同研究";
  me = "collaborations/";
  moment.locale(lang);
  const context: ReturnType<typeof getSiteData> & SiteContext = {
    ...data,
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
  };
  const content = createContentComponents(context);
  function renderCollaborations(): ReactNode {
    return (
      <>
        <div className="ui stackable grid">
          <div className="eight wide column">
            <h2 className="ui header" id={attribute("tech-transfer")}>
              <i className="gift icon"></i>
              {richText("Tech transfer?")}
            </h2>
            <h3 className="ui header">{richText("Web services")}</h3>
            <p>
              {richText("My recent projects have been published as web services ")}
              <a href={href("#services")}>{richText("as shown below")}</a>
              {richText(
                ". If you want to try using the technologies, please visit their websites, preferably with modern web browsers.",
              )}
            </p>
            <h3 className="ui header">{richText("Commercial use")}</h3>
            <p>
              {richText(
                "My past projects of creativity support tools/environments have been used in university lectures and in commercial events. If you are interested in using them for commercial purpose, contact me.",
              )}
            </p>
            <h3 className="ui header">{richText("Open source projects")}</h3>
            <p>
              {richText("Some of my technologies have been published as open-source projects at ")}
              <a href={href("https://github.com/arcatdmz")}>
                <i className="github icon"></i>
                {richText("GitHub")}
              </a>
              {richText(". Did you know that even this website is ")}
              <a href={href("https://github.com/arcatdmz/arcatdmz.github.io")}>
                {richText("open-sourced")}
              </a>
              {richText("?")}
            </p>
            {renderServices()}
          </div>
          <div className="eight wide column">
            <h2 className="ui header" id={attribute("students")}>
              <i className="student icon"></i>
              {richText("Students?")}
            </h2>
            <p>
              {richText("My primary affiliation (")}
              <a href={href("https://www.aist.go.jp/index_en.html")}>
                <abbr title={"National Institute of Advanced Industrial Science and Technology"}>
                  {richText("AIST")}
                </abbr>
              </a>
              {richText(
                ") is in-between academia and industry; it does not take students but does allow collaborations with them and sometimes hire them as interns. I regularly work with graduate students who are interested in Human-Computer Interaction (HCI) and/or Programming Experience (PX) research.",
              )}
            </p>
            <p>
              {richText(
                "Also, as of July 2018, I have a secondary affiliation at a Japanese animation production company named ",
              )}
              <a href={href("https://archinc.jp/en")}>{richText("Arch")}</a>
              {richText(
                " where I serve as a technical advisor. My role there is to help their research and development effort in creativity support for the animation industry (specifically Japanimation).",
              )}
            </p>
            <p>
              {richText(
                "Please contact me if you want to work with me with regards to the aforementioned topics. Keep in mind that, generally speaking, the first step toward working with professional researchers is often meeting them at academic conferences and get them know who you are and what you are doing.",
              )}
            </p>
            <h3 className="ui header">{richText("Potential ways for collaborations")}</h3>
            <p>
              {richText(
                "If you are living outside Japan, remote collaborations would be the easiest. If you have an appropriate visa, it would be possible for me to invite you to Tsukuba and work with you for a short term (e.g. regular internship programs for domestic students last for a month or so).",
              )}
            </p>
            <p>
              {richText(
                "Otherwise, if you are still interested in face-to-face collaborations, we could together find visa and funding support. My primary affiliation currently has a funding from the ",
              )}
              <a href={href("https://www.jst.go.jp/kisoken/cronos/en/overview/index.html")}>
                {richText("JST CRONOS")}
              </a>
              {richText("/")}
              <a href={href("https://www.jst.go.jp/kisoken/crest/en/about/index.html")}>
                {richText("CREST")}
              </a>
              {richText(" programs and there are also public funding support such as  ")}
              <a href={href("https://www.jsps.go.jp/english/e-fellow/e-ippan/index.html")}>
                <abbr title={"Japan Society for the Promotion of Science"}>{richText("JSPS")}</abbr>
                {richText(" Postdoctoral Fellowships")}
              </a>
              {richText("/")}
              <a href={href("https://www.jsps.go.jp/english/e-fellow/e-summer/")}>
                {richText(" Summer Program")}
              </a>
              {richText(".")}
            </p>
          </div>
        </div>
      </>
    );
  }
  function renderServices(): ReactNode {
    return (
      <>
        {(() => {
          const children70: ReactNode[] = [];
          children70.push(
            <>
              <div className="ui divider" id={attribute("services")}></div>
            </>,
          );
          for (const p of products) {
            children70.push(
              <>
                <div className="ui fluid card" id={attribute(`projects-${p.project}`)}>
                  <a className="image" href={href(p.getLink(lang, basePath))}>
                    <img src={`${rootPath}images/thumbnails/${p.getThumbnail(lang)}`} />
                  </a>
                  <div className="content">
                    <a className="header" href={href(p.getLink(lang, basePath))}>
                      {(() => {
                        const children71: ReactNode[] = [];
                        if (p.icon) {
                          children71.push(
                            <>
                              <img
                                className="ui avatar image"
                                src={`${rootPath}images/icons/${p.icon}`}
                              />
                            </>,
                          );
                        }
                        children71.push(<>{richText(p.getTitle(lang))}</>);
                        return keyed(children71);
                      })()}
                    </a>
                    <div className="description">{richText(p.getDescription(lang))}</div>
                  </div>
                </div>
              </>,
            );
          }
          return keyed(children70);
        })()}
      </>
    );
  }
  return (
    <>
      <SiteLayout
        context={context}
        postFooter={
          <>
            <a className="ui circular icon popup-menu large grey hidden button">
              <i className="sidebar icon"></i>
            </a>
            <div className="ui hidden popup-menu popup">
              <div className="ui divided list">
                <a className="item" href={href("#tech-transfer")}>
                  <i className="gift icon"></i>
                  <div className="content">{richText("Tech transfer")}</div>
                </a>
                <a className="item" href={href("#students")}>
                  <i className="student icon"></i>
                  <div className="content">{richText("Students")}</div>
                </a>
              </div>
            </div>
          </>
        }
      >
        <section id={attribute("collaborations")}>
          <h1 className="ui header">
            <i className="handshake icon"></i>
            <div className="content">{plainText(title)}</div>
          </h1>
          <div className="ui segment">
            <div className="ui feed">
              <div className="event">
                <div className="label">
                  <img src={`${rootPath}images/junkato.jpg`} />
                </div>
                <div className="content">
                  {richText(
                    "Hi! I am open for collaborations with either academia or industry. Please do not hesitate to contact me via ",
                  )}
                  <a href={href(`${rootPath}#contact`)}>
                    {richText("email or social networking services")}
                  </a>
                  {richText(".")}
                </div>
              </div>
            </div>
          </div>
          <div className="ui hidden clearing divider"></div>
          {renderCollaborations()}
        </section>
      </SiteLayout>
    </>
  );
}
