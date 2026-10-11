import type { ReactNode } from "react";
import { richText } from "@/site/components/RichText";
import { classNames, style, text as plainText, keyed, href, attribute } from "@/site/rendering";
import { getSiteData } from "@/site/data";
import { SiteLayout, SiteRightHeaderMenu } from "@/site/components/SiteLayout";
import { createContentComponents } from "@/site/components/ContentComponents";
import type { SiteContext } from "@/site/types";

/** React page migrated from ja/deployground/index.pug; edit this TSX source directly. */
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

  p = projectsTable["deployground"];
  title = p.getTitle(lang);
  me = p.project + "/";
  const slideUrl = `${protocol}://${domain}${rootPath}publications/vlhcc2018-kato-deployground-slides.pdf`;
  const slideImagePath = `${rootPath}deployground/vlhcc2018-kato-deployground-slides.png`;
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
  function renderAbstract(): ReactNode {
    return (
      <>
        <h2 className="ui header">{plainText(en ? "Abstract" : "概要")}</h2>
        <div className="ui basic segment">
          <div className="ui stackable two columns grid">
            <div className="column">
              <p>
                <img
                  className="ui image"
                  src={"/deployground/vlhcc2018-kato-deployground-fig1.png"}
                />
              </p>
            </div>
            <div className="column">
              <p>
                {richText(
                  "Interactive web pages for learning programming languages and application programming interfaces (APIs), called <strong>playgrounds,</strong> allow programmers to run and edit example codes in place. Despite the benefits of this live programming experience, programmers need to leave the playground at some point and re-start the development from scratch in their own programming environments.",
                )}
              </p>
              <p>
                {richText(
                  'This paper proposes <strong>DeployGround</strong>, a framework for creating web-based tutorials that streamlines learning  APIs on playgrounds and developing and deploying applications. It has three unique features: <span style="color: #c00">a pseudo-runtime environment</span> for a quick response, <span style="color: #0c0">an adaptive boilerplate</span> for deploying projects, and <span style="color: #00c">a reversible software engineering feature</span> for importing deployed projects as example codes.',
                )}
              </p>
              <p>
                {richText(
                  "As a case study, we created a web-based tutorial for browser-based and Node.js-based JavaScript APIs. A preliminary user study found appreciation of the streamlined and social workflow of the DeployGround framework.",
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="ui hidden divider"></div>
      </>
    );
  }
  function renderPresentations(): ReactNode {
    return (
      <>
        <h2 className="ui header">{plainText(en ? "Presentation materials" : "発表内容")}</h2>
        <div className="ui basic segment">
          <div className="ui stackable two columns grid">
            <div className="column">
              <h3 className="ui header">
                {richText("IEEE VL/HCC 2018 ")}
                {plainText(en ? "Demo Video" : "デモ動画")}
              </h3>
              {content.renderEmbedYoutube("//www.youtube.com/embed/dE6mCZVWIms")}
              <div className="caption">
                <div className="ui horizontal list">
                  <div className="item">
                    <a href={href("//www.youtube.com/watch?v=dE6mCZVWIms")}>
                      <i className="youtube icon"></i>
                      {richText("YouTube")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <h3 className="ui header">
                {richText("IEEE VL/HCC 2018 ")}
                {plainText(en ? "Slides" : "発表スライド")}
              </h3>
              <div
                className="ui embed"
                data-url={slideUrl}
                data-placeholder={slideImagePath}
                data-icon={"video play outline"}
              ></div>
              <div className="caption">
                <div className="ui horizontal list">
                  <div className="item">
                    <a href={href(slideUrl)}>
                      <i className="download icon"></i>
                      {plainText(en ? "Download" : "ダウンロード")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ui hidden divider"></div>
      </>
    );
  }
  function renderRelatedWork(): ReactNode {
    return (
      <>
        <h2 className="ui header">{richText("Related Work")}</h2>
        <div className="ui basic segment">
          <p>
            {richText(
              "Due to the page limit, we needed to omit some interesting prior work from the Related Work section in the paper. The following text provides a more complete introduction to the related work.",
            )}
          </p>
        </div>
        <h3 className="ui header">{richText("A. Coding Tutorials on the Web")}</h3>
        <div className="ui basic segment">
          <p>
            {richText("In the era when ")}
            <a
              href={href(
                "https://www.wsj.com/articles/SB10001424053111903480904576512250915629460",
              )}
            >
              {richText("&quot;software is eating the world&quot;")}
            </a>
            {richText(
              ", there is a massive demand for people who can code. This has resulted in numerous coding references and tutorials available on the web [",
            )}
            <a href={href("https://doi.acm.org/10.1145/3017680.3017728")}>
              {richText("Kim et al., SIGCSE '17")}
            </a>
            {richText("]. In the context of HCI, while there is much work on creating tutorials [")}
            <a href={href("https://doi.acm.org/10.1145/2380116.2380130")} title={"MixT"}>
              {richText("Chi et al., UIST '12")}
            </a>
            {richText(", ")}
            <a href={href("https://doi.acm.org/10.1145/2501988.2502052")} title={"DemoCut"}>
              {richText("Chi et al., UIST '13")}
            </a>
            {richText(", ")}
            <a href={href("https://doi.acm.org/10.1145/2556288.2556986")}>
              {richText("Kim et al., CHI '14")}
            </a>
            {richText(", ")}
            <a href={href("https://doi.acm.org/10.1145/2470654.2466235")}>
              {richText("Lafreniere et al., CHI '13")}
            </a>
            {richText(
              "], there is only a handful of work specialized in creating interactive coding tutorials. Harms et al. explored automatic generation of interactive step-by-step tutorials by transforming each sentence of example codes into a step [",
            )}
            <a href={href("https://doi.acm.org/10.1145/2485760.2485764")}>
              {richText("Harms et al., IDC '13")}
            </a>
            {richText("]. Tutoron [")}
            <a href={href("http://tutorons.com")}>{richText("Head et al., VL/HCC '15")}</a>
            {richText(
              "] allows one to write micro-explanations of code and allows learners to read them automatically inserted next to example code on the web. Codepourri [",
            )}
            <a href={href("https://ieeexplore.ieee.org/document/7357193")}>
              {richText("Gordon et al., VL/HCC '15")}
            </a>
            {richText(
              "] allows annotation of the history of program executions through which learners can navigate to learn the program behavior. Our work does not provide tools for creating a new kind of tutorials as these prior works do but instead presents a framework that aims to address limitations of existing web-based coding tutorials for learning APIs.",
            )}
          </p>
          <p>
            {richText(
              "Many of these coding tutorials present read-only content that programmers can read, watch, and sometimes discuss with other learners but cannot interactively run and edit. Examples include API documentations, online fora such as ",
            )}
            <a href={href("https://stackoverflow.com/")}>{richText("Stack Overflow")}</a>
            {richText(", and lecturestyle courses provided as MOOCs, such as ")}
            <a href={href("https://www.coursera.org/")}>{richText("Coursera")}</a>
            {richText(" and ")}
            <a href={href("https://www.edx.org/")}>{richText("edX")}</a>
            {richText(
              ". However, there is an increasing number of interactive coding tutorials. Some tutorials take the form of games such as Code Hunt [",
            )}
            <a href={href("https://ieeexplore.ieee.org/document/7202990")}>
              {richText("Bishop et al., ICSE '15")}
            </a>
            {richText("] and Gidget [")}
            <a href={href("https://doi.acm.org/10.1145/2016911.2016934")}>
              {richText("Lee et al., ICER '11")}
            </a>
            {richText(
              "] and motivate novice programmers through the gamification of learning. These are designed to enable learners to learn the basics of programming but are not directly connected to the development of actual applications. Other web-based interactive tutorials provide code editors with which programmers can run and edit example code. In terms of the implementation, they can be roughly divided into three categories.",
            )}
          </p>
          <div className="ui hidden divider"></div>
          <div className="ui stackable three columns grid">
            <div className="column">
              <p>
                <img className="ui fluid image" src={"/deployground/fig-1.jpg"} />
              </p>
            </div>
            <div className="column">
              <p>
                <img className="ui fluid image" src={"/deployground/fig-2.jpg"} />
              </p>
            </div>
            <div className="column">
              <p>
                <img className="ui fluid image" src={"/deployground/fig-3.jpg"} />
              </p>
            </div>
          </div>
          <p className="caption">
            <strong>{richText("Figure.")}</strong>
            {richText(" Three implementation-based categories of interactive coding tutorials")}
          </p>
          <div className="ui hidden divider"></div>
          <p>
            {richText(
              "The first category (Figure (1)) is for learning client-side web technologies such as HTML/JavaScript/CSS and utilizes the JavaScript eval() function and/or HTML5 sandboxed inline frames (Iframe). For instance, ",
            )}
            <a href={href("https://www.w3schools.com/")}>{richText("W3Schools")}</a>
            {richText(
              " and several other tutorial websites provide a JavaScript code editor next to the preview pane, in which the code gets executed in the Iframe. The eval() and Iframe implementations are very simple and provide quick response to the user edits because the code is executed at the browser’s native speed, but both are vulnerable to malicious code such as infinite loops—when the code executes, the browser can easily crash. Additionally, this category cannot handle programming languages the browser cannot interpret.",
            )}
          </p>
          <p>
            {richText(
              "The second category (Figure 2 (2)) is for learning how to use the character-based user interface (CUI) and how to build character-based programs, such as for learning Linux command usage and basic C programming. It provides each user access to a lightweight virtual machine (VM) hosted on the server such as a Docker container. For instance, the C programming course in ",
            )}
            <a href={href("https://www.tutorialspoint.com/")}>{richText("Tutorials Point")}</a>
            {richText(
              " provides access to the GCC compiler and allows the user to run the program compiled with it. ",
            )}
            <a href={href("https://www.codecademy.com/")}>{richText("Codecademy")}</a>
            {richText(
              " provides access to a console of a Linux-based VM and allows programmers to test various CUI commands. ",
            )}
            <a href={href("https://www.npmjs.com/")}>{richText("npm")}</a>
            {richText(
              ", the package repository for Node.js libraries, allows the user to test libraries within the browser. In the backend, it utilizes ",
            )}
            <a href={href("https://runkit.com/")}>{richText("RunKit")}</a>
            {richText(
              ", which is a platform as a service (PaaS) provider that hosts lightweight VMs capable of running Node.js-based programs. Although this approach is flexible and can safely run any code, it is usually slow because of its high computational cost and the latency between the server and client. To make matters worse, all visitors to the web pages need to share the same computing resources, which are usually limited owing to the running cost, resulting in even slower responses.",
            )}
          </p>
          <p>
            {richText(
              "Our work and many live programming environments on the web (introduced later in detail) fall in the third category (Figure (3)), in which the user code gets executed in an interpreter. The interpreter is implemented in JavaScript and runs on a web browser. This approach is slightly slower than the Iframe method because of the interpreter overhead but significantly faster than the VM-based method because everything runs on the client computer and there is no network or VM overhead. Because the user code is always executed under the supervision of the host interpreter, malicious code can be detected in a practical manner, and it is much safer than the eval() and Iframe method. The execution is often more controllable than that in the VM method because there is no black box in the code execution process. Our work takes this approach and implements a pseudo-runtime environment that emulates the behavior of a server machine or a microcontroller with a thin interpreter layer and wrapped APIs of a fixed set of libraries.",
            )}
          </p>
        </div>
        <h3 className="ui header">{richText("B. Executable Documents")}</h3>
        <div className="ui basic segment">
          <p>
            {richText("The usability of API documentation has been extensively studied [")}
            <a href={href("https://dx.doi.org/10.1109/MS.2009.193")}>
              {richText("Robillard, 2009")}
            </a>
            {richText(", ")}
            <a href={href("https://doi.org/10.1109/ICPC.2011.21")}>
              {richText(
                'Hou et al., <abbr title="International Conference on Program Comprenension">ICPC</abbr> \'11',
              )}
            </a>
            {richText(", ")}
            <a href={href("https://doi.org/10.1007/s10664-010-9150-8")}>
              {richText("Robillard et al., 2011")}
            </a>
            {richText(", ")}
            <a href={href("https://dl.acm.org/doi/10.5555/2487085.2487100")}>
              {richText("Wang et al., MSR '13")}
            </a>
            {richText(
              "]. One of the consensuses is that concrete usage information is an important part of the documentation. Executable example codes in API documentations are especially beneficial [",
            )}
            <a href={href("https://doi.acm.org/10.1145/2568225.2568313")}>
              {richText("Subramanian et al., ICSE '14")}
            </a>
            {richText(
              "] because they can be executed when simply copied and pasted to the code editors. Another work enabled inserting such example codes into the code editor by augmenting the code completion user interface [",
            )}
            <a href={href("https://doi.acm.org/10.1145/1753326.1753402")}>
              {richText("Brandt et al., CHI '10")}
            </a>
            {richText(
              "]. Our framework connects the tutorial, example codes edited by the users, and the deployed applications by automatically adding links between these web pages.",
            )}
          </p>
          <p>
            {richText(
              "Whereas prior work mostly focuses on how to provide better read-only documentation, recent web-based platforms for literate programming, including Jupyter Notebook (formerly known as IPython Notebook [",
            )}
            <a href={href("https://dx.doi.org/10.1109/MCSE.2007.53")}>
              {richText("Perez et al., 2007")}
            </a>
            {richText(
              "]), allow writing documentation next to the source code and its execution results. Our framework is not designed for literate programming but provides a similar mixed view of documentation and executable code. The difference is that literate programming aims to provide a whole new programming experience, whereas our work aims to help a programmer learn existing programming languages and APIs and develop practical applications that run on common web servers.",
            )}
          </p>
          <p>
            {richText("Webstrates [")}
            <a href={href("https://doi.acm.org/10.1145/2807442.2807446")}>
              {richText("Klokmose et al., UIST '15")}
            </a>
            {richText("] and its subsequent research Codestrates [")}
            <a href={href("https://doi.acm.org/10.1145/3126594.3126642")}>
              {richText("Rädle et al., UIST '17")}
            </a>
            {richText(
              "] share the philosophy with us, which is about making the development process more visible and sharable as well as the implementation of creating a meta-browser layer within a web browser. While these works provide both runtime and development environments and the applications need to reside within the environments, our framework is designed for tutorials and emulates existing runtime environments so that the applications can run out of the framework.",
            )}
          </p>
        </div>
        <h3 className="ui header">{richText("C. Live Programming on the Web")}</h3>
        <div className="ui basic segment">
          <p>
            {richText(
              "Live Programming is an emerging field in the intersection of HCI and programming language research with a focus on the fluid programming experience. It aims at eliminating the mental gap between writing code and executing the program to see the results. Because the way to eliminate the mental gap is heavily domain-specific, live programming systems are typically designed to serve specific purposes rather than general programming. For instance, there have been proposed web-based live programming systems for rendering graphics in a massive open online programming training course (such as in Khan Academy’s computer programming course), generating data visualization from tabular data extracted from existing web pages (DS.js [",
            )}
            <a href={href("https://doi.acm.org/10.1145/3126594.3126663")}>
              {richText("Zhang et al., UIST '17")}
            </a>
            {richText("]), producing enclosure layouts for microcontroller applications (f3.js [")}
            <a href={href("https://doi.acm.org/10.1145/3064663.3064681")}>
              {richText("Kato et al., DIS '17")}
            </a>
            {richText("]), authoring videos of lyrics animation (TextAlive [")}
            <a href={href("https://doi.acm.org/10.1145/2702123.2702140")}>
              {richText("Kato et al., CHI '15")}
            </a>
            {richText("]), and improvising music and visual effects (Gibber [")}
            <a href={href("https://doi.acm.org/10.1145/2647868.2654949")}>
              {richText("Roberts et al., MM '14")}
            </a>
            {richText("]).")}
          </p>
          <p>
            {richText(
              "Given the domain-specific nature of live programming systems, many of them share the pain of transition from managed to wild environments. For example, TextAlive and DS.js are both JavaScript-based live programming environments and applications developed in these sandboxed environments cannot be directly exported as standalone JavaScript projects. This difficulty is a side effect of being domainspecific— these systems provide convenient APIs by default, eliminate the need to write boilerplate code, and sometimes replace part of the coding tasks with GUI interactions such as sliders for parameter tuning. This work aims to retain such benefits and furthermore to provide a feature, named an adaptive boilerplate, to export the projects. The feature transforms the succinct user code into a generic JavaScript project containing boilerplate code.",
            )}
          </p>
        </div>
        <div className="ui hidden divider"></div>
      </>
    );
  }
  return (
    <>
      <SiteLayout context={context}>
        {content.renderProjectHeader("deployground")}
        <div className="ui hidden divider"></div>
        <section id={attribute("abstract")}>{renderAbstract()}</section>
        <section id={attribute("presentations")}>{renderPresentations()}</section>
        <section id={attribute("related-work")}>{renderRelatedWork()}</section>
        {content.renderProjectPublications("deployground", "vlhcc2018-kato-deployground")}
      </SiteLayout>
    </>
  );
}
