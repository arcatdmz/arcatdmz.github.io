import {
  Divider,
  Embed,
  Grid,
  GridColumn,
  GridRow,
  Header,
  Icon,
  Label,
  ListItem,
  Message,
  Segment,
} from "react-fomantic-ui";

import { LocalizedContent } from "@/site/components/LocalizedContent";

import { SiteImage } from "@/site/components/SiteImage";
import { Fragment, type ReactNode } from "react";
import {
  ProjectHeader,
  ProjectPublications,
  Translate,
} from "@/site/components/ContentComponents";
import { SiteLink } from "@/site/components/SiteLink";
import { href } from "@/site/rendering";
import {
  hydratePageData,
  type PageDataProps,
  type SiteData,
} from "@/site/page-data";
import { SiteLayout } from "@/site/components/SiteLayout";
import { type SiteContext } from "@/site/types";

/** Shared page template. Japanese overrides: message, project-header. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projectsTable, mediaList, rootPath } = data;
  const lang = pageData.language;
  const en = lang === "en";
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
    <Label as="span" size="tiny" color="green" basic>
      <Icon name="student" />
      {"SxSW '13 Gaming Expo, Trade Show"}
    </Label>,
  ];
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
  function renderBody(): ReactNode {
    return (
      <>
        <section id={"abstract"}>
          <Header as="h2">{en ? "Abstract" : "概要"}</Header>
          <Segment basic>
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
          </Segment>
        </section>
        <Divider hidden />
        <section id={"implementation"}>
          <Header as="h2">{en ? "Implementation" : "実装"}</Header>
          <Segment basic>
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
            <Header as="h3">{"OpenPool core library"}</Header>
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
            <Header as="h3">{"OpenPool pocket detection library"}</Header>
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
          </Segment>
        </section>
      </>
    );
  }
  function renderVideos(): ReactNode {
    return (
      <>
        <section id={"videos"}>
          <Embed active icon={false}>
            <iframe
              src={
                "https://www.facebook.com/video/embed?video_id=608850275796418"
              }
              frameBorder={"0"}
              allowFullScreen={true}
            ></iframe>
          </Embed>
          <div className="caption">{"Playing 8 ball pool with OpenPool"}</div>
          <Divider hidden />
          <Embed active icon={false}>
            <iframe
              src={
                "https://www.facebook.com/video/embed?video_id=614971478517631"
              }
              frameBorder={"0"}
              allowFullScreen={true}
            ></iframe>
          </Embed>
          <div className="caption">
            {"Collision detection between balls and virtual objects"}
          </div>
          <Divider hidden />
          <Embed active icon={false}>
            <iframe
              src={
                "https://www.facebook.com/video/embed?video_id=615808058433973"
              }
              frameBorder={"0"}
              allowFullScreen={true}
            ></iframe>
          </Embed>
          <div className="caption">
            {
              "Animation effect triggered by an OpenPool pocket detection sensor"
            }
          </div>
        </section>
        <Divider />
        <section id={"press"}></section>
        <Header as="h2">{en ? "Media Coverage" : "メディア掲載"}</Header>
        <Segment basic style={{ marginBottom: "-0.5em" }}>
          <Grid stackable>
            <GridRow columns={3}>
              {mediaList
                .filter(
                  (e) =>
                    !e.private &&
                    !e.draft &&
                    (e.projects || []).indexOf("openpool") >= 0,
                )
                .map((e, itemIndex) => (
                  <Fragment key={itemIndex}>
                    <GridColumn style={{ marginBottom: "0.5em" }}>
                      <ListItem
                        role="link"
                        as={SiteLink}
                        href={href(e.archive || e.permalink)}
                        title={e.text.en}
                      >
                        <SiteImage
                          ui
                          fluid
                          src={`${rootPath}openpool/${e.media.en
                            .split(/[\s.()]+/g)
                            .join("")
                            .toLowerCase()}.png`}
                          alt={e.media.en}
                        />
                      </ListItem>
                    </GridColumn>
                  </Fragment>
                ))}
            </GridRow>
          </Grid>
        </Segment>
        <Divider />
        <section id={"related-work"}>
          <Header as="h2">{en ? "Related Work" : "関連研究"}</Header>
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
  function renderMessage() {
    return (
      <>
        {"OpenPool is a collaborative open-source project developed at "}
        <a href="https://github.com/openpool/openpool-core">GitHub</a>
        {". The official site is "}
        <a href="http://www.openpool.cc/">openpool.cc</a>
        {"."}
      </>
    );
  }
  return (
    <SiteLayout context={context}>
      <ProjectHeader
        project="openpool"
        additionalLabels={
          en
            ? additionalLabels
            : [
                ...additionalLabels,
                <Label as="span" size="tiny" color="red" basic>
                  <Icon name="trophy" />
                  {"'13 グッドデザイン賞"}
                </Label>,
              ]
        }
      />
      <Message>
        <LocalizedContent
          ja={
            <>
              <p>{renderMessage()}</p>
              <p>
                <Translate path="openpool/index.pug" />
              </p>
            </>
          }
        >
          {renderMessage()}
        </LocalizedContent>
      </Message>
      <Divider hidden />
      <Grid stackable columns={2}>
        <GridColumn>{renderBody()}</GridColumn>
        <GridColumn>{renderVideos()}</GridColumn>
      </Grid>
      <Divider hidden />
      <ProjectPublications
        project="openpool"
        majorPublication="gcce2013-kato-openpool"
      />
    </SiteLayout>
  );
}
