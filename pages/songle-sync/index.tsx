import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import { classNames, style, text as plainText, keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from songle-sync/index.pug; edit this TSX source directly. */
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

  let dg: any;
  p = projectsTable["songle-sync"];
  title = p.getTitle(lang);
  me = p.project + "/";
  const slideUrl = `${protocol}://${domain}${rootPath}publications/mm2018-kato-songlesync-slides.pdf`;
  const slideImagePath = `${rootPath}songle-sync/mm2018-kato-songlesync-slides.jpg`;
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
  function renderAbstract(): ReactNode {
    return (
      <>
        <h2 className="ui header">{plainText(en ? "Abstract" : "概要")}</h2>
        <div className="ui basic segment">
          <p>
            <img className="ui image" src={"/songle-sync/mm2018-songlesync-demo.jpg"} />
          </p>
          <p>
            {richText(
              "This paper presents Songle Sync, a web-based platform on which hundreds of Internet-connected devices — including smartphones, computers, and other physical computing devices — can be controlled to synchronize with music playback. It uses music-understanding technologies to dynamically synthesize music-driven multimedia performances from a musical piece of choice.",
            )}
          </p>
          <p>
            {richText(
              "To simultaneously control hundreds of devices, a conventional architecture keeps always-on connections between them. However, it does not scale and suffers from latency and jitter issues when there are various devices with potentially unstable networks. We address this with a novel autonomous control architecture in which each device is notified of forthcoming musical events (e.g., beats and chorus sections) to automatically drive various changes in multimedia performances. Moreover, we provide a development kit of an event-driven multimedia framework for JavaScript, example programs, and an interactive tutorial.",
            )}
          </p>
          <p>
            {richText(
              "To evaluate the platform, we compared latencies, jitters, and amounts of network traffic between ours and the conventional architecture. To examine use cases in the wild, we deployed the platform to drive over a hundred of a variety of devices. We also developed a web browser-based application for a multimedia performance with music playback. It provided audiences of hundreds with a bring-your-own-device experience of synchronized animations on smartphones. In addition, the development kit was used in a two-day hackathon.",
            )}
          </p>
          <p>
            {richText(
              "We report lessons learned from these studies and discuss the future of the Internet of Musical Things.",
            )}
          </p>
        </div>
        <div className="ui basic center aligned segment">
          <p>
            <a
              className="ui labeled icon massive green button"
              href={href("https://tutorial.songle.jp/sync?lang=en")}
            >
              <i className="external icon"></i>
              {richText(" Try out Songle Sync")}
            </a>
          </p>
        </div>
        <div className="ui hidden divider"></div>
      </>
    );
  }
  function renderPresentations(): ReactNode {
    return (
      <>
        <h2 className="ui header">{plainText(en ? "Presentation materials" : "発表内容")}</h2>
        <div className="ui basic segment">
          <div className="ui stackable two columns grid">
            <div className="column">
              <h3 className="ui header">
                {richText("ACM Multimedia 2018 ")}
                {plainText(en ? "Demo Video" : "デモ動画")}
              </h3>
              {content.renderEmbedYoutube("//www.youtube.com/embed/dErV9oZw_uQ")}
              <div className="caption">
                <div className="ui horizontal list">
                  <div className="item">
                    <a href={href("//www.youtube.com/watch?v=dErV9oZw_uQ")}>
                      <i className="youtube icon"></i>
                      {richText("YouTube")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <h3 className="ui header">
                {richText("ACM Multimedia 2018 ")}
                {plainText(en ? "Slides" : "発表スライド")}
              </h3>
              <div
                className="ui embed"
                data-url={slideUrl}
                data-placeholder={slideImagePath}
                data-icon={"video play outline"}
              ></div>
              <div className="caption">
                <div className="ui horizontal list">
                  <div className="item">
                    <a href={href(slideUrl)}>
                      <i className="download icon"></i>
                      {plainText(en ? "Download" : "ダウンロード")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ui hidden divider"></div>
      </>
    );
  }
  function renderRelatedProjects(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="lab icon"></i>
          <div className="content">{plainText(en ? "Related projects" : "関連プロジェクト")}</div>
        </h2>
        <div className="ui basic segment">
          {(() => {
            const children152: ReactNode[] = [];
            children152.push(
              <>
                <ul>
                  <li>
                    {richText("Automatic music analysis of Songle Sync relies on ")}
                    <a href={href("https://songle.jp")}>{richText("Songle")}</a>
                    {richText(
                      " whose research contributions have been published in multiple academic papers.",
                    )}
                    {richText("\n")}
                    {richText(" For more details, ")}
                    <a href={href("https://staff.aist.go.jp/m.goto/publications.html")}>
                      {richText(
                        "search for the keyword &quot;Songle&quot; in Dr. Goto's publications",
                      )}
                    </a>
                    {richText(".")}
                  </li>
                  <li>
                    {richText("Songle Sync has been released as part of ")}
                    <a href={href("https://api.songle.jp/sync")}>{richText("Songle API")}</a>
                    {richText(".")}
                  </li>
                  <li>
                    <a href={href("https://tutorial.songle.jp/sync")}>
                      {richText("Interactive coding tutorials for Songle Sync")}
                    </a>
                    {richText(" are implemented based on the DeployGround framework.")}
                  </li>
                </ul>
              </>,
            );
            dg = projectsTable["deployground"];
            children152.push(
              <>
                <div className="ui divided items projects">{content.renderProjectItem(dg)}</div>
              </>,
            );
            return keyed(children152);
          })()}
        </div>
        <div className="ui hidden divider"></div>
      </>
    );
  }
  return (
    <>
      <SiteLayout
        context={context}
        mainHero={
          <>
            {content.renderProjectHero(
              "songle-sync",
              null,
              "https://tutorial.songle.jp/images/background.jpg",
            )}
          </>
        }
      >
        <div className="ui positive message">
          <strong>{richText("Collaborative project:")}</strong>
          {richText(
            " While I am credited as the first author of the ACM Multimedia 2018 paper, this project is the result of the collaborative effort in ",
          )}
          <a href={href("//staff.aist.go.jp/m.goto/MIG/index-j.html")}>
            {richText("Media Interaction Group")}
          </a>
          {richText(". Please see ")}
          <a href={href("//api.songle.jp/sync")}>{richText("the official project page")}</a>
          {richText(" for the complete list of the contributors.")}
        </div>
        <div className="ui hidden divider"></div>
        <section id={attribute("abstract")}>{renderAbstract()}</section>
        <section id={attribute("presentations")}>{renderPresentations()}</section>
        <section id={attribute("related-projects")}>{renderRelatedProjects()}</section>
        {content.renderProjectPublications("songle-sync", "mm2018-kato-songlesync")}
      </SiteLayout>
    </>
  );
}
