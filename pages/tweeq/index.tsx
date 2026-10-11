import {
  ProjectHero,
  ProjectPublications,
} from "@/site/components/ContentComponents";

import { getSiteData } from "@/site/data";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from tweeq/index.pug; edit this TSX source directly. */
export default function Page() {
  const data = getSiteData();
  const { projectsTable, moment, rootPath } = data;
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

  p = projectsTable["tweeq"];
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

  return (
    <>
      <SiteLayout
        context={context}
        mainHero={
          <>
            <ProjectHero project={"tweeq"} />
          </>
        }
        postFooter={
          <>
            <a className="ui circular icon popup-menu large grey hidden button">
              <i className="sidebar icon"></i>
            </a>
            <div className="ui hidden popup-menu popup">
              <div className="ui divided list">
                <a className="item" href={"#body"}>
                  <i className="chevron circle up icon"></i>
                  <div className="content">{en ? "Top" : "トップ"}</div>
                </a>
                <a className="item" href={"#abstract"}>
                  <i className="right triangle icon"></i>
                  <div className="content">{en ? "Abstract" : "概要"}</div>
                </a>
                <a className="item" href={"#implementation"}>
                  <i className="right triangle icon"></i>
                  <div className="content">
                    {en ? "Reference implementation" : "リファレンス実装"}
                  </div>
                </a>
              </div>
            </div>
          </>
        }
      >
        <section id={"abstract"}>
          <h2 className="ui header">
            <div className="content">{en ? "Abstract" : "概要"}</div>
          </h2>
          <div className="ui basic segment">
            <p>
              {
                'Professionals in the creative industry rely on digital content authoring tools that provide graphical user interface (GUI) widgets for tuning primitive values, such as numeric sliders, rotary knobs, and color pickers. Despite their prevalence, GUI studies have sometimes been considered "done" in the context of HCI, and users\' frustrations with these widgets might have gone unheard.'
              }
            </p>
            <p>
              {
                "We sampled such widgets from popular production software and analyzed their interaction design, identifying three core design principles:"
              }
            </p>
            <ul>
              <li>
                {
                  "support diverse input modalities to match users' nuanced control strategies,"
                }
              </li>
              <li>
                {
                  "prioritize high-speed and accurate interaction for skilled users, and"
                }
              </li>
              <li>
                {
                  "minimize visual footprint to preserve the creative workspace."
                }
              </li>
            </ul>
            <p>
              {
                "We then provide reference implementations of GUI widgets that follow these guidelines, named "
              }
              <i>{"Tweeq"}</i>
              {
                ". Developed in parallel with the first author's animation projects, these widgets allow parameter tuning with fewer clicks, provide continuous visual feedback through overlays, and facilitate gestural and keyboard inputs that do not require constant visual attention."
              }
            </p>
            <p>
              {"To evaluate "}
              <i>{"Tweeq"}</i>
              {
                ", we implemented example applications and conducted an informal expert user study, which revealed generally positive reactions and indicated that the proposed design principles may offer a useful direction for GUI development in creative software."
              }
            </p>
          </div>
          <div className="ui basic segment">
            <p>
              <img
                className="ui fluid image"
                src={`${rootPath}tweeq/tweeq.png`}
              />
            </p>
            <p className="caption">
              <i>{"Tweeq"}</i>
              {
                ", a set of GUI widgets proposed in this paper for creative software. "
              }
              <strong>{"(a)"}</strong>

              {" Components of "}
              <i>{"Tweeq"}</i>
              {". "}

              <strong>{"(b)"}</strong>
              {" Color input and its overlay UI. "}
              <strong>{"(c)"}</strong>
              {" Timecode input with overlay UI. "}
              <strong>{"(d)"}</strong>
              {" Simultaneous parameter tuning on angle inputs."}
            </p>
            <p>
              {
                "*Note that Baku Hashimoto carried out this work partly in the capacity of a collaborative researcher at AIST, as reflected in the paper author's affiliation, and partly as an independent visual artist."
              }
            </p>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={"implementation"}>
          <h2>
            <i className="github icon"></i>
            {en ? "Reference implementation" : "リファレンス実装"}
          </h2>
          <div className="ui basic segment">
            <p>
              {" "}
              {"The reference implementation of the design principles, "}
              <i>{"Tweeq"}</i>
              {
                ", developed with Vue.js and TypeScript, is available as an open-source project on "
              }
              <a href={"//github.com/baku89/tweeq"}>
                <i className="github icon"></i>
                {"GitHub"}
              </a>
              {"."}
            </p>
          </div>
          <div className="ui basic center aligned segment">
            <div className="ui huge buttons">
              <a
                className="ui primary button"
                href={"//github.com/baku89/tweeq"}
              >
                {en ? "Code" : "ソースコード"}
              </a>
              <div className="ui divider"></div>
              <a className="ui button" href={"//baku89.github.io/tweeq"}>
                {en ? "Documents" : "デモ"}
              </a>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={"revision"}>
          <h2>
            <i className="announcement icon"></i>
            {en ? "Revision history" : "更新履歴"}
          </h2>
          <div className="ui basic segment">
            <div className="ui divided feed">
              <div className="event">
                <div className="content">
                  <div className="date">{"8/1/2025"}</div>
                  <div className="summary">
                    {"Upload the initial revision."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <ProjectPublications
          project={"tweeq"}
          majorPublication={"uist2025-hashimoto-tweeq"}
        />
      </SiteLayout>
    </>
  );
}
