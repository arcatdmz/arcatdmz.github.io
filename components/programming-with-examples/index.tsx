import { Grid, GridColumn } from "react-fomantic-ui";
import { SiteImage } from "@/site/components/SiteImage";
import {
  MajorPublication,
  Share,
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
  const { publicationsTable, rootPath, protocol, domain } = data;
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
  let subtitle: any;

  title = "Programming with Examples";
  subtitle = "to Develop Data-Intensive User Interfaces";
  description =
    "The programming-with-examples (PwE) workflow lets developers create interactive applications with the help of example data. It takes a general programming environment and adds dedicated user interfaces for visualizing and managing the data. This lets both programmers and userss understand applications and configure them to meet their needs. The web page provides summary and additional information for the journal article discussing PwE that appeared in the IEEE Computer magazine, special issue on 21st Century User Interfaces.";
  imageUrl = `${protocol}://${domain}${rootPath}images/panels/programming-with-examples.png`;
  me = "programming-with-examples/";
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
          <div
            className="ui right floated small bordered image"
            style={{ zIndex: "100", marginRight: "1em" }}
          >
            <SiteImage
              src={`${rootPath}programming-with-examples/programming-with-examples.jpg`}
            />
            <div className="caption">
              <a
                className="ui fluid primary small labeled icon button"
                href={"https://dx.doi.org/10.1109/MC.2016.217"}
              >
                <i className="book icon"></i>
                {"Paper"}
              </a>
            </div>
          </div>
        </div>
        <section>
          <h1 className="ui header">
            {title}
            <div className="sub header">{subtitle}</div>
          </h1>
          <div className="ui horizontal divided list project-meta-list">
            <div className="item">
              <span className="ui tiny basic label">
                <i className="calendar icon"></i>
                {"7/15/2016"}
              </span>
            </div>
            <div className="item">
              <span className="ui red tiny basic label">
                {"IEEE Computer Special Issue on 21st Century User Interfaces"}
              </span>
            </div>
          </div>
          <Share />
          <div className="ui message">
            <p>
              {
                "This page provides summary and additional information for the journal article that appeared in the IEEE Computer magazine, special issue on 21st Century User Interfaces."
              }
            </p>

            {!en ? (
              <>
                <p>
                  <Translate path={"programming-with-examples/index.pug"} />
                </p>
              </>
            ) : null}
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={"paper"}>
          <h2 className="ui header">{"Paper"}</h2>
          <div className="ui basic segment">
            <p>
              {
                "The programming-with-examples (PwE) workflow lets developers create interactive applications with the help of example data. It takes a general programming environment and adds dedicated user interfaces for visualizing and managing the data. This lets both programmers and users understand applications and configure them to meet their needs."
              }
            </p>
            <div className="ui raised segment major-publication">
              <span className="ui red ribbon label">
                {en ? "Cite this!" : "引用するならコレ！"}
              </span>
              <MajorPublication
                entry={publicationsTable["programming-with-examples"]}
              />
            </div>
          </div>
          <div className="ui basic segment">
            <Grid columns={2}>
              <GridColumn tablet={16} computer={10}>
                <SiteImage
                  className="ui fluid image"
                  src={`${rootPath}programming-with-examples/pwe-fig1.jpg`}
                  alt={"(Programming by Example vs Programming with Examples)"}
                />
              </GridColumn>
              <GridColumn tablet={16} computer={6}>
                <p className="caption">
                  <strong>{"Figure 1."}</strong>
                  {
                    " Two workflows for developing data-intensive interactive systems. (a) Programming by example (PbE). (b) Programming with examples (PwE). Unlike PbE systems, PwE systems allow the representation of example data and enable explicit programming. IDE: integrated development environment."
                  }
                </p>
              </GridColumn>
            </Grid>
            <div className="ui hidden divider"></div>
          </div>
        </section>
        <section id={"terminology"}>
          <h2 className="ui header">
            {'What is (and what is not) "Programming with Examples"?'}
          </h2>
          <div className="ui basic segment">
            <Grid stackable columns={2}>
              <GridColumn>
                <h3 className="ui header">{"It is..."}</h3>
                <ul>
                  <li>
                    {
                      "It is the workflow of programmers that makes use of example data during the development of applications."
                    }
                  </li>
                  <li>
                    {
                      "It is often required for the development of modern interactive systems that have become more and more data-intensive."
                    }
                  </li>
                  <li>
                    {"Example target applications include "}
                    <abbr title={"Internet of Things"}>{"IoT"}</abbr>
                    {
                      ", robot control, gesture recognition, image processing, and animation, and others that require intensive parameter tuning such as machine learning."
                    }
                  </li>
                  <li>
                    {
                      "Programmers have often developed their own tools for the purpose such as tools for visualizing recorded sensor data. We argue that such features should be built into "
                    }
                    <abbr title={"Integrated Development Environments"}>
                      {"IDEs"}
                    </abbr>
                    {" to provide fluid programming experience."}
                  </li>
                </ul>
              </GridColumn>
              <GridColumn>
                <h3 className="ui header">{"It is NOT..."}</h3>
                <ul>
                  <li>
                    {"It is different from typical "}
                    <abbr title={"Programming by Example"}>{"PbE"}</abbr>
                    {
                      " systems that encapsulate and hide the implementation of programs from the user. It requires explicit programming. (See "
                    }
                    <strong>{"Figure 1"}</strong>
                    {" above.)"}
                  </li>
                  <li>
                    {
                      'It is slightly different from the traditional definition of "Programming with Example" that appears in '
                    }
                    <a href={"https://dx.doi.org/10.1145/22339.22349"}>
                      {"Brad Myers' survey paper on "}
                      <abbr title={"Programming by Example"}>{"PbE"}</abbr>
                      {" systems [CHI '86]"}
                    </a>
                    {". It indicated the omission of inferences in "}
                    <abbr title={"Programming by Example"}>{"PbE"}</abbr>
                    {" systems and did not discuss data representations."}
                  </li>
                  <li>
                    {"It is different from Joel Brandt's "}
                    <a
                      href={
                        "https://en.wikipedia.org/wiki/Example-Centric_Programming"
                      }
                    >
                      {"Example-Centric Programming"}
                    </a>
                    {
                      " that helps programmers to benefit from existing example code on the web. Examples in his work denote the use of APIs (the logic of the programs) and examples in "
                    }
                    <abbr title={"Programming with Examples"}>{"PwE"}</abbr>
                    {" denote data used in the programs."}
                  </li>
                </ul>
              </GridColumn>
            </Grid>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={"examples"}>
          <h2 className="ui header">
            {"Which "}
            <abbr title={"Integrated Development Environments"}>{"IDEs"}</abbr>
            {' support "Programming with Examples"?'}
          </h2>
          <div className="ui basic segment">
            <p>
              {"We have designed "}
              <abbr title={"Integrated Development Environments"}>
                {"IDEs"}
              </abbr>
              {" that support the "}
              <abbr title={"Programming with Examples"}>{"PwE"}</abbr>
              {" workflow. Some of them are implemented as "}
              <abbr title={"Web-based Integrated Development Environments"}>
                {"WIDEs"}
              </abbr>
              {
                " and you can try them out without leaving the web browser! See "
              }
              <SiteLink href={href(`${basePath}textalive`)}>
                {"TextAlive"}
              </SiteLink>
              {" and "}
              <SiteLink href={href(`${basePath}f3js`)}>{"f3.js"}</SiteLink>
              {" projects for more details."}
            </p>
            <div className="ui divided list">
              <div className="item">
                <SiteLink
                  className="ui small image"
                  href={href(`${basePath}picode`)}
                >
                  <SiteImage src={`${rootPath}images/thumbnails/picode.jpg`} />
                </SiteLink>
                <div className="content">
                  <SiteLink className="header" href={href(`${basePath}picode`)}>
                    {"Picode [CHI '13]"}
                  </SiteLink>
                  <div className="description">
                    {
                      "It supports handling robot/human posture information with the code editor that shows inline photos representing the posture data."
                    }
                  </div>
                </div>
              </div>
              <div className="item">
                <SiteLink
                  className="ui small image"
                  href={href(`${basePath}dejavu`)}
                >
                  <SiteImage src={`${rootPath}images/thumbnails/dejavu.png`} />
                </SiteLink>
                <div className="content">
                  <SiteLink className="header" href={href(`${basePath}dejavu`)}>
                    {"DejaVu [UIST '12]"}
                  </SiteLink>
                  <div className="description">
                    {
                      "It supports creating interacitve camera-based apps with the timeline and canvas interfaces for built-in record-and-replay and re-evaluation feature."
                    }
                  </div>
                </div>
              </div>
              <div className="item">
                <SiteLink
                  className="ui small image"
                  href={href(`${basePath}visionsketch`)}
                >
                  <SiteImage
                    src={`${rootPath}images/thumbnails/visionsketch.jpg`}
                  />
                </SiteLink>
                <div className="content">
                  <SiteLink
                    className="header"
                    href={href(`${basePath}visionsketch`)}
                  >
                    {"VisionSketch [GI '13]"}
                  </SiteLink>
                  <div className="description">
                    {
                      "It implements graphical annotation-based code completion where methods are suggested based on sketched shapes on input images."
                    }
                  </div>
                </div>
              </div>
              <div className="item">
                <SiteLink
                  className="ui small image"
                  href={href(`${basePath}textalive`)}
                >
                  <SiteImage
                    src={`${rootPath}images/thumbnails/textalive.png`}
                  />
                </SiteLink>
                <div className="content">
                  <SiteLink
                    className="header"
                    href={href(`${basePath}textalive`)}
                  >
                    {"TextAlive [CHI '15]"}
                  </SiteLink>
                  <div className="description">
                    {
                      "It supports authoring Kinetic Typography videos of lyrics text synchronized with songs equipped with "
                    }
                  </div>
                  <SiteLink href={href(`${basePath}live-tuning`)}>
                    {"Live Tuning"}
                  </SiteLink>
                  {" interfaces for end-users."}
                </div>
              </div>
            </div>
            <p>
              {
                "There are of course excellent prior work and other ongoing work that supports the "
              }
              <abbr title={"Programming with Examples"}>{"PwE"}</abbr>
              {" workflow, as shown below."}
            </p>
            <div className="ui hidden divider"></div>
            <h3 className="ui header" id={"conventional"}>
              {"Programming with Examples in conventional "}
              <abbr title={"Integrated Development Environments"}>
                {"IDEs"}
              </abbr>
            </h3>
            <p>
              {"Conventional "}
              <abbr title={"Character-based User Interface"}>{"CUI"}</abbr>
              {" and "}
              <abbr title={"Graphical User Interface"}>{"GUI"}</abbr>
              {
                " applications do not involve continuous and complex data handling. As a result, their development environments typically support "
              }
              <strong>
                {
                  "simple text-based or symbol-based representations of example data"
                }
              </strong>
              {"."}
            </p>
            <ul>
              <li>
                {"Most "}
                <abbr title={"Programming by Example"}>{"PbE"}</abbr>
                {
                  " systems hide the program implementation from the user to require no programming knowledge, but exceptions do exist. "
                }
                <a href={"http://acypher.com/wwid/Chapters/01Pygmalion.html"}>
                  {"Pygmalion"}
                </a>
                {
                  " lets programmers kick-start building a program by giving concrete input data instead of writing abstract program code."
                }
              </li>
              <li>
                <a href={"http://www.subtext-lang.org/"}>
                  {"The Subtext IDE [OOPSLA '05]"}
                </a>
                {
                  " lets programmers specify test cases by writing example input data next to program code in a code editor."
                }
              </li>
            </ul>
            <div className="ui hidden divider"></div>
            <h3 className="ui header" id={"data-intensive"}>
              {"Programming with Examples in "}
              <abbr title={"Integrated Development Environments"}>
                {"IDEs"}
              </abbr>
              {" for data-intensive applications"}
            </h3>
            <p>
              {"To develop data-intensive applications, more "}
              <strong>
                {
                  "intuitive (typically graphical) representations of example data"
                }
              </strong>
              {" are required other than text-based representations."}
            </p>
            <ul>
              <li>
                <a href={"https://hci.stanford.edu/research/dtools/"}>
                  {"d.tools [UIST '06]"}
                </a>
                {" is a visual authoring environment for prototyping "}
                <strong>{"physical computing devices"}</strong>
                {
                  ". It is capable of recording a video of the user's interaction with the physical device, logs interaction events, and play it in a video player-like interface."
                }
              </li>
              <li>
                <a href={"https://dx.doi.org/10.1145/1866029.1866038"}>
                  {"Gestalt [UIST '10]"}
                </a>
                {
                  " provides integrated support for implementation and analysis in "
                }
                <strong>{"machine learning algorithms"}</strong>
                {
                  " and influences most of our projects. It comes with rich graphical representations of example data collected for the application development."
                }
              </li>
              <li>
                <a href={"http://brrian.org/#current"}>
                  {"Timelapse [UIST '13]"}
                </a>
                {
                  " and its subsequent work are built into the developer tool of WebKit project that captures and replays "
                }
                <strong>{"web application"}</strong>
                {" executions with the Timeline interface."}
              </li>
              <li>
                <a href={"https://www.cs.cmu.edu/~shihpinc/gneiss.html"}>
                  {"Gneiss [CHI '15]"}
                </a>
                {
                  " and its related work extend a spreadsheet-based user interface for handling continuous or structured data retrieved from the web."
                }
              </li>
            </ul>
            <p>
              {"Please "}
              <a href={"mailto:jun.kato@aist.go.jp"}>
                <i className="mail icon"></i>
                {"contact us"}
              </a>
              {" to add your project here."}
            </p>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={"future"}>
          <h2 className="ui header">
            {"What are the design implications for future "}
            <abbr title={"Integrated Development Environments"}>{"IDEs"}</abbr>
            {"?"}
          </h2>
          <div className="ui basic segment">
            <p>
              {
                "While we would strongly recommend you to read the article (p.40-41) for the detailed discussion, here are some lessons learned in case you are in a hurry."
              }
            </p>
            <ul>
              <li>
                <strong>
                  {"Intuitive representations of example data are important."}
                </strong>
                {
                  " Researchers have proposed many intuitive interfaces for manipulating data through GUIs; we can learn from such interfaces to integrate data manipulation components into IDEs. Although the article focused on inherently visual example data, example data could be sounds, haptic sensations, tastes, and smells. We foresee that future development environments could exploit human sensory organs other than the eyes, including the ears, skin, tongue, and nose. A research question for you: how would you debug virtual reality applications with various kinds of sensations?"
                }
              </li>
              <li>
                <strong>
                  {
                    "Collaborative application authoring is the key in the age of big data."
                  }
                </strong>
                {
                  " Collaboration among people with diverse backgrounds is essential for developing successful user interfaces for data-intensive applications in the age of big data. The amount and variations of data far surpass what programmers alone can manage and edit. One potential answer to this implication is "
                }
                <SiteLink href={href(`${rootPath}live-tuning`)}>
                  {"Live Tuning"}
                </SiteLink>
                {" that expands benefits of Live Programming to end-users."}
              </li>
              <li>
                <strong>
                  {
                    "Borders between the development and runtime environments will be eliminated."
                  }
                </strong>
                {
                  " Programmers will ship programs together with the development environments so that nonprogrammers can customize them by updating the example data. In such environments, representations of the example data serve as the boundary that defines what can be easily customized and what cannot. We believe that user interface design will become a process to create applications with such a boundary that defines the appropriate flexibility."
                }
              </li>
            </ul>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={"revision"}>
          <h2 className="ui header">
            <i className="announcement icon"></i>
            {en ? "Revision history" : "更新履歴"}
          </h2>
          <div className="ui basic segment">
            <div className="ui divided feed">
              <div className="event">
                <div className="content">
                  <div className="date">{"1/21/2018"}</div>
                  <div className="summary">
                    {"Check missing links and update style."}
                  </div>
                </div>
              </div>
              <div className="event">
                <div className="content">
                  <div className="date">{"7/15/2016"}</div>
                  <div className="summary">
                    {"Upload the initial revision."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SiteLayout>
    </>
  );
}
