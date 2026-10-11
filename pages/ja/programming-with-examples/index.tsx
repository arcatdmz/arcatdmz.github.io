import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import { classNames, style, text as plainText, keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from ja/programming-with-examples/index.pug; edit this TSX source directly. */
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
  let subtitle: any;

  title = "Programming with Examples";
  subtitle = "to Develop Data-Intensive User Interfaces";
  description =
    "The programming-with-examples (PwE) workflow lets developers create interactive applications with the help of example data. It takes a general programming environment and adds dedicated user interfaces for visualizing and managing the data. This lets both programmers and userss understand applications and configure them to meet their needs. The web page provides summary and additional information for the journal article discussing PwE that appeared in the IEEE Computer magazine, special issue on 21st Century User Interfaces.";
  imageUrl = `${protocol}://${domain}${rootPath}images/panels/programming-with-examples.png`;
  me = "programming-with-examples/";
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
        <div className="mobile hidden">
          <div
            className="ui right floated small bordered image"
            style={style("z-index: 100; margin-right: 1em;")}
          >
            <img src={`${rootPath}programming-with-examples/programming-with-examples.jpg`} />
            <div className="caption">
              <a
                className="ui fluid primary small labeled icon button"
                href={href("https://dx.doi.org/10.1109/MC.2016.217")}
              >
                <i className="book icon"></i>
                {richText("Paper")}
              </a>
            </div>
          </div>
        </div>
        <section>
          <h1 className="ui header">
            {plainText(title)}
            <div className="sub header">{plainText(subtitle)}</div>
          </h1>
          <div className="ui horizontal divided list project-meta-list">
            <div className="item">
              <span className="ui tiny basic label">
                <i className="calendar icon"></i>
                {richText("7/15/2016")}
              </span>
            </div>
            <div className="item">
              <span className="ui red tiny basic label">
                {richText("IEEE Computer Special Issue on 21st Century User Interfaces")}
              </span>
            </div>
          </div>
          {content.renderShare()}
          <div className="ui message">
            {(() => {
              const children245: ReactNode[] = [];
              children245.push(
                <>
                  <p>
                    {richText(
                      "This page provides summary and additional information for the journal article that appeared in the IEEE Computer magazine, special issue on 21st Century User Interfaces.",
                    )}
                  </p>
                </>,
              );
              if (!en) {
                children245.push(
                  <>
                    <p>{content.renderTranslate("programming-with-examples/index.pug")}</p>
                  </>,
                );
              }
              return keyed(children245);
            })()}
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={attribute("paper")}>
          <h2 className="ui header">{richText("Paper")}</h2>
          <div className="ui basic segment">
            <p>
              {richText(
                "The programming-with-examples (PwE) workflow lets developers create interactive applications with the help of example data. It takes a general programming environment and adds dedicated user interfaces for visualizing and managing the data. This lets both programmers and users understand applications and configure them to meet their needs.",
              )}
            </p>
            <div className="ui raised segment major-publication">
              <span className="ui red ribbon label">
                {plainText(en ? "Cite this!" : "引用するならコレ！")}
              </span>
              {content.renderMajorPublication(publicationsTable["programming-with-examples"])}
            </div>
          </div>
          <div className="ui basic segment">
            <div className="ui two columns grid">
              <div className="sixteen wide tablet ten wide computer column">
                <img
                  className="ui fluid image"
                  src={`${rootPath}programming-with-examples/pwe-fig1.jpg`}
                  alt={"(Programming by Example vs Programming with Examples)"}
                />
              </div>
              <div className="sixteen wide tablet six wide computer column">
                <p className="caption">
                  <strong>{richText("Figure 1.")}</strong>
                  {richText(
                    " Two workflows for developing data-intensive interactive systems. (a) Programming by example (PbE). (b) Programming with examples (PwE). Unlike PbE systems, PwE systems allow the representation of example data and enable explicit programming. IDE: integrated development environment.",
                  )}
                </p>
              </div>
            </div>
            <div className="ui hidden divider"></div>
          </div>
        </section>
        <section id={attribute("terminology")}>
          <h2 className="ui header">
            {richText('What is (and what is not) "Programming with Examples"?')}
          </h2>
          <div className="ui basic segment">
            <div className="ui stackable two columns grid">
              <div className="column">
                <h3 className="ui header">{richText("It is...")}</h3>
                <ul>
                  <li>
                    {richText(
                      "It is the workflow of programmers that makes use of example data during the development of applications.",
                    )}
                  </li>
                  <li>
                    {richText(
                      "It is often required for the development of modern interactive systems that have become more and more data-intensive.",
                    )}
                  </li>
                  <li>
                    {richText("Example target applications include ")}
                    <abbr title={"Internet of Things"}>{richText("IoT")}</abbr>
                    {richText(
                      ", robot control, gesture recognition, image processing, and animation, and others that require intensive parameter tuning such as machine learning.",
                    )}
                  </li>
                  <li>
                    {richText(
                      "Programmers have often developed their own tools for the purpose such as tools for visualizing recorded sensor data. We argue that such features should be built into ",
                    )}
                    <abbr title={"Integrated Development Environments"}>{richText("IDEs")}</abbr>
                    {richText(" to provide fluid programming experience.")}
                  </li>
                </ul>
              </div>
              <div className="column">
                <h3 className="ui header">{richText("It is NOT...")}</h3>
                <ul>
                  <li>
                    {richText("It is different from typical ")}
                    <abbr title={"Programming by Example"}>{richText("PbE")}</abbr>
                    {richText(
                      " systems that encapsulate and hide the implementation of programs from the user. It requires explicit programming. (See ",
                    )}
                    <strong>{richText("Figure 1")}</strong>
                    {richText(" above.)")}
                  </li>
                  <li>
                    {richText(
                      'It is slightly different from the traditional definition of "Programming with Example" that appears in ',
                    )}
                    <a href={href("https://dx.doi.org/10.1145/22339.22349")}>
                      {richText("Brad Myers' survey paper on ")}
                      <abbr title={"Programming by Example"}>{richText("PbE")}</abbr>
                      {richText(" systems [CHI '86]")}
                    </a>
                    {richText(". It indicated the omission of inferences in ")}
                    <abbr title={"Programming by Example"}>{richText("PbE")}</abbr>
                    {richText(" systems and did not discuss data representations.")}
                  </li>
                  <li>
                    {richText("It is different from Joel Brandt's ")}
                    <a href={href("https://en.wikipedia.org/wiki/Example-Centric_Programming")}>
                      {richText("Example-Centric Programming")}
                    </a>
                    {richText(
                      " that helps programmers to benefit from existing example code on the web. Examples in his work denote the use of APIs (the logic of the programs) and examples in ",
                    )}
                    <abbr title={"Programming with Examples"}>{richText("PwE")}</abbr>
                    {richText(" denote data used in the programs.")}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={attribute("examples")}>
          <h2 className="ui header">
            {richText("Which ")}
            <abbr title={"Integrated Development Environments"}>{richText("IDEs")}</abbr>
            {richText(" support &quot;Programming with Examples&quot;?")}
          </h2>
          <div className="ui basic segment">
            <p>
              {richText("We have designed ")}
              <abbr title={"Integrated Development Environments"}>{richText("IDEs")}</abbr>
              {richText(" that support the ")}
              <abbr title={"Programming with Examples"}>{richText("PwE")}</abbr>
              {richText(" workflow. Some of them are implemented as ")}
              <abbr title={"Web-based Integrated Development Environments"}>
                {richText("WIDEs")}
              </abbr>
              {richText(" and you can try them out without leaving the web browser! See ")}
              <a href={href(`${basePath}textalive`)}>{richText("TextAlive")}</a>
              {richText(" and ")}
              <a href={href(`${basePath}f3js`)}>{richText("f3.js")}</a>
              {richText(" projects for more details.")}
            </p>
            <div className="ui divided list">
              <div className="item">
                <a className="ui small image" href={href(`${basePath}picode`)}>
                  <img src={`${rootPath}images/thumbnails/picode.jpg`} />
                </a>
                <div className="content">
                  <a className="header" href={href(`${basePath}picode`)}>
                    {richText("Picode [CHI '13]")}
                  </a>
                  <div className="description">
                    {richText(
                      "It supports handling robot/human posture information with the code editor that shows inline photos representing the posture data.",
                    )}
                  </div>
                </div>
              </div>
              <div className="item">
                <a className="ui small image" href={href(`${basePath}dejavu`)}>
                  <img src={`${rootPath}images/thumbnails/dejavu.png`} />
                </a>
                <div className="content">
                  <a className="header" href={href(`${basePath}dejavu`)}>
                    {richText("DejaVu [UIST '12]")}
                  </a>
                  <div className="description">
                    {richText(
                      "It supports creating interacitve camera-based apps with the timeline and canvas interfaces for built-in record-and-replay and re-evaluation feature.",
                    )}
                  </div>
                </div>
              </div>
              <div className="item">
                <a className="ui small image" href={href(`${basePath}visionsketch`)}>
                  <img src={`${rootPath}images/thumbnails/visionsketch.jpg`} />
                </a>
                <div className="content">
                  <a className="header" href={href(`${basePath}visionsketch`)}>
                    {richText("VisionSketch [GI '13]")}
                  </a>
                  <div className="description">
                    {richText(
                      "It implements graphical annotation-based code completion where methods are suggested based on sketched shapes on input images.",
                    )}
                  </div>
                </div>
              </div>
              <div className="item">
                <a className="ui small image" href={href(`${basePath}textalive`)}>
                  <img src={`${rootPath}images/thumbnails/textalive.png`} />
                </a>
                <div className="content">
                  <a className="header" href={href(`${basePath}textalive`)}>
                    {richText("TextAlive [CHI '15]")}
                  </a>
                  <div className="description">
                    {richText(
                      "It supports authoring Kinetic Typography videos of lyrics text synchronized with songs equipped with ",
                    )}
                  </div>
                  <a href={href(`${basePath}live-tuning`)}>{richText("Live Tuning")}</a>
                  {richText(" interfaces for end-users.")}
                </div>
              </div>
            </div>
            <p>
              {richText(
                "There are of course excellent prior work and other ongoing work that supports the ",
              )}
              <abbr title={"Programming with Examples"}>{richText("PwE")}</abbr>
              {richText(" workflow, as shown below.")}
            </p>
            <div className="ui hidden divider"></div>
            <h3 className="ui header" id={attribute("conventional")}>
              {richText("Programming with Examples in conventional ")}
              <abbr title={"Integrated Development Environments"}>{richText("IDEs")}</abbr>
            </h3>
            <p>
              {richText("Conventional ")}
              <abbr title={"Character-based User Interface"}>{richText("CUI")}</abbr>
              {richText(" and ")}
              <abbr title={"Graphical User Interface"}>{richText("GUI")}</abbr>
              {richText(
                " applications do not involve continuous and complex data handling. As a result, their development environments typically support ",
              )}
              <strong>
                {richText("simple text-based or symbol-based representations of example data")}
              </strong>
              {richText(".")}
            </p>
            <ul>
              <li>
                {richText("Most ")}
                <abbr title={"Programming by Example"}>{richText("PbE")}</abbr>
                {richText(
                  " systems hide the program implementation from the user to require no programming knowledge, but exceptions do exist. ",
                )}
                <a href={href("http://acypher.com/wwid/Chapters/01Pygmalion.html")}>
                  {richText("Pygmalion")}
                </a>
                {richText(
                  " lets programmers kick-start building a program by giving concrete input data instead of writing abstract program code.",
                )}
              </li>
              <li>
                <a href={href("http://www.subtext-lang.org/")}>
                  {richText("The Subtext IDE [OOPSLA '05]")}
                </a>
                {richText(
                  " lets programmers specify test cases by writing example input data next to program code in a code editor.",
                )}
              </li>
            </ul>
            <div className="ui hidden divider"></div>
            <h3 className="ui header" id={attribute("data-intensive")}>
              {richText("Programming with Examples in ")}
              <abbr title={"Integrated Development Environments"}>{richText("IDEs")}</abbr>
              {richText(" for data-intensive applications")}
            </h3>
            <p>
              {richText("To develop data-intensive applications, more ")}
              <strong>
                {richText("intuitive (typically graphical) representations of example data")}
              </strong>
              {richText(" are required other than text-based representations.")}
            </p>
            <ul>
              <li>
                <a href={href("https://hci.stanford.edu/research/dtools/")}>
                  {richText("d.tools [UIST '06]")}
                </a>
                {richText(" is a visual authoring environment for prototyping ")}
                <strong>{richText("physical computing devices")}</strong>
                {richText(
                  ". It is capable of recording a video of the user's interaction with the physical device, logs interaction events, and play it in a video player-like interface.",
                )}
              </li>
              <li>
                <a href={href("https://dx.doi.org/10.1145/1866029.1866038")}>
                  {richText("Gestalt [UIST '10]")}
                </a>
                {richText(" provides integrated support for implementation and analysis in ")}
                <strong>{richText("machine learning algorithms")}</strong>
                {richText(
                  " and influences most of our projects. It comes with rich graphical representations of example data collected for the application development.",
                )}
              </li>
              <li>
                <a href={href("http://brrian.org/#current")}>{richText("Timelapse [UIST '13]")}</a>
                {richText(
                  " and its subsequent work are built into the developer tool of WebKit project that captures and replays ",
                )}
                <strong>{richText("web application")}</strong>
                {richText(" executions with the Timeline interface.")}
              </li>
              <li>
                <a href={href("https://www.cs.cmu.edu/~shihpinc/gneiss.html")}>
                  {richText("Gneiss [CHI '15]")}
                </a>
                {richText(
                  " and its related work extend a spreadsheet-based user interface for handling continuous or structured data retrieved from the web.",
                )}
              </li>
            </ul>
            <p>
              {richText("Please ")}
              <a href={href("mailto:jun.kato@aist.go.jp")}>
                <i className="mail icon"></i>
                {richText("contact us")}
              </a>
              {richText(" to add your project here.")}
            </p>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={attribute("future")}>
          <h2 className="ui header">
            {richText("What are the design implications for future ")}
            <abbr title={"Integrated Development Environments"}>{richText("IDEs")}</abbr>
            {richText("?")}
          </h2>
          <div className="ui basic segment">
            <p>
              {richText(
                "While we would strongly recommend you to read the article (p.40-41) for the detailed discussion, here are some lessons learned in case you are in a hurry.",
              )}
            </p>
            <ul>
              <li>
                <strong>
                  {richText("Intuitive representations of example data are important.")}
                </strong>
                {richText(
                  " Researchers have proposed many intuitive interfaces for manipulating data through GUIs; we can learn from such interfaces to integrate data manipulation components into IDEs. Although the article focused on inherently visual example data, example data could be sounds, haptic sensations, tastes, and smells. We foresee that future development environments could exploit human sensory organs other than the eyes, including the ears, skin, tongue, and nose. A research question for you: how would you debug virtual reality applications with various kinds of sensations?",
                )}
              </li>
              <li>
                <strong>
                  {richText(
                    "Collaborative application authoring is the key in the age of big data.",
                  )}
                </strong>
                {richText(
                  " Collaboration among people with diverse backgrounds is essential for developing successful user interfaces for data-intensive applications in the age of big data. The amount and variations of data far surpass what programmers alone can manage and edit. One potential answer to this implication is ",
                )}
                <a href={href(`${rootPath}live-tuning`)}>{richText("Live Tuning")}</a>
                {richText(" that expands benefits of Live Programming to end-users.")}
              </li>
              <li>
                <strong>
                  {richText(
                    "Borders between the development and runtime environments will be eliminated.",
                  )}
                </strong>
                {richText(
                  " Programmers will ship programs together with the development environments so that nonprogrammers can customize them by updating the example data. In such environments, representations of the example data serve as the boundary that defines what can be easily customized and what cannot. We believe that user interface design will become a process to create applications with such a boundary that defines the appropriate flexibility.",
                )}
              </li>
            </ul>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={attribute("revision")}>
          <h2 className="ui header">
            <i className="announcement icon"></i>
            {plainText(en ? "Revision history" : "更新履歴")}
          </h2>
          <div className="ui basic segment">
            <div className="ui divided feed">
              <div className="event">
                <div className="content">
                  <div className="date">{richText("1/21/2018")}</div>
                  <div className="summary">{richText("Check missing links and update style.")}</div>
                </div>
              </div>
              <div className="event">
                <div className="content">
                  <div className="date">{richText("7/15/2016")}</div>
                  <div className="summary">{richText("Upload the initial revision.")}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SiteLayout>
    </>
  );
}
