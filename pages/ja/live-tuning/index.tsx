import { DeferredScript } from "@/site/components/DeferredScript";
import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import { classNames, style, text as plainText, keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from ja/live-tuning/index.pug; edit this TSX source directly. */
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
  const lang: "en" | "ja" = "ja";
  const en: boolean = false;
  const basePath = en ? rootPath : rootPath + "ja/";
  const author = en ? "Jun Kato" : "加藤 淳";
  let me: any,
    p: any,
    title: any,
    description: any,
    imageUrl: any,
    bodyClass: any;

  p = projectsTable["live-tuning"];
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
        <div className="mobile hidden">
          <div
            className="ui right floated small bordered image"
            style={style("z-index: 100; margin-right: 1em;")}
          >
            <img src={`${rootPath}live-tuning/live2016-kato-livetuning.jpg`} />
            <div className="caption">
              <a
                className="ui fluid primary small labeled icon button"
                href={href(`${rootPath}publications/live2016-kato-livetuning.pdf`)}
              >
                <i className="book icon"></i>
                {richText("Paper")}
              </a>
            </div>
          </div>
        </div>
        {content.renderProjectHeader("live-tuning")}
        <div className="ui message">
          {(() => {
            const children228: ReactNode[] = [];
            children228.push(
              <>
                <p>
                  {richText(
                    "This page provides summary and some graphical materials of the workshop paper that was presented at ",
                  )}
                  <a href={href("https://2016.ecoop.org/track/LIVE-2016")}>
                    {richText("ECOOP 2016 LIVE")}
                  </a>
                  {richText(".")}
                </p>
              </>,
            );
            if (!en) {
              children228.push(
                <>
                  <p>{content.renderTranslate("live-tuning/index.pug")}</p>
                </>,
              );
            }
            return keyed(children228);
          })()}
        </div>
        <div className="ui hidden divider"></div>
        <section id={attribute("abstract")}>
          <h2 className="ui header">
            <div className="content">{plainText(en ? "Abstract" : "概要")}</div>
          </h2>
          <div className="ui basic segment">
            <p>
              {richText(
                "Live Programming allows programmers to gain information about the program continuously during its development. While it has been implemented in various integrated development environments (IDEs) for programmers, its interaction techniques such as slider widgets for continuous parameter tuning are comprehensible for people without any prior knowledge of programming and have been widely used for a long time.",
              )}
            </p>
            <p>
              {richText(
                "In this paper, we aim to introduce prior work on Live Programming research from the interaction point of view and relate it to Human-Computer Interaction research. We then name the subset of Live Programming interaction that only involves changes in constant values &quot;Live Tuning.&quot; Our example IDEs that implement both Live Programming and Live Tuning interactions are showcased, followed by the discussion on the possible future direction of programming experience (PX) research.",
              )}
            </p>
          </div>
        </section>
        <section id={attribute("live-tuning-comparison")}>
          <div className="ui basic segment">
            <div className="ui stackable two columns grid">
              <div className="column">
                <h2 className="ui header">{richText("Live Programming")}</h2>
                <p style={style("position: relative")}>
                  <a id={attribute("live-programming")}>
                    <img
                      className="ui fluid image hover"
                      src={`${rootPath}live-tuning/live-programming-environment.png`}
                      style={style("position: absolute; display: none; z-index: 10")}
                    />
                    <img
                      className="ui fluid image"
                      src={`${rootPath}live-tuning/live-programming-environment-shadow.png`}
                      style={style("z-index: 5")}
                    />
                  </a>
                </p>
                <ul>
                  <li>
                    {richText("Interaction design for ")}
                    <strong>{richText("programmers")}</strong>
                    {richText(", typically built in development environments")}
                  </li>
                  <li>{richText("Prior knowledge of programming is required.")}</li>
                  <li>{richText("The entire programs are always live and editable.")}</li>
                  <li>
                    {richText(
                      "The programmer has full control and is responsible for every aspect of program details.",
                    )}
                  </li>
                </ul>
              </div>
              <div className="column">
                <h2 className="ui header">{richText("Live Tuning")}</h2>
                <p style={style("position: relative")}>
                  <a id={attribute("live-tuning")}>
                    <img
                      className="ui fluid image hover"
                      src={`${rootPath}live-tuning/live-tuning-environment.png`}
                      style={style("position: absolute; display: none; z-index: 10")}
                    />
                    <img
                      className="ui fluid image"
                      src={`${rootPath}live-tuning/live-tuning-environment-shadow.png`}
                      style={style("z-index: 5")}
                    />
                  </a>
                </p>
                <ul>
                  <li>
                    {richText("Interaction design for ")}
                    <strong>{richText("end-users")}</strong>
                    {richText(", built in ordinary runtime environments")}
                  </li>
                  <li>
                    {richText("Prior knowledge of programming is ")}
                    <strong>{richText("not")}</strong>
                    {richText(" required.")}
                  </li>
                  <li>{richText("Only a certain number of variables are editable.")}</li>
                  <li>
                    {richText(
                      "The programmer and end-user are separating their roles of specifying program details.",
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={attribute("motivation")}>
          <h2 className="ui header">{richText("Motivation")}</h2>
          <div className="ui basic segment">
            <div className="ui stackable two columns grid">
              <div className="column">
                <h3 className="ui header">{richText("Because programmers are tired")}</h3>
                <ul>
                  <li>
                    {richText("There are more and more ")}
                    <a
                      href={href(`${rootPath}programming-with-examples`)}
                      title={"Programming with Examples to Develop Data-Intensive User Interfaces"}
                    >
                      {richText("data-intensive programs")}
                    </a>
                    {richText(" such as animation design, ")}
                    <abbr title={"Internet of Things"}>{richText("IoT")}</abbr>
                    {richText(" application development, machine learning, etc.")}
                  </li>
                  <li>
                    {richText(
                      "The amount and variations of data far surpass what programmers alone can manage and edit. Intensive parameter tunings might be needed per user.",
                    )}
                  </li>
                </ul>
              </div>
              <div className="column">
                <h3>{richText("Because users are demanding")}</h3>
                <ul>
                  <li>
                    {richText(
                      "Live Programming (changing program behaviors without losing context) can benefit end-users. In particular, they can comprehend parameter tuning interfaces and customize programs to match their needs.",
                    )}
                  </li>
                  <li>
                    {richText(
                      "They typically do not have access to development environments since they lack prior knowledge of programming.",
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={attribute("example-ides")}>
          <h2 className="ui header">
            {richText("Example &quot;Live Tuning&quot; ")}
            <abbr title={"Integrated Development Environments"}>{richText("IDEs")}</abbr>
          </h2>
          <div className="ui basic segment">
            <h3 className="ui header">{richText("TextAlive")}</h3>
            <p>
              <a href={href(`${basePath}textalive/`)}>
                <strong>{richText("TextAlive")}</strong>
              </a>
              {richText(
                " is an Integrated Design Environment for authoring Kinetic Typography videos.",
              )}
            </p>
            <div className="ui stackable two columns grid">
              <div className="column">
                <img
                  className="ui fluid bordered image"
                  src={`${rootPath}live-tuning/textalive-code.png`}
                />
                <p className="caption">
                  <strong>{richText("For programmers:")}</strong>
                  {richText(
                    " it allows development of algorithms to animate lyrics text in synchrony with music. The timing information of the lyrics text is automatically estimated and can be interactively corrected in the timeline interface. Changes to the animation algorithms update the resulting video in real time.",
                  )}
                </p>
              </div>
              <div className="column">
                <img
                  className="ui fluid bordered image"
                  src={`${rootPath}live-tuning/textalive-tuning.png`}
                />
                <p className="caption">
                  <strong>{richText("For end-users:")}</strong>
                  {richText(
                    " it allows authoring Kinetic Typography videos just as other general video authoring tools. Each phrase, word, and character can be assigned an animation template with appropriate parameter values such as animation speed and font size.",
                  )}
                </p>
              </div>
            </div>
            <h3 className="ui header">{richText("f3.js: Form Follows Function()")}</h3>
            <p>
              <a href={href(`${basePath}f3js`)}>
                <strong>{richText("f3.js")}</strong>
              </a>
              {richText(
                ' is an Integrated Development Environment for developing <abbr title="Internet of Things">IoT</abbr> applications.',
              )}
            </p>
            <div className="ui stackable two columns grid">
              <div className="column">
                <img
                  className="ui fluid bordered image"
                  src={`${rootPath}live-tuning/f3js-code.png`}
                />
                <p className="caption">
                  <strong>{richText("For programmers:")}</strong>
                  {richText(
                    " It allows to write a single JavaScript codebase that defines not only the behavior of microcontrollers, sensors, and actuators but also the layout of their enclosures. The layout preview is updated in response to every edit in the source code, enabling live programming experience.",
                  )}
                </p>
              </div>
              <div className="column">
                <img
                  className="ui fluid bordered image"
                  src={`${rootPath}live-tuning/f3js-tuning.png`}
                />
                <p className="caption">
                  <strong>{richText("For end-users:")}</strong>
                  {richText(
                    " it allows customizing and creating IoT applications without prior knowledge of programming nor soldering. Each IoT application has parameters to customize its behavior and layout, such as whether to add the countdown feature to a camera.",
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={attribute("examples")}>
          <h2 className="ui header">{richText("Discussion")}</h2>
          <div className="ui basic segment">
            <p>
              {richText("Please refer to ")}
              <a href={href(`${rootPath}publications/live2016-kato-livetuning.pdf#page=4`)}>
                {richText("the paper (p.4-6)")}
              </a>
              {richText(" for the detailed discussion. ")}
              <u>{richText("Underlined")}</u>
              {richText(" options are those we consider the most interesting and promising.")}
            </p>
            <ul>
              <li>
                <strong>
                  {richText(
                    "Programming environments (for programmers) are getting close to runtime environments (for end-users).",
                  )}
                </strong>
                {richText(
                  " Live Tuning is such a proposal to connect them through the tuning interfaces.",
                )}
              </li>
              <li>
                <strong>
                  {richText(
                    "Multiple levels of user interfaces allow varied flexibility to edit programs.",
                  )}
                </strong>
                {richText(
                  " Live Programming aims at the maximum flexibility and Live Tuning is somewhat in the middle between no and maximum flexibility.",
                )}
              </li>
              <li>
                <strong>
                  {richText(
                    "How can we resolve or avoid conflicts between edits by multiple users? ",
                  )}
                </strong>
                {richText(
                  "1) seriously implement conflict resolution mechanisms 2) discard old edits as typical Live Programming systems do 3) separate namespaces and resulting application instances ",
                )}
                <u>{richText("4) aggregate parameter values from different users")}</u>
                {richText(".")}
              </li>
              <li>
                <strong>
                  {richText("How can we achieve liveness when it takes time to apply edits? ")}
                </strong>
                {richText(
                  "For instance, updating the 3D models is an instant process, but printing them takes time. 1) significantly progress the research of programmable matter ",
                )}
                <u>{richText("2) hack humans' feeling of liveness")}</u>
                {richText(".")}
              </li>
            </ul>
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
                  <div className="date">{richText("7/16/2016")}</div>
                  <div className="summary">{richText("Upload the initial revision.")}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        {content.renderProjectPublications("live-tuning", "live2016-kato-livetuning")}
      </SiteLayout>
      <DeferredScript
        dangerouslySetInnerHTML={{
          __html:
            "$(function(){\n  $('#live-programming').hover(function (){\n    $('#live-programming>img.hover').fadeIn('fast');\n  }, function (){\n    $('#live-programming>img.hover').fadeOut('fast');\n  });\n  $('#live-tuning').hover(function (){\n    $('#live-tuning>img.hover').fadeIn('fast');\n  }, function (){\n    $('#live-tuning>img.hover').fadeOut('fast');\n  });\n});",
        }}
      />
    </>
  );
}
