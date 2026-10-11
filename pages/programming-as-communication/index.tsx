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

/** React page migrated from programming-as-communication/index.pug; edit this TSX source directly. */
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

  p = projectsTable["programming-as-communication"];
  title = "Programming as Communication";
  description =
    "Throughout this work, we investigate how to make programming activities more inclusive and collaborative, involving people with diverse technical backgrounds. A programming environment does not need to be only for programmers. We consider that it should instead be designed for users with diverse technical backgrounds.";
  imageUrl = `${protocol}://${domain}${rootPath}images/panels/programming-as-communication.png`;
  me = "programming-as-communication/";
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
        <h2 className="ui header">{plainText(en ? "Summary" : "概要")}</h2>
        <div className="ui basic segment">
          <p>
            {richText(
              "Computers have become ubiquitous in our life and work, and the way they are programmed needs ",
            )}
            <a href={href(`${basePath}programming-with-examples`)}>
              {richText("fundamental improvements")}
            </a>
            {richText(
              ". The prior effort often aims at improving programming experience for people with specific technical backgrounds (e.g., ",
            )}
            <a href={href(`${basePath}live-programming`)}>
              {richText("programmers")}
            </a>
            {richText(", end-users, data scientists), respectively.")}
          </p>
          <p>
            {richText(
              "In contrast, throughout this work, we investigate how to make programming activities more inclusive and collaborative, involving people with diverse technical backgrounds. &quot;A programming environment&quot; does not need to be only for programmers. We consider that it should instead be designed for users with diverse technical backgrounds.",
            )}
          </p>
          <p>
            {richText(
              "Such inclusive design enables the users to communicate with each other through programming-related activities, delivers benefits of programming to all of them, and would give empowerment to them.",
            )}
          </p>
        </div>
      </>
    );
  }
  function renderPresentation(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          {plainText(en ? "Presentation materials" : "発表資料")}
        </h2>
        <div className="ui basic segment">
          <div className="ui stackable two columns grid">
            <div className="column">
              <h3 className="ui header">
                {richText(
                  '<abbr title="Convivial Computing Salon 2020">CCS</abbr> ',
                )}
                {plainText(en ? "talk" : "講演動画")}
              </h3>
              {content.renderEmbedYoutube(
                "//www.youtube.com/embed/qR2MAfRFBIM?cc_lang_pref=en&cc_load_policy=1",
              )}
              <div className="caption">
                <div className="ui horizontal list">
                  <div className="item">
                    <a
                      href={href(
                        "//www.youtube.com/watch?v=qR2MAfRFBIM&cc_lang_pref=en&cc_load_policy=1",
                      )}
                    >
                      <i className="youtube icon"></i>
                      {richText("YouTube")}
                    </a>
                  </div>
                  <div className="item">
                    <a href={href("//vimeo.com/416361135")}>
                      <i className="vimeo icon"></i>
                      {richText("Vimeo")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <h3 className="ui header">
                {richText(
                  '<abbr title="Convivial Computing Salon 2020">CCS</abbr> ',
                )}
                {plainText(en ? "slides" : "発表スライド")}
              </h3>
              <div
                className="ui embed"
                data-url={publicationsTable[p.publication].entryTags.slides}
                data-placeholder={`${rootPath}programming-as-communication/ccs2020/ccs2020-kato-slides00.jpg`}
                data-icon={"video play outline"}
              ></div>
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
            </div>
          </div>
          <div className="ui divider"></div>
          <div className="ui list">
            <div className="item">
              {richText(
                'YouTube version has calibrated volume and subtitles while the Vimeo version is more extended and has a critique by <a href="https://tcher.tech/">Philip Tchernavskij</a> and Q&amp;A session.',
              )}
            </div>
            <div className="item">
              {richText(
                'For more details on the salon, please refer to <a href="https://2020.programming-conference.org/home/salon-2020">its website</a>.',
              )}
            </div>
            <div className="item">
              {richText(
                'The paper can be downloaded in the <a href="#publications">Publications</a> section at the bottom of this page.',
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderTechnicalEffort(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="laptop code icon"></i>
          <div className="content">
            {plainText(en ? "Technical environment design" : "技術的環境設計")}
          </div>
        </h2>
        <div className="ui basic segment">
          <img
            className="ui fluid bordered image"
            src={`${rootPath}programming-as-communication/runtime-env-as-programming-env.png`}
          />
          <div className="caption">
            <p>
              {richText(
                "We can design a runtime environment that is the same as the programming environment except for its dedicated graphical user interfaces for people who might not have prior knowledge of programming.",
              )}
            </p>
            <p>
              {richText(
                "The following projects are concrete examples of such technical programming environment-design that realize &quot;Programming as Communication.&quot; To see them in action, ",
              )}
              <a href={href(`${basePath}f3js`)}>{richText("f3.js")}</a>
              {richText(" implements both of them and is available at ")}
              <a href={href("https://f3js.org")}>
                {richText("https://f3js.org")}
              </a>
              {richText(".")}
            </p>
          </div>
          <div className="ui segment">
            <div className="ui divided items projects">
              {(() => {
                const children131: ReactNode[] = [];
                let technicalProjects = [
                  "user-generated-variables",
                  "live-tuning",
                ].map((key) => projectsTable[key]);
                for (const p of technicalProjects) {
                  if (
                    p.category === "concept" ||
                    p.category === "committee" ||
                    p.category === "private"
                  )
                    continue;
                  if (
                    !Array.isArray(p.tags) ||
                    p.tags.indexOf("programming-as-communication") < 0
                  )
                    continue;
                  children131.push(<>{content.renderProjectItem(p)}</>);
                }
                return keyed(children131);
              })()}
            </div>
          </div>
        </div>
      </>
    );
  }
  function renderSocialEffort(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="user friends icon"></i>
          <div className="content">
            {plainText(en ? "Social environment design" : "社会的環境設計")}
          </div>
        </h2>
        <div className="ui basic segment">
          <img
            className="ui fluid bordered image"
            src={`${rootPath}programming-as-communication/evangelist-in-env.png`}
          />
          <div className="caption">
            <p>
              {richText(
                "We can design a programming environment consisting of an evangelist and computational artifacts.",
              )}
            </p>
            <p>
              {richText("In the ongoing ")}
              <a
                href={href(
                  "https://www.jamesdysonaward.org/en-GB/2016/project/oton-glass/",
                )}
              >
                {richText("OTON GLASS")}
              </a>
              {richText(
                ' project, we have been implementing a programming environment centered on a visually impaired person, or a &quot;maker,&quot; who wants to build customized smart glasses. The programming environment consists of not only computational artifacts (a toolkit consisting of hardware components and software <abbr title="Application Programming Interfaces">APIs</abbr>) but also an evangelist who serves as an organic aid to utilize the toolkit.',
              )}
            </p>
          </div>
        </div>
      </>
    );
  }
  function renderRevision(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          <i className="announcement icon"></i>
          {plainText(en ? "Revision history" : "更新履歴")}
        </h2>
        <div className="ui basic segment">
          <div className="ui divided feed">
            <div className="event">
              <div className="content">
                <div className="date">{richText("5/15/2020")}</div>
                <div className="summary">
                  {richText("Add preprint of the paper.")}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{richText("5/9/2020")}</div>
                <div className="summary">
                  {richText("Add presentation recording and slides.")}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{richText("4/1/2020")}</div>
                <div className="summary">
                  {richText("Upload the initial revision.")}
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
      <SiteLayout context={context}>
        {content.renderProjectHeader("programming-as-communication")}
        <div className="ui hidden divider"></div>
        <section id={attribute("abstract")}>{renderAbstract()}</section>
        <div className="ui hidden divider"></div>
        <section id={attribute("presentation")}>{renderPresentation()}</section>
        <div className="ui hidden divider"></div>
        <section id={attribute("technical-effort")}>
          {renderTechnicalEffort()}
        </section>
        <div className="ui hidden divider"></div>
        <section id={attribute("social-effort")}>
          {renderSocialEffort()}
        </section>
        <div className="ui hidden divider"></div>
        {content.renderProjectPublications(p.project, p.publication)}
        <div className="ui hidden divider"></div>
        <section id={attribute("revision")}>{renderRevision()}</section>
      </SiteLayout>
    </>
  );
}
