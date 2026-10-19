import {
  Button,
  Divider,
  Feed,
  FeedContent,
  FeedDate,
  FeedEvent,
  FeedSummary,
  Grid,
  GridColumn,
  Header,
  HeaderContent,
  Icon,
  Image,
  Message,
  Segment,
} from "react-fomantic-ui";

import { SiteImage } from "@/site/components/SiteImage";
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

/** Shared page template. Both locales inherit the default content. */
export default function Page({ pageData }: PageDataProps) {
  const data = hydratePageData(pageData);
  const { projectsTable, rootPath } = data;
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

  p = projectsTable["live-tuning"];
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
        <div className="mobile hidden">
          <Image
            bordered
            size="small"
            floated="right"
            as="div"
            style={{ zIndex: "100", marginRight: "1em" }}
          >
            <SiteImage
              src={`${rootPath}live-tuning/live2016-kato-livetuning.jpg`}
            />
            <div className="caption">
              <Button
                role="link"
                fluid
                icon
                primary
                size="small"
                labelPosition="left"
                as={SiteLink}
                href={href(
                  `${rootPath}publications/live2016-kato-livetuning.pdf`,
                )}
              >
                <Icon name="book" />
                {"Paper"}
              </Button>
            </div>
          </Image>
        </div>
        <ProjectHeader project={"live-tuning"} />
        <Message>
          <p>
            {
              "This page provides summary and some graphical materials of the workshop paper that was presented at "
            }
            <a href={"https://2016.ecoop.org/track/LIVE-2016"}>
              {"ECOOP 2016 LIVE"}
            </a>
            {"."}
          </p>

          {!en ? (
            <>
              <p>
                <Translate path={"live-tuning/index.pug"} />
              </p>
            </>
          ) : null}
        </Message>
        <Divider hidden />
        <section id={"abstract"}>
          <Header as="h2">
            <HeaderContent>{en ? "Abstract" : "概要"}</HeaderContent>
          </Header>
          <Segment basic>
            <p>
              {
                "Live Programming allows programmers to gain information about the program continuously during its development. While it has been implemented in various integrated development environments (IDEs) for programmers, its interaction techniques such as slider widgets for continuous parameter tuning are comprehensible for people without any prior knowledge of programming and have been widely used for a long time."
              }
            </p>
            <p>
              {
                'In this paper, we aim to introduce prior work on Live Programming research from the interaction point of view and relate it to Human-Computer Interaction research. We then name the subset of Live Programming interaction that only involves changes in constant values "Live Tuning." Our example IDEs that implement both Live Programming and Live Tuning interactions are showcased, followed by the discussion on the possible future direction of programming experience (PX) research.'
              }
            </p>
          </Segment>
        </section>
        <section id={"live-tuning-comparison"}>
          <Segment basic>
            <Grid stackable columns={2}>
              <GridColumn>
                <Header as="h2">{"Live Programming"}</Header>
                <p style={{ position: "relative" }}>
                  <a
                    id={"live-programming"}
                    className="live-preview"
                    tabIndex={0}
                  >
                    <SiteImage
                      ui
                      fluid
                      src={`${rootPath}live-tuning/live-programming-environment.png`}
                      style={{
                        position: "absolute",
                        zIndex: "10",
                      }}
                      className="hover"
                    />
                    <SiteImage
                      ui
                      fluid
                      src={`${rootPath}live-tuning/live-programming-environment-shadow.png`}
                      style={{ zIndex: "5" }}
                    />
                  </a>
                </p>
                <ul>
                  <li>
                    {"Interaction design for "}
                    <strong>{"programmers"}</strong>
                    {", typically built in development environments"}
                  </li>
                  <li>{"Prior knowledge of programming is required."}</li>
                  <li>{"The entire programs are always live and editable."}</li>
                  <li>
                    {
                      "The programmer has full control and is responsible for every aspect of program details."
                    }
                  </li>
                </ul>
              </GridColumn>
              <GridColumn>
                <Header as="h2">{"Live Tuning"}</Header>
                <p style={{ position: "relative" }}>
                  <a id={"live-tuning"} className="live-preview" tabIndex={0}>
                    <SiteImage
                      ui
                      fluid
                      src={`${rootPath}live-tuning/live-tuning-environment.png`}
                      style={{
                        position: "absolute",
                        zIndex: "10",
                      }}
                      className="hover"
                    />
                    <SiteImage
                      ui
                      fluid
                      src={`${rootPath}live-tuning/live-tuning-environment-shadow.png`}
                      style={{ zIndex: "5" }}
                    />
                  </a>
                </p>
                <ul>
                  <li>
                    {"Interaction design for "}
                    <strong>{"end-users"}</strong>
                    {", built in ordinary runtime environments"}
                  </li>
                  <li>
                    {"Prior knowledge of programming is "}
                    <strong>{"not"}</strong>
                    {" required."}
                  </li>
                  <li>{"Only a certain number of variables are editable."}</li>
                  <li>
                    {
                      "The programmer and end-user are separating their roles of specifying program details."
                    }
                  </li>
                </ul>
              </GridColumn>
            </Grid>
          </Segment>
        </section>
        <Divider hidden />
        <section id={"motivation"}>
          <Header as="h2">{"Motivation"}</Header>
          <Segment basic>
            <Grid stackable columns={2}>
              <GridColumn>
                <Header as="h3">{"Because programmers are tired"}</Header>
                <ul>
                  <li>
                    {"There are more and more "}
                    <SiteLink
                      href={href(`${rootPath}programming-with-examples`)}
                      title={
                        "Programming with Examples to Develop Data-Intensive User Interfaces"
                      }
                    >
                      {"data-intensive programs"}
                    </SiteLink>
                    {" such as animation design, "}
                    <abbr title={"Internet of Things"}>{"IoT"}</abbr>
                    {" application development, machine learning, etc."}
                  </li>
                  <li>
                    {
                      "The amount and variations of data far surpass what programmers alone can manage and edit. Intensive parameter tunings might be needed per user."
                    }
                  </li>
                </ul>
              </GridColumn>
              <GridColumn>
                <h3>{"Because users are demanding"}</h3>
                <ul>
                  <li>
                    {
                      "Live Programming (changing program behaviors without losing context) can benefit end-users. In particular, they can comprehend parameter tuning interfaces and customize programs to match their needs."
                    }
                  </li>
                  <li>
                    {
                      "They typically do not have access to development environments since they lack prior knowledge of programming."
                    }
                  </li>
                </ul>
              </GridColumn>
            </Grid>
          </Segment>
        </section>
        <Divider hidden />
        <section id={"example-ides"}>
          <Header as="h2">
            {'Example "Live Tuning" '}
            <abbr title={"Integrated Development Environments"}>{"IDEs"}</abbr>
          </Header>
          <Segment basic>
            <Header as="h3">{"TextAlive"}</Header>
            <p>
              <SiteLink href={href(`${basePath}textalive/`)}>
                <strong>{"TextAlive"}</strong>
              </SiteLink>
              {
                " is an Integrated Design Environment for authoring Kinetic Typography videos."
              }
            </p>
            <Grid stackable columns={2}>
              <GridColumn>
                <SiteImage
                  ui
                  bordered
                  fluid
                  src={`${rootPath}live-tuning/textalive-code.png`}
                />
                <p className="caption">
                  <strong>{"For programmers:"}</strong>
                  {
                    " it allows development of algorithms to animate lyrics text in synchrony with music. The timing information of the lyrics text is automatically estimated and can be interactively corrected in the timeline interface. Changes to the animation algorithms update the resulting video in real time."
                  }
                </p>
              </GridColumn>
              <GridColumn>
                <SiteImage
                  ui
                  bordered
                  fluid
                  src={`${rootPath}live-tuning/textalive-tuning.png`}
                />
                <p className="caption">
                  <strong>{"For end-users:"}</strong>
                  {
                    " it allows authoring Kinetic Typography videos just as other general video authoring tools. Each phrase, word, and character can be assigned an animation template with appropriate parameter values such as animation speed and font size."
                  }
                </p>
              </GridColumn>
            </Grid>
            <Header as="h3">{"f3.js: Form Follows Function()"}</Header>
            <p>
              <SiteLink href={href(`${basePath}f3js`)}>
                <strong>{"f3.js"}</strong>
              </SiteLink>

              {" is an Integrated Development Environment for developing "}
              <abbr title={"Internet of Things"}>{"IoT"}</abbr>
              {" applications."}
            </p>
            <Grid stackable columns={2}>
              <GridColumn>
                <SiteImage
                  ui
                  bordered
                  fluid
                  src={`${rootPath}live-tuning/f3js-code.png`}
                />
                <p className="caption">
                  <strong>{"For programmers:"}</strong>
                  {
                    " It allows to write a single JavaScript codebase that defines not only the behavior of microcontrollers, sensors, and actuators but also the layout of their enclosures. The layout preview is updated in response to every edit in the source code, enabling live programming experience."
                  }
                </p>
              </GridColumn>
              <GridColumn>
                <SiteImage
                  ui
                  bordered
                  fluid
                  src={`${rootPath}live-tuning/f3js-tuning.png`}
                />
                <p className="caption">
                  <strong>{"For end-users:"}</strong>
                  {
                    " it allows customizing and creating IoT applications without prior knowledge of programming nor soldering. Each IoT application has parameters to customize its behavior and layout, such as whether to add the countdown feature to a camera."
                  }
                </p>
              </GridColumn>
            </Grid>
          </Segment>
        </section>
        <Divider hidden />
        <section id={"examples"}>
          <Header as="h2">{"Discussion"}</Header>
          <Segment basic>
            <p>
              {"Please refer to "}
              <SiteLink
                href={href(
                  `${rootPath}publications/live2016-kato-livetuning.pdf#page=4`,
                )}
              >
                {"the paper (p.4-6)"}
              </SiteLink>
              {" for the detailed discussion. "}
              <u>{"Underlined"}</u>
              {
                " options are those we consider the most interesting and promising."
              }
            </p>
            <ul>
              <li>
                <strong>
                  {
                    "Programming environments (for programmers) are getting close to runtime environments (for end-users)."
                  }
                </strong>
                {
                  " Live Tuning is such a proposal to connect them through the tuning interfaces."
                }
              </li>
              <li>
                <strong>
                  {
                    "Multiple levels of user interfaces allow varied flexibility to edit programs."
                  }
                </strong>
                {
                  " Live Programming aims at the maximum flexibility and Live Tuning is somewhat in the middle between no and maximum flexibility."
                }
              </li>
              <li>
                <strong>
                  {
                    "How can we resolve or avoid conflicts between edits by multiple users? "
                  }
                </strong>
                {
                  "1) seriously implement conflict resolution mechanisms 2) discard old edits as typical Live Programming systems do 3) separate namespaces and resulting application instances "
                }
                <u>{"4) aggregate parameter values from different users"}</u>
                {"."}
              </li>
              <li>
                <strong>
                  {
                    "How can we achieve liveness when it takes time to apply edits? "
                  }
                </strong>
                {
                  "For instance, updating the 3D models is an instant process, but printing them takes time. 1) significantly progress the research of programmable matter "
                }
                <u>{"2) hack humans' feeling of liveness"}</u>
                {"."}
              </li>
            </ul>
          </Segment>
        </section>
        <Divider hidden />
        <section id={"revision"}>
          <h2>
            <Icon name="announcement" />
            {en ? "Revision history" : "更新履歴"}
          </h2>
          <Segment basic>
            <Feed className="divided">
              <FeedEvent>
                <FeedContent>
                  <FeedDate>{"7/16/2016"}</FeedDate>
                  <FeedSummary>{"Upload the initial revision."}</FeedSummary>
                </FeedContent>
              </FeedEvent>
            </Feed>
          </Segment>
        </section>
        <Divider hidden />
        <ProjectPublications
          project={"live-tuning"}
          majorPublication={"live2016-kato-livetuning"}
        />
      </SiteLayout>
    </>
  );
}
