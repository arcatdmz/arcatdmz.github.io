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

/** React page migrated from multirobot/index.pug; edit this TSX source directly. */
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

  p = projectsTable["multirobot"];
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
  function renderAbstract(): ReactNode {
    return (
      <>
        <h2 className="ui header">{plainText(en ? "Abstract" : "概要")}</h2>
        <div className="ui basic segment">
          <p>
            {richText(
              "Existing user interfaces for controlling mobile robots in real-time are generally for only one robot. Controlling multiple robots simultaneously is difficult. We developed a multi-touch interface with a top-down view from a ceiling-mounted camera for simultaneously controlling multiple mobile robots. Users touch and move their hands on the screen to specify the vector field, and all the robots move along the vector field.",
            )}
            {richText(
              " The test users in our study successfully operated multiple robots simultaneously with our interface.",
            )}
          </p>
          <p>
            {richText("This was my graduate thesis work and won 1")}
            <sup>{richText("st")}</sup>
            {richText(" place at CHI 2009 ")}
            <a href={href("https://src.acm.org/winners/2010")}>
              {richText("Student Research Competition")}
            </a>
            {richText(".")}
          </p>
        </div>
        <div className="ui hidden divider"></div>
      </>
    );
  }
  function renderInteraction(): ReactNode {
    return (
      <>
        <h2 className="ui header">
          {plainText(
            en
              ? "Multi-touch Vector Field Operation"
              : "ベクトル場を用いた複数ロボットの同時操作",
          )}
        </h2>
        <div className="ui basic segment">
          <p>
            {richText(
              "With our multi-touch interface, users can navigate multiple robots simultaneously through three operation modes. Please note that the users do not need to switch between these modes explicitly.",
            )}
          </p>
          <dl>
            <dt>
              <strong>{richText("Drag")}</strong>
            </dt>
            <dd>
              {richText(
                "When users touch and drag their hands along the panel, a virtual stream appears on the vector field and robots move in accordance with the stream.",
              )}
            </dd>
            <dt>
              <strong>{richText("Mix")}</strong>
            </dt>
            <dd>
              {richText(
                "When users drag their fingers on existing streams, the vector data near the streams are blended in proportion to their distances from the streams. Nearer streams affect the vectors more strongly.",
              )}
            </dd>
            <dt>
              <strong>{richText("Hold")}</strong>
            </dt>
            <dd>
              {richText(
                "Touching the panel without further motion will reset the vectors under that hand. Thus, we can stop a robot by touching and holding an area in front of the robot.",
              )}
            </dd>
          </dl>
        </div>
        <div className="ui hidden divider"></div>
      </>
    );
  }
  function renderVideos(): ReactNode {
    return (
      <>
        {content.renderEmbedYoutube("//www.youtube.com/embed/zGioJvhsoIY")}
        <div className="caption">
          <div className="ui horizontal list">
            <div className="item">
              <a href={href("//www.youtube.com/watch?v=QKtzsOU-sA8")}>
                <i className="youtube icon"></i>
                {richText("YouTube")}
              </a>
            </div>
          </div>
        </div>
        <div className="ui hidden divider"></div>
        <a
          className="ui fluid image"
          href={href(`${rootPath}multirobot/operations.png`)}
        >
          <img src={`${rootPath}multirobot/operations.png`} />
        </a>
        <div className="caption">
          {plainText(en ? "Three operation modes" : "3つの操作モード")}
        </div>
        <div className="ui hidden divider"></div>
      </>
    );
  }
  return (
    <>
      <SiteLayout context={context}>
        {content.renderProjectHeader("multirobot")}
        <div className="ui hidden divider"></div>
        <div className="ui stackable two columns grid">
          <div className="column">
            <section id={attribute("abstract")}>{renderAbstract()}</section>
            <section id={attribute("interaction")}>
              {renderInteraction()}
            </section>
          </div>
          <div className="column">
            <section id={attribute("videos")}>{renderVideos()}</section>
          </div>
        </div>
        {content.renderProjectPublications(
          "multirobot",
          "chi2009-kato-multirobot",
        )}
      </SiteLayout>
    </>
  );
}
