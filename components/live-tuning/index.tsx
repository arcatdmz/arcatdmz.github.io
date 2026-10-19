import { Grid, GridColumn } from "react-fomantic-ui";
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
          <div
            className="ui right floated small bordered image"
            style={{ zIndex: "100", marginRight: "1em" }}
          >
            <SiteImage
              src={`${rootPath}live-tuning/live2016-kato-livetuning.jpg`}
            />
            <div className="caption">
              <SiteLink
                className="ui fluid primary small labeled icon button"
                href={href(
                  `${rootPath}publications/live2016-kato-livetuning.pdf`,
                )}
              >
                <i className="book icon"></i>
                {"Paper"}
              </SiteLink>
            </div>
          </div>
        </div>
        <ProjectHeader project={"live-tuning"} />
        <div className="ui message">
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
        </div>
        <div className="ui hidden divider"></div>
        <section id={"abstract"}>
          <h2 className="ui header">
            <div className="content">{en ? "Abstract" : "概要"}</div>
          </h2>
          <div className="ui basic segment">
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
          </div>
        </section>
        <section id={"live-tuning-comparison"}>
          <div className="ui basic segment">
            <Grid stackable columns={2}>
              <GridColumn>
                <h2 className="ui header">{"Live Programming"}</h2>
                <p style={{ position: "relative" }}>
                  <a
                    id={"live-programming"}
                    className="live-preview"
                    tabIndex={0}
                  >
                    <SiteImage
                      className="ui fluid image hover"
                      src={`${rootPath}live-tuning/live-programming-environment.png`}
                      style={{
                        position: "absolute",
                        zIndex: "10",
                      }}
                    />
                    <SiteImage
                      className="ui fluid image"
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
                <h2 className="ui header">{"Live Tuning"}</h2>
                <p style={{ position: "relative" }}>
                  <a id={"live-tuning"} className="live-preview" tabIndex={0}>
                    <SiteImage
                      className="ui fluid image hover"
                      src={`${rootPath}live-tuning/live-tuning-environment.png`}
                      style={{
                        position: "absolute",
                        zIndex: "10",
                      }}
                    />
                    <SiteImage
                      className="ui fluid image"
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
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={"motivation"}>
          <h2 className="ui header">{"Motivation"}</h2>
          <div className="ui basic segment">
            <Grid stackable columns={2}>
              <GridColumn>
                <h3 className="ui header">{"Because programmers are tired"}</h3>
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
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={"example-ides"}>
          <h2 className="ui header">
            {'Example "Live Tuning" '}
            <abbr title={"Integrated Development Environments"}>{"IDEs"}</abbr>
          </h2>
          <div className="ui basic segment">
            <h3 className="ui header">{"TextAlive"}</h3>
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
                  className="ui fluid bordered image"
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
                  className="ui fluid bordered image"
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
            <h3 className="ui header">{"f3.js: Form Follows Function()"}</h3>
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
                  className="ui fluid bordered image"
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
                  className="ui fluid bordered image"
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
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={"examples"}>
          <h2 className="ui header">{"Discussion"}</h2>
          <div className="ui basic segment">
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
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={"revision"}>
          <h2>
            <i className="announcement icon"></i>
            {en ? "Revision history" : "更新履歴"}
          </h2>
          <div className="ui basic segment">
            <div className="ui divided feed">
              <div className="event">
                <div className="content">
                  <div className="date">{"7/16/2016"}</div>
                  <div className="summary">
                    {"Upload the initial revision."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <ProjectPublications
          project={"live-tuning"}
          majorPublication={"live2016-kato-livetuning"}
        />
      </SiteLayout>
    </>
  );
}
