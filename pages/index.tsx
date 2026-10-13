import {
  HomeHistory,
  HistoryFeed,
  HistoryMore,
} from "@/site/components/HomeHistory";
import { SnsLink } from "@/site/components/InteractiveLinks";
import { Popup, SiteModal, Avatar } from "@/site/components/SiteWidgets";
import { SiteImage } from "@/site/components/SiteImage";
import { Fragment } from "react";
import { ProjectCard } from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import type { ReactNode } from "react";
import { HtmlContent } from "@/site/components/RichText";
import { keyed, href, attribute } from "@/site/rendering";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from index.pug; edit this TSX source directly. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { histories, products, selectedProjects, rootPath } = data;
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
  const context: SiteData & SiteContext = {
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
  function renderAbout(): ReactNode {
    return (
      <>
        <div className="ui basic segment" id={"about"}>
          <div className="ui stackable grid">
            <div className="eight wide column">
              <h5 className="ui header">{"Research area"}</h5>
              <p>
                {"I am interested in the broad area of "}
                <strong>{"Human-Computer Interaction (HCI)"}</strong>
                {", and have been particularly passionate about "}
                <strong>
                  {"how computing can contribute to cultural diversity"}
                </strong>
                {". As such, I have focused on the design of "}
                <strong>{"user interfaces"}</strong>
                {" and "}
                <strong>{"integrated environments"}</strong>
                {" for "}
                <strong>{"creativity support"}</strong>
                {". Improving "}
                <strong>{"Programming Experience (PX)"}</strong>
                {
                  " is an important sub-goal to support the creativity of people with diverse technical backgrounds."
                }
              </p>
            </div>
            <div className="eight wide column">
              <h5 className="ui header">{"Bio"}</h5>
              <p>
                {"He is a Chief Senior Researcher at "}
                <a href={"https://www.aist.go.jp/index_en.html"}>
                  <abbr
                    title={
                      "National Institute of Advanced Industrial Science and Technology"
                    }
                  >
                    {"AIST"}
                  </abbr>
                </a>

                {" and the Technical Advisor ("}
                <abbr title={"Principal Investigator"}>{"PI"}</abbr>
                {") at "}

                <a href={"https://research.archinc.jp/en"}>{"Arch Research"}</a>

                {" with a focus on "}
                <abbr title={"Programming Experience"}>{"PX"}</abbr>
                {" and creativity support research. "}

                {"\n"}
                {
                  "From April 2024 to March 2025, he was a Visiting Scientist at "
                }
                <a href={"https://ex-situ.lri.fr/about"}>{"ex)situ"}</a>
                {" group, LISN, Université Paris-Saclay. "}
                {"\n"}
                {"He received a Ph.D. from "}
                <a
                  href={"https://www-ui.is.s.u-tokyo.ac.jp/en/"}
                  title={"Prof. Takeo Igarashi (User Interface Research Lab)"}
                >
                  {"The University of Tokyo"}
                </a>
                {" (2014) and has regularly gained "}
                <SiteLink href={href(`${basePath}publications/#awards`)}>
                  {"academic recognitions"}
                </SiteLink>

                {" such as Honorable Mentions at ACM "}
                <abbr
                  title={
                    "The SIGCHI conference on Human Factors in Computing Systems"
                  }
                >
                  {"CHI"}
                </abbr>
                {" (2013, 2015, 2023) and "}

                <a
                  href={
                    "https://www.ipsj.or.jp/english/organization/aboutipsj/award/ACM-Award-E.html#hdg6"
                  }
                  title={
                    "IPSJ/ACM Award for Early Career Contributions to Global Research"
                  }
                >
                  {"IPSJ/ACM Award"}
                </a>
                {" (2021)."}
              </p>
            </div>
          </div>
          <div className="ui basic segment" id={"sns"}>
            <div className="ui horizontal list">
              <div className="item">
                <i className="address card icon"></i>
                <div className="content">
                  <a href={"#contact"}>{en ? "Contact" : "連絡先"}</a>
                </div>
              </div>
              <div className="item">
                <i className="file icon"></i>
                <div className="content">
                  <SiteLink href={href(`${rootPath}resume.html`)}>
                    <HtmlContent
                      html={
                        en
                          ? 'Resume/<abbr title="Curriculum Vitae">CV</abbr>'
                          : 'レジュメ (<abbr title="Curriculum Vitae">CV</abbr>)'
                      }
                    />
                  </SiteLink>
                </div>
              </div>
              <div className="item">
                <i className="google icon"></i>
                <div className="content">
                  <SiteLink
                    href={href(
                      "https://scholar.google.co.jp/citations?user=U88aqc8AAAAJ&hl=" +
                        (en ? "en" : "ja"),
                    )}
                  >
                    {"Google Scholar"}
                  </SiteLink>
                </div>
              </div>
              <div className="item">
                <i className="linkedin icon"></i>
                <div className="content">
                  <a
                    href={"https://jp.linkedin.com/in/jkato"}
                    title={"LinkedIn"}
                  >
                    {"jkato"}
                  </a>
                </div>
              </div>
              <div className="item">
                <i className="facebook icon"></i>
                <div className="content">
                  <a href={"https://facebook.com/jun.kato"} title={"Facebook"}>
                    {"jun.kato"}
                  </a>
                </div>
              </div>
              <div className="item">
                <i className="twitter icon"></i>
                <div className="content">
                  <SiteLink
                    href={href(
                      "https://twitter.com/" + (en ? "junkato" : "arcatdmz"),
                    )}
                    title={"Twitter"}
                  >
                    {en ? "junkato" : "arcatdmz"}
                  </SiteLink>
                </div>
              </div>
              <div className="item">
                <i className="mastodon icon"></i>
                <div className="content">
                  <a rel={"me"} href={"https://hci.social/@junkato"}>
                    {"@junkato@hci.social"}
                  </a>
                </div>
              </div>
              <div className="item">
                <i className="github icon"></i>
                <div className="content">
                  <a href={"https://github.com/arcatdmz"} title={"GitHub"}>
                    {"arcatdmz"}
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
      <HomeHistory lang={lang}>
        <h2 className="ui header">
          <i className="history icon"></i>
          <div className="content">{en ? "Recent updates" : "近況"}</div>
        </h2>

        <div className="ui basic segment">
          <HistoryFeed className="ui divided feed">
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
                          {entry.getDateString(lang, true)}
                        </div>
                        <div className="summary">
                          <HtmlContent html={entry.text} />
                        </div>
                      </div>
                    </div>
                  </>,
                );
              }
              return keyed(children39);
            })()}
          </HistoryFeed>
        </div>

        {data.historyCount > 5 ? (
          <>
            <div className="ui right aligned basic segment">
              <HistoryMore className="ui left attached more disabled button">
                <i className="zoom icon"></i>
                {en ? "More" : "もっと見る"}
              </HistoryMore>
              <SiteLink
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
                {en ? "Show all" : "全部見る"}
              </SiteLink>
            </div>
          </>
        ) : null}
      </HomeHistory>
    );
  }
  function renderProjects(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="gift icon"></i>
          <div className="content">{en ? "Projects" : "プロジェクト"}</div>
        </h2>
        {renderProducts()}
        {renderTopics()}
      </>
    );
  }
  function renderProducts(): ReactNode {
    return (
      <>
        <h3 className="ui header" id={"products"}>
          <i className="star icon"></i>
          <div className="content">{en ? "Products" : "プロダクト"}</div>
        </h3>
        <div className="ui basic segment">
          <p>
            {
              "The following services and tools are beyond research prototypes and used in production."
            }
          </p>
          <div className="ui hidden divider"></div>
          <div className="ui two stackable cards projects" id={"products-list"}>
            {products.map((p, itemIndex) => (
              <Fragment key={itemIndex}>
                <ProjectCard p={p} />
              </Fragment>
            ))}
          </div>
        </div>
      </>
    );
  }
  function renderTopics(): ReactNode {
    return (
      <>
        <h3 className="ui header" id={"topics"}>
          <i className="lightbulb icon"></i>
          <div className="content">
            {en ? "Research topics" : "研究トピック"}
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
                      <SiteLink
                        className="ui fluid bordered image"
                        href={href(p.getLink(lang, basePath))}
                      >
                        <SiteImage
                          sizes="(max-width: 767px) calc(100vw - 2rem), 340px"
                          src={`${rootPath}images/panels/${p.getThumbnail(
                            lang,
                          )}`}
                        />
                      </SiteLink>
                    </div>
                    <div className="eleven wide column">
                      <SiteLink
                        className="ui header"
                        href={href(p.getLink(lang, basePath))}
                      >
                        <HtmlContent html={p.getTitle(lang)} />
                      </SiteLink>
                      <div className="description">
                        <HtmlContent html={p.getDescription(lang)} />
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
                  {"For the exhaustive list of projects, see "}
                  <SiteLink href={href(`${rootPath}projects`)}>
                    <i className="lab icon"></i>
                    {"Projects"}
                  </SiteLink>
                  {"."}
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
          <div className="content">{en ? "Contact" : "連絡先"}</div>
        </h2>
        <div className="ui basic segment">
          <p>
            {"Please contact me via email or "}
            <SnsLink href={"#sns"} className={"sns"}>
              {"social networking sites"}
            </SnsLink>
            {
              " rather than telephone if possible. I rarely check these conventional machines."
            }
          </p>
          <div className="ui segments">
            <div className="ui segment">
              <div className="ui list">
                <div className="item">
                  <i className="building icon"></i>
                  <div className="content">
                    {en ? (
                      <>
                        <a href={"https://unit.aist.go.jp/hiiri/meirg/"}>
                          {"Media Interaction Group"}
                        </a>

                        {", "}

                        <a href={"https://unit.aist.go.jp/hiiri/index-en.html"}>
                          {
                            "Human Informatics and Interaction Research Institute (HIIRI)"
                          }
                        </a>

                        {", "}

                        <a href={"https://www.aist.go.jp/index_en.html"}>
                          {
                            "National Institute of Advanced Industrial Science and Technology (AIST)"
                          }
                        </a>
                      </>
                    ) : (
                      <>
                        <a href={"https://www.aist.go.jp/"}>
                          {"国立研究開発法人 産業技術総合研究所 ("}
                          <abbr
                            title={
                              "National Institute of Advanced Industrial Science and Technology"
                            }
                          >
                            {"AIST"}
                          </abbr>
                          {")"}
                        </a>

                        {", "}

                        <a href={"https://unit.aist.go.jp/hiiri/"}>
                          {"人間情報インタラクション研究部門 ("}
                          <abbr
                            title={
                              "Human Informatics and Interaction Research Institute"
                            }
                          >
                            {"HIIRI"}
                          </abbr>
                          {")"}
                        </a>

                        {", "}

                        <a href={"https://unit.aist.go.jp/hiiri/meirg/"}>
                          {"メディアインタラクション研究グループ"}
                        </a>
                      </>
                    )}
                  </div>
                </div>
                <div className="item">
                  <i className="marker icon"></i>
                  <div className="content">
                    {en
                      ? "Central 2, 1-1-1 Umezono, Tsukuba, Ibaraki, 305-8568, Japan"
                      : "305-8568 茨城県つくば市梅園1-1-1 中央事業所2群"}
                  </div>
                </div>
              </div>
              <hr className="ui divider" />
              <div className="ui list">
                <div className="item">
                  <i className="building icon"></i>
                  <div className="content">
                    {en ? (
                      <>
                        <a href={"https://research.archinc.jp/en"}>
                          {"Arch Research"}
                        </a>

                        {", "}

                        <a href={"https://archinc.jp/en"}>{"Arch Inc."}</a>
                      </>
                    ) : (
                      <>
                        <a href={"https://archinc.jp/"}>{"アーチ株式会社"}</a>

                        {", "}

                        <a href={"https://research.archinc.jp/"}>
                          {"Arch Research"}
                        </a>
                      </>
                    )}
                  </div>
                </div>

                {en ? (
                  <>
                    <div className="item">
                      <i className="marker icon"></i>
                      <div className="content">{"Tokyo, Japan"}</div>
                    </div>
                  </>
                ) : null}
              </div>
              <hr className="ui divider" />
              <div className="ui horizontal list">
                <div className="item">
                  <i className="mail icon"></i>
                  <div className="content">
                    <a href={"mailto:i@junkato.jp"}>{"i@junkato.jp"}</a>
                  </div>
                </div>
                <div className="item">
                  <i className="phone icon"></i>
                  <div className="content">
                    {en ? "+81" : "0"}
                    {"50-3522-3432"}
                  </div>
                </div>
              </div>
            </div>
            <div className="ui secondary right aligned segment">
              <Popup
                className="ui popup"
                position="top right"
                trigger={
                  <SiteLink
                    className="ui primary large with-popup labeled icon button"
                    href={href(`${basePath}collaborations`)}
                    data-position={"top right"}
                  >
                    <i className="handshake icon"></i>
                    {en ? "Collaborations?" : "共同研究しませんか？"}
                  </SiteLink>
                }
              >
                <div className="header">
                  <i className="handshake icon"></i>{" "}
                  {en ? "Collaborations" : "共同研究"}
                </div>
                <div className="content">
                  {en
                    ? "I am actively seeking collaborators in both academia and industry. Click for more details."
                    : "学生の受け入れや技術提供などを行っています。クリックして詳細をご確認ください。"}
                </div>
              </Popup>
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
            <SiteLink className="item" href={href(`${basePath}projects`)}>
              <i className="gift icon"></i>
              {en ? "Projects" : "プロジェクト"}
            </SiteLink>
          </>
        }
        projectsHeaderMenu={
          <>
            <SiteLink
              className="ui print-hidden mobile hidden item"
              href={href(`${basePath}projects`)}
            >
              <i className="gift icon"></i>
              <span className="tablet or lower hidden">
                {en ? "Projects" : "プロジェクト"}
              </span>
            </SiteLink>
          </>
        }
        postFooter={
          <>
            <Popup
              className="ui hidden popup-menu popup"
              position="top left"
              trigger={
                <a className="ui circular icon popup-menu large grey hidden button">
                  <i className="sidebar icon"></i>
                </a>
              }
            >
              <div className="ui divided list">
                <a className="item" href={"#body"}>
                  <i className="chevron circle up icon"></i>
                  <div className="content">{en ? "Top" : "トップ"}</div>
                </a>
                <a className="item" href={"#history"}>
                  <i className="history icon"></i>
                  <div className="content">{en ? "Updates" : "近況"}</div>
                </a>
                <a className="item" href={"#products"}>
                  <i className="gift icon"></i>
                  <div className="content">
                    {en ? "Products" : "プロダクト"}
                  </div>
                </a>
                <a className="item" href={"#topics"}>
                  <i className="lightbulb icon"></i>
                  <div className="content">
                    {en ? "Research topics" : "研究トピック"}
                  </div>
                </a>
                <a className="item" href={"#contact"}>
                  <i className="address card icon"></i>
                  <div className="content">{en ? "Contact" : "連絡先"}</div>
                </a>
              </div>
            </Popup>
            <SiteModal className="ui large modal">
              <div className="header">{en ? "Profile photo" : "著者近影"}</div>
              <div className="scrolling content">
                <div className="ui stackable columns grid">
                  <div className="five columns row">
                    <div className="column">
                      <SiteLink
                        className="ui fluid circular bordered image"
                        href={href(`${rootPath}images/junkato.highres.jpg`)}
                      >
                        <SiteImage src={`${rootPath}images/junkato.jpg`} />
                      </SiteLink>
                    </div>
                    <div className="column">
                      <SiteLink
                        className="ui fluid circular bordered image"
                        href={href(
                          `${rootPath}images/junkato.comics.highres.png`,
                        )}
                      >
                        <SiteImage
                          src={`${rootPath}images/junkato.comics.png`}
                        />
                      </SiteLink>
                    </div>
                    <div className="column">
                      <SiteLink
                        className="ui fluid circular bordered image"
                        href={href(`${rootPath}images/junkato.alt.highres.jpg`)}
                      >
                        <SiteImage src={`${rootPath}images/junkato.alt.jpg`} />
                      </SiteLink>
                    </div>
                    <div className="column">
                      <SiteLink
                        className="ui fluid circular bordered image"
                        href={href(
                          `${rootPath}images/junkato.alt2.highres.jpg`,
                        )}
                      >
                        <SiteImage src={`${rootPath}images/junkato.alt2.jpg`} />
                      </SiteLink>
                    </div>
                    <div className="column">
                      <SiteLink
                        className="ui fluid circular bordered image"
                        href={href(
                          `${rootPath}images/junkato.alt3.highres.jpg`,
                        )}
                      >
                        <SiteImage src={`${rootPath}images/junkato.alt3.jpg`} />
                      </SiteLink>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content">
                {en ? (
                  <>
                    <ul>
                      <li>{"Click to download full resolution images."}</li>
                      <li>
                        {
                          "The comic version was drawn by Akira Shinohara as part of the "
                        }
                        <a
                          href={
                            "https://www.aist.go.jp/aist_j/magazine/20240415.html"
                          }
                        >
                          {"AIST magazine"}
                        </a>
                        {"."}
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <ul>
                      <li>{"クリックでフル解像度をダウンロードできます"}</li>
                      <li>
                        {"漫画版は"}
                        <a
                          href={
                            "https://www.aist.go.jp/aist_j/magazine/20240415.html"
                          }
                        >
                          {"産総研マガジン"}
                        </a>
                        {"に掲載された篠原 彬氏の手によるものです"}
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </SiteModal>
          </>
        }
      >
        <h1 className="ui header">
          <Avatar
            className="ui circular image"
            id={"avatar"}
            loading="eager"
            fetchPriority="high"
            src={`${rootPath}images/junkato.jpg`}
            data-alt-src={`${rootPath}images/junkato.comics.png`}
          />
          <div className="content">
            {author}
            <div className="sub header">
              {en ? (
                <>{"Human-Computer Interaction researcher, Ph.D."}</>
              ) : (
                <>{"博士（情報理工学）"}</>
              )}
            </div>
          </div>
        </h1>
        {renderAbout()}
        <section id={"history"}>{renderHistory()}</section>
        <div className="ui hidden divider"></div>
        <section id={"projects"}>{renderProjects()}</section>
        <div className="ui hidden divider"></div>
        <section id={"contact"}>{renderContact()}</section>
      </SiteLayout>
    </>
  );
}

export function getStaticProps() {
  return { props: withPageImages(Page, { pageData: getPageData("/") }, "/") };
}
