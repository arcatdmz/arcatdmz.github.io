import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import {
  classNames,
  style,
  text as plainText,
  keyed,
  href,
  attribute,
} from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from index.pug; edit this TSX source directly. */
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

  title = en ? "Portfolio of Jun Kato" : "加藤 淳のポートフォリオ";
  me = "";
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
  function renderAbout(): ReactNode {
    return (
      <>
        <div className="ui basic segment" id={attribute("about")}>
          <div className="ui stackable grid">
            <div className="eight wide column">
              <h5 className="ui header">{richText("Research area")}</h5>
              <p>
                {richText(
                  "I am interested in the broad area of <strong>Human-Computer Interaction (HCI)</strong>, and have been particularly passionate about <strong>how computing can contribute to cultural diversity</strong>. As such, I have focused on the design of <strong>user interfaces</strong> and <strong>integrated environments</strong> for <strong>creativity support</strong>. Improving <strong>Programming Experience (PX)</strong> is an important sub-goal to support the creativity of people with diverse technical backgrounds.",
                )}
              </p>
            </div>
            <div className="eight wide column">
              <h5 className="ui header">{richText("Bio")}</h5>
              <p>
                {richText("He is a Chief Senior Researcher at ")}
                <a href={href("https://www.aist.go.jp/index_en.html")}>
                  <abbr
                    title={
                      "National Institute of Advanced Industrial Science and Technology"
                    }
                  >
                    {richText("AIST")}
                  </abbr>
                </a>
                {richText(
                  ' and the Technical Advisor (<abbr title="Principal Investigator">PI</abbr>) at ',
                )}
                <a href={href("https://research.archinc.jp/en")}>
                  {richText("Arch Research")}
                </a>
                {richText(
                  ' with a focus on <abbr title="Programming Experience">PX</abbr> and creativity support research. ',
                )}
                {richText("\n")}
                {richText(
                  "From April 2024 to March 2025, he was a Visiting Scientist at ",
                )}
                <a href={href("https://ex-situ.lri.fr/about")}>
                  {richText("ex)situ")}
                </a>
                {richText(" group, LISN, Université Paris-Saclay. ")}
                {richText("\n")}
                {richText("He received a Ph.D. from ")}
                <a
                  href={href("https://www-ui.is.s.u-tokyo.ac.jp/en/")}
                  title={"Prof. Takeo Igarashi (User Interface Research Lab)"}
                >
                  {richText("The University of Tokyo")}
                </a>
                {richText(" (2014) and has regularly gained ")}
                <a href={href(`${basePath}publications/#awards`)}>
                  {richText("academic recognitions")}
                </a>
                {richText(
                  ' such as Honorable Mentions at ACM <abbr title="The SIGCHI conference on Human Factors in Computing Systems">CHI</abbr> (2013, 2015, 2023) and ',
                )}
                <a
                  href={href(
                    "https://www.ipsj.or.jp/english/organization/aboutipsj/award/ACM-Award-E.html#hdg6",
                  )}
                  title={
                    "IPSJ/ACM Award for Early Career Contributions to Global Research"
                  }
                >
                  {richText("IPSJ/ACM Award")}
                </a>
                {richText(" (2021).")}
              </p>
            </div>
          </div>
          <div className="ui basic segment" id={attribute("sns")}>
            <div className="ui horizontal list">
              <div className="item">
                <i className="address card icon"></i>
                <div className="content">
                  <a href={href("#contact")}>
                    {plainText(en ? "Contact" : "連絡先")}
                  </a>
                </div>
              </div>
              <div className="item">
                <i className="file icon"></i>
                <div className="content">
                  <a href={href(`${rootPath}resume.html`)}>
                    {richText(
                      en
                        ? 'Resume/<abbr title="Curriculum Vitae">CV</abbr>'
                        : 'レジュメ (<abbr title="Curriculum Vitae">CV</abbr>)',
                    )}
                  </a>
                </div>
              </div>
              <div className="item">
                <i className="google icon"></i>
                <div className="content">
                  <a
                    href={href(
                      "https://scholar.google.co.jp/citations?user=U88aqc8AAAAJ&hl=" +
                        (en ? "en" : "ja"),
                    )}
                  >
                    {richText("Google Scholar")}
                  </a>
                </div>
              </div>
              <div className="item">
                <i className="linkedin icon"></i>
                <div className="content">
                  <a
                    href={href("https://jp.linkedin.com/in/jkato")}
                    title={"LinkedIn"}
                  >
                    {richText("jkato")}
                  </a>
                </div>
              </div>
              <div className="item">
                <i className="facebook icon"></i>
                <div className="content">
                  <a
                    href={href("https://facebook.com/jun.kato")}
                    title={"Facebook"}
                  >
                    {richText("jun.kato")}
                  </a>
                </div>
              </div>
              <div className="item">
                <i className="twitter icon"></i>
                <div className="content">
                  <a
                    href={href(
                      "https://twitter.com/" + (en ? "junkato" : "arcatdmz"),
                    )}
                    title={"Twitter"}
                  >
                    {plainText(en ? "junkato" : "arcatdmz")}
                  </a>
                </div>
              </div>
              <div className="item">
                <i className="mastodon icon"></i>
                <div className="content">
                  <a rel={"me"} href={href("https://hci.social/@junkato")}>
                    {richText("@junkato@hci.social")}
                  </a>
                </div>
              </div>
              <div className="item">
                <i className="github icon"></i>
                <div className="content">
                  <a
                    href={href("https://github.com/arcatdmz")}
                    title={"GitHub"}
                  >
                    {richText("arcatdmz")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderHistory(): ReactNode {
    return (
      <>
        {(() => {
          const children38: ReactNode[] = [];
          children38.push(
            <>
              <h2 className="ui header">
                <i className="history icon"></i>
                <div className="content">
                  {plainText(en ? "Recent updates" : "近況")}
                </div>
              </h2>
            </>,
          );
          children38.push(
            <>
              <div className="ui basic segment">
                <div className="ui divided feed">
                  {(() => {
                    const children39: ReactNode[] = [];
                    var i = 0;
                    for (const entry of histories[lang]) {
                      if (++i > 5) break;
                      children39.push(
                        <>
                          <div className="event">
                            <div className="content">
                              <div className="date">
                                {plainText(entry.getDateString(lang, true))}
                              </div>
                              <div className="summary">
                                {richText(entry.text)}
                              </div>
                            </div>
                          </div>
                        </>,
                      );
                    }
                    return keyed(children39);
                  })()}
                </div>
              </div>
            </>,
          );
          if (histories[lang].length > 5) {
            children38.push(
              <>
                <div className="ui right aligned basic segment">
                  <a className="ui left attached more disabled button">
                    <i className="zoom icon"></i>
                    {plainText(en ? "More" : "もっと見る")}
                  </a>
                  <a
                    className="ui right attached all with-popup button"
                    href={href(`${basePath}timeline/`)}
                    data-content={
                      en
                        ? "Show the timeline of updates and publications"
                        : "時系列で全ての更新履歴と発表文献を見ることができます"
                    }
                    data-position={"top right"}
                  >
                    <i className="expand icon"></i>
                    {plainText(en ? "Show all" : "全部見る")}
                  </a>
                </div>
              </>,
            );
          }
          return keyed(children38);
        })()}
      </>
    );
  }
  function renderProjects(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="gift icon"></i>
          <div className="content">
            {plainText(en ? "Projects" : "プロジェクト")}
          </div>
        </h2>
        {renderProducts()}
        {renderTopics()}
      </>
    );
  }
  function renderProducts(): ReactNode {
    return (
      <>
        <h3 className="ui header" id={attribute("products")}>
          <i className="star icon"></i>
          <div className="content">
            {plainText(en ? "Products" : "プロダクト")}
          </div>
        </h3>
        <div className="ui basic segment">
          <p>
            {richText(
              "The following services and tools are beyond research prototypes and used in production.",
            )}
          </p>
          <div className="ui hidden divider"></div>
          <div
            className="ui two stackable cards projects"
            id={attribute("products-list")}
          >
            {(() => {
              const children40: ReactNode[] = [];
              for (const p of products) {
                children40.push(<>{content.renderProjectCard(p)}</>);
              }
              return keyed(children40);
            })()}
          </div>
        </div>
      </>
    );
  }
  function renderTopics(): ReactNode {
    return (
      <>
        <h3 className="ui header" id={attribute("topics")}>
          <i className="lightbulb icon"></i>
          <div className="content">
            {plainText(en ? "Research topics" : "研究トピック")}
          </div>
        </h3>
        <div className="ui basic segment">
          {(() => {
            const children41: ReactNode[] = [];
            for (const p of selectedProjects) {
              if (p.isPrivateProject(lang)) continue;
              if (!p.getLink(lang, basePath)) continue;
              children41.push(
                <>
                  <div
                    className="ui two column stackable grid"
                    id={attribute(`topics-${p.project}`)}
                  >
                    <div className="five wide column">
                      <a
                        className="ui fluid bordered image"
                        href={href(p.getLink(lang, basePath))}
                      >
                        <img
                          src={`${rootPath}images/panels/${p.getThumbnail(
                            lang,
                          )}`}
                        />
                      </a>
                    </div>
                    <div className="eleven wide column">
                      <a
                        className="ui header"
                        href={href(p.getLink(lang, basePath))}
                      >
                        {richText(p.getTitle(lang))}
                      </a>
                      <div className="description">
                        {richText(p.getDescription(lang))}
                      </div>
                    </div>
                  </div>
                </>,
              );
              children41.push(
                <>
                  <div className="ui divider"></div>
                </>,
              );
            }
            children41.push(
              <>
                <p>
                  {richText("For the exhaustive list of projects, see ")}
                  <a href={href(`${rootPath}projects`)}>
                    <i className="lab icon"></i>
                    {richText("Projects")}
                  </a>
                  {richText(".")}
                </p>
              </>,
            );
            return keyed(children41);
          })()}
        </div>
      </>
    );
  }
  function renderContact(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="address card icon"></i>
          <div className="content">{plainText(en ? "Contact" : "連絡先")}</div>
        </h2>
        <div className="ui basic segment">
          <p>
            {richText(
              'Please contact me via email or <a href="#sns" class="sns">social networking sites</a> rather than telephone if possible. I rarely check these conventional machines.',
            )}
          </p>
          <div className="ui segments">
            <div className="ui segment">
              <div className="ui list">
                <div className="item">
                  <i className="building icon"></i>
                  <div className="content">
                    {(() => {
                      const children42: ReactNode[] = [];
                      if (en) {
                        children42.push(
                          <>
                            <a
                              href={href(
                                "https://unit.aist.go.jp/hiiri/meirg/",
                              )}
                            >
                              {richText("Media Interaction Group")}
                            </a>
                          </>,
                        );
                        children42.push(<>{richText(", ")}</>);
                        children42.push(
                          <>
                            <a
                              href={href(
                                "https://unit.aist.go.jp/hiiri/index-en.html",
                              )}
                            >
                              {richText(
                                "Human Informatics and Interaction Research Institute (HIIRI)",
                              )}
                            </a>
                          </>,
                        );
                        children42.push(<>{richText(", ")}</>);
                        children42.push(
                          <>
                            <a
                              href={href(
                                "https://www.aist.go.jp/index_en.html",
                              )}
                            >
                              {richText(
                                "National Institute of Advanced Industrial Science and Technology (AIST)",
                              )}
                            </a>
                          </>,
                        );
                      } else {
                        children42.push(
                          <>
                            <a href={href("https://www.aist.go.jp/")}>
                              {richText(
                                '国立研究開発法人 産業技術総合研究所 (<abbr title="National Institute of Advanced Industrial Science and Technology">AIST</abbr>)',
                              )}
                            </a>
                          </>,
                        );
                        children42.push(<>{richText(", ")}</>);
                        children42.push(
                          <>
                            <a href={href("https://unit.aist.go.jp/hiiri/")}>
                              {richText(
                                '人間情報インタラクション研究部門 (<abbr title="Human Informatics and Interaction Research Institute">HIIRI</abbr>)',
                              )}
                            </a>
                          </>,
                        );
                        children42.push(<>{richText(", ")}</>);
                        children42.push(
                          <>
                            <a
                              href={href(
                                "https://unit.aist.go.jp/hiiri/meirg/",
                              )}
                            >
                              {richText("メディアインタラクション研究グループ")}
                            </a>
                          </>,
                        );
                      }
                      return keyed(children42);
                    })()}
                  </div>
                </div>
                <div className="item">
                  <i className="marker icon"></i>
                  <div className="content">
                    {plainText(
                      en
                        ? "Central 2, 1-1-1 Umezono, Tsukuba, Ibaraki, 305-8568, Japan"
                        : "305-8568 茨城県つくば市梅園1-1-1 中央事業所2群",
                    )}
                  </div>
                </div>
              </div>
              <hr className="ui divider" />
              <div className="ui list">
                {(() => {
                  const children43: ReactNode[] = [];
                  children43.push(
                    <>
                      <div className="item">
                        <i className="building icon"></i>
                        <div className="content">
                          {(() => {
                            const children44: ReactNode[] = [];
                            if (en) {
                              children44.push(
                                <>
                                  <a
                                    href={href(
                                      "https://research.archinc.jp/en",
                                    )}
                                  >
                                    {richText("Arch Research")}
                                  </a>
                                </>,
                              );
                              children44.push(<>{richText(", ")}</>);
                              children44.push(
                                <>
                                  <a href={href("https://archinc.jp/en")}>
                                    {richText("Arch Inc.")}
                                  </a>
                                </>,
                              );
                            } else {
                              children44.push(
                                <>
                                  <a href={href("https://archinc.jp/")}>
                                    {richText("アーチ株式会社")}
                                  </a>
                                </>,
                              );
                              children44.push(<>{richText(", ")}</>);
                              children44.push(
                                <>
                                  <a
                                    href={href("https://research.archinc.jp/")}
                                  >
                                    {richText("Arch Research")}
                                  </a>
                                </>,
                              );
                            }
                            return keyed(children44);
                          })()}
                        </div>
                      </div>
                    </>,
                  );
                  if (en) {
                    children43.push(
                      <>
                        <div className="item">
                          <i className="marker icon"></i>
                          <div className="content">
                            {richText("Tokyo, Japan")}
                          </div>
                        </div>
                      </>,
                    );
                  }
                  return keyed(children43);
                })()}
              </div>
              <hr className="ui divider" />
              <div className="ui horizontal list">
                <div className="item">
                  <i className="mail icon"></i>
                  <div className="content">
                    <a href={href("mailto:i@junkato.jp")}>
                      {richText("i@junkato.jp")}
                    </a>
                  </div>
                </div>
                <div className="item">
                  <i className="phone icon"></i>
                  <div className="content">
                    {plainText(en ? "+81" : "0")}
                    {richText("50-3522-3432")}
                  </div>
                </div>
              </div>
            </div>
            <div className="ui secondary right aligned segment">
              <a
                className="ui primary large with-popup labeled icon button"
                href={href(`${basePath}collaborations`)}
                data-position={"top right"}
              >
                <i className="handshake icon"></i>
                {plainText(en ? "Collaborations?" : "共同研究しませんか？")}
              </a>
              <div className="ui popup">
                <div className="header">
                  <i className="handshake icon"></i>
                  {richText(" ")}
                  {plainText(en ? "Collaborations" : "共同研究")}
                </div>
                <div className="content">
                  {plainText(
                    en
                      ? "I am actively seeking collaborators in both academia and industry. Click for more details."
                      : "学生の受け入れや技術提供などを行っています。クリックして詳細をご確認ください。",
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <SiteLayout
        context={context}
        head={
          <>
            <link
              rel={"alternate"}
              type={"application/rss+xml"}
              href={href(`${basePath}rss.xml`)}
            />
          </>
        }
        projectsSidebarMenu={
          <>
            <a className="item" href={href(`${basePath}projects`)}>
              <i className="gift icon"></i>
              {plainText(en ? "Projects" : "プロジェクト")}
            </a>
          </>
        }
        projectsHeaderMenu={
          <>
            <a
              className="ui print-hidden mobile hidden item"
              href={href(`${basePath}projects`)}
            >
              <i className="gift icon"></i>
              <span className="tablet or lower hidden">
                {plainText(en ? "Projects" : "プロジェクト")}
              </span>
            </a>
          </>
        }
        postFooter={
          <>
            <a className="ui circular icon popup-menu large grey hidden button">
              <i className="sidebar icon"></i>
            </a>
            <div className="ui hidden popup-menu popup">
              <div className="ui divided list">
                <a className="item" href={href("#body")}>
                  <i className="chevron circle up icon"></i>
                  <div className="content">
                    {plainText(en ? "Top" : "トップ")}
                  </div>
                </a>
                <a className="item" href={href("#history")}>
                  <i className="history icon"></i>
                  <div className="content">
                    {plainText(en ? "Updates" : "近況")}
                  </div>
                </a>
                <a className="item" href={href("#products")}>
                  <i className="gift icon"></i>
                  <div className="content">
                    {plainText(en ? "Products" : "プロダクト")}
                  </div>
                </a>
                <a className="item" href={href("#topics")}>
                  <i className="lightbulb icon"></i>
                  <div className="content">
                    {plainText(en ? "Research topics" : "研究トピック")}
                  </div>
                </a>
                <a className="item" href={href("#contact")}>
                  <i className="address card icon"></i>
                  <div className="content">
                    {plainText(en ? "Contact" : "連絡先")}
                  </div>
                </a>
              </div>
            </div>
            <div className="ui large modal">
              <div className="header">
                {plainText(en ? "Profile photo" : "著者近影")}
              </div>
              <div className="scrolling content">
                <div className="ui stackable columns grid">
                  <div className="five columns row">
                    <div className="column">
                      <a
                        className="ui fluid circular bordered image"
                        href={href(`${rootPath}images/junkato.highres.jpg`)}
                      >
                        <img src={`${rootPath}images/junkato.jpg`} />
                      </a>
                    </div>
                    <div className="column">
                      <a
                        className="ui fluid circular bordered image"
                        href={href(
                          `${rootPath}images/junkato.comics.highres.png`,
                        )}
                      >
                        <img src={`${rootPath}images/junkato.comics.png`} />
                      </a>
                    </div>
                    <div className="column">
                      <a
                        className="ui fluid circular bordered image"
                        href={href(`${rootPath}images/junkato.alt.highres.jpg`)}
                      >
                        <img src={`${rootPath}images/junkato.alt.jpg`} />
                      </a>
                    </div>
                    <div className="column">
                      <a
                        className="ui fluid circular bordered image"
                        href={href(
                          `${rootPath}images/junkato.alt2.highres.jpg`,
                        )}
                      >
                        <img src={`${rootPath}images/junkato.alt2.jpg`} />
                      </a>
                    </div>
                    <div className="column">
                      <a
                        className="ui fluid circular bordered image"
                        href={href(
                          `${rootPath}images/junkato.alt3.highres.jpg`,
                        )}
                      >
                        <img src={`${rootPath}images/junkato.alt3.jpg`} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content">
                {(() => {
                  const children37: ReactNode[] = [];
                  if (en) {
                    children37.push(
                      <>
                        <ul>
                          <li>
                            {richText(
                              "Click to download full resolution images.",
                            )}
                          </li>
                          <li>
                            {richText(
                              "The comic version was drawn by Akira Shinohara as part of the ",
                            )}
                            <a
                              href={href(
                                "https://www.aist.go.jp/aist_j/magazine/20240415.html",
                              )}
                            >
                              {richText("AIST magazine")}
                            </a>
                            {richText(".")}
                          </li>
                        </ul>
                      </>,
                    );
                  } else {
                    children37.push(
                      <>
                        <ul>
                          <li>
                            {richText(
                              "クリックでフル解像度をダウンロードできます",
                            )}
                          </li>
                          <li>
                            {richText("漫画版は")}
                            <a
                              href={href(
                                "https://www.aist.go.jp/aist_j/magazine/20240415.html",
                              )}
                            >
                              {richText("産総研マガジン")}
                            </a>
                            {richText(
                              "に掲載された篠原 彬氏の手によるものです",
                            )}
                          </li>
                        </ul>
                      </>,
                    );
                  }
                  return keyed(children37);
                })()}
              </div>
            </div>
          </>
        }
      >
        <h1 className="ui header">
          <img
            className="ui circular image"
            id={attribute("avatar")}
            src={`${rootPath}images/junkato.jpg`}
            data-alt-src={`${rootPath}images/junkato.comics.png`}
          />
          <div className="content">
            {plainText(author)}
            <div className="sub header">
              {(() => {
                const children45: ReactNode[] = [];
                if (en) {
                  children45.push(
                    <>
                      {richText("Human-Computer Interaction researcher, Ph.D.")}
                    </>,
                  );
                } else {
                  children45.push(<>{richText("博士（情報理工学）")}</>);
                }
                return keyed(children45);
              })()}
            </div>
          </div>
        </h1>
        {renderAbout()}
        <section id={attribute("history")}>{renderHistory()}</section>
        <div className="ui hidden divider"></div>
        <section id={attribute("projects")}>{renderProjects()}</section>
        <div className="ui hidden divider"></div>
        <section id={attribute("contact")}>{renderContact()}</section>
      </SiteLayout>
    </>
  );
}
