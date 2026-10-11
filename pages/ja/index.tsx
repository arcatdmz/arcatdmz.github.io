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

/** React page migrated from ja/index.pug; edit this TSX source directly. */
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
  const lang: "en" | "ja" = "ja";
  const en: boolean = false;
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
              <h5 className="ui header">{richText("研究内容")}</h5>
              <p>
                {richText(
                  '人とコンピュータの関係を考え、よりよくしていく学問 <strong>&quot;<abbr title="Human-Computer Interaction">HCI</abbr>&quot;</strong> の研究者です。とくに創作文化を支える技術的多様性に興味があり、<strong>創作支援</strong>のための<strong>ユーザインタフェース、ツール、環境設計</strong>を専門としています。<strong>統合開発環境 (<abbr title="Integrated Development Environment">IDE</abbr>)</strong>で<strong>プログラミング体験 (<abbr title="Programming Experience">PX</abbr>)</strong>を向上させる研究や、Webベースのツールで<strong>音楽動画やアニメの制作プロセス</strong>を支援する研究など、人々が創造性を発揮できる環境づくりに取り組んできました。',
                )}
              </p>
            </div>
            <div className="eight wide column">
              <h5 className="ui header">{richText("略歴")}</h5>
              <p>
                {richText(
                  "2014年 東京大学大学院コンピュータ科学専攻 博士課程を修了。同年より",
                )}
                <a href={href("https://www.aist.go.jp/")}>
                  {richText(
                    '産業技術総合研究所 (<abbr title="National Institute of Advanced Industrial Science and Technology">AIST</abbr>)',
                  )}
                </a>
                {richText(
                  "研究員、2018年 主任研究員、2026年 上級主任研究員。2018年より",
                )}
                <a href={href("https://research.archinc.jp/")}>
                  {richText("アーチ株式会社")}
                </a>
                {richText(
                  "技術顧問を兼務。2024年度パリ＝サクレ大学にVisiting Scientistとして滞在。",
                )}
                {richText("\n")}
                {richText(
                  'Human-Computer Interaction、とくに<abbr title="Programming Experience; プログラミング体験">PX</abbr>向上や創造性支援ツールの研究に従事。ACM CHI Honorable Mention (2013, 2015, 2023) や',
                )}
                <a
                  href={href(
                    "https://blog.junkato.jp/ja/posts/2025-12-28-nistep-sti-hz-vol11no4/",
                  )}
                >
                  {richText("ナイスステップな研究者")}
                </a>
                {richText("選定 (2024) など")}
                <a href={href(`${basePath}publications/#awards`)}>
                  {richText("受賞多数")}
                </a>
                {richText("。")}
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
          const children91: ReactNode[] = [];
          children91.push(
            <>
              <h2 className="ui header">
                <i className="history icon"></i>
                <div className="content">
                  {plainText(en ? "Recent updates" : "近況")}
                </div>
              </h2>
            </>,
          );
          children91.push(
            <>
              <div className="ui basic segment">
                <div className="ui divided feed">
                  {(() => {
                    const children92: ReactNode[] = [];
                    var i = 0;
                    for (const entry of histories[lang]) {
                      if (++i > 5) break;
                      children92.push(
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
                    return keyed(children92);
                  })()}
                </div>
              </div>
            </>,
          );
          if (histories[lang].length > 5) {
            children91.push(
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
          return keyed(children91);
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
              '以下の研究成果はクリエイタ向けのWebサービスやプログラマ向けの<abbr title="Application Programming Interface">API</abbr>として一般公開されています。',
            )}
          </p>
          <div className="ui hidden divider"></div>
          <div
            className="ui two stackable cards projects"
            id={attribute("products-list")}
          >
            {(() => {
              const children93: ReactNode[] = [];
              for (const p of products) {
                children93.push(<>{content.renderProjectCard(p)}</>);
              }
              return keyed(children93);
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
            const children94: ReactNode[] = [];
            for (const p of selectedProjects) {
              if (p.isPrivateProject(lang)) continue;
              if (!p.getLink(lang, basePath)) continue;
              children94.push(
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
              children94.push(
                <>
                  <div className="ui divider"></div>
                </>,
              );
            }
            children94.push(
              <>
                <p>
                  {richText("すべての研究プロジェクトを見るには「")}
                  <a href={href(`${rootPath}ja/projects`)}>
                    <i className="gift icon"></i>
                    {richText("プロジェクト")}
                  </a>
                  {richText("」をご覧ください。")}
                </p>
              </>,
            );
            return keyed(children94);
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
              '電話は原則チェックしていないため、メールか<a href="#sns" class="sns">ソーシャルネットワークサービス</a>経由でのご連絡をおすすめします。',
            )}
          </p>
          <div className="ui segments">
            <div className="ui segment">
              <div className="ui list">
                <div className="item">
                  <i className="building icon"></i>
                  <div className="content">
                    {(() => {
                      const children95: ReactNode[] = [];
                      if (en) {
                        children95.push(
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
                        children95.push(<>{richText(", ")}</>);
                        children95.push(
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
                        children95.push(<>{richText(", ")}</>);
                        children95.push(
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
                        children95.push(
                          <>
                            <a href={href("https://www.aist.go.jp/")}>
                              {richText(
                                '国立研究開発法人 産業技術総合研究所 (<abbr title="National Institute of Advanced Industrial Science and Technology">AIST</abbr>)',
                              )}
                            </a>
                          </>,
                        );
                        children95.push(<>{richText(", ")}</>);
                        children95.push(
                          <>
                            <a href={href("https://unit.aist.go.jp/hiiri/")}>
                              {richText(
                                '人間情報インタラクション研究部門 (<abbr title="Human Informatics and Interaction Research Institute">HIIRI</abbr>)',
                              )}
                            </a>
                          </>,
                        );
                        children95.push(<>{richText(", ")}</>);
                        children95.push(
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
                      return keyed(children95);
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
                  const children96: ReactNode[] = [];
                  children96.push(
                    <>
                      <div className="item">
                        <i className="building icon"></i>
                        <div className="content">
                          {(() => {
                            const children97: ReactNode[] = [];
                            if (en) {
                              children97.push(
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
                              children97.push(<>{richText(", ")}</>);
                              children97.push(
                                <>
                                  <a href={href("https://archinc.jp/en")}>
                                    {richText("Arch Inc.")}
                                  </a>
                                </>,
                              );
                            } else {
                              children97.push(
                                <>
                                  <a href={href("https://archinc.jp/")}>
                                    {richText("アーチ株式会社")}
                                  </a>
                                </>,
                              );
                              children97.push(<>{richText(", ")}</>);
                              children97.push(
                                <>
                                  <a
                                    href={href("https://research.archinc.jp/")}
                                  >
                                    {richText("Arch Research")}
                                  </a>
                                </>,
                              );
                            }
                            return keyed(children97);
                          })()}
                        </div>
                      </div>
                    </>,
                  );
                  if (en) {
                    children96.push(
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
                  return keyed(children96);
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
                  const children90: ReactNode[] = [];
                  if (en) {
                    children90.push(
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
                    children90.push(
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
                  return keyed(children90);
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
                const children98: ReactNode[] = [];
                if (en) {
                  children98.push(
                    <>
                      {richText("Human-Computer Interaction researcher, Ph.D.")}
                    </>,
                  );
                } else {
                  children98.push(<>{richText("博士（情報理工学）")}</>);
                }
                return keyed(children98);
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
