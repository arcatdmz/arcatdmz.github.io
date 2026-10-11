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

/** React page migrated from f3js/index.pug; edit this TSX source directly. */
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

  p = projectsTable["f3js"];
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
      <SiteLayout
        context={context}
        mainHero={<>{content.renderProjectHero("f3js")}</>}
      >
        <div className="with-rail">
          <div className="right-rail">
            <section id={attribute("news")}>
              <h2 className="ui header">
                <i className="announcement icon"></i>
                <div className="content">
                  {plainText(en ? "News" : "ニュース")}
                </div>
              </h2>
              <div className="ui basic segment">
                <div className="ui divided small feed">
                  <div className="event">
                    <div className="content">
                      <div className="date">{richText("6/14/2017")}</div>
                      <div className="summary">
                        {richText(
                          "f3.js was presented at ACM DIS 2017 and is available on the web at ",
                        )}
                        <a href={href("http://f3js.org")}>
                          {richText("f3js.org")}
                        </a>
                        {richText(". Please try it out!")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ui hidden divider"></div>
            </section>
          </div>
          <div className="left-content">
            <section id={attribute("abstract")}>
              <h2 className="ui header">
                <div className="content">
                  {plainText(en ? "Abstract" : "概要")}
                </div>
              </h2>
              <div className="ui basic segment">
                <p>
                  {richText(
                    "Although the exploration of design alternatives is crucial for interaction designers and customization is required for end-users, the current development tools for physical computing devices have focused on single versions of an artifact.",
                  )}
                </p>
                <p>
                  {richText(
                    "We propose the parametric design of devices including their enclosure layouts and programs to address this issue. A Web-based design tool called f3.js is presented as an example implementation, which allows devices assembled from laser-cut panels with sensors and actuator modules to be parametrically created and customized.",
                  )}
                </p>
                <p>
                  {richText(
                    "It enables interaction designers to write code with dedicated APIs, declare parameters, and interactively tune them to produce the enclosure layouts and programs. It also provides a separate user interface for end-users that allows parameter tuning and dynamically generates instructions for device assembly. The parametric design approach and the tool were evaluated through two user studies with interaction designers, university students, and end-users.",
                  )}
                </p>
              </div>
              <div className="ui hidden divider"></div>
            </section>
          </div>
        </div>
        <section id={attribute("presentations")}>
          <h2 className="ui header">
            {plainText(en ? "Presentation materials" : "発表内容")}
          </h2>
          <div className="ui basic segment">
            <div className="ui stackable two columns grid">
              <div className="column">
                <h3 className="ui header">
                  {richText("DIS 2017 ")}
                  {plainText(en ? "Demo Video" : "デモ動画")}
                </h3>
                {content.renderEmbedYoutube(
                  "//www.youtube.com/embed/BwPXXjfUUVw",
                )}
                <div className="caption">
                  <div className="ui horizontal list">
                    <div className="item">
                      <a href={href("//www.youtube.com/watch?v=BwPXXjfUUVw")}>
                        <i className="youtube icon"></i>
                        {richText("YouTube")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                {(() => {
                  const children80: ReactNode[] = [];
                  children80.push(
                    <>
                      <h3 className="ui header">
                        {richText("DIS 2017 ")}
                        {plainText(en ? "Slides" : "発表スライド")}
                      </h3>
                    </>,
                  );
                  children80.push(
                    <>
                      <div
                        className="ui embed"
                        data-url={
                          publicationsTable[p.publication].entryTags.slides
                        }
                        data-placeholder={`${rootPath}images/background-eee.png`}
                        data-icon={"video play outline"}
                      ></div>
                    </>,
                  );
                  children80.push(
                    <>
                      <div className="caption">
                        <div className="ui horizontal list">
                          <div className="item">
                            <a
                              href={href(
                                publicationsTable[p.publication].entryTags
                                  .slides,
                              )}
                            >
                              <i className="download icon"></i>
                              {plainText(en ? "Download" : "ダウンロード")}
                            </a>
                          </div>
                        </div>
                      </div>
                    </>,
                  );
                  if (!en) {
                    children80.push(
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
                  return keyed(children80);
                })()}
              </div>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={attribute("concept")}>
          <h2 className="ui header">
            {plainText(
              en
                ? "Core concept: parametric design of devices"
                : "核となるアイデア: IoTデバイスのパラメトリックデザイン",
            )}
          </h2>
          <div className="ui basic segment">
            <div className="ui stackable two columns grid">
              <div className="column">
                <h3 className="ui header">
                  {(() => {
                    const children81: ReactNode[] = [];
                    if (en) {
                      children81.push(
                        <>
                          {richText(
                            "Parametric Design for Interaction Designers",
                          )}
                        </>,
                      );
                    } else {
                      children81.push(
                        <>{richText("インタラクションデザイナ向けの特長")}</>,
                      );
                      children81.push(
                        <>
                          <div className="sub header">
                            {richText("ハードとソフトの一体開発")}
                          </div>
                        </>,
                      );
                    }
                    return keyed(children81);
                  })()}
                </h3>
                <a
                  className="ui fluid image"
                  href={href(`${rootPath}f3js/f3js-programmers.png`)}
                >
                  <img src={`${rootPath}f3js/f3js-programmers.png`} />
                </a>
                <div className="caption">
                  <p>
                    {richText(
                      "A physical computing device is a combination of hardware (a device enclosure with sensor and actuator modules) and software (a program that drives the modules), both of which are usually designed with different tools&mdash;CAD tools for the former and IDEs for the latter.",
                    )}
                  </p>
                  <p>
                    {richText(
                      "This separation might work well in creating a single artifact of the device, but it is cumbersome to create and manage multiple variations of the device with different enclosure shapes and program features. Exploring design alternatives involves numerous iterations of splitting and merging the two independent workflows. For instance, testing different numbers of buttons in a device requires operations with both tools.",
                    )}
                  </p>
                  <p>
                    {richText(
                      "With the proposed <strong>code-centric development process</strong> of f3.js in which every aspect of a physical computing device is defined in a single codebase, parametric design of devices is as easy as defining a variable in the code and tweaking its value with intuitive <strong>lightweight GUI widgets</strong>.",
                    )}
                  </p>
                  <p>
                    {richText(
                      "In addition, f3.js provides <strong>GUI-like APIs for hardware layouts and software</strong>. For instance, <code>var rect = f3js.drawRectangle(0, 0, 100, 30)</code> cuts out a 100-by-30 mm rectangle, <code>var planes = rect.extrude(40)</code> produces five additional panels that together form a box shape, and <code>f3js.add(new GroveButton(1))</code> opens holes for holding a button module. Furthermore, the <strong>layout manager API</strong> helps creating physical user interfaces that follow existing design patterns.",
                    )}
                  </p>
                </div>
                <div className="ui hidden divider"></div>
                <div className="ui stackable two columns grid">
                  <div className="column">
                    <a
                      className="ui fluid image"
                      href={href(
                        `${rootPath}f3js/extrusion-without-opposite-plane.jpg`,
                      )}
                    >
                      <img
                        src={`${rootPath}f3js/extrusion-without-opposite-plane-resized.jpg`}
                      />
                    </a>
                    <p className="caption">
                      {plainText(
                        en
                          ? "Extruding a rectangle makes a box."
                          : "矩形を押し出すと箱型ができる。",
                      )}
                    </p>
                    <div className="ui hidden divider"></div>
                  </div>
                  <div className="column">
                    {(() => {
                      const children82: ReactNode[] = [];
                      children82.push(
                        <>
                          <a
                            className="ui fluid image"
                            href={href(`${rootPath}f3js/circle-layout.jpg`)}
                          >
                            <img
                              src={`${rootPath}f3js/circle-layout-resized.jpg`}
                            />
                          </a>
                        </>,
                      );
                      if (en) {
                        children82.push(
                          <>
                            <p className="caption">
                              {richText(
                                "Circular layout is common in physical user interfaces.",
                              )}
                            </p>
                          </>,
                        );
                        children82.push(
                          <>
                            <p>
                              {richText(
                                "Other figures showing the API usage and design patterns include: ",
                              )}
                              <a
                                href={href(
                                  `${rootPath}f3js/partial-extrusion.jpg`,
                                )}
                              >
                                {richText("partial extrusion")}
                              </a>
                              {richText(" and  ")}
                              <a href={href(`${rootPath}f3js/line-layout.jpg`)}>
                                {richText("line layout")}
                              </a>
                              {richText(".")}
                            </p>
                          </>,
                        );
                      } else {
                        children82.push(
                          <>
                            <p className="caption">
                              {richText(
                                "モジュールが円形に並ぶデザインは多くのIoTデバイスで見られる。他に",
                              )}
                              <a
                                href={href(
                                  `${rootPath}f3js/partial-extrusion.jpg`,
                                )}
                              >
                                {richText("押し出し操作の別例")}
                              </a>
                              {richText("と")}
                              <a href={href(`${rootPath}f3js/line-layout.jpg`)}>
                                {richText("モジュールが線上に並ぶデザイン")}
                              </a>
                              {richText(
                                "の図がある。いずれもf3.jsのAPIで容易に設計できる形状である。",
                              )}
                            </p>
                          </>,
                        );
                      }
                      children82.push(
                        <>
                          <div className="ui hidden divider"></div>
                        </>,
                      );
                      return keyed(children82);
                    })()}
                  </div>
                </div>
              </div>
              <div className="column">
                <h3 className="ui header">
                  {(() => {
                    const children83: ReactNode[] = [];
                    if (en) {
                      children83.push(
                        <>{richText("Parametric Design for End-uesrs")}</>,
                      );
                    } else {
                      children83.push(
                        <>{richText("エンドユーザ向けの特長")}</>,
                      );
                      children83.push(
                        <>
                          <div className="sub header">
                            {richText("プラモデルのようなデバイス組み立て")}
                          </div>
                        </>,
                      );
                    }
                    return keyed(children83);
                  })()}
                </h3>
                <a
                  className="ui fluid image"
                  href={href(`${rootPath}f3js/f3js-end-users.png`)}
                >
                  <img src={`${rootPath}f3js/f3js-end-users.png`} />
                </a>
                <div className="caption">
                  <p>
                    {richText(
                      "The f3.js design tool enables customization, printing, and the use of devices without prior knowledge by providing lightweight GUI widgets for customization and detailed instructions on building of devices. Building physical prototypes that perfectly match the need is <i>&quot;as easy as assembling a plastic model kit&quot;</i> with f3.js (quoted from a user study).",
                    )}
                  </p>
                  <div className="ui right floated small image">
                    <a
                      href={href(
                        `${rootPath}f3js/design-alternatives-shapes.jpg`,
                      )}
                    >
                      <img
                        src={`${rootPath}f3js/design-alternatives-shapes-resized.jpg`}
                      />
                    </a>
                    <p className="caption">
                      {richText(
                        "Creating devices with alternative designs is as easy as tweaking sliders in f3.js.",
                      )}
                    </p>
                  </div>
                  <p>
                    {richText(
                      "Users first search for existing projects. Once an interesting project is found, a project page displays its details when it is accessed. The page provides lightweight GUI widgets that allow users to interactively explore device variations. Tweaking parameters with the widgets silently updates variable declarations in the codebase, and the print preview is consequently updated.",
                    )}
                  </p>
                  <p>
                    {richText(
                      "There are detailed instructions on which sensor and actuator modules to purchase below the print preview. The list is dynamically generated simultaneously as the print preview is updated by aggregating the type and number of modules used in the project.",
                    )}
                  </p>
                  <p>
                    {richText(
                      "Next to the list of modules is a link to download PDF files that can be directly sent to the laser cutter. It provides the option of printing labels near adjacent edges. Joint lines between different planes have unique shapes that do not match with wrong edges. These features help the user to assemble the panels without confusion.",
                    )}
                  </p>
                  <p>
                    {richText(
                      "The final step is to install and run a program on the target platform. f3.js archives each project in TAR or ZIP format whose content can be directly executed on the target. A single command-line tool (<code>f3-projects</code>) can be used to download, transfer, extract, install dependencies, and launch a daemon that continuously runs the program.",
                    )}
                  </p>
                </div>
                <div className="ui hidden divider"></div>
              </div>
            </div>
          </div>
        </section>
        <section id={attribute("examples")}>
          <h2 className="ui header">
            {plainText(en ? "Example applications" : "アプリケーション例")}
          </h2>
          <div className="ui basic segment">
            <div className="ui stackable two columns grid">
              <div className="column">
                <h3 className="ui header">
                  {plainText(
                    en ? "Videos of 17 applications" : "17個の作例動画",
                  )}
                </h3>
                {content.renderEmbedYoutube(
                  "https://www.youtube.com/embed/videoseries?list=PLb6OjFoBksmvYwbJqt8Z30LS72LkPrPJb",
                )}
                <div className="caption">
                  <p>
                    {richText(
                      "We conducted two user studies in different stages of developing f3.js. This playlist contains seventeen example applications created through the studies.",
                    )}
                  </p>
                  <p>
                    {richText(
                      "The first study was conducted to validate its potential and to assess its limitations by collecting a variety of applications that could be made with f3.js. The second study was conducted after revisions to check if the tool could help both interaction designers and end-users to explore variations in devices.",
                    )}
                  </p>
                </div>
                <div className="ui hidden divider"></div>
              </div>
              <div className="column">
                <h3 className="ui header">
                  {plainText(
                    en ? "Explanations on the first 5 apps" : "冒頭5例の紹介",
                  )}
                </h3>
                <div className="ui basic segment">
                  <ol type={"a"}>
                    <li>
                      {richText(
                        "<strong>QuadBuzzer</strong> is a musical instrument with one to four buzzers. It is connected to a host PC and creates sound according to user operations on the host. The enclosure is centrosymmetrical with curves and the buzzers are placed with the Circle layout. ",
                      )}
                    </li>
                    <li>
                      {richText(
                        "<strong>Music Kiosk</strong> plays musical melodies in synchronicity with another computer that is playing a music video uploaded to YouTube. The device enclosure uses the Line layout to place four equally-spaced LEDs in line.",
                      )}
                    </li>
                    <li>
                      {richText(
                        "<strong>Card Matching Game</strong> allows a user to choose a number of players from one or two and changes the number of printed controllers, as well as the available game modes. ",
                      )}
                    </li>
                    <li>
                      {richText(
                        "<strong>Rhythm Game on a Drum</strong> is an interactive game that utilizes a sound sensor to detect a hit on the drum, which is made of a hand-crafted case.",
                      )}
                    </li>
                    <li>
                      {richText(
                        "<strong>Translator</strong> is an arm-mounted device that uses a Web-based translation API to translate text captured by a camera and presents the results on its LCD.",
                      )}
                    </li>
                  </ol>
                  <p>
                    {richText(
                      "There are more interesting applications in the playlist, so please do not miss them.",
                    )}
                  </p>
                </div>
                <div className="ui hidden divider"></div>
              </div>
            </div>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        {content.renderProjectPublications("f3js", "dis2017-kato-f3js")}
      </SiteLayout>
    </>
  );
}
