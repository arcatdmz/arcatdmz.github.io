import {
  EmbedYoutube,
  ProjectHero,
  ProjectItem,
  ProjectPublications,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import type { ReactNode } from "react";

import { keyed, href } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from songle-sync/index.pug; edit this TSX source directly. */
export default function Page() {
  const data = getSiteData();
  const { projectsTable, moment, rootPath, protocol, domain } = data;
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
  function renderAbstract(): ReactNode {
    return (
      <>
        <h2 className="ui header">{en ? "Abstract" : "概要"}</h2>
        <div className="ui basic segment">
          <p>
            <img
              className="ui image"
              src={"/songle-sync/mm2018-songlesync-demo.jpg"}
            />
          </p>
          <p>
            {
              "This paper presents Songle Sync, a web-based platform on which hundreds of Internet-connected devices — including smartphones, computers, and other physical computing devices — can be controlled to synchronize with music playback. It uses music-understanding technologies to dynamically synthesize music-driven multimedia performances from a musical piece of choice."
            }
          </p>
          <p>
            {
              "To simultaneously control hundreds of devices, a conventional architecture keeps always-on connections between them. However, it does not scale and suffers from latency and jitter issues when there are various devices with potentially unstable networks. We address this with a novel autonomous control architecture in which each device is notified of forthcoming musical events (e.g., beats and chorus sections) to automatically drive various changes in multimedia performances. Moreover, we provide a development kit of an event-driven multimedia framework for JavaScript, example programs, and an interactive tutorial."
            }
          </p>
          <p>
            {
              "To evaluate the platform, we compared latencies, jitters, and amounts of network traffic between ours and the conventional architecture. To examine use cases in the wild, we deployed the platform to drive over a hundred of a variety of devices. We also developed a web browser-based application for a multimedia performance with music playback. It provided audiences of hundreds with a bring-your-own-device experience of synchronized animations on smartphones. In addition, the development kit was used in a two-day hackathon."
            }
          </p>
          <p>
            {
              "We report lessons learned from these studies and discuss the future of the Internet of Musical Things."
            }
          </p>
        </div>
        <div className="ui basic center aligned segment">
          <p>
            <a
              className="ui labeled icon massive green button"
              href={"https://tutorial.songle.jp/sync?lang=en"}
            >
              <i className="external icon"></i>
              {" Try out Songle Sync"}
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
        <h2 className="ui header">
          {en ? "Presentation materials" : "発表内容"}
        </h2>
        <div className="ui basic segment">
          <div className="ui stackable two columns grid">
            <div className="column">
              <h3 className="ui header">
                {"ACM Multimedia 2018 "}
                {en ? "Demo Video" : "デモ動画"}
              </h3>
              <EmbedYoutube src={"//www.youtube.com/embed/dErV9oZw_uQ"} />
              <div className="caption">
                <div className="ui horizontal list">
                  <div className="item">
                    <a href={"//www.youtube.com/watch?v=dErV9oZw_uQ"}>
                      <i className="youtube icon"></i>
                      {"YouTube"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <h3 className="ui header">
                {"ACM Multimedia 2018 "}
                {en ? "Slides" : "発表スライド"}
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
                    <SiteLink href={href(slideUrl)}>
                      <i className="download icon"></i>
                      {en ? "Download" : "ダウンロード"}
                    </SiteLink>
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
          <div className="content">
            {en ? "Related projects" : "関連プロジェクト"}
          </div>
        </h2>
        <div className="ui basic segment">
          {(() => {
            const children152: ReactNode[] = [];
            children152.push(
              <>
                <ul>
                  <li>
                    {"Automatic music analysis of Songle Sync relies on "}
                    <a href={"https://songle.jp"}>{"Songle"}</a>
                    {
                      " whose research contributions have been published in multiple academic papers."
                    }
                    {"\n"}
                    {" For more details, "}
                    <a
                      href={"https://staff.aist.go.jp/m.goto/publications.html"}
                    >
                      {
                        'search for the keyword "Songle" in Dr. Goto\'s publications'
                      }
                    </a>
                    {"."}
                  </li>
                  <li>
                    {"Songle Sync has been released as part of "}
                    <a href={"https://api.songle.jp/sync"}>{"Songle API"}</a>
                    {"."}
                  </li>
                  <li>
                    <a href={"https://tutorial.songle.jp/sync"}>
                      {"Interactive coding tutorials for Songle Sync"}
                    </a>
                    {" are implemented based on the DeployGround framework."}
                  </li>
                </ul>
              </>,
            );
            dg = projectsTable["deployground"];
            children152.push(
              <>
                <div className="ui divided items projects">
                  <ProjectItem p={dg} />
                </div>
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
            <ProjectHero
              project={"songle-sync"}
              additionalLabels={null}
              heroImage={"https://tutorial.songle.jp/images/background.jpg"}
            />
          </>
        }
      >
        <div className="ui positive message">
          <strong>{"Collaborative project:"}</strong>
          {
            " While I am credited as the first author of the ACM Multimedia 2018 paper, this project is the result of the collaborative effort in "
          }
          <a href={"//staff.aist.go.jp/m.goto/MIG/index-j.html"}>
            {"Media Interaction Group"}
          </a>
          {". Please see "}
          <a href={"//api.songle.jp/sync"}>{"the official project page"}</a>
          {" for the complete list of the contributors."}
        </div>
        <div className="ui hidden divider"></div>
        <section id={"abstract"}>{renderAbstract()}</section>
        <section id={"presentations"}>{renderPresentations()}</section>
        <section id={"related-projects"}>{renderRelatedProjects()}</section>
        <ProjectPublications
          project={"songle-sync"}
          majorPublication={"mm2018-kato-songlesync"}
        />
      </SiteLayout>
    </>
  );
}
