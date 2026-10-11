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

/** React page migrated from ja/openpool/index.pug; edit this TSX source directly. */
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

  p = projectsTable["openpool"];
  title = p.getTitle(lang);
  me = p.project + "/";
  var additionalLabels = [
    '<span class="ui tiny green basic label"><i class="student icon"></i>SxSW \'13 Gaming Expo, Trade Show</span>',
  ];
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
                "People love playing games. Games have been a good way to build social relations with others. Therefore, studying the impact of digital augmentation on such experience has been an interesting research topic in the field of Human-Computer Interaction. Ishii et al. proposed PingPongPlus",
              )}
              <a href={href("#ppp")}>{richText("[1]")}</a>
              {richText(
                ", a novel way of augmenting ping pong table with a set of microphone array in 1999. The project later became an open-source project in 2011",
              )}
              <a href={href("#pppp")}>{richText("[2]")}</a>
              {richText(
                ", which needed some soldering to be deployed. We walk the same line with PingPongPlus, but with a billiard table and off-the-shelf hardware products.",
              )}
            </p>
            <p>
              {richText(
                'In this page, we introduce OpenPool, an open-source project that augments a standard billiard table with the cutting-edge computing technologies to provide the "super-billiard" experience.',
              )}
            </p>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={attribute("implementation")}>
          <h2 className="ui header">
            {plainText(en ? "Implementation" : "実装")}
          </h2>
          <div className="ui basic segment">
            <p>
              {richText(
                "OpenPool is an open-source project that aims to be installed at as many places as possible so that more people can enjoy the super-billiard experience. Its hardware is easy to be deployed at any billiard tables and its software is easy to be installed on personal computers running Windows or Mac.",
              )}
            </p>
            <p>
              {richText(
                "Furthermore, the basic features of the software such as ball detection and pocket detection are exposed as simple APIs of Processing libraries. Therefore, the programmer can easily design his/her own super-billiard experience. There are currently two libraries: base library and pocket detection library. In the following subsections, we describe these libraries in detail.",
              )}
            </p>
            <h3 className="ui header">{richText("OpenPool core library")}</h3>
            <pre className="prettyprint linenums">
              {richText("OpenPool op = new OpenPool(this);")}
              {richText("\n")}
              {richText("")}
              {richText("\n")}
              {richText("op.updateBalls();")}
              {richText("\n")}
              {richText("for (int i = 0; i &lt; op.balls; i ++) {")}
              {richText("\n")}
              {richText("  Ball ball = op.balls[i];")}
              {richText("\n")}
              {richText("  ellipse(ball.x, ball.y, 10, 10);")}
              {richText("\n")}
              {richText("  if (ball.prev != null) {")}
              {richText("\n")}
              {richText("    line(ball.x, ball.y, ball.prev.x, ball.prev.y);")}
              {richText("\n")}
              {richText("  }")}
              {richText("\n")}
              {richText("}")}
            </pre>
            <p>
              {richText(
                'Minimum hardware setup of OpenPool consists of off-the-shelf products: two depth cameras ("Kinect" by Microsoft), a projector and a personal computer. Given the hardware setup, OpenPool base library computes ball positions and provide the information through simple APIs.',
              )}
            </p>
            <p>
              {richText(
                "The computation is a simple image processing pipeline. First, with some callibrations of the camera positions, two depth images from the cameras form one depth map on the billiard table. Then, the ball positions on the table are estimated from the depth map by background substraction and blob detection.",
              )}
            </p>
            <h3 className="ui header">
              {richText("OpenPool pocket detection library")}
            </h3>
            <pre className="prettyprint linenums">
              {richText(
                'OpenpoolBoostPocket p = new OpenpoolBoostPocket(this, "COM4");',
              )}
              {richText("\n")}
              {richText("p.start();")}
              {richText("\n")}
              {richText("")}
              {richText("\n")}
              {richText("int[] pockets = p.getPockets();")}
              {richText("\n")}
              {richText("for (int i = 0; i &lt; pockets.length; i++) {")}
              {richText("\n")}
              {richText("  if (pockets[i] &gt; 0) {")}
              {richText("\n")}
              {richText("    print(pockets[i]);")}
              {richText("\n")}
              {richText('    print(" balls fell in the pocket no.");')}
              {richText("\n")}
              {richText("    println(i + 1);")}
              {richText("\n")}
              {richText("  }")}
              {richText("\n")}
              {richText("}")}
            </pre>
            <p>
              {richText(
                "With the base library, the programmer can design a basic effect that responds to the ball positions. Though, the ball detection is not always stable due to environmental noise. This stability issue makes it difficult to design effect that fires when a ball falls into a pocket.",
              )}
            </p>
            <p>
              {richText(
                'To address the issue, we provide a set of additional hardware and software named "boost kit." The hardware is implemented with mbed and some basic sensors, whose circuit design is published as an open-hardware project. Future work includes devleopment of more boost kits for various purposes such as collision detection.',
              )}
            </p>
          </div>
        </section>
      </>
    );
  }
  function renderVideos(): ReactNode {
    return (
      <>
        <section id={attribute("videos")}>
          <div className="ui embed">
            <iframe
              src={
                "https://www.facebook.com/video/embed?video_id=608850275796418"
              }
              frameBorder={"0"}
              allowFullScreen={true}
            ></iframe>
          </div>
          <div className="caption">
            {richText("Playing 8 ball pool with OpenPool")}
          </div>
          <div className="ui hidden divider"></div>
          <div className="ui embed">
            <iframe
              src={
                "https://www.facebook.com/video/embed?video_id=614971478517631"
              }
              frameBorder={"0"}
              allowFullScreen={true}
            ></iframe>
          </div>
          <div className="caption">
            {richText("Collision detection between balls and virtual objects")}
          </div>
          <div className="ui hidden divider"></div>
          <div className="ui embed">
            <iframe
              src={
                "https://www.facebook.com/video/embed?video_id=615808058433973"
              }
              frameBorder={"0"}
              allowFullScreen={true}
            ></iframe>
          </div>
          <div className="caption">
            {richText(
              "Animation effect triggered by an OpenPool pocket detection sensor",
            )}
          </div>
        </section>
        <div className="ui divider"></div>
        <section id={attribute("press")}></section>
        <h2 className="ui header">
          {plainText(en ? "Media Coverage" : "メディア掲載")}
        </h2>
        <div
          className="ui basic segment"
          style={style("margin-bottom: -0.5em")}
        >
          <div className="ui stackable grid">
            <div className="three columns row">
              {(() => {
                const children234: ReactNode[] = [];
                for (const e of mediaList.filter(
                  (e) =>
                    !e.private &&
                    !e.draft &&
                    (e.projects || []).indexOf("openpool") >= 0,
                )) {
                  children234.push(
                    <>
                      <div
                        className="column"
                        style={style("margin-bottom: 0.5em")}
                      >
                        <a
                          className="item"
                          href={href(e.archive || e.permalink)}
                          title={e.text.en}
                        >
                          <img
                            className="ui fluid image"
                            src={`${rootPath}openpool/${e.media.en
                              .split(/[\s.()]+/g)
                              .join("")
                              .toLowerCase()}.png`}
                            alt={e.media.en}
                          />
                        </a>
                      </div>
                    </>,
                  );
                }
                return keyed(children234);
              })()}
            </div>
          </div>
        </div>
        <div className="ui divider"></div>
        <section id={attribute("related-work")}>
          <h2 className="ui header">
            {plainText(en ? "Related Work" : "関連研究")}
          </h2>
          <ol>
            <li id={attribute("ppp")}>
              <a
                href={href(
                  "https://tangible.media.mit.edu/project/pingpongplus/",
                )}
              >
                {richText("PingPongPlus")}
              </a>
            </li>
            <li id={attribute("pppp")}>
              <a
                href={href(
                  "https://tangible.media.mit.edu/project/pingpongplusplus/",
                )}
              >
                {richText("PingPong++")}
              </a>
            </li>
          </ol>
        </section>
      </>
    );
  }
  return (
    <>
      <SiteLayout context={context}>
        {(() => {
          const children235: ReactNode[] = [];
          additionalLabels.push(
            '<span class="ui tiny red basic label"><i class="trophy icon"></i>\'13 グッドデザイン賞</span>',
          );
          children235.push(
            <>{content.renderProjectHeader("openpool", additionalLabels)}</>,
          );
          children235.push(
            <>
              <div className="ui message">
                <p>
                  {richText(
                    "OpenPool is a collaborative open-source project developed at ",
                  )}
                  <a href={href("https://github.com/openpool/openpool-core")}>
                    {richText("GitHub")}
                  </a>
                  {richText(". The official site is ")}
                  <a href={href("http://www.openpool.cc/")}>
                    {richText("openpool.cc")}
                  </a>
                  {richText(".")}
                </p>
                <p>{content.renderTranslate("openpool/index.pug")}</p>
              </div>
            </>,
          );
          children235.push(
            <>
              <div className="ui hidden divider"></div>
            </>,
          );
          children235.push(
            <>
              <div className="ui stackable two columns grid">
                <div className="column">{renderBody()}</div>
                <div className="column">{renderVideos()}</div>
              </div>
            </>,
          );
          children235.push(
            <>
              <div className="ui hidden divider"></div>
            </>,
          );
          children235.push(
            <>
              {content.renderProjectPublications(
                "openpool",
                "gcce2013-kato-openpool",
              )}
            </>,
          );
          return keyed(children235);
        })()}
      </SiteLayout>
    </>
  );
}
