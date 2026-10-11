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

/** React page migrated from teaparty/index.pug; edit this TSX source directly. */
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

  p = projectsTable["teaparty"];
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
  function renderBody(): ReactNode {
    return (
      <>
        <section>
          <h2 className="ui header" id={attribute("summary")}>
            {plainText(en ? "Summary" : "概要")}
          </h2>
          <div className="ui basic segment">
            <p>
              {richText(
                "&quot;Indescribable tea party&quot; welcomes people who have full of curiosity in wide range of topics relevant to the future of media content, science, and technology. The media content includes but is not limited to: animations, games, illustrations, music, novels, etc.",
              )}
            </p>
            <p>
              {richText(
                "All attendees are expected to provide presentations of varying durations (from 1 min lightning talk to 30 min long presentation) to get to know each other and learn the cutting edge of creating/delivering/enjoying media content.",
              )}
            </p>
            <p>
              <strong>
                {richText(
                  "(NOTE: This event has nothing to do with the Tea Party movement!)",
                )}
              </strong>
            </p>
          </div>
        </section>
        <div className="ui hidden divider"></div>
        <section id={attribute("past-events")}>
          <h2 className="ui header">
            {plainText(en ? "Past Events" : "イベント一覧")}
          </h2>
          <div className="ui basic segment">
            <h3 className="ui header">
              {richText("7th Party: 1/28/2018 @ Wantedly, Inc.")}
            </h3>
            <p>
              {richText(
                "32 people from industry and academia gathered and presented in the organized sessions including Science, Technology, Telling stories, Playing music, Animating creatures, and Drawing illustrations. Slack chat was used for the backchannel of the presentations.",
              )}
            </p>
            <h3 className="ui header">
              {richText("6th Party: 2/12/2017 @ Wantedly, Inc.")}
            </h3>
            <p>
              {richText(
                "36 people from industry and academia gathered and presented their work in the following sessions: AI &amp; IA, Media Content and Society, Startups, Design, Interaction, etc. There was also a panel session in which Prof. Inami (",
              )}
              <a href={href("https://star.rcast.u-tokyo.ac.jp/")}>
                {richText("The University of Tokyo")}
              </a>
              {richText("), Mr. Hirasawa (")}
              <a href={href("https://uspi.jp/")}>{richText("USP")}</a>
              {richText(
                "), and Dr. Kato discussed the future of creativity support research and development.",
              )}
            </p>
            <h3 className="ui header">
              {richText("5th Party: 2/13/2016 @ Wantedly, Inc.")}
            </h3>
            <p>
              {richText(
                "&gt;30 people attended the event. A variety of presentations relevant to science, technology, and media content were provided, forming the following sessions: Music, Video, Food, Game, Ethnography, Business, 2D/3D/Fabrication, and lightning talks.",
              )}
            </p>
            <h3 className="ui header">
              {richText("4th Party: 1/24/2015 @ DMM.make AKIBA BASE")}
            </h3>
            <p>
              {richText(
                "Lots of attendees! Organized sessions for the first time: Creators' Showcase #1/#2, Science and Education, Human/Computer/Intelligence, Game, Oversea, Media Content for the Five Senses, Understanding and Creating Content, and the Shotgun Session.",
              )}
            </p>
            <h3 className="ui header">
              {richText("1st - 3rd Parties: 2012-2014 @ Lab-Cafe")}
            </h3>
            <p>
              {richText(
                "Researchers, engineers, artists, producers, and fans of media content gathered at a cozy Lab-Cafe and provided presentations, getting to know each other and learn the cutting edge of creating media content.",
              )}
            </p>
          </div>
        </section>
        <div className="ui hidden divider"></div>
      </>
    );
  }
  function renderImages(): ReactNode {
    return (
      <>
        <img
          className="ui fluid image"
          src={`${rootPath}teaparty/20160213-5th-teaparty.jpg`}
        />
        <div className="caption">
          {plainText(en ? "A photo from the 5th party" : "第5回の模様")}
        </div>
        <div className="ui hidden divider"></div>
        <img
          className="ui fluid image"
          src={`${rootPath}teaparty/20140301-3rd-teaparty.jpg`}
        />
        <div className="caption">
          {plainText(en ? "A photo from the 3rd party" : "第3回の模様")}
        </div>
        <div className="ui hidden divider"></div>
        <img
          className="ui fluid image"
          src={`${rootPath}teaparty/20130105-2nd-teaparty.jpg`}
        />
        <div className="caption">
          {plainText(en ? "A photo from the 2nd party" : "第2回の模様")}
        </div>
        <div className="ui hidden divider"></div>
      </>
    );
  }
  return (
    <>
      <SiteLayout context={context}>
        {content.renderProjectHeader("teaparty")}
        <div className="ui hidden divider"></div>
        <div className="ui stackable grid">
          <div className="ten wide column">{renderBody()}</div>
          <div className="six wide column">{renderImages()}</div>
        </div>
      </SiteLayout>
    </>
  );
}
