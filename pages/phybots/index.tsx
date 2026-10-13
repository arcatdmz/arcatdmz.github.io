import { Embed } from "@/site/components/SiteWidgets";
import { SiteImage } from "@/site/components/SiteImage";
import {
  EmbedYoutube,
  ProjectHeader,
  ProjectPublications,
  Translate,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";

import { href } from "@/site/rendering";
import { hydratePageData, type PageDataProps, type SiteData } from "@/site/page-data";
import { getPageData } from "@/site/page-data.server";
import { withPageImages } from "@/site/page-images.server";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from phybots/index.pug; edit this TSX source directly. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projectsTable, publicationsTable, rootPath } = data;
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
        <ProjectHeader project={"phybots"} />

        <div className="ui message">
          {"Phybots is open-source at "}
          <a href={"https://github.com/arcatdmz/phybots/"}>{"GitHub"}</a>
          {" and can be downloaded at "}
          <a href={"https://phybots.com/"}>{"https://phybots.com"}</a>
          {"."}
        </div>

        <div className="ui hidden divider"></div>

        <section id={"abstract"}>
          <div className="ui basic segment">
            <div className="ui stackable grid">
              <div className="ten wide column">
                <h2 className="ui header">{en ? "Abstract" : "概要"}</h2>
                <p>
                  {
                    "There are many toolkits for physical UIs, but most physical UI applications are not locomotive. When the programmer wants to make things move around in the environment, he faces difficulty related to robotics. Toolkits for robot programming, unfortunately, are usually not as accessible as those for building physical UIs."
                  }
                </p>
                <p>
                  {
                    "To address this interdisciplinary issue, we propose Phybots, a toolkit that allows researchers and interaction designers to rapidly prototype applications with locomotive robotic things. The contributions of this research are the combination of a hardware setup, software API, its underlying architecture and a graphical runtime debug tool that supports the whole prototyping activity."
                  }
                </p>
                <p>
                  {
                    "The paper introduces the toolkit, applications and lessons learned from three user studies."
                  }
                </p>
              </div>
              <div className="six wide column">
                <SiteLink
                  className="ui fluid image"
                  href={href(`${rootPath}phybots/fig1-overview.jpg`)}
                >
                  <SiteImage
                    src={`${rootPath}phybots/fig1-overview.jpg`}
                    alt={"Overview of hardware setup for Phybots"}
                  />
                </SiteLink>
              </div>
            </div>
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
                <h3 className="ui header">{"Example applications"}</h3>
                <EmbedYoutube
                  src={
                    "https://www.youtube.com/embed/videoseries?list=PL5EC9CECDDBEA183A"
                  }
                />
                <div className="caption">
                  <div className="ui horizontal list">
                    <div className="item">
                      <a
                        href={
                          "//www.youtube.com/playlist?list=PL5EC9CECDDBEA183A"
                        }
                      >
                        <i className="youtube icon"></i>
                        {"YouTube"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <h3 className="ui header">
                  {"DIS 2012 "}
                  {en ? "Slides" : "発表スライド"}
                </h3>

                <Embed
                  className="ui embed"
                  data-url={publicationsTable[p.publication].entryTags.slides}
                  data-placeholder={`${rootPath}images/background-eee.png`}
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

                {!en ? (
                  <>
                    <p className="caption">
                      {"日本語の発表スライドは"}
                      <a href={"#publications"}>
                        <i className="book icon"></i>
                        {"発表文献"}
                      </a>
                      {"で日本語文献の "}
                      <i className="sidebar fitted icon"></i>
                      {" をクリックすると閲覧できます。"}
                    </p>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <div className="ui hidden divider"></div>

        <section id={"toolkit"}>
          <h2 className="ui header">
            {en ? "Phybots Toolkit" : "Phybots ツールキット"}
          </h2>
          <div className="ui basic segment">
            <table className="ui fluid table">
              <thead>
                <tr>
                  <th>{"Toolkits for:"}</th>
                  <th>{"Physical UIs"}</th>
                  <th className="center aligned">{"Phybots"}</th>
                  <th className="right aligned">{"Robots"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>{"Target users:"}</strong>
                  </td>
                  <td className="positive" colSpan={Number("2")}>
                    {"HCI researchers & interaction designers"}
                  </td>
                  <td className="negative right aligned">
                    {"Robotics people"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>{"Focus:"}</strong>
                  </td>
                  <td className="positive" colSpan={Number("2")}>
                    {"Prototyping"}
                  </td>
                  <td className="negative right aligned">{"Reliability"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>{"Software APIs:"}</strong>
                  </td>
                  <td className="negative">{"Low-level and static"}</td>
                  <td className="positive right aligned" colSpan={Number("2")}>
                    {"High-level and extensible"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>{"Hardware size & cost:"}</strong>
                  </td>
                  <td className="positive" colSpan={Number("2")}>
                    {"Small & cheap (Phidget Kit $200, "}
                    <a
                      href={
                        "http://www.inmojo.com/store/inmojo-market/item/ikimo-robot-platform/"
                      }
                    >
                      {"Ikimo Robot"}
                    </a>
                    {" $160)"}
                  </td>
                  <td className="negative right aligned">
                    {"Medium to large & expensive ($700-)"}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="caption">{"Comparison between toolkits"}</div>
            <div className="ui hidden divider"></div>
            <div className="ui stackable three columns grid">
              <div className="column">
                <h3 className="ui header">
                  {en
                    ? "APIs for 2D Locomotion"
                    : "平面上での移動指示のためのAPI"}
                </h3>

                <p>
                  {
                    "Phybots assumes a simple and inexpensive hardware setup of a camera looking down on the floor and visual markers attached to the top of physical objects. This hardware setup can easily be deployed to everyday spaces such as a working desk, a dining table or in a kitchen or living room."
                  }
                </p>

                <p>
                  {
                    "Given the hardware setup, Phybots provides APIs for two-dimensional localization and locomotion of floor-based robotic things. These APIs are similar to those for graphical applications in which object positions are defined by screen coordinates, and support moving to a goal, pushing an object toward a goal, tracing a path, and other custom behavior by specifying a vector field."
                  }
                </p>

                {!en ? (
                  <>
                    <p>
                      <Translate path={"phybots/index.pug"} />
                    </p>
                  </>
                ) : null}
              </div>
              <div className="column">
                <h3 className="ui header">
                  {en
                    ? "Centralized and Extensible Architecture"
                    : "中央集権・拡張容易なアーキテクチャ"}
                </h3>

                <p>
                  {
                    "Phybots APIs are built on top of a centralized and extensible software architecture that runs on one personal computer and manages all physical objects of interest."
                  }
                </p>

                <p>
                  {
                    "The programmer has direct access to these objects including cameras, robotic things, and entities with visual markers as instances of the "
                  }
                  <i>{"Camera"}</i>
                  {", "}
                  <i>{"Robot"}</i>
                  {" and "}
                  <i>{"Entity"}</i>
                  {
                    " interfaces, respectively. Time-consuming tasks including locomotion APIs are represented by "
                  }
                  <i>{"Task"}</i>
                  {" interface."}
                </p>

                <p>
                  {
                    "The toolkit can be easily extended on top of these software stacks to support other types of sensors, roobts, and tasks. In addition, a "
                  }
                  <i>{"Workflow"}</i>
                  {" class represents a directed graph consisting of a set of "}
                  <i>{"Robot"}</i>
                  {" and "}
                  <i>{"Task"}</i>
                  {
                    " instances, and enables higher-level task management such as handling multiple tasks by one robot in serial or by two robots in parallel."
                  }
                </p>

                {!en ? (
                  <>
                    <p>
                      <Translate path={"phybots/index.pug"} />
                    </p>
                  </>
                ) : null}
              </div>
              <div className="column">
                <h3 className="ui header">
                  {en ? "Runtime Debug Tool" : "ランタイムデバッグツール"}
                </h3>

                <p>
                  {"Phybots provides a "}
                  <i>{"runtime debug tool"}</i>
                  {
                    " that supports a test phase, beyond the programming phase, as an essential part of the prototyping process."
                  }
                </p>

                <p>
                  {
                    "In the robot application test phase, when the robot fails to accomplish its task, the user usually has to order the same task to be performed again. Because it is too costly to restart a test run for each error, the programmer often wants to fix the error right away without restarting."
                  }
                </p>

                <p>
                  {"To support this workflow, a graphical "}
                  <i>{"runtime debug tool"}</i>
                  {
                    " enables API parameter reconfiguration, restart, pause, or resume of the interaction at run-time. For example, when the robotic thing fails to move to a desired destination, the programmer can change the threshold of the marker detection algorithm by dragging a slider and then give the robot another try."
                  }
                </p>

                {!en ? (
                  <>
                    <p>
                      <Translate path={"phybots/index.pug"} />
                    </p>
                  </>
                ) : null}
              </div>
            </div>
            <div className="ui hidden divider"></div>
            <p>
              <SiteLink
                className="ui fluid image"
                href={href(`${rootPath}phybots/debug-tools.png`)}
              >
                <SiteImage src={`${rootPath}phybots/debug-tools.png`} />
              </SiteLink>
            </p>
            <div className="caption">
              {en
                ? "Overview of the Phybots runtime debug tool"
                : "ランタイムデバッグツールの概観"}
            </div>
          </div>
        </section>

        {!en ? (
          <>
            <div className="ui hidden divider"></div>

            <section id={"vision"}>
              <h2 className="ui header">{"未来ビジョン"}</h2>
              <div className="ui basic segment"></div>
            </section>
          </>
        ) : null}

        <div className="ui hidden divider"></div>

        <ProjectPublications
          project={"phybots"}
          majorPublication={"dis2012-kato-phybots"}
        />
      </SiteLayout>
    </>
  );
}

export function getStaticProps() {
  return { props: withPageImages(Page, { pageData: getPageData("/phybots/", {"projects": ["phybots"], "publications": ["dis2012-kato-phybots"], "publicationProjects": ["phybots"]}) }, "/phybots/") };
}
