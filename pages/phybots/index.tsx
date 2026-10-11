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

/** React page migrated from phybots/index.pug; edit this TSX source directly. */
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

  p = projectsTable["phybots"];
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
        {(() => {
          const children123: ReactNode[] = [];
          children123.push(<>{content.renderProjectHeader("phybots")}</>);
          children123.push(
            <>
              <div className="ui message">
                {richText("Phybots is open-source at ")}
                <a href={href("https://github.com/arcatdmz/phybots/")}>
                  {richText("GitHub")}
                </a>
                {richText(" and can be downloaded at ")}
                <a href={href("https://phybots.com/")}>
                  {richText("https://phybots.com")}
                </a>
                {richText(".")}
              </div>
            </>,
          );
          children123.push(
            <>
              <div className="ui hidden divider"></div>
            </>,
          );
          children123.push(
            <>
              <section id={attribute("abstract")}>
                <div className="ui basic segment">
                  <div className="ui stackable grid">
                    <div className="ten wide column">
                      <h2 className="ui header">
                        {plainText(en ? "Abstract" : "概要")}
                      </h2>
                      <p>
                        {richText(
                          "There are many toolkits for physical UIs, but most physical UI applications are not locomotive. When the programmer wants to make things move around in the environment, he faces difficulty related to robotics. Toolkits for robot programming, unfortunately, are usually not as accessible as those for building physical UIs.",
                        )}
                      </p>
                      <p>
                        {richText(
                          "To address this interdisciplinary issue, we propose Phybots, a toolkit that allows researchers and interaction designers to rapidly prototype applications with locomotive robotic things. The contributions of this research are the combination of a hardware setup, software API, its underlying architecture and a graphical runtime debug tool that supports the whole prototyping activity.",
                        )}
                      </p>
                      <p>
                        {richText(
                          "The paper introduces the toolkit, applications and lessons learned from three user studies.",
                        )}
                      </p>
                    </div>
                    <div className="six wide column">
                      <a
                        className="ui fluid image"
                        href={href(`${rootPath}phybots/fig1-overview.jpg`)}
                      >
                        <img
                          src={`${rootPath}phybots/fig1-overview.jpg`}
                          alt={"Overview of hardware setup for Phybots"}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </>,
          );
          children123.push(
            <>
              <div className="ui hidden divider"></div>
            </>,
          );
          children123.push(
            <>
              <section id={attribute("presentations")}>
                <h2 className="ui header">
                  {plainText(en ? "Presentation materials" : "発表内容")}
                </h2>
                <div className="ui basic segment">
                  <div className="ui stackable two columns grid">
                    <div className="column">
                      <h3 className="ui header">
                        {richText("Example applications")}
                      </h3>
                      {content.renderEmbedYoutube(
                        "https://www.youtube.com/embed/videoseries?list=PL5EC9CECDDBEA183A",
                      )}
                      <div className="caption">
                        <div className="ui horizontal list">
                          <div className="item">
                            <a
                              href={href(
                                "//www.youtube.com/playlist?list=PL5EC9CECDDBEA183A",
                              )}
                            >
                              <i className="youtube icon"></i>
                              {richText("YouTube")}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      {(() => {
                        const children124: ReactNode[] = [];
                        children124.push(
                          <>
                            <h3 className="ui header">
                              {richText("DIS 2012 ")}
                              {plainText(en ? "Slides" : "発表スライド")}
                            </h3>
                          </>,
                        );
                        children124.push(
                          <>
                            <div
                              className="ui embed"
                              data-url={
                                publicationsTable[p.publication].entryTags
                                  .slides
                              }
                              data-placeholder={`${rootPath}images/background-eee.png`}
                              data-icon={"video play outline"}
                            ></div>
                          </>,
                        );
                        children124.push(
                          <>
                            <div className="caption">
                              <div className="ui horizontal list">
                                <div className="item">
                                  <a
                                    href={href(
                                      publicationsTable[p.publication].entryTags
                                        .slides,
                                    )}
                                  >
                                    <i className="download icon"></i>
                                    {plainText(
                                      en ? "Download" : "ダウンロード",
                                    )}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </>,
                        );
                        if (!en) {
                          children124.push(
                            <>
                              <p className="caption">
                                {richText("日本語の発表スライドは")}
                                <a href={href("#publications")}>
                                  <i className="book icon"></i>
                                  {richText("発表文献")}
                                </a>
                                {richText("で日本語文献の ")}
                                <i className="sidebar fitted icon"></i>
                                {richText(" をクリックすると閲覧できます。")}
                              </p>
                            </>,
                          );
                        }
                        return keyed(children124);
                      })()}
                    </div>
                  </div>
                </div>
              </section>
            </>,
          );
          children123.push(
            <>
              <div className="ui hidden divider"></div>
            </>,
          );
          children123.push(
            <>
              <section id={attribute("toolkit")}>
                <h2 className="ui header">
                  {plainText(en ? "Phybots Toolkit" : "Phybots ツールキット")}
                </h2>
                <div className="ui basic segment">
                  <table className="ui fluid table">
                    <thead>
                      <tr>
                        <th>{richText("Toolkits for:")}</th>
                        <th>{richText("Physical UIs")}</th>
                        <th className="center aligned">
                          {richText("Phybots")}
                        </th>
                        <th className="right aligned">{richText("Robots")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>{richText("Target users:")}</strong>
                        </td>
                        <td className="positive" colSpan={Number("2")}>
                          {richText(
                            "HCI researchers &amp; interaction designers",
                          )}
                        </td>
                        <td className="negative right aligned">
                          {richText("Robotics people")}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>{richText("Focus:")}</strong>
                        </td>
                        <td className="positive" colSpan={Number("2")}>
                          {richText("Prototyping")}
                        </td>
                        <td className="negative right aligned">
                          {richText("Reliability")}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>{richText("Software APIs:")}</strong>
                        </td>
                        <td className="negative">
                          {richText("Low-level and static")}
                        </td>
                        <td
                          className="positive right aligned"
                          colSpan={Number("2")}
                        >
                          {richText("High-level and extensible")}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            {richText("Hardware size &amp; cost:")}
                          </strong>
                        </td>
                        <td className="positive" colSpan={Number("2")}>
                          {richText("Small &amp; cheap (Phidget Kit $200, ")}
                          <a
                            href={href(
                              "http://www.inmojo.com/store/inmojo-market/item/ikimo-robot-platform/",
                            )}
                          >
                            {richText("Ikimo Robot")}
                          </a>
                          {richText(" $160)")}
                        </td>
                        <td className="negative right aligned">
                          {richText("Medium to large &amp; expensive ($700-)")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="caption">
                    {richText("Comparison between toolkits")}
                  </div>
                  <div className="ui hidden divider"></div>
                  <div className="ui stackable three columns grid">
                    <div className="column">
                      {(() => {
                        const children125: ReactNode[] = [];
                        children125.push(
                          <>
                            <h3 className="ui header">
                              {plainText(
                                en
                                  ? "APIs for 2D Locomotion"
                                  : "平面上での移動指示のためのAPI",
                              )}
                            </h3>
                          </>,
                        );
                        children125.push(
                          <>
                            <p>
                              {richText(
                                "Phybots assumes a simple and inexpensive hardware setup of a camera looking down on the floor and visual markers attached to the top of physical objects. This hardware setup can easily be deployed to everyday spaces such as a working desk, a dining table or in a kitchen or living room.",
                              )}
                            </p>
                          </>,
                        );
                        children125.push(
                          <>
                            <p>
                              {richText(
                                "Given the hardware setup, Phybots provides APIs for two-dimensional localization and locomotion of floor-based robotic things. These APIs are similar to those for graphical applications in which object positions are defined by screen coordinates, and support moving to a goal, pushing an object toward a goal, tracing a path, and other custom behavior by specifying a vector field.",
                              )}
                            </p>
                          </>,
                        );
                        if (!en) {
                          children125.push(
                            <>
                              <p>
                                {content.renderTranslate("phybots/index.pug")}
                              </p>
                            </>,
                          );
                        }
                        return keyed(children125);
                      })()}
                    </div>
                    <div className="column">
                      {(() => {
                        const children126: ReactNode[] = [];
                        children126.push(
                          <>
                            <h3 className="ui header">
                              {plainText(
                                en
                                  ? "Centralized and Extensible Architecture"
                                  : "中央集権・拡張容易なアーキテクチャ",
                              )}
                            </h3>
                          </>,
                        );
                        children126.push(
                          <>
                            <p>
                              {richText(
                                "Phybots APIs are built on top of a centralized and extensible software architecture that runs on one personal computer and manages all physical objects of interest.",
                              )}
                            </p>
                          </>,
                        );
                        children126.push(
                          <>
                            <p>
                              {richText(
                                "The programmer has direct access to these objects including cameras, robotic things, and entities with visual markers as instances of the ",
                              )}
                              <i>{richText("Camera")}</i>
                              {richText(", ")}
                              <i>{richText("Robot")}</i>
                              {richText(" and ")}
                              <i>{richText("Entity")}</i>
                              {richText(
                                " interfaces, respectively. Time-consuming tasks including locomotion APIs are represented by ",
                              )}
                              <i>{richText("Task")}</i>
                              {richText(" interface.")}
                            </p>
                          </>,
                        );
                        children126.push(
                          <>
                            <p>
                              {richText(
                                "The toolkit can be easily extended on top of these software stacks to support other types of sensors, roobts, and tasks. In addition, a ",
                              )}
                              <i>{richText("Workflow")}</i>
                              {richText(
                                " class represents a directed graph consisting of a set of ",
                              )}
                              <i>{richText("Robot")}</i>
                              {richText(" and ")}
                              <i>{richText("Task")}</i>
                              {richText(
                                " instances, and enables higher-level task management such as handling multiple tasks by one robot in serial or by two robots in parallel.",
                              )}
                            </p>
                          </>,
                        );
                        if (!en) {
                          children126.push(
                            <>
                              <p>
                                {content.renderTranslate("phybots/index.pug")}
                              </p>
                            </>,
                          );
                        }
                        return keyed(children126);
                      })()}
                    </div>
                    <div className="column">
                      {(() => {
                        const children127: ReactNode[] = [];
                        children127.push(
                          <>
                            <h3 className="ui header">
                              {plainText(
                                en
                                  ? "Runtime Debug Tool"
                                  : "ランタイムデバッグツール",
                              )}
                            </h3>
                          </>,
                        );
                        children127.push(
                          <>
                            <p>
                              {richText("Phybots provides a ")}
                              <i>{richText("runtime debug tool")}</i>
                              {richText(
                                " that supports a test phase, beyond the programming phase, as an essential part of the prototyping process.",
                              )}
                            </p>
                          </>,
                        );
                        children127.push(
                          <>
                            <p>
                              {richText(
                                "In the robot application test phase, when the robot fails to accomplish its task, the user usually has to order the same task to be performed again. Because it is too costly to restart a test run for each error, the programmer often wants to fix the error right away without restarting.",
                              )}
                            </p>
                          </>,
                        );
                        children127.push(
                          <>
                            <p>
                              {richText(
                                "To support this workflow, a graphical ",
                              )}
                              <i>{richText("runtime debug tool")}</i>
                              {richText(
                                " enables API parameter reconfiguration, restart, pause, or resume of the interaction at run-time. For example, when the robotic thing fails to move to a desired destination, the programmer can change the threshold of the marker detection algorithm by dragging a slider and then give the robot another try.",
                              )}
                            </p>
                          </>,
                        );
                        if (!en) {
                          children127.push(
                            <>
                              <p>
                                {content.renderTranslate("phybots/index.pug")}
                              </p>
                            </>,
                          );
                        }
                        return keyed(children127);
                      })()}
                    </div>
                  </div>
                  <div className="ui hidden divider"></div>
                  <p>
                    <a
                      className="ui fluid image"
                      href={href(`${rootPath}phybots/debug-tools.png`)}
                    >
                      <img src={`${rootPath}phybots/debug-tools.png`} />
                    </a>
                  </p>
                  <div className="caption">
                    {plainText(
                      en
                        ? "Overview of the Phybots runtime debug tool"
                        : "ランタイムデバッグツールの概観",
                    )}
                  </div>
                </div>
              </section>
            </>,
          );
          if (!en) {
            children123.push(
              <>
                <div className="ui hidden divider"></div>
              </>,
            );
            children123.push(
              <>
                <section id={attribute("vision")}>
                  <h2 className="ui header">{richText("未来ビジョン")}</h2>
                  <div className="ui basic segment"></div>
                </section>
              </>,
            );
          }
          children123.push(
            <>
              <div className="ui hidden divider"></div>
            </>,
          );
          children123.push(
            <>
              {content.renderProjectPublications(
                "phybots",
                "dis2012-kato-phybots",
              )}
            </>,
          );
          return keyed(children123);
        })()}
      </SiteLayout>
    </>
  );
}
