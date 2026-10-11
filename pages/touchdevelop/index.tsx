import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import { classNames, style, text as plainText, keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from touchdevelop/index.pug; edit this TSX source directly. */
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

  p = projectsTable["touchdevelop"];
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
      <SiteLayout context={context}>
        {content.renderProjectHeader("touchdevelop")}
        <div className="ui message">
          <p>
            <del>
              {richText(
                "The live programming feature proposed in the paper is already shipped with the current version of TouchDevelop. Test it ",
              )}
              <a href={href("https://www.touchdevelop.com/docs/pages-and-boxes")}>
                {richText("in your web browser")}
              </a>
              {richText("!")}
            </del>
          </p>
          <p>
            {richText("Unfortunately, ")}
            <a href={href("https://makecode.com/touchdevelop")}>
              {richText("Microsoft retired the TouchDevelop platform in June 2019")}
            </a>
            {richText(
              ". Its live programming techniques have been adopted by subsequent projects such as ",
            )}
            <a href={href("https://makecode.com/about")}>{richText("Microsoft MakeCode")}</a>
            {richText(
              " and have impacted programming experience design of various projects such as ",
            )}
            <a href={href("/textalive")}>{richText("TextAlive")}</a>
            {richText(". ")}
          </p>
        </div>
        <div className="ui hidden divider"></div>
        <section id={attribute("abstract")}>
          <h2 className="ui header">
            <div className="content">{plainText(en ? "Abstract" : "概要")}</div>
          </h2>
          <div className="ui basic segment">
            <p>
              {richText(
                "Live programming allows programmers to edit the code of a running program and immediately see the effect of the code changes. This tightening of the traditional edit-compile-run cycle reduces the cognitive gap between program code and behavior, improving the learning experience of beginning programmers while boosting the productivity of seasoned ones. Unfortunately, live programming is difficult to realize in practice as imperative languages lack well-defined abstraction boundaries that make live programming responsive or its feedback comprehensible.",
              )}
            </p>
            <p>
              {richText(
                "This paper enables live programming for user interface programming by cleanly separating the rendering and non-rendering aspects of a UI program, allowing the display to be refreshed on a code change without restarting the program. A type and effect system formalizes this separation and provides an evaluation model that incorporates the code update step. By putting live programming on a more formal footing, we hope to enable critical and technical discussion of live programming systems.",
              )}
            </p>
            <p>
              {richText("This work was done during my internship at Microsoft Research Redmond ")}
              <a href={href("https://www.microsoft.com/en-us/research/project/touchdevelop/")}>
                {richText("TouchDevelop team")}
              </a>
              {richText(" of ")}
              <a
                href={href(
                  "https://www.microsoft.com/en-us/research/group/research-software-engineering-rise/",
                )}
                title={"Research in Software Engineering Group"}
              >
                {richText("RiSE Group")}
              </a>
              {richText(".")}
            </p>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={attribute("presentations")}>
          <h2 className="ui header">{plainText(en ? "Presentation materials" : "発表内容")}</h2>
          <div className="ui basic segment">
            <div className="ui stackable two columns grid">
              <div className="column">
                <h3 className="ui header">
                  {richText("PLDI 2013 ")}
                  {plainText(en ? "Demo Video" : "デモ動画")}
                </h3>
                {content.renderEmbedYoutube("//www.youtube.com/embed/GaVbYx-NN0o")}
                <div className="caption">
                  <div className="ui horizontal list">
                    <div className="item">
                      <a href={href("//www.youtube.com/watch?v=GaVbYx-NN0o")}>
                        <i className="youtube icon"></i>
                        {richText("YouTube")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <h3 className="ui header">
                  {richText(en ? 'Experimental <abbr title="User Interface">UI</abbr>' : "β版実装")}
                </h3>
                {content.renderEmbedYoutube("//www.youtube.com/embed/D1UB73y4GGo")}
                <div className="caption">
                  <div className="ui horizontal list">
                    <div className="item">
                      <a href={href("//www.youtube.com/watch?v=D1UB73y4GGo")}>
                        <i className="youtube icon"></i>
                        {richText("YouTube")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="ui hidden divider"></div>
        {content.renderProjectPublications("touchdevelop", "pldi2013-kato-alive")}
      </SiteLayout>
    </>
  );
}
