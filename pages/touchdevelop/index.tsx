import {
  EmbedYoutube,
  ProjectHeader,
  ProjectPublications,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";

import { HtmlContent } from "@/site/components/RichText";

import { hydratePageData, type PageDataProps, type SiteData } from "@/site/page-data";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from touchdevelop/index.pug; edit this TSX source directly. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projectsTable, rootPath } = data;
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

  p = projectsTable["touchdevelop"];
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

  return (
    <>
      <SiteLayout context={context}>
        <ProjectHeader project={"touchdevelop"} />
        <div className="ui message">
          <p>
            <del>
              {
                "The live programming feature proposed in the paper is already shipped with the current version of TouchDevelop. Test it "
              }
              <a href={"https://www.touchdevelop.com/docs/pages-and-boxes"}>
                {"in your web browser"}
              </a>
              {"!"}
            </del>
          </p>
          <p>
            {"Unfortunately, "}
            <a href={"https://makecode.com/touchdevelop"}>
              {"Microsoft retired the TouchDevelop platform in June 2019"}
            </a>
            {
              ". Its live programming techniques have been adopted by subsequent projects such as "
            }
            <a href={"https://makecode.com/about"}>{"Microsoft MakeCode"}</a>
            {
              " and have impacted programming experience design of various projects such as "
            }
            <SiteLink href={"/textalive"}>{"TextAlive"}</SiteLink>
            {". "}
          </p>
        </div>
        <div className="ui hidden divider"></div>
        <section id={"abstract"}>
          <h2 className="ui header">
            <div className="content">{en ? "Abstract" : "概要"}</div>
          </h2>
          <div className="ui basic segment">
            <p>
              {
                "Live programming allows programmers to edit the code of a running program and immediately see the effect of the code changes. This tightening of the traditional edit-compile-run cycle reduces the cognitive gap between program code and behavior, improving the learning experience of beginning programmers while boosting the productivity of seasoned ones. Unfortunately, live programming is difficult to realize in practice as imperative languages lack well-defined abstraction boundaries that make live programming responsive or its feedback comprehensible."
              }
            </p>
            <p>
              {
                "This paper enables live programming for user interface programming by cleanly separating the rendering and non-rendering aspects of a UI program, allowing the display to be refreshed on a code change without restarting the program. A type and effect system formalizes this separation and provides an evaluation model that incorporates the code update step. By putting live programming on a more formal footing, we hope to enable critical and technical discussion of live programming systems."
              }
            </p>
            <p>
              {
                "This work was done during my internship at Microsoft Research Redmond "
              }
              <a
                href={
                  "https://www.microsoft.com/en-us/research/project/touchdevelop/"
                }
              >
                {"TouchDevelop team"}
              </a>
              {" of "}
              <a
                href={
                  "https://www.microsoft.com/en-us/research/group/research-software-engineering-rise/"
                }
                title={"Research in Software Engineering Group"}
              >
                {"RiSE Group"}
              </a>
              {"."}
            </p>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={"presentations"}>
          <h2 className="ui header">
            {en ? "Presentation materials" : "発表内容"}
          </h2>
          <div className="ui basic segment">
            <div className="ui stackable two columns grid">
              <div className="column">
                <h3 className="ui header">
                  {"PLDI 2013 "}
                  {en ? "Demo Video" : "デモ動画"}
                </h3>
                <EmbedYoutube src={"//www.youtube.com/embed/GaVbYx-NN0o"} />
                <div className="caption">
                  <div className="ui horizontal list">
                    <div className="item">
                      <a href={"//www.youtube.com/watch?v=GaVbYx-NN0o"}>
                        <i className="youtube icon"></i>
                        {"YouTube"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <h3 className="ui header">
                  <HtmlContent
                    html={
                      en
                        ? 'Experimental <abbr title="User Interface">UI</abbr>'
                        : "β版実装"
                    }
                  />
                </h3>
                <EmbedYoutube src={"//www.youtube.com/embed/D1UB73y4GGo"} />
                <div className="caption">
                  <div className="ui horizontal list">
                    <div className="item">
                      <a href={"//www.youtube.com/watch?v=D1UB73y4GGo"}>
                        <i className="youtube icon"></i>
                        {"YouTube"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="ui hidden divider"></div>
        <ProjectPublications
          project={"touchdevelop"}
          majorPublication={"pldi2013-kato-alive"}
        />
      </SiteLayout>
    </>
  );
}

export function getStaticProps() {
  return { props: withPageImages(Page, { pageData: getPageData("/touchdevelop/", {"projects": ["touchdevelop"], "publications": ["pldi2013-kato-alive"], "publicationProjects": ["touchdevelop"]}) }, "/touchdevelop/") };
}
