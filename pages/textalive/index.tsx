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

/** React page migrated from textalive/index.pug; edit this TSX source directly. */
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

  p = projectsTable["textalive"];
  title = p.getTitle(lang);
  me = p.project + "/";
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
  function renderNews(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="announcement icon"></i>
          <div className="content">{plainText(en ? "News" : "ニュース")}</div>
        </h2>
        <div className="ui basic segment">
          <div className="ui divided small feed">
            <div className="event">
              <div className="content">
                <div className="date">{richText("2021/-/-")}</div>
                <div className="summary">
                  {richText("Latest information can be found on ")}
                  <a href={href("https://textalive.jp/events")}>
                    {richText("the TextAlive event page")}
                  </a>
                  {richText(", ")}
                  <a
                    href={href(
                      "https://scrapbox.io/textalive/TextAlive%E3%81%AE%E9%96%8B%E7%99%BA%E5%B1%A5%E6%AD%B4",
                    )}
                  >
                    {richText("its update history")}
                  </a>
                  {richText(", or its follow-up work titled ")}
                  <a href={href(`${basePath}lyric-app-framework`)}>
                    {richText("&quot;Lyric App Framework.&quot;")}
                  </a>
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{richText("9/18/2020")}</div>
                <div className="summary">
                  <a href={href("https://developer.textalive.jp/")}>
                    {richText(
                      'TextAlive App <abbr title="Application Programming Interface">API</abbr> was released,',
                    )}
                  </a>
                  {richText(
                    " a JavaScript library for developing &quot;lyric apps&quot; (cf. lyric videos) that show lyrics synchronized with the music playback. ",
                  )}
                  {richText("\n")}
                  {richText("The programming contest usng the API in ")}
                  <a
                    href={href(
                      "https://developer.textalive.jp/events/magicalmirai2020",
                    )}
                  >
                    {richText("Hatsune Miku &quot;Magical Mirai 2020&quot;")}
                  </a>
                  {richText(" was also announced.")}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{richText("9/6/2019")}</div>
                <div className="summary">
                  {richText("TextAlive was used to author ")}
                  <a
                    href={href(
                      "https://www.youtube.com/watch?v=1ReP_Z2llig&list=PL1B4fGaIHgNvGAZyWnPDFo9Lm_yICuduo",
                    )}
                  >
                    {richText("videos")}
                  </a>
                  {richText(" for ")}
                  <a href={href("https://www.crypton.co.jp/miku_eng")}>
                    {richText("Hatsune Miku")}
                  </a>
                  {richText(".")}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{richText("8/20/2018")}</div>
                <div className="summary">
                  {richText("Once again, TextAlive was used to author ")}
                  <a
                    href={href(
                      "https://www.youtube.com/watch?v=yCufFSunfLc&list=PL1B4fGaIHgNvGAZyWnPDFo9Lm_yICuduo",
                    )}
                  >
                    {richText("videos")}
                  </a>
                  {richText(" for ")}
                  <a href={href("https://www.crypton.co.jp/miku_eng")}>
                    {richText("Hatsune Miku")}
                  </a>
                  {richText(".")}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{richText("2/10/2018")}</div>
                <div className="summary">
                  {richText(
                    "TextAlive was used to author videos for a live performance by a renowned virtual singer, ",
                  )}
                  <a href={href("https://www.crypton.co.jp/miku_eng")}>
                    {richText("Hatsune Miku")}
                  </a>
                  {richText(". The live performance was recorded and ")}
                  <a href={href("https://www.youtube.com/watch?v=0USE9AMu8i8")}>
                    {richText("its exerpt")}
                  </a>
                  {richText(" as well as ")}
                  <a
                    href={href(
                      "https://www.youtube.com/watch?v=0assSnUjkLA&list=PL1B4fGaIHgNvGAZyWnPDFo9Lm_yICuduo",
                    )}
                  >
                    {richText("the rendered full HD 60fps video")}
                  </a>
                  {richText(
                    " for &quot;Round off the Square Earth&quot; are available on YouTube.",
                  )}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{richText("10/16/2016")}</div>
                <div className="summary">
                  {richText(
                    "TextAlive was used to author videos for a live performance by a Japanese idol group, ",
                  )}
                  <a
                    href={href(
                      "https://jpop.fandom.com/wiki/Bellring_Shoujo_Heart",
                    )}
                  >
                    {richText("Bellring Shoujo Heart")}
                  </a>
                  {richText(
                    ". The rendered full HD 60fps videos are available on YouTube (",
                  )}
                  <a
                    href={href(
                      "https://www.youtube.com/watch?v=dE8Lzh0CNSw&list=PL1B4fGaIHgNvGAZyWnPDFo9Lm_yICuduo",
                    )}
                  >
                    {richText("asthma")}
                  </a>
                  {richText(", ")}
                  <a
                    href={href(
                      "https://www.youtube.com/watch?v=5Yb-LBBqxnM&list=PL1B4fGaIHgNvGAZyWnPDFo9Lm_yICuduo",
                    )}
                  >
                    {richText("ROOM 24-7")}
                  </a>
                  {richText(").")}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{richText("1/25/2016")}</div>
                <div className="summary">
                  <a href={href("https://textalive.jp")}>
                    {richText(
                      "TextAlive has been publicly available as a web service",
                    )}
                  </a>
                  {richText(" after ")}
                  <a
                    href={href(
                      "httsp://www.aist.go.jp/aist_e/list/latest_research/2015/20160125/en20160125.html",
                    )}
                  >
                    {richText("the press release")}
                  </a>
                  {richText(". Please have it a try!")}
                </div>
              </div>
            </div>
          </div>
          <p>
            {richText("For more detailed news, please refer to ")}
            <a href={href("https://textalive.jp/events")}>
              {richText("the Japanese event page")}
            </a>
            {richText(".")}
          </p>
        </div>
      </>
    );
  }
  function renderAbstract(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <div className="content">{plainText(en ? "Abstract" : "概要")}</div>
        </h2>
        <div className="ui basic segment">
          <p>
            {richText(
              "This paper presents TextAlive, a graphical tool that allows interactive editing of kinetic typography videos in which lyrics or transcripts are animated in synchrony with the corresponding music or speech.",
            )}
          </p>
          <p>
            {richText(
              "While existing systems have allowed the designer and casual user to create animations, most of them do not take into account synchronization with audio signals. They allow predefined motions to be applied to objects and parameters to be tweaked, but it is usually impossible to extend the predefined set of motion algorithms within these systems.",
            )}
          </p>
          <p>
            {richText(
              "We therefore propose an integrated design environment featuring",
            )}
          </p>
          <ul>
            <li>
              {richText(
                "GUIs that designers can use to create and edit animations synchronized with audio signals,",
              )}
            </li>
            <li>
              {richText(
                "integrated tools that programmers can use to implement animation algorithms, and",
              )}
            </li>
            <li>
              {richText(
                "a framework for bridging the interfaces for designers and programmers.",
              )}
            </li>
          </ul>
          <p>
            {richText(
              "A preliminary user study with designers, programmers, and casual users demonstrated its capability in authoring various kinetic typography videos.",
            )}
          </p>
          <div className="ui message">
            {richText("The system was made publicly available as ")}
            <a href={href("https://textalive.jp")}>{richText("TextAlive")}</a>
            {richText(", a web service for authoring lyric videos, with ")}
            <a
              href={href(
                "https://www.aist.go.jp/aist_e/list/latest_research/2015/20160125/en20160125.html",
              )}
            >
              {richText("a press release")}
            </a>
            {richText(" on 9/8/2015. Latest information can be found on ")}
            <a href={href("https://textalive.jp/events")}>
              {richText("the TextAlive event page")}
            </a>
            {richText(" or ")}
            <a
              href={href(
                "https://scrapbox.io/textalive/TextAlive%E3%81%AE%E9%96%8B%E7%99%BA%E5%B1%A5%E6%AD%B4",
              )}
            >
              {richText("its update history")}
            </a>
            {richText(".")}
          </div>
          <div className="ui message">
            {richText("On 9/18/2020, ")}
            <a href={href("https://developer.textalive.jp")}>
              {richText(
                'TextAlive App <abbr title="Application Programming Interface">API</abbr>',
              )}
            </a>
            {richText(
              " was released for developers. It allows the development of interactive lyric-driven visual media that we name &quot;lyric apps.&quot;",
            )}
            {richText("\n")}
            {richText(
              "For more information, please refer to the follow-up page on ",
            )}
            <a href={href(`${basePath}lyric-app-framework`)}>
              {richText("Lyric App Framework")}
            </a>
            {richText(".")}
          </div>
        </div>
      </>
    );
  }
  function renderPresentations(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          {plainText(en ? "Presentation materials" : "発表内容")}
        </h2>
        <div className="ui basic segment">
          <div className="ui stackable two columns grid">
            <div className="column">
              <h3 className="ui header">{richText("CHI 2015 Fast-forward")}</h3>
              {content.renderEmbedYoutube(
                "//www.youtube.com/embed/lOdt-pf5U8Q",
              )}
              <div className="caption">
                <div className="ui horizontal list">
                  <div className="item">
                    <a href={href("//www.youtube.com/watch?v=lOdt-pf5U8Q")}>
                      <i className="youtube icon"></i>
                      {richText("Fast-forward")}
                    </a>
                  </div>
                  <div className="item">
                    <a href={href("//www.youtube.com/watch?v=ofczPQZaWMk")}>
                      <i className="youtube icon"></i>
                      {richText("Full version")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              {(() => {
                const children153: ReactNode[] = [];
                children153.push(
                  <>
                    <h3 className="ui header">
                      {richText("CHI 2015 ")}
                      {plainText(en ? "Slides" : "発表スライド")}
                    </h3>
                  </>,
                );
                children153.push(
                  <>
                    <div
                      className="ui embed"
                      data-url={
                        publicationsTable[p.publication].entryTags.slides
                      }
                      data-placeholder={`${rootPath}images/background-eee.png`}
                      data-icon={"video play outline"}
                    ></div>
                  </>,
                );
                children153.push(
                  <>
                    <div className="caption">
                      <div className="ui horizontal list">
                        <div className="item">
                          <a
                            href={href(
                              publicationsTable[p.publication].entryTags.slides,
                            )}
                          >
                            <i className="download icon"></i>
                            {plainText(en ? "Download" : "ダウンロード")}
                          </a>
                        </div>
                      </div>
                    </div>
                  </>,
                );
                if (!en) {
                  children153.push(
                    <>
                      <p className="caption">
                        {richText("日本語の発表スライドは")}
                        <a href={href("#publications")}>
                          <i className="book icon"></i>
                          {richText("発表文献")}
                        </a>
                        {richText("で日本語文献の ")}
                        <i className="sidebar fitted icon"></i>
                        {richText(" をクリックすると閲覧できます。")}
                      </p>
                    </>,
                  );
                }
                return keyed(children153);
              })()}
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderExamples(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          {plainText(en ? "Example videos" : "作例")}
        </h2>
        <div className="ui basic segment">
          <div className="ui stackable two columns grid">
            <div className="column">
              {(() => {
                const children154: ReactNode[] = [];
                children154.push(
                  <>
                    <h3 className="ui header">
                      {plainText(en ? "TextAlive Online" : "Web版")}
                      <div className="ui tiny label">
                        <i className="calendar icon"></i>
                        <span>{richText("2015-")}</span>
                      </div>
                    </h3>
                  </>,
                );
                children154.push(
                  <>
                    {content.renderEmbedYoutube(
                      "https://www.youtube.com/embed/videoseries?list=PL1B4fGaIHgNvGAZyWnPDFo9Lm_yICuduo",
                    )}
                  </>,
                );
                if (!en) {
                  children154.push(
                    <>
                      <p className="caption">
                        {richText(
                          "Web版のTextAliveは現在も開発が続けられています。この作例は、初音ミクやアイドルのライブなどで利用されたものです。 ",
                        )}
                        <a href={href("https://textalive.jp")}>
                          {richText("textalive.jp")}
                        </a>
                        {richText(
                          " にアクセスすれば、誰でも動画を制作できます。",
                        )}
                      </p>
                    </>,
                  );
                }
                return keyed(children154);
              })()}
            </div>
            <div className="column">
              {(() => {
                const children155: ReactNode[] = [];
                children155.push(
                  <>
                    <h3 className="ui header">
                      {plainText(en ? "TextAlive Desktop" : "デスクトップ版")}
                      <div className="ui tiny label">
                        <i className="calendar icon"></i>
                        <span>{richText("2014-2015")}</span>
                      </div>
                    </h3>
                  </>,
                );
                children155.push(
                  <>
                    {content.renderEmbedYoutube(
                      "https://www.youtube.com/embed/ofczPQZaWMk",
                    )}
                  </>,
                );
                if (!en) {
                  children155.push(
                    <>
                      <p className="caption">
                        {richText(
                          "デスクトップ版のTextAliveは研究用プロトタイプとして開発されました。この作例は、プログラマや音楽動画制作者の方々を対象としたユーザスタディなどで制作されたものです。",
                        )}
                      </p>
                    </>,
                  );
                }
                return keyed(children155);
              })()}
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
            {plainText(en ? "Relevant projects" : "関連プロジェクト")}
          </div>
        </h2>
        <div className="ui basic segment">
          <div className="ui segment">
            <div className="ui divided items projects">
              {content.renderProjectItem(projectsTable["lyric-app-framework"])}
              {content.renderProjectItem(
                projectsTable["creativity-support-environments"],
              )}
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
        mainHero={<>{content.renderProjectHero("textalive")}</>}
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
                <a className="item" href={href("#abstract")}>
                  <i className="right triangle icon"></i>
                  <div className="content">
                    {plainText(en ? "Abstract" : "概要")}
                  </div>
                </a>
                <a className="item" href={href("#presentations")}>
                  <i className="right triangle icon"></i>
                  <div className="content">
                    {plainText(en ? "Presentations" : "発表内容")}
                  </div>
                </a>
                <a className="item" href={href("#examples")}>
                  <i className="right triangle icon"></i>
                  <div className="content">
                    {plainText(en ? "Example videos" : "作例")}
                  </div>
                </a>
                <a className="item" href={href("#publications")}>
                  <i className="right triangle icon"></i>
                  <div className="content">
                    {plainText(en ? "Publications" : "発表文献")}
                  </div>
                </a>
                <a className="item" href={href("#further-readings")}>
                  <i className="right triangle icon"></i>
                  <div className="content">
                    {plainText(en ? "Relevant projects" : "関連プロジェクト")}
                  </div>
                </a>
              </div>
            </div>
          </>
        }
      >
        <div className="with-rail">
          <div className="right-rail">
            <section id={attribute("news")}>{renderNews()}</section>
          </div>
          <div className="left-content">
            <section id={attribute("abstract")}>{renderAbstract()}</section>
            <div className="ui basic right aligned segment">
              <a className="ui primary button" href={href("//textalive.jp")}>
                <i className="external icon"></i>
                {plainText(en ? "Service Website" : "Webサイトへ")}
              </a>
            </div>
            <div className="ui hidden divider"></div>
            <section id={attribute("presentations")}>
              {renderPresentations()}
            </section>
          </div>
          <div className="ui hidden divider"></div>
          <section id={attribute("examples")}>{renderExamples()}</section>
        </div>
        <div className="ui hidden divider"></div>
        {content.renderProjectPublications(
          "textalive",
          "chi2015-kato-textalive",
        )}
        <div className="ui hidden divider"></div>
        <section id={attribute("further-readings")}>
          {renderFurtherReadings()}
        </section>
      </SiteLayout>
    </>
  );
}
