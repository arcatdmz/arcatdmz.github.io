import { Fragment } from "react";
import {
  ProjectHeader,
  ProjectPublications,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import type { ReactNode } from "react";

import { href } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout } from "@/site/components/SiteLayout";

import type { SiteContext } from "@/site/types";

/** React page migrated from openpool/index.pug; edit this TSX source directly. */
export default function Page() {
  const data = getSiteData();
  const { projectsTable, mediaList, moment, rootPath } = data;
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
  function renderBody(): ReactNode {
    return (
      <>
        <section id={"abstract"}>
          <h2 className="ui header">{en ? "Abstract" : "概要"}</h2>
          <div className="ui basic segment">
            <p>
              {
                "People love playing games. Games have been a good way to build social relations with others. Therefore, studying the impact of digital augmentation on such experience has been an interesting research topic in the field of Human-Computer Interaction. Ishii et al. proposed PingPongPlus"
              }
              <a href={"#ppp"}>{"[1]"}</a>
              {
                ", a novel way of augmenting ping pong table with a set of microphone array in 1999. The project later became an open-source project in 2011"
              }
              <a href={"#pppp"}>{"[2]"}</a>
              {
                ", which needed some soldering to be deployed. We walk the same line with PingPongPlus, but with a billiard table and off-the-shelf hardware products."
              }
            </p>
            <p>
              {
                'In this page, we introduce OpenPool, an open-source project that augments a standard billiard table with the cutting-edge computing technologies to provide the "super-billiard" experience.'
              }
            </p>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={"implementation"}>
          <h2 className="ui header">{en ? "Implementation" : "実装"}</h2>
          <div className="ui basic segment">
            <p>
              {
                "OpenPool is an open-source project that aims to be installed at as many places as possible so that more people can enjoy the super-billiard experience. Its hardware is easy to be deployed at any billiard tables and its software is easy to be installed on personal computers running Windows or Mac."
              }
            </p>
            <p>
              {
                "Furthermore, the basic features of the software such as ball detection and pocket detection are exposed as simple APIs of Processing libraries. Therefore, the programmer can easily design his/her own super-billiard experience. There are currently two libraries: base library and pocket detection library. In the following subsections, we describe these libraries in detail."
              }
            </p>
            <h3 className="ui header">{"OpenPool core library"}</h3>
            <pre className="prettyprint linenums">
              {"OpenPool op = new OpenPool(this);"}
              {"\n"}

              {"\n"}
              {"op.updateBalls();"}
              {"\n"}
              {"for (int i = 0; i < op.balls; i ++) {"}
              {"\n"}
              {"  Ball ball = op.balls[i];"}
              {"\n"}
              {"  ellipse(ball.x, ball.y, 10, 10);"}
              {"\n"}
              {"  if (ball.prev != null) {"}
              {"\n"}
              {"    line(ball.x, ball.y, ball.prev.x, ball.prev.y);"}
              {"\n"}
              {"  }"}
              {"\n"}
              {"}"}
            </pre>
            <p>
              {
                'Minimum hardware setup of OpenPool consists of off-the-shelf products: two depth cameras ("Kinect" by Microsoft), a projector and a personal computer. Given the hardware setup, OpenPool base library computes ball positions and provide the information through simple APIs.'
              }
            </p>
            <p>
              {
                "The computation is a simple image processing pipeline. First, with some callibrations of the camera positions, two depth images from the cameras form one depth map on the billiard table. Then, the ball positions on the table are estimated from the depth map by background substraction and blob detection."
              }
            </p>
            <h3 className="ui header">{"OpenPool pocket detection library"}</h3>
            <pre className="prettyprint linenums">
              {'OpenpoolBoostPocket p = new OpenpoolBoostPocket(this, "COM4");'}
              {"\n"}
              {"p.start();"}
              {"\n"}

              {"\n"}
              {"int[] pockets = p.getPockets();"}
              {"\n"}
              {"for (int i = 0; i < pockets.length; i++) {"}
              {"\n"}
              {"  if (pockets[i] > 0) {"}
              {"\n"}
              {"    print(pockets[i]);"}
              {"\n"}
              {'    print(" balls fell in the pocket no.");'}
              {"\n"}
              {"    println(i + 1);"}
              {"\n"}
              {"  }"}
              {"\n"}
              {"}"}
            </pre>
            <p>
              {
                "With the base library, the programmer can design a basic effect that responds to the ball positions. Though, the ball detection is not always stable due to environmental noise. This stability issue makes it difficult to design effect that fires when a ball falls into a pocket."
              }
            </p>
            <p>
              {
                'To address the issue, we provide a set of additional hardware and software named "boost kit." The hardware is implemented with mbed and some basic sensors, whose circuit design is published as an open-hardware project. Future work includes devleopment of more boost kits for various purposes such as collision detection.'
              }
            </p>
          </div>
        </section>
      </>
    );
  }
  function renderVideos(): ReactNode {
    return (
      <>
        <section id={"videos"}>
          <div className="ui embed">
            <iframe
              src={
                "https://www.facebook.com/video/embed?video_id=608850275796418"
              }
              frameBorder={"0"}
              allowFullScreen={true}
            ></iframe>
          </div>
          <div className="caption">{"Playing 8 ball pool with OpenPool"}</div>
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
            {"Collision detection between balls and virtual objects"}
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
            {
              "Animation effect triggered by an OpenPool pocket detection sensor"
            }
          </div>
        </section>
        <div className="ui divider"></div>
        <section id={"press"}></section>
        <h2 className="ui header">{en ? "Media Coverage" : "メディア掲載"}</h2>
        <div className="ui basic segment" style={{ marginBottom: "-0.5em" }}>
          <div className="ui stackable grid">
            <div className="three columns row">
              {mediaList
                .filter(
                  (e) =>
                    !e.private &&
                    !e.draft &&
                    (e.projects || []).indexOf("openpool") >= 0,
                )
                .map((e, itemIndex) => (
                  <Fragment key={itemIndex}>
                    <div className="column" style={{ marginBottom: "0.5em" }}>
                      <SiteLink
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
                      </SiteLink>
                    </div>
                  </Fragment>
                ))}
            </div>
          </div>
        </div>
        <div className="ui divider"></div>
        <section id={"related-work"}>
          <h2 className="ui header">{en ? "Related Work" : "関連研究"}</h2>
          <ol>
            <li id={"ppp"}>
              <a href={"https://tangible.media.mit.edu/project/pingpongplus/"}>
                {"PingPongPlus"}
              </a>
            </li>
            <li id={"pppp"}>
              <a
                href={
                  "https://tangible.media.mit.edu/project/pingpongplusplus/"
                }
              >
                {"PingPong++"}
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
        <ProjectHeader
          project={"openpool"}
          additionalLabels={additionalLabels}
        />
        <div className="ui message">
          {"OpenPool is a collaborative open-source project developed at "}
          <a href={"https://github.com/openpool/openpool-core"}>{"GitHub"}</a>
          {". The official site is "}
          <a href={"http://www.openpool.cc/"}>{"openpool.cc"}</a>
          {"."}
        </div>
        <div className="ui hidden divider"></div>
        <div className="ui stackable two columns grid">
          <div className="column">{renderBody()}</div>
          <div className="column">{renderVideos()}</div>
        </div>
        <div className="ui hidden divider"></div>
        <ProjectPublications
          project={"openpool"}
          majorPublication={"gcce2013-kato-openpool"}
        />
      </SiteLayout>
    </>
  );
}
