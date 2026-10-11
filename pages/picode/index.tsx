import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import { classNames, style, text as plainText, keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from picode/index.pug; edit this TSX source directly. */
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
  const content = createContentComponents(context);

  return (
    <>
      <SiteLayout context={context}>
        {(() => {
          const children128: ReactNode[] = [];
          children128.push(<>{content.renderProjectHeader("picode")}</>);
          children128.push(
            <>
              <div className="ui message">
                {richText("The project was implemented using the ")}
                <a href={href(`${basePath}phybots`)}>{richText("Phybots")}</a>
                {richText(
                  " library for creating robotic things and its source code is available on ",
                )}
                <a href={href("https://github.com/arcatdmz/picode/")}>{richText("GitHub")}</a>
                {richText("! The development was supported in part by ")}
                <a
                  href={href(
                    "https://web.archive.org/web/20160617171039/https://www.microsoft.com/ja-jp/ijarc/core/ifp_07_j_result.aspx",
                  )}
                >
                  {richText("Microsoft Research CORE 7 program (Japanese page)")}
                </a>
                {richText(".")}
              </div>
            </>,
          );
          children128.push(
            <>
              <div className="ui hidden divider"></div>
            </>,
          );
          children128.push(
            <>
              <section id={attribute("abstract")}>
                <h2 className="ui header">
                  <div className="content">{plainText(en ? "Abstract" : "概要")}</div>
                </h2>
                <div className="ui basic segment">
                  <p>
                    {richText(
                      "Current programming environments use textual or symbolic representations. While these representations are good at describing logical processes, they are not appropriate for representing human and robot posture data which is necessary for handing gesture input and controlling robots.",
                    )}
                  </p>
                  <p>
                    {richText(
                      "To address this issue, we propose a text-based development environment integrated with visual representations: photos of human and robots. With our development environment, the user first takes a photo to bind it to a posture data. Then, s/he drag-and-drops the photo to the code editor, where it is shown as an inline image.",
                    )}
                  </p>
                </div>
              </section>
            </>,
          );
          children128.push(
            <>
              <div className="ui hidden divider"></div>
            </>,
          );
          children128.push(
            <>
              <section id={attribute("presentations")}>
                <h2 className="ui header">{plainText(en ? "Presentation materials" : "発表内容")}</h2>
                <div className="ui basic segment">
                  <div className="ui stackable two columns grid">
                    <div className="column">
                      <h3 className="ui header">{richText("CHI 2013 Fast-forward")}</h3>
                      {content.renderEmbedYoutube("//www.youtube.com/embed/NCou4Q1STE8")}
                      <div className="caption">
                        <div className="ui horizontal list">
                          <div className="item">
                            <a href={href("//www.youtube.com/watch?v=NCou4Q1STE8")}>
                              <i className="youtube icon"></i>
                              {richText("Fast-forward")}
                            </a>
                          </div>
                          <div className="item">
                            <a href={href("//www.youtube.com/watch?v=cQv0-4f8LEA")}>
                              <i className="youtube icon"></i>
                              {richText("Full version")}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      {(() => {
                        const children129: ReactNode[] = [];
                        children129.push(
                          <>
                            <h3 className="ui header">
                              {richText("CHI 2013 ")}
                              {plainText(en ? "Slides" : "発表スライド")}
                            </h3>
                          </>,
                        );
                        children129.push(
                          <>
                            <div
                              className="ui embed"
                              data-url={publicationsTable[p.publication].entryTags.slides}
                              data-placeholder={`${rootPath}images/background-eee.png`}
                              data-icon={"video play outline"}
                            ></div>
                          </>,
                        );
                        children129.push(
                          <>
                            <div className="caption">
                              <div className="ui horizontal list">
                                <div className="item">
                                  <a href={href(publicationsTable[p.publication].entryTags.slides)}>
                                    <i className="download icon"></i>
                                    {plainText(en ? "Download" : "ダウンロード")}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </>,
                        );
                        if (!en) {
                          children129.push(
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
                        return keyed(children129);
                      })()}
                    </div>
                  </div>
                </div>
              </section>
            </>,
          );
          children128.push(
            <>
              <div className="ui hidden divider"></div>
            </>,
          );
          children128.push(
            <>
              <section>
                <h2 className="ui header">{richText("Picode IDE")}</h2>
                <div className="ui basic segment">
                  <p>
                    {richText(
                      "Our prototype implementation consists of three main components: the code editor, the pose library, and the preview window. First, the user takes a photo of a human or robot in the preview window. At the same time, posture data is captured and the dataset is stored in the pose library. Next, s/he drag-and-drops the photo from the pose library into the code editor, where the photo is shown inline. Then, s/he can run the application. S/he can also distribute the source code bundled with the referenced datasets so that others can run the same application on our development environment.",
                    )}
                  </p>
                  <p>
                    {richText(
                      "During the coding phase, the programmer can benefit from a software library tightly coupled with the IDE. The library provides a set of API that enables easy control of robots. The main functions are shown below. Other APIs are listed in ",
                    )}
                    <a
                      href={href(
                        `${rootPath}picode/docs/?com/phybots/picode/api/package-summary.html`,
                      )}
                    >
                      {richText("Javadoc")}
                    </a>
                    {richText(".")}
                  </p>
                </div>
                <div className="ui stackable two columns grid">
                  <div className="column">
                    <a className="ui fluid image" href={href(`${rootPath}picode/picode-ide.jpg`)}>
                      <img src={`${rootPath}picode/picode-ide.jpg`} alt={"Overview"} />
                    </a>
                    <div className="caption">
                      {plainText(en ? "Overview of the Picode IDE" : "Picode IDEの概観")}
                    </div>
                  </div>
                  <div className="column">
                    <dl>
                      <dt>{richText("<strong>Pose</strong> Robot.getPose()")}</dt>
                      <dd>{richText("returns the current pose data.")}</dd>
                      <dt>{richText("<strong>float</strong> Pose.distance(Pose pose)")}</dt>
                      <dd>
                        {richText("calculates the distance between the two poses. [0.0-1.0]")}
                      </dd>
                      <dt>
                        {richText("<strong>boolean</strong> Pose.eq(Pose pose, float threshold)")}
                      </dt>
                      <dd>
                        {richText(
                          "returns whether the two poses can be thought of as identical or not. (returns whether the distance between the two poses is less than the threshold or not.)",
                        )}
                      </dd>
                      <dt>{richText("<strong>boolean</strong> Robot.setPose(Pose pose)")}</dt>
                      <dd>{richText("set the current pose to the specified data.")}</dd>
                      <dt>{richText("<strong>Action</strong> Robot.action()")}</dt>
                      <dd>{richText("start building an action for the robot.")}</dd>
                      <dt>{richText("<strong>Action</strong> Action.pose(Pose pose)")}</dt>
                      <dd>{richText("add this pose to the end of this action.")}</dd>
                      <dt>{richText("<strong>Action</strong> Action.stay(int ms)")}</dt>
                      <dd>{richText("wait for the specified time at the end of this action.")}</dd>
                      <dt>{richText("<strong>ActionResult</strong> Action.play()")}</dt>
                      <dd>{richText("play this action.")}</dd>
                    </dl>
                  </div>
                </div>
              </section>
            </>,
          );
          if (!en) {
            children128.push(
              <>
                <div className="ui hidden divider"></div>
              </>,
            );
            children128.push(
              <>
                <section id={attribute("vision")}>
                  <h2 className="ui header">{richText("未来ビジョン")}</h2>
                  <div className="ui basic segment"></div>
                </section>
              </>,
            );
          }
          children128.push(
            <>
              <div className="ui hidden divider"></div>
            </>,
          );
          children128.push(
            <>{content.renderProjectPublications("picode", "chi2013-kato-picode")}</>,
          );
          return keyed(children128);
        })()}
      </SiteLayout>
    </>
  );
}
