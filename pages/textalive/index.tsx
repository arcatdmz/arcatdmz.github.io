import { Embed, Popup } from "@/site/components/SiteWidgets";
import {
  EmbedYoutube,
  ProjectHero,
  ProjectItem,
  ProjectPublications,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import type { ReactNode } from "react";

import { href } from "@/site/rendering";
import { hydratePageData, type PageDataProps, type SiteData } from "@/site/page-data";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from textalive/index.pug; edit this TSX source directly. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projectsTable, publicationsTable, rootPath } = data;
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

  p = projectsTable["textalive"];
  title = p.getTitle(lang);
  me = p.project + "/";
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
  function renderNews(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="announcement icon"></i>
          <div className="content">{en ? "News" : "ニュース"}</div>
        </h2>
        <div className="ui basic segment">
          <div className="ui divided small feed">
            <div className="event">
              <div className="content">
                <div className="date">{"2021/-/-"}</div>
                <div className="summary">
                  {"Latest information can be found on "}
                  <a href={"https://textalive.jp/events"}>
                    {"the TextAlive event page"}
                  </a>
                  {", "}
                  <a
                    href={
                      "https://scrapbox.io/textalive/TextAlive%E3%81%AE%E9%96%8B%E7%99%BA%E5%B1%A5%E6%AD%B4"
                    }
                  >
                    {"its update history"}
                  </a>
                  {", or its follow-up work titled "}
                  <SiteLink href={href(`${basePath}lyric-app-framework`)}>
                    {'"Lyric App Framework."'}
                  </SiteLink>
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{"9/18/2020"}</div>
                <div className="summary">
                  <a href={"https://developer.textalive.jp/"}>
                    {"TextAlive App "}
                    <abbr title={"Application Programming Interface"}>
                      {"API"}
                    </abbr>
                    {" was released,"}
                  </a>
                  {
                    ' a JavaScript library for developing "lyric apps" (cf. lyric videos) that show lyrics synchronized with the music playback. '
                  }
                  {"\n"}
                  {"The programming contest usng the API in "}
                  <a
                    href={
                      "https://developer.textalive.jp/events/magicalmirai2020"
                    }
                  >
                    {'Hatsune Miku "Magical Mirai 2020"'}
                  </a>
                  {" was also announced."}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{"9/6/2019"}</div>
                <div className="summary">
                  {"TextAlive was used to author "}
                  <a
                    href={
                      "https://www.youtube.com/watch?v=1ReP_Z2llig&list=PL1B4fGaIHgNvGAZyWnPDFo9Lm_yICuduo"
                    }
                  >
                    {"videos"}
                  </a>
                  {" for "}
                  <a href={"https://www.crypton.co.jp/miku_eng"}>
                    {"Hatsune Miku"}
                  </a>
                  {"."}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{"8/20/2018"}</div>
                <div className="summary">
                  {"Once again, TextAlive was used to author "}
                  <a
                    href={
                      "https://www.youtube.com/watch?v=yCufFSunfLc&list=PL1B4fGaIHgNvGAZyWnPDFo9Lm_yICuduo"
                    }
                  >
                    {"videos"}
                  </a>
                  {" for "}
                  <a href={"https://www.crypton.co.jp/miku_eng"}>
                    {"Hatsune Miku"}
                  </a>
                  {"."}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{"2/10/2018"}</div>
                <div className="summary">
                  {
                    "TextAlive was used to author videos for a live performance by a renowned virtual singer, "
                  }
                  <a href={"https://www.crypton.co.jp/miku_eng"}>
                    {"Hatsune Miku"}
                  </a>
                  {". The live performance was recorded and "}
                  <a href={"https://www.youtube.com/watch?v=0USE9AMu8i8"}>
                    {"its exerpt"}
                  </a>
                  {" as well as "}
                  <a
                    href={
                      "https://www.youtube.com/watch?v=0assSnUjkLA&list=PL1B4fGaIHgNvGAZyWnPDFo9Lm_yICuduo"
                    }
                  >
                    {"the rendered full HD 60fps video"}
                  </a>
                  {
                    ' for "Round off the Square Earth" are available on YouTube.'
                  }
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{"10/16/2016"}</div>
                <div className="summary">
                  {
                    "TextAlive was used to author videos for a live performance by a Japanese idol group, "
                  }
                  <a
                    href={"https://jpop.fandom.com/wiki/Bellring_Shoujo_Heart"}
                  >
                    {"Bellring Shoujo Heart"}
                  </a>
                  {
                    ". The rendered full HD 60fps videos are available on YouTube ("
                  }
                  <a
                    href={
                      "https://www.youtube.com/watch?v=dE8Lzh0CNSw&list=PL1B4fGaIHgNvGAZyWnPDFo9Lm_yICuduo"
                    }
                  >
                    {"asthma"}
                  </a>
                  {", "}
                  <a
                    href={
                      "https://www.youtube.com/watch?v=5Yb-LBBqxnM&list=PL1B4fGaIHgNvGAZyWnPDFo9Lm_yICuduo"
                    }
                  >
                    {"ROOM 24-7"}
                  </a>
                  {")."}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{"1/25/2016"}</div>
                <div className="summary">
                  <a href={"https://textalive.jp"}>
                    {"TextAlive has been publicly available as a web service"}
                  </a>
                  {" after "}
                  <SiteLink
                    href={
                      "httsp://www.aist.go.jp/aist_e/list/latest_research/2015/20160125/en20160125.html"
                    }
                  >
                    {"the press release"}
                  </SiteLink>
                  {". Please have it a try!"}
                </div>
              </div>
            </div>
          </div>
          <p>
            {"For more detailed news, please refer to "}
            <a href={"https://textalive.jp/events"}>
              {"the Japanese event page"}
            </a>
            {"."}
          </p>
        </div>
      </>
    );
  }
  function renderAbstract(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <div className="content">{en ? "Abstract" : "概要"}</div>
        </h2>
        <div className="ui basic segment">
          <p>
            {
              "This paper presents TextAlive, a graphical tool that allows interactive editing of kinetic typography videos in which lyrics or transcripts are animated in synchrony with the corresponding music or speech."
            }
          </p>
          <p>
            {
              "While existing systems have allowed the designer and casual user to create animations, most of them do not take into account synchronization with audio signals. They allow predefined motions to be applied to objects and parameters to be tweaked, but it is usually impossible to extend the predefined set of motion algorithms within these systems."
            }
          </p>
          <p>
            {"We therefore propose an integrated design environment featuring"}
          </p>
          <ul>
            <li>
              {
                "GUIs that designers can use to create and edit animations synchronized with audio signals,"
              }
            </li>
            <li>
              {
                "integrated tools that programmers can use to implement animation algorithms, and"
              }
            </li>
            <li>
              {
                "a framework for bridging the interfaces for designers and programmers."
              }
            </li>
          </ul>
          <p>
            {
              "A preliminary user study with designers, programmers, and casual users demonstrated its capability in authoring various kinetic typography videos."
            }
          </p>
          <div className="ui message">
            {"The system was made publicly available as "}
            <a href={"https://textalive.jp"}>{"TextAlive"}</a>
            {", a web service for authoring lyric videos, with "}
            <a
              href={
                "https://www.aist.go.jp/aist_e/list/latest_research/2015/20160125/en20160125.html"
              }
            >
              {"a press release"}
            </a>
            {" on 9/8/2015. Latest information can be found on "}
            <a href={"https://textalive.jp/events"}>
              {"the TextAlive event page"}
            </a>
            {" or "}
            <a
              href={
                "https://scrapbox.io/textalive/TextAlive%E3%81%AE%E9%96%8B%E7%99%BA%E5%B1%A5%E6%AD%B4"
              }
            >
              {"its update history"}
            </a>
            {"."}
          </div>
          <div className="ui message">
            {"On 9/18/2020, "}
            <a href={"https://developer.textalive.jp"}>
              {"TextAlive App "}
              <abbr title={"Application Programming Interface"}>{"API"}</abbr>
            </a>
            {
              ' was released for developers. It allows the development of interactive lyric-driven visual media that we name "lyric apps."'
            }
            {"\n"}
            {"For more information, please refer to the follow-up page on "}
            <SiteLink href={href(`${basePath}lyric-app-framework`)}>
              {"Lyric App Framework"}
            </SiteLink>
            {"."}
          </div>
        </div>
      </>
    );
  }
  function renderPresentations(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          {en ? "Presentation materials" : "発表内容"}
        </h2>
        <div className="ui basic segment">
          <div className="ui stackable two columns grid">
            <div className="column">
              <h3 className="ui header">{"CHI 2015 Fast-forward"}</h3>
              <EmbedYoutube src={"//www.youtube.com/embed/lOdt-pf5U8Q"} />
              <div className="caption">
                <div className="ui horizontal list">
                  <div className="item">
                    <a href={"//www.youtube.com/watch?v=lOdt-pf5U8Q"}>
                      <i className="youtube icon"></i>
                      {"Fast-forward"}
                    </a>
                  </div>
                  <div className="item">
                    <a href={"//www.youtube.com/watch?v=ofczPQZaWMk"}>
                      <i className="youtube icon"></i>
                      {"Full version"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <h3 className="ui header">
                {"CHI 2015 "}
                {en ? "Slides" : "発表スライド"}
              </h3>

              <Embed
                className="ui embed"
                data-url={publicationsTable[p.publication].entryTags.slides}
                data-placeholder={`${rootPath}images/background-eee.png`}
                data-icon={"video play outline"}
              ></Embed>

              <div className="caption">
                <div className="ui horizontal list">
                  <div className="item">
                    <SiteLink
                      href={href(
                        publicationsTable[p.publication].entryTags.slides,
                      )}
                    >
                      <i className="download icon"></i>
                      {en ? "Download" : "ダウンロード"}
                    </SiteLink>
                  </div>
                </div>
              </div>

              {!en ? (
                <>
                  <p className="caption">
                    {"日本語の発表スライドは"}
                    <a href={"#publications"}>
                      <i className="book icon"></i>
                      {"発表文献"}
                    </a>
                    {"で日本語文献の "}
                    <i className="sidebar fitted icon"></i>
                    {" をクリックすると閲覧できます。"}
                  </p>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderExamples(): ReactNode {
    return (
      <>
        <h2 className="ui header">{en ? "Example videos" : "作例"}</h2>
        <div className="ui basic segment">
          <div className="ui stackable two columns grid">
            <div className="column">
              <h3 className="ui header">
                {en ? "TextAlive Online" : "Web版"}
                <div className="ui tiny label">
                  <i className="calendar icon"></i>
                  <span>{"2015-"}</span>
                </div>
              </h3>

              <EmbedYoutube
                src={
                  "https://www.youtube.com/embed/videoseries?list=PL1B4fGaIHgNvGAZyWnPDFo9Lm_yICuduo"
                }
              />

              {!en ? (
                <>
                  <p className="caption">
                    {
                      "Web版のTextAliveは現在も開発が続けられています。この作例は、初音ミクやアイドルのライブなどで利用されたものです。 "
                    }
                    <a href={"https://textalive.jp"}>{"textalive.jp"}</a>
                    {" にアクセスすれば、誰でも動画を制作できます。"}
                  </p>
                </>
              ) : null}
            </div>
            <div className="column">
              <h3 className="ui header">
                {en ? "TextAlive Desktop" : "デスクトップ版"}
                <div className="ui tiny label">
                  <i className="calendar icon"></i>
                  <span>{"2014-2015"}</span>
                </div>
              </h3>

              <EmbedYoutube src={"https://www.youtube.com/embed/ofczPQZaWMk"} />

              {!en ? (
                <>
                  <p className="caption">
                    {
                      "デスクトップ版のTextAliveは研究用プロトタイプとして開発されました。この作例は、プログラマや音楽動画制作者の方々を対象としたユーザスタディなどで制作されたものです。"
                    }
                  </p>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderFurtherReadings(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="gift icon"></i>
          <div className="content">
            {en ? "Relevant projects" : "関連プロジェクト"}
          </div>
        </h2>
        <div className="ui basic segment">
          <div className="ui segment">
            <div className="ui divided items projects">
              <ProjectItem p={projectsTable["lyric-app-framework"]} />
              <ProjectItem
                p={projectsTable["creativity-support-environments"]}
              />
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
        mainHero={
          <>
            <ProjectHero project={"textalive"} />
          </>
        }
        postFooter={
          <>
            <Popup className="ui hidden popup-menu popup" position="top left" trigger={<a className="ui circular icon popup-menu large grey hidden button">
              <i className="sidebar icon"></i>
            </a>}>
              <div className="ui divided list">
                <a className="item" href={"#body"}>
                  <i className="chevron circle up icon"></i>
                  <div className="content">{en ? "Top" : "トップ"}</div>
                </a>
                <a className="item" href={"#abstract"}>
                  <i className="right triangle icon"></i>
                  <div className="content">{en ? "Abstract" : "概要"}</div>
                </a>
                <a className="item" href={"#presentations"}>
                  <i className="right triangle icon"></i>
                  <div className="content">
                    {en ? "Presentations" : "発表内容"}
                  </div>
                </a>
                <a className="item" href={"#examples"}>
                  <i className="right triangle icon"></i>
                  <div className="content">
                    {en ? "Example videos" : "作例"}
                  </div>
                </a>
                <a className="item" href={"#publications"}>
                  <i className="right triangle icon"></i>
                  <div className="content">
                    {en ? "Publications" : "発表文献"}
                  </div>
                </a>
                <a className="item" href={"#further-readings"}>
                  <i className="right triangle icon"></i>
                  <div className="content">
                    {en ? "Relevant projects" : "関連プロジェクト"}
                  </div>
                </a>
              </div>
            </Popup>
          </>
        }
      >
        <div className="with-rail">
          <div className="right-rail">
            <section id={"news"}>{renderNews()}</section>
          </div>
          <div className="left-content">
            <section id={"abstract"}>{renderAbstract()}</section>
            <div className="ui basic right aligned segment">
              <a className="ui primary button" href={"//textalive.jp"}>
                <i className="external icon"></i>
                {en ? "Service Website" : "Webサイトへ"}
              </a>
            </div>
            <div className="ui hidden divider"></div>
            <section id={"presentations"}>{renderPresentations()}</section>
          </div>
          <div className="ui hidden divider"></div>
          <section id={"examples"}>{renderExamples()}</section>
        </div>
        <div className="ui hidden divider"></div>
        <ProjectPublications
          project={"textalive"}
          majorPublication={"chi2015-kato-textalive"}
        />
        <div className="ui hidden divider"></div>
        <section id={"further-readings"}>{renderFurtherReadings()}</section>
      </SiteLayout>
    </>
  );
}

export function getStaticProps() {
  return { props: withPageImages(Page, { pageData: getPageData("/textalive/", {"projects": ["creativity-support-environments", "lyric-app-framework", "textalive"], "publications": ["chi2015-kato-textalive"], "publicationProjects": ["textalive"]}) }, "/textalive/") };
}
