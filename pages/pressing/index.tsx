import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import { classNames, style, text as plainText, keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from pressing/index.pug; edit this TSX source directly. */
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

  p = projectsTable["pressing"];
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
  function renderBody(): ReactNode {
    return (
      <>
        <section id={attribute("abstract")}>
          <h2 className="ui header">{plainText(en ? "Abstract" : "概要")}</h2>
          <div className="ui basic segment">
            <p>
              {richText(
                "Pressing is a pressure-sensitive programming environment with visual feedbacks of the built-in 2D physical simulator. It runs on a PC with ",
              )}
              <a href={href("https://www.youtube.com/watch?v=1zo0kJ_wi80")}>
                {richText("a practical pressure-sensitive keyboard")}
              </a>
              {richText(" developed by ")}
              <a href={href("https://www.microsoft.com/applied-sciences/")}>
                {richText("Microsoft Applied Science Group")}
              </a>
              {richText(".")}
            </p>
            <p>
              {richText("This work was presented at UIST 2009 ")}
              <a href={href("https://www.acm.org/uist/uist2009/call/contest.html")}>
                {richText("Student Innovation Contest")}
              </a>
              {richText(" with ")}
              <a href={href(`${rootPath}publications/uist2009-kato-pressing-flyer.pdf`)}>
                <i className="file icon"></i>
                {richText("a flyer")}
              </a>
              {richText(".")}
            </p>
            <div className="ui hidden divider"></div>
            <div className="ui fluid image">
              <img src={"https://digitalmuseum.jp/en/software/pressing/images/usage.png"} />
            </div>
            <div className="caption">
              {plainText(en ? "Example code and its execution results" : "サンプルコードとその実行結果")}
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={attribute("px")}>
          <h2 className="ui header">
            {plainText(en ? "Programming Experience" : "プログラミング体験")}
          </h2>
          <div className="ui basic segment">
            <p>
              {richText(
                "When the programmer runs the software, a vacant screen appears with a text box. He can start typing immediately and there is no program compilation; The programming experience is completely live and direct.",
              )}
            </p>
            <p>
              {richText("For example, when he types ")}
              <code>{richText("new Ball()")}</code>
              {richText(
                " and hits the enter key, a ball apears on the screen. The size of the ball is defined according to how strong the class name ",
              )}
              <i>{richText("Ball")}</i>
              {richText(" is typed.")}
            </p>
            <p>
              {richText(
                "There are several interesting predefined classes. For instance, these two sentences will bind the ball instance to a variable ",
              )}
              <i>{richText("b")}</i>
              {richText(
                " and its track will be painted with a red brush. The brush width is defined by how strong ",
              )}
              <i>{richText("Brush")}</i>
              {richText(" is typed.")}
            </p>
            <pre>{richText("b = new Ball(); b.pen(new Brush(255,0,0));")}</pre>
            <p>
              {richText(
                "The programmer can interact with the instantiated ball objects not only by writing code,",
              )}
            </p>
            <pre>{richText("World.setGravity(0, 0.98); b.setSpeed(100);")}</pre>
            <p>
              {richText(
                "but also by directly touching them using a mouse cursor. This environment is equipped with a two-dimensional physics simulator and thus provides natural interaction experience.",
              )}
            </p>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={attribute("implementation")}>
          <h2 className="ui header">{plainText(en ? "Implementation" : "実装")}</h2>
          <div className="ui basic segment">
            <p>
              {richText(
                "This integrated development environment (IDE) has its original interpreter named ",
              )}
              <i>{richText("Kotosaka")}</i>
              {richText(
                " which interprets a JavaScript-like language. The language shares basic ideas of object-oriented programming such as classes (methods and fields), functions and variables. Variables can be used without declaration and are dynamically typed, capable of storing primitive values (boolean, integer and string,) class instances, and function objects.",
              )}
            </p>
            <p>
              {richText("The IDE contains a two-dimensional virtual world equipped with a ")}
              <a href={href("https://github.com/erincatto/box2d")}>{richText("Box2D")}</a>
              {richText(
                "-based physics simulator and provides interesting APIs to interact with the virtual world. Examples are shown below in the figure.",
              )}
            </p>
          </div>
        </section>
      </>
    );
  }
  function renderImages(): ReactNode {
    return (
      <>
        <a className="ui fluid image" href={href(`${rootPath}pressing/pressing.png`)}>
          <img src={`${rootPath}pressing/pressing.png`} />
        </a>
        <div className="caption">
          {plainText(en ? "Screenshot of the Pressing IDE" : "統合開発環境Pressingのスクリーンショット")}
        </div>
        <div className="ui hidden divider"></div>
        <a
          className="ui fluid image"
          href={href("https://www.flickr.com/photos/zhiquan/3989241000/")}
        >
          <img src={`${rootPath}pressing/3989241000_35cb13136a_o.jpg`} />
        </a>
        <div className="caption">
          {plainText(en ? "Demonstration at UIST '09" : "UIST '09でのデモの様子")}
        </div>
        <div className="ui hidden divider"></div>
      </>
    );
  }
  return (
    <>
      <SiteLayout context={context}>
        {content.renderProjectHeader("pressing")}
        <div className="ui hidden divider"></div>
        <div className="ui stackable grid">
          <div className="ten wide column">{renderBody()}</div>
          <div className="six wide column">{renderImages()}</div>
        </div>
        <div className="ui hidden divider"></div>
        {content.renderProjectPublications("pressing")}
      </SiteLayout>
    </>
  );
}
