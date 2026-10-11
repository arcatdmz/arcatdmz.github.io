import {
  EmbedYoutube,
  ProjectHeader,
  ProjectPublications,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";

import { href } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from picode/index.pug; edit this TSX source directly. */
export default function Page() {
  const data = getSiteData();
  const { projectsTable, publicationsTable, moment, rootPath } = data;
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

  p = projectsTable["picode"];
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
      <SiteLayout context={context}>
        <ProjectHeader project={"picode"} />

        <div className="ui message">
          {"The project was implemented using the "}
          <SiteLink href={href(`${basePath}phybots`)}>{"Phybots"}</SiteLink>
          {
            " library for creating robotic things and its source code is available on "
          }
          <a href={"https://github.com/arcatdmz/picode/"}>{"GitHub"}</a>
          {"! The development was supported in part by "}
          <a
            href={
              "https://web.archive.org/web/20160617171039/https://www.microsoft.com/ja-jp/ijarc/core/ifp_07_j_result.aspx"
            }
          >
            {"Microsoft Research CORE 7 program (Japanese page)"}
          </a>
          {"."}
        </div>

        <div className="ui hidden divider"></div>

        <section id={"abstract"}>
          <h2 className="ui header">
            <div className="content">{en ? "Abstract" : "概要"}</div>
          </h2>
          <div className="ui basic segment">
            <p>
              {
                "Current programming environments use textual or symbolic representations. While these representations are good at describing logical processes, they are not appropriate for representing human and robot posture data which is necessary for handing gesture input and controlling robots."
              }
            </p>
            <p>
              {
                "To address this issue, we propose a text-based development environment integrated with visual representations: photos of human and robots. With our development environment, the user first takes a photo to bind it to a posture data. Then, s/he drag-and-drops the photo to the code editor, where it is shown as an inline image."
              }
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
                <h3 className="ui header">{"CHI 2013 Fast-forward"}</h3>
                <EmbedYoutube src={"//www.youtube.com/embed/NCou4Q1STE8"} />
                <div className="caption">
                  <div className="ui horizontal list">
                    <div className="item">
                      <a href={"//www.youtube.com/watch?v=NCou4Q1STE8"}>
                        <i className="youtube icon"></i>
                        {"Fast-forward"}
                      </a>
                    </div>
                    <div className="item">
                      <a href={"//www.youtube.com/watch?v=cQv0-4f8LEA"}>
                        <i className="youtube icon"></i>
                        {"Full version"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <h3 className="ui header">
                  {"CHI 2013 "}
                  {en ? "Slides" : "発表スライド"}
                </h3>

                <div
                  className="ui embed"
                  data-url={publicationsTable[p.publication].entryTags.slides}
                  data-placeholder={`${rootPath}images/background-eee.png`}
                  data-icon={"video play outline"}
                ></div>

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

        <section>
          <h2 className="ui header">{"Picode IDE"}</h2>
          <div className="ui basic segment">
            <p>
              {
                "Our prototype implementation consists of three main components: the code editor, the pose library, and the preview window. First, the user takes a photo of a human or robot in the preview window. At the same time, posture data is captured and the dataset is stored in the pose library. Next, s/he drag-and-drops the photo from the pose library into the code editor, where the photo is shown inline. Then, s/he can run the application. S/he can also distribute the source code bundled with the referenced datasets so that others can run the same application on our development environment."
              }
            </p>
            <p>
              {
                "During the coding phase, the programmer can benefit from a software library tightly coupled with the IDE. The library provides a set of API that enables easy control of robots. The main functions are shown below. Other APIs are listed in "
              }
              <SiteLink
                href={href(
                  `${rootPath}picode/docs/?com/phybots/picode/api/package-summary.html`,
                )}
              >
                {"Javadoc"}
              </SiteLink>
              {"."}
            </p>
          </div>
          <div className="ui stackable two columns grid">
            <div className="column">
              <SiteLink
                className="ui fluid image"
                href={href(`${rootPath}picode/picode-ide.jpg`)}
              >
                <img
                  src={`${rootPath}picode/picode-ide.jpg`}
                  alt={"Overview"}
                />
              </SiteLink>
              <div className="caption">
                {en ? "Overview of the Picode IDE" : "Picode IDEの概観"}
              </div>
            </div>
            <div className="column">
              <dl>
                <dt>
                  <strong>{"Pose"}</strong>
                  {" Robot.getPose()"}
                </dt>
                <dd>{"returns the current pose data."}</dd>
                <dt>
                  <strong>{"float"}</strong>
                  {" Pose.distance(Pose pose)"}
                </dt>
                <dd>
                  {"calculates the distance between the two poses. [0.0-1.0]"}
                </dd>
                <dt>
                  <strong>{"boolean"}</strong>
                  {" Pose.eq(Pose pose, float threshold)"}
                </dt>
                <dd>
                  {
                    "returns whether the two poses can be thought of as identical or not. (returns whether the distance between the two poses is less than the threshold or not.)"
                  }
                </dd>
                <dt>
                  <strong>{"boolean"}</strong>
                  {" Robot.setPose(Pose pose)"}
                </dt>
                <dd>{"set the current pose to the specified data."}</dd>
                <dt>
                  <strong>{"Action"}</strong>
                  {" Robot.action()"}
                </dt>
                <dd>{"start building an action for the robot."}</dd>
                <dt>
                  <strong>{"Action"}</strong>
                  {" Action.pose(Pose pose)"}
                </dt>
                <dd>{"add this pose to the end of this action."}</dd>
                <dt>
                  <strong>{"Action"}</strong>
                  {" Action.stay(int ms)"}
                </dt>
                <dd>
                  {"wait for the specified time at the end of this action."}
                </dd>
                <dt>
                  <strong>{"ActionResult"}</strong>
                  {" Action.play()"}
                </dt>
                <dd>{"play this action."}</dd>
              </dl>
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
          project={"picode"}
          majorPublication={"chi2013-kato-picode"}
        />
      </SiteLayout>
    </>
  );
}
