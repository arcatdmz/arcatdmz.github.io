import { Embed } from "@/site/components/SiteWidgets";
import { SiteImage } from "@/site/components/SiteImage";
import {
  EmbedYoutube,
  ProjectHeader,
  ProjectItem,
  ProjectPublications,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import type { ReactNode } from "react";

import { keyed, href } from "@/site/rendering";
import { hydratePageData, type PageDataProps, type SiteData } from "@/site/page-data";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from programming-as-communication/index.pug; edit this TSX source directly. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const {
    projectsTable,
    publicationsTable,
    rootPath,
    protocol,
    domain,
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
  function renderAbstract(): ReactNode {
    return (
      <>
        <h2 className="ui header">{en ? "Summary" : "概要"}</h2>
        <div className="ui basic segment">
          <p>
            {
              "Computers have become ubiquitous in our life and work, and the way they are programmed needs "
            }
            <SiteLink href={href(`${basePath}programming-with-examples`)}>
              {"fundamental improvements"}
            </SiteLink>
            {
              ". The prior effort often aims at improving programming experience for people with specific technical backgrounds (e.g., "
            }
            <SiteLink href={href(`${basePath}live-programming`)}>
              {"programmers"}
            </SiteLink>
            {", end-users, data scientists), respectively."}
          </p>
          <p>
            {
              'In contrast, throughout this work, we investigate how to make programming activities more inclusive and collaborative, involving people with diverse technical backgrounds. "A programming environment" does not need to be only for programmers. We consider that it should instead be designed for users with diverse technical backgrounds.'
            }
          </p>
          <p>
            {
              "Such inclusive design enables the users to communicate with each other through programming-related activities, delivers benefits of programming to all of them, and would give empowerment to them."
            }
          </p>
        </div>
      </>
    );
  }
  function renderPresentation(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          {en ? "Presentation materials" : "発表資料"}
        </h2>
        <div className="ui basic segment">
          <div className="ui stackable two columns grid">
            <div className="column">
              <h3 className="ui header">
                <abbr title={"Convivial Computing Salon 2020"}>{"CCS"}</abbr>{" "}
                {en ? "talk" : "講演動画"}
              </h3>
              <EmbedYoutube
                src={
                  "//www.youtube.com/embed/qR2MAfRFBIM?cc_lang_pref=en&cc_load_policy=1"
                }
              />
              <div className="caption">
                <div className="ui horizontal list">
                  <div className="item">
                    <a
                      href={
                        "//www.youtube.com/watch?v=qR2MAfRFBIM&cc_lang_pref=en&cc_load_policy=1"
                      }
                    >
                      <i className="youtube icon"></i>
                      {"YouTube"}
                    </a>
                  </div>
                  <div className="item">
                    <a href={"//vimeo.com/416361135"}>
                      <i className="vimeo icon"></i>
                      {"Vimeo"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <h3 className="ui header">
                <abbr title={"Convivial Computing Salon 2020"}>{"CCS"}</abbr>{" "}
                {en ? "slides" : "発表スライド"}
              </h3>
              <Embed
                className="ui embed"
                data-url={publicationsTable[p.publication].entryTags.slides}
                data-placeholder={`${rootPath}programming-as-communication/ccs2020/ccs2020-kato-slides00.jpg`}
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
            </div>
          </div>
          <div className="ui divider"></div>
          <div className="ui list">
            <div className="item">
              {
                "YouTube version has calibrated volume and subtitles while the Vimeo version is more extended and has a critique by "
              }
              <a href={"https://tcher.tech/"}>{"Philip Tchernavskij"}</a>
              {" and Q&A session."}
            </div>
            <div className="item">
              {"For more details on the salon, please refer to "}
              <a
                href={"https://2020.programming-conference.org/home/salon-2020"}
              >
                {"its website"}
              </a>
              {"."}
            </div>
            <div className="item">
              {"The paper can be downloaded in the "}
              <a href={"#publications"}>{"Publications"}</a>
              {" section at the bottom of this page."}
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
            {en ? "Technical environment design" : "技術的環境設計"}
          </div>
        </h2>
        <div className="ui basic segment">
          <SiteImage
            className="ui fluid bordered image"
            src={`${rootPath}programming-as-communication/runtime-env-as-programming-env.png`}
          />
          <div className="caption">
            <p>
              {
                "We can design a runtime environment that is the same as the programming environment except for its dedicated graphical user interfaces for people who might not have prior knowledge of programming."
              }
            </p>
            <p>
              {
                'The following projects are concrete examples of such technical programming environment-design that realize "Programming as Communication." To see them in action, '
              }
              <SiteLink href={href(`${basePath}f3js`)}>{"f3.js"}</SiteLink>
              {" implements both of them and is available at "}
              <a href={"https://f3js.org"}>{"https://f3js.org"}</a>
              {"."}
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
                  children131.push(
                    <>
                      <ProjectItem p={p} />
                    </>,
                  );
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
            {en ? "Social environment design" : "社会的環境設計"}
          </div>
        </h2>
        <div className="ui basic segment">
          <SiteImage
            className="ui fluid bordered image"
            src={`${rootPath}programming-as-communication/evangelist-in-env.png`}
          />
          <div className="caption">
            <p>
              {
                "We can design a programming environment consisting of an evangelist and computational artifacts."
              }
            </p>
            <p>
              {"In the ongoing "}
              <a
                href={
                  "https://www.jamesdysonaward.org/en-GB/2016/project/oton-glass/"
                }
              >
                {"OTON GLASS"}
              </a>

              {
                ' project, we have been implementing a programming environment centered on a visually impaired person, or a "maker," who wants to build customized smart glasses. The programming environment consists of not only computational artifacts (a toolkit consisting of hardware components and software '
              }
              <abbr title={"Application Programming Interfaces"}>{"APIs"}</abbr>
              {
                ") but also an evangelist who serves as an organic aid to utilize the toolkit."
              }
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
          {en ? "Revision history" : "更新履歴"}
        </h2>
        <div className="ui basic segment">
          <div className="ui divided feed">
            <div className="event">
              <div className="content">
                <div className="date">{"5/15/2020"}</div>
                <div className="summary">{"Add preprint of the paper."}</div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{"5/9/2020"}</div>
                <div className="summary">
                  {"Add presentation recording and slides."}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="date">{"4/1/2020"}</div>
                <div className="summary">{"Upload the initial revision."}</div>
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
        <ProjectHeader project={"programming-as-communication"} />
        <div className="ui hidden divider"></div>
        <section id={"abstract"}>{renderAbstract()}</section>
        <div className="ui hidden divider"></div>
        <section id={"presentation"}>{renderPresentation()}</section>
        <div className="ui hidden divider"></div>
        <section id={"technical-effort"}>{renderTechnicalEffort()}</section>
        <div className="ui hidden divider"></div>
        <section id={"social-effort"}>{renderSocialEffort()}</section>
        <div className="ui hidden divider"></div>
        <ProjectPublications
          project={p.project}
          majorPublication={p.publication}
        />
        <div className="ui hidden divider"></div>
        <section id={"revision"}>{renderRevision()}</section>
      </SiteLayout>
    </>
  );
}

export function getStaticProps() {
  return { props: withPageImages(Page, { pageData: getPageData("/programming-as-communication/", {"projects": ["live-tuning", "programming-as-communication", "user-generated-variables"], "publicationProjects": ["programming-as-communication"]}) }, "/programming-as-communication/") };
}
