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

/** React page migrated from tweeq/index.pug; edit this TSX source directly. */
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
  const content = createContentComponents(context);

  return (
    <>
      <SiteLayout
        context={context}
        mainHero={<>{content.renderProjectHero("tweeq")}</>}
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
                <a className="item" href={href("#implementation")}>
                  <i className="right triangle icon"></i>
                  <div className="content">
                    {plainText(
                      en ? "Reference implementation" : "リファレンス実装",
                    )}
                  </div>
                </a>
              </div>
            </div>
          </>
        }
      >
        <section id={attribute("abstract")}>
          <h2 className="ui header">
            <div className="content">{plainText(en ? "Abstract" : "概要")}</div>
          </h2>
          <div className="ui basic segment">
            <p>
              {richText(
                'Professionals in the creative industry rely on digital content authoring tools that provide graphical user interface (GUI) widgets for tuning primitive values, such as numeric sliders, rotary knobs, and color pickers. Despite their prevalence, GUI studies have sometimes been considered "done" in the context of HCI, and users\' frustrations with these widgets might have gone unheard.',
              )}
            </p>
            <p>
              {richText(
                "We sampled such widgets from popular production software and analyzed their interaction design, identifying three core design principles:",
              )}
            </p>
            <ul>
              <li>
                {richText(
                  "support diverse input modalities to match users' nuanced control strategies,",
                )}
              </li>
              <li>
                {richText(
                  "prioritize high-speed and accurate interaction for skilled users, and",
                )}
              </li>
              <li>
                {richText(
                  "minimize visual footprint to preserve the creative workspace.",
                )}
              </li>
            </ul>
            <p>
              {richText(
                "We then provide reference implementations of GUI widgets that follow these guidelines, named <i>Tweeq</i>. Developed in parallel with the first author's animation projects, these widgets allow parameter tuning with fewer clicks, provide continuous visual feedback through overlays, and facilitate gestural and keyboard inputs that do not require constant visual attention.",
              )}
            </p>
            <p>
              {richText(
                "To evaluate <i>Tweeq</i>, we implemented example applications and conducted an informal expert user study, which revealed generally positive reactions and indicated that the proposed design principles may offer a useful direction for GUI development in creative software.",
              )}
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
              <i>{richText("Tweeq")}</i>
              {richText(
                ", a set of GUI widgets proposed in this paper for creative software. ",
              )}
              <strong>{richText("(a)")}</strong>
              {richText(" Components of <i>Tweeq</i>. ")}
              <strong>{richText("(b)")}</strong>
              {richText(" Color input and its overlay UI. ")}
              <strong>{richText("(c)")}</strong>
              {richText(" Timecode input with overlay UI. ")}
              <strong>{richText("(d)")}</strong>
              {richText(" Simultaneous parameter tuning on angle inputs.")}
            </p>
            <p>
              {richText(
                "*Note that Baku Hashimoto carried out this work partly in the capacity of a collaborative researcher at AIST, as reflected in the paper author's affiliation, and partly as an independent visual artist.",
              )}
            </p>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={attribute("implementation")}>
          <h2>
            <i className="github icon"></i>
            {plainText(en ? "Reference implementation" : "リファレンス実装")}
          </h2>
          <div className="ui basic segment">
            <p>
              {richText(" ")}
              {richText(
                "The reference implementation of the design principles, <i>Tweeq</i>, developed with Vue.js and TypeScript, is available as an open-source project on ",
              )}
              <a href={href("//github.com/baku89/tweeq")}>
                <i className="github icon"></i>
                {richText("GitHub")}
              </a>
              {richText(".")}
            </p>
          </div>
          <div className="ui basic center aligned segment">
            <div className="ui huge buttons">
              <a
                className="ui primary button"
                href={href("//github.com/baku89/tweeq")}
              >
                {plainText(en ? "Code" : "ソースコード")}
              </a>
              <div className="ui divider"></div>
              <a className="ui button" href={href("//baku89.github.io/tweeq")}>
                {plainText(en ? "Documents" : "デモ")}
              </a>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={attribute("revision")}>
          <h2>
            <i className="announcement icon"></i>
            {plainText(en ? "Revision history" : "更新履歴")}
          </h2>
          <div className="ui basic segment">
            <div className="ui divided feed">
              <div className="event">
                <div className="content">
                  <div className="date">{richText("8/1/2025")}</div>
                  <div className="summary">
                    {richText("Upload the initial revision.")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        {content.renderProjectPublications("tweeq", "uist2025-hashimoto-tweeq")}
      </SiteLayout>
    </>
  );
}
